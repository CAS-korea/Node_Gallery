import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import { motion } from "framer-motion";
import { Heart, Flag, MessageCircle, Bookmark, Send } from "lucide-react";
import { useServices } from "../../context/ServicesProvider.tsx";
import PostReportModal from "../../components/PostReportModal";

import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { ClientUrl } from "../../constants/ClientUrl.ts";
import { postActivity, postInfo, userInfo } from "../../types/PostDetailDto.ts";
import { CommentDetailDto } from "../../types/CommentDetailDto.ts";
import PostComment from "../../components/PostComment.tsx";
import { NewCommentDto } from "../../types/NewCommentDto.ts";
import { Textarea } from "@headlessui/react";

// ─────────────────────────────────────────────
// SpecificPost 컴포넌트: 게시글 상세보기 페이지
// ─────────────────────────────────────────────
const SpecificPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const { getPostById, likePost, scrapPost, reportPost, createComment, likeComment, reportComment } = useServices();

    const [postInfo, setPostInfo] = useState<postInfo | null>(null);
    const [author, setAuthor] = useState<userInfo | null>(null);
    const [postActivity, setPostActivity] = useState<postActivity | null>(null);
    const [comments, setComments] = useState<CommentDetailDto[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [isLiking, setIsLiking] = useState(false);
    const [isScrapping, setIsScrapping] = useState(false);
    const [isReporting, setIsReporting] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);

    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [commentLength, setCommentLength] = useState(0); // 글자 수 상태 추가
    const maxLength = 500; // 최대 글자 수

    const fetchPost = async () => {
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
    };

    // 게시글 데이터를 비동기로 불러오기
    useEffect(() => {
        fetchPost();
    }, [postId, getPostById]);

    const handleCommentSubmit = async () => {
        if (!postId || !newComment.trim()) return;
        setIsSubmitting(true);

        const newCommentDto: NewCommentDto = {
            comment: newComment
        };
        try {
            await createComment(postId, newCommentDto);
            fetchPost();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
            setNewComment(""); // 댓글 제출 후 입력 창 초기화
            setCommentLength(0); // 글자 수 초기화
        }
    };

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

    const handleLikeComment = async (commentId: string) => {
        if (!commentId || isLiking || !comments) return; // 임시
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
    };// 댓글 입력 시 글자 수 업데이트
    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= maxLength) {
            setNewComment(value);
            setCommentLength(value.length);
        }
    };

    // 로딩 중 또는 게시글 데이터가 없을 경우의 처리
    if (loading) return <p>로딩 중...</p>;
    if (!postInfo) return <p>게시물을 찾을 수 없습니다.</p>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            {showReportModal && (
                <PostReportModal
                    onClose={() => setShowReportModal(false)}
                    onConfirm={handleReportPost}
                />
            )}

            <div className="max-w-3xl mx-auto px-4">
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
                    <Card className="overflow-hidden">
                        {/* 썸네일 이미지가 있을 경우에만 보여주기 */}
                        {postInfo.thumbNailImage && (
                            <CardHeader className="p-0">
                                <img
                                    src={postInfo.thumbNailImage || "/placeholder.svg"}
                                    alt="Thumbnail"
                                    className="w-full h-64 object-cover"
                                />
                            </CardHeader>
                        )}

                        <CardContent className="p-6">
                            {/* 제목 & 날짜를 한 줄에 배치 */}
                            <div className="flex justify-between items-center mb-4">
                                <motion.h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                    {postInfo.title}
                                </motion.h1>
                                <span className="text-sm text-gray-500">
                                    {new Date(postInfo.createAt).toLocaleDateString("ko-KR", { // "ko-KR" 로 변경
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                    })}
                                </span>
                            </div>

                            <Link
                                to={`${ClientUrl.OTHERSPROFILE}/${author?.userId}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center space-x-3 group"
                            >
                                <img
                                    src={author?.profileImageUrl || "/placeholder.svg"}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full object-cover shadow-sm group-hover:shadow-md transition-shadow duration-200"
                                />
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {author?.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{author?.role}</p>
                                </div>
                            </Link>... {/* 게시글 내용 */}
                            <motion.div className="prose dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{__html: marked(postInfo?.content ?? "")}}/>
                        </CardContent>... <Separator/>... {/* 좋아요, 스크랩, 댓글, 신고 버튼 */}
                        <CardFooter className="p-6 flex justify-between items-center">
                            <div className="flex space-x-4">
                                <Button variant="ghost" size="sm" onClick={handleLikePost} disabled={isLiking}>
                                    <Heart
                                        className={`w-6 h-6 ${postActivity?.liked ? "fill-current text-red-500" : ""}`}/>
                                    <span>{postInfo.likesCount}</span>
                                </Button>
                                <Button variant="ghost" size="sm" onClick={handleScrapPost} disabled={isScrapping}>
                                    <Bookmark
                                        className={`w-6 h-6 ${postActivity?.scraped ? "fill-current text-yellow-500" : ""}`}/>
                                    <span>{postInfo.scrapsCount}</span>
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <MessageCircle className="w-6 h-6"/>
                                    <span>{postInfo.commentsCount}</span>
                                </Button>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setShowReportModal(true)}
                                    disabled={isReporting}>
                                <Flag
                                    className={`w-6 h-6 ${postActivity?.reported ? "fill-current text-red-500" : ""}`}/>
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                {/* 댓글 UI */}
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3, duration: 0.5}} className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Comments</h2>

                    {/* 댓글 입력 창 - 프로필 이미지 제거 */}
                    <div className="flex flex-col">
                        <div className="flex items-start space-x-4 mb-2">
                            <Textarea
                                className={`flex-grow p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="댓글을 입력하세요..."
                                value={newComment}
                                onChange={handleCommentChange}
                                maxLength={maxLength}
                            />
                            <Button variant="ghost" size="sm" onClick={handleCommentSubmit} disabled={isSubmitting || newComment.trim() === ""}>
                                <Send className="w-6 h-6"/>
                            </Button>
                        </div>
                        <div className="text-gray-500 text-sm self-end">
                            {commentLength}/{maxLength}
                        </div>
                    </div>

                    {/* 댓글 목록 */}
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <PostComment
                                key={index}
                                commentContent={comment.content}
                                commentActivity={comment.commentActivity}
                                commentUserInfo={comment.specificPostCommentAuthor}
                                onLikeComment={() => handleLikeComment(comment.content.commentId)}
                                onReportComment={() => handleReportComment(comment.content.commentId)}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">댓글이 없습니다.</p>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default SpecificPost;
