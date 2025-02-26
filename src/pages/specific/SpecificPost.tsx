"use client";

import type React from "react";
import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    Flag,
    MessageCircle,
    Bookmark,
    Send,
    ChevronLeft,
    Share2,
    Calendar,
    Clock,
} from "lucide-react";
import { useServices } from "../../context/ServicesProvider.tsx";
import PostReportModal from "../../components/PostReportModal";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { ClientUrl } from "../../constants/ClientUrl.ts";
import type { postActivity, postInfo, userInfo } from "../../types/PostDetailDto.ts";
import type { CommentDetailDto } from "../../types/CommentDetailDto.ts";
import PostComment from "../../components/PostComment.tsx";
import type { NewCommentDto } from "../../types/NewCommentDto.ts";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";

// ─────────────────────────────────────────────
// SpecificPost 컴포넌트: 게시글 상세보기 페이지
// ─────────────────────────────────────────────
const SpecificPost: React.FC = () => {
    // URL 파라미터에서 postId 추출
    const { postId } = useParams<{ postId: string }>();
    // 서비스 함수들 가져오기
    const {
        getPostById,
        likePost,
        scrapPost,
        reportPost,
        createComment,
        likeComment,
        reportComment,
    } = useServices();

    // 게시글 관련 상태
    const [postInfo, setPostInfo] = useState<postInfo | null>(null);
    const [author, setAuthor] = useState<userInfo | null>(null);
    const [postActivity, setPostActivity] = useState<postActivity | null>(null);
    const [comments, setComments] = useState<CommentDetailDto[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // 인터랙션 상태
    const [isLiking, setIsLiking] = useState(false);
    const [isScrapping, setIsScrapping] = useState(false);
    const [isReporting, setIsReporting] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 게시글 데이터 불러오기 함수
    const fetchPost = useCallback(async () => {
        if (!postId) return;
        try {
            const response = await getPostById(postId);
            setPostInfo(response.post);
            setAuthor(response.author);
            setPostActivity(response.postActivity);
            setComments(response.comment);
        } catch (error) {
            console.error("게시물 불러오기 실패: ", error);
        } finally {
            setLoading(false);
        }
    }, [postId, getPostById]);

    // 컴포넌트 마운트 시 데이터 로드
    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    // 댓글 제출 핸들러
    const handleCommentSubmit = async () => {
        if (!postId || !newComment.trim()) return;
        setIsSubmitting(true);
        const newCommentDto: NewCommentDto = { comment: newComment };
        try {
            await createComment(postId, newCommentDto);
            setNewComment("");
            fetchPost();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 게시글 좋아요 핸들러
    const handleLikePost = async () => {
        if (!postId || isLiking || !postActivity) return;
        setIsLiking(true);
        try {
            await likePost(postId);
            fetchPost();
        } catch (error) {
            console.error("좋아요 처리 실패:", error);
        } finally {
            setIsLiking(false);
        }
    };

    // 게시글 스크랩 핸들러
    const handleScrapPost = async () => {
        if (!postId || isScrapping || !postActivity) return;
        setIsScrapping(true);
        try {
            await scrapPost(postId);
            fetchPost();
        } catch (error) {
            console.error("스크랩 처리 실패:", error);
        } finally {
            setIsScrapping(false);
        }
    };

    // 게시글 신고 핸들러
    const handleReportPost = async () => {
        if (!postId || isReporting || !postActivity) return;
        setIsReporting(true);
        try {
            await reportPost(postId);
            fetchPost();
        } catch (error) {
            console.error("신고 처리 실패:", error);
        } finally {
            setIsReporting(false);
        }
    };

    // 댓글 좋아요 핸들러
    const handleLikeComment = async (commentId: string) => {
        if (!commentId || isLiking || !comments) return;
        setIsLiking(true);
        try {
            await likeComment(commentId);
            fetchPost();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLiking(false);
        }
    };

    // 댓글 신고 핸들러
    const handleReportComment = async (commentId: string) => {
        if (!commentId || isReporting || !comments) return;
        setIsReporting(true);
        try {
            await reportComment(commentId);
            fetchPost();
        } catch (error) {
            console.error(error);
        } finally {
            setIsReporting(false);
        }
    };

    // 날짜 포맷 함수 (예: January 1, 2021)
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // 읽는 시간 계산 (분 단위)
    const getReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    };

    // 마크다운 콘텐츠를 HTML로 변환하고, 첫 문단에 드롭 캡을 적용하는 함수
    const processContent = (content: string) => {
        if (!content) return "";
        const htmlContent = marked(content);
        const firstParagraphMatch = htmlContent.match(/<p>(.*?)<\/p>/);
        if (!firstParagraphMatch) return htmlContent;
        const firstParagraph = firstParagraphMatch[0];
        const firstParagraphContent = firstParagraphMatch[1];
        const firstLetter = firstParagraphContent.charAt(0);
        const restOfParagraph = firstParagraphContent.substring(1);
        const newParagraph = `<p><span class="float-left text-5xl font-serif leading-none mr-2 mt-1">${firstLetter}</span>${restOfParagraph}</p>`;
        return htmlContent.replace(firstParagraph, newParagraph);
    };

    // 로딩 중일 때 화면
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 mb-4"></div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        );
    }

    // 게시글 데이터가 없을 때 화면
    if (!postInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        게시물을 찾을 수 없습니다
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        요청하신 게시물이 존재하지 않거나 삭제되었습니다.
                    </p>
                    <Link
                        to="/"
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        홈으로 돌아가기
                    </Link>
                </div>
            </div>
        );
    }

    // ─────────────────────────────────────────────
    // 최종 JSX 렌더링
    // ─────────────────────────────────────────────
    return (
        <div className="min-h-screen w-full bg-white dark:bg-gray-950">
            {/* 신고 모달 */}
            <AnimatePresence>
                {showReportModal && (
                    <PostReportModal
                        onClose={() => setShowReportModal(false)}
                        onConfirm={handleReportPost}
                    />
                )}
            </AnimatePresence>

            {/* 썸네일 Hero 섹션 */}
            <div className="relative w-full h-[50vh] overflow-hidden">
                <div className="absolute inset-0 bg-white/5 z-10"></div>
                <motion.img
                    src={postInfo.thumbNailImage || "/placeholder.svg"}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
                {/* 뒤로가기 버튼 */}
                <Link
                    to="/"
                    className="absolute top-6 left-6 z-20 bg-white/5 backdrop-blur-md text-white rounded-full p-2 hover:bg-white/20 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Link>
            </div>

            <div className="max-w-3xl mx-auto px-4 -mt-20 relative z-20">
                {/* 게시글 본문 카드 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="overflow-hidden shadow-xl border-0 dark:bg-gray-900">
                        <CardContent className="p-8">
                            {/* 게시글 메타 정보 */}
                            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>{formatDate(postInfo.createAt)}</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>{getReadingTime(postInfo.content)} min read</span>
                                </div>
                            </div>

                            {/* 게시글 제목 */}
                            <motion.h1
                                className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {postInfo.title}
                            </motion.h1>

                            {/* 작성자 정보 */}
                            <Link
                                to={`${ClientUrl.OTHERSPROFILE}/${author?.userId}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center space-x-3 group mb-8"
                            >
                                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                    <AvatarImage src={author?.profileImageUrl || "/placeholder.svg"} alt={author?.name || "Author"} />
                                    <AvatarFallback>{author?.name?.charAt(0) || "U"}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {author?.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{author?.role}</p>
                                </div>
                            </Link>

                            {/* 게시글 본문: 드롭 캡 적용 */}
                            <motion.div
                                className="prose dark:prose-invert prose-lg max-w-none mb-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                dangerouslySetInnerHTML={{ __html: processContent(postInfo?.content ?? "") }}
                            />

                            <Separator className="my-8" />

                            {/* 상호작용 버튼 */}
                            <div className="flex justify-between items-center">
                                <div className="flex space-x-6">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={handleLikePost}
                                                    disabled={isLiking}
                                                    className={`rounded-full ${postActivity?.liked ? "text-red-500 hover:text-red-600" : "text-gray-500 hover:text-gray-600"}`}
                                                >
                                                    <Heart className={`w-5 h-5 mr-1.5 ${postActivity?.liked ? "fill-current" : ""}`} />
                                                    <span>{postInfo.likesCount}</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{postActivity?.liked ? "좋아요 취소" : "좋아요"}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={handleScrapPost}
                                                    disabled={isScrapping}
                                                    className={`rounded-full ${postActivity?.scraped ? "text-yellow-500 hover:text-yellow-600" : "text-gray-500 hover:text-gray-600"}`}
                                                >
                                                    <Bookmark className={`w-5 h-5 mr-1.5 ${postActivity?.scraped ? "fill-current" : ""}`} />
                                                    <span>{postInfo.scrapsCount}</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{postActivity?.scraped ? "스크랩 취소" : "스크랩"}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="rounded-full text-gray-500 hover:text-gray-600"
                                                    onClick={() =>
                                                        document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" })
                                                    }
                                                >
                                                    <MessageCircle className="w-5 h-5 mr-1.5" />
                                                    <span>{postInfo.commentsCount}</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>댓글 보기</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setShowReportModal(true)}
                                                disabled={isReporting || postActivity?.reported}
                                                className={`rounded-full ${postActivity?.reported ? "text-red-500 cursor-not-allowed opacity-70" : "text-gray-500 hover:text-gray-600"}`}
                                            >
                                                <Flag className={`w-5 h-5 ${postActivity?.reported ? "fill-current" : ""}`} />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{postActivity?.reported ? "신고됨" : "신고하기"}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* 댓글 섹션 */}
                <motion.div
                    id="comments-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-12 mb-20"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Comments ({comments.length})
                        </h2>
                        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800 ml-4"></div>
                    </div>

                    {/* 댓글 입력 */}
                    <Card className="mb-8 overflow-hidden border-0 shadow-lg dark:bg-gray-900">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="https://example.com/default-profile.png" alt="Your profile" />
                                    <AvatarFallback>YP</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                  <textarea
                      className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none min-h-[100px]"
                      placeholder="댓글을 입력하세요..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                  />
                                    <div className="flex justify-end mt-3">
                                        <Button
                                            onClick={handleCommentSubmit}
                                            disabled={isSubmitting || !newComment.trim()}
                                            className="bg-blue-600 hover:bg-blue-700 text-white"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center">
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                    <span>게시 중...</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <Send className="w-4 h-4 mr-2" />
                                                    <span>댓글 게시</span>
                                                </div>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 댓글 목록 */}
                    {comments.length > 0 ? (
                        <div className="space-y-6">
                            {comments.map((comment, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                                >
                                    <PostComment
                                        commentContent={comment.content}
                                        commentActivity={comment.commentActivity}
                                        commentUserInfo={comment.specificPostCommentAuthor}
                                        onLikeComment={() => handleLikeComment(comment.content.commentId)}
                                        onReportComment={() => handleReportComment(comment.content.commentId)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <Card className="border-0 shadow-md dark:bg-gray-900">
                            <CardFooter className="p-8 flex flex-col items-center justify-center">
                                <MessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-3" />
                                <p className="text-gray-500 dark:text-gray-400 text-center">
                                    아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
                                </p>
                            </CardFooter>
                        </Card>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default SpecificPost;
