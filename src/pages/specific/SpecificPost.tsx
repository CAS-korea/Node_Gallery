import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {marked} from "marked";
import PostContainer from "../../components/Container";
import {motion} from "framer-motion";
import {Heart, Flag, MessageCircle, Bookmark} from "lucide-react";
import {useServices} from "../../context/ServicesProvider.tsx";
import PostReportModal from "../../components/PostReportModal";

import {Avatar, AvatarFallback, AvatarImage} from "../../components/ui/avatar";
import {Button} from "../../components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "../../components/ui/card";
import {Separator} from "../../components/ui/separator";
import {ClientUrl} from "../../constants/ClientUrl.ts";
import {postActivity, postInfo, userInfo} from "../../types/PostDetailDto.ts";
import {CommentDto} from "../../types/CommentDto.ts";
import PostComment from "../../components/PostComment.tsx";

// ─────────────────────────────────────────────
// SpecificPost 컴포넌트: 게시글 상세보기 페이지
// ─────────────────────────────────────────────
const SpecificPost: React.FC = () => {
    const {postId} = useParams<{ postId: string }>();

    const {getPostById, likesPost, scrapsPost, reportsPost} = useServices();

    const [postInfo, setPostInfo] = useState<postInfo | null>(null);
    const [author, setAuthor] = useState<userInfo | null>(null);
    const [postActivity, setPostActivity] = useState<postActivity | null>(null);
    const [comments, setComments] = useState<CommentDto[] | []>([]);

    // const [showReportModal, setShowReportModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    // ✅ 중복 요청 방지를 위한 상태값
    const [isLiking, setIsLiking] = useState(false);
    const [isScrapping, setIsScrapping] = useState(false);
    const [isReporting, setIsReporting] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);

    // 게시글 데이터를 비동기로 불러오기
    useEffect(() => {
        if (!postId) return;

        const fetchPost = async () => {
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
        fetchPost();
    }, [postId, getPostById]);

    // 좋아요 토글 핸들러
    const handleLike = async () => {
        if (!postId || isLiking || !postActivity) return;
        setIsLiking(true);

        try {
            const response = await likesPost(postId);
            if (response.status === 200) {
                setPostActivity(prev => prev ? { ...prev, liked: !prev.liked } : null);
                setPostInfo(prev => prev ? { ...prev, likesCount: prev.likesCount + (postActivity.liked ? -1 : 1) } : null);
            }
        } catch (error) {
            console.error("좋아요 처리 실패:", error);
        } finally {
            setIsLiking(false);
        }
    };

    // 신고 모달 열기 핸들러
    const handleScrap = async () => {
        if (!postId || isScrapping || !postActivity) return;
        setIsScrapping(true);

        try {
            const response = await scrapsPost(postId);
            if (response.status === 200) {
                setPostActivity(prev => prev ? { ...prev, scraped: !prev.scraped } : null);
                setPostInfo(prev => prev ? { ...prev, scrapsCount: prev.scrapsCount + (postActivity.scraped ? -1 : 1) } : null);
            }
        } catch (error) {
            console.error("스크랩 처리 실패:", error);
        } finally {
            setIsScrapping(false);
        }
    };


    const handleReport = async () => {
        if (!postId || isReporting || !postActivity) return;
        setIsReporting(true);

        try {
            const response = await reportsPost(postId);
            if (response.status === 200) {
                setPostActivity(prev => prev ? { ...prev, reported: true } : null);
            }
        } catch (error) {
            console.error("신고 처리 실패:", error);
        } finally {
            setIsReporting(false);
        }
    };

    // 로딩 중 또는 게시글 데이터가 없을 경우의 처리
    if (loading) return <p>로딩 중...</p>;
    if (!postInfo) return <p>게시물을 찾을 수 없습니다.</p>;

    return (
        <PostContainer>
            {showReportModal && (
                <PostReportModal
                    onClose={() => setShowReportModal(false)}
                    onConfirm={handleReport}
                />
            )}

            <div className="max-w-3xl mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card className="overflow-hidden">
                        <CardHeader className="p-0">
                            <img src={postInfo.thumbNailImage || "/placeholder.svg"} alt="Thumbnail"
                                 className="w-full h-64 object-cover" />
                        </CardHeader>

                        <CardContent className="p-6">
                            {/* 제목 & 날짜를 한 줄에 배치 */}
                            <div className="flex justify-between items-center mb-4">
                                <motion.h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                    {postInfo.title}
                                </motion.h1>
                                <span className="text-sm text-gray-500">
                                    {new Date(postInfo.createAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>

                            {/* 🟢 UserInfo 배치 (프사 + 닉네임 + 역할) */}
                            <div className="flex items-center space-x-4 mb-6">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={author?.profileImageUrl} alt={author?.userId} />
                                    <AvatarFallback />
                                </Avatar>
                                <div>
                                    <Link to={`${ClientUrl.OTHERSPROFILE}/${author?.userId}`}
                                          className="text-sm font-medium text-black dark:text-white hover:underline">
                                        {author?.userId} ({author?.name})
                                    </Link>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {author?.role}
                                    </p>
                                </div>
                            </div>

                            {/* 게시글 내용 */}
                            <motion.div className="prose dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: marked(postInfo?.content ?? "") }} />
                        </CardContent>

                        <Separator />

                        {/* 좋아요, 스크랩, 댓글, 신고 버튼 */}
                        <CardFooter className="p-6 flex justify-between items-center">
                            <div className="flex space-x-4">
                                <Button variant="ghost" size="sm" onClick={handleLike} disabled={isLiking}>
                                    <Heart className={`w-6 h-6 ${postActivity?.liked ? "fill-current text-red-500" : ""}`} />
                                    <span>{postInfo.likesCount}</span>
                                </Button>
                                <Button variant="ghost" size="sm" onClick={handleScrap} disabled={isScrapping}>
                                    <Bookmark className={`w-6 h-6 ${postActivity?.scraped ? "fill-current text-yellow-500" : ""}`} />
                                    <span>{postInfo.scrapsCount}</span>
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <MessageCircle className="w-6 h-6" />
                                    <span>{postInfo.commentsCount}</span>
                                </Button>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setShowReportModal(true)} disabled={isReporting}>
                                <Flag className={`w-6 h-6 ${postActivity?.reported ? "fill-current text-red-500" : ""}`} />
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                {/* 댓글 섹션 */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }} className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Comments</h2>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <PostComment
                                key={index}
                                commentContent={comment.content}
                                commentActivity={comment.commentActivity}
                                commentUserInfo={comment.specificPostCommentAuthor}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">댓글이 없습니다.</p>
                    )}
                </motion.div>
            </div>
        </PostContainer>
    );
};

export default SpecificPost;
