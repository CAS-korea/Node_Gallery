import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import type { PostEntity } from "../../types/PostEntity";
import { marked } from "marked";
import PostContainer from "../../components/Container";
import { motion } from "framer-motion";
import { Heart, Flag, MessageCircle } from "lucide-react";
import PostReportModal from "../../components/PostReportModal";
import PostComments from "../../components/PostComments";
import { useServices } from "../../context/ServicesProvider.tsx";

// UI 컴포넌트들
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import {ClientUrl} from "../../constants/ClientUrl.ts";

// ─────────────────────────────────────────────
// SpecificPost 컴포넌트: 게시글 상세보기 페이지
// ─────────────────────────────────────────────
const SpecificPost: React.FC = () => {
    // URL 파라미터에서 postId 추출
    const { postId } = useParams<{ postId: string }>();
    const validPostId = postId ?? "";
    const { getPostById } = useServices();

    // 상태값들 선언
    const [post, setPost] = useState<PostEntity | null>(null);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasReported, setHasReported] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    // 게시글 데이터를 비동기로 불러오기
    useEffect(() => {
        if (!validPostId) {
            console.log("❌ 유효하지 않은 postId: ", validPostId);
            return;
        }

        const fetchPost = async () => {
            try {
                const response = await getPostById(validPostId);
                if (response) {
                    setPost(response.data);
                } else {
                    console.error("게시물이 존재하지 않습니다.");
                }
            } catch (error) {
                console.error("게시물 불러오기 실패: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [validPostId, getPostById]);

    // 좋아요 토글 핸들러
    const handleLike = () => {
        if (!post) return;
        if (hasLiked) {
            setPost({ ...post, likesCount: Math.max(0, post.likesCount - 1) });
            setHasLiked(false);
        } else {
            setPost({ ...post, likesCount: post.likesCount + 1 });
            setHasLiked(true);
        }
    };

    // 신고 모달 열기 핸들러
    const handleReport = () => {
        if (!hasReported) {
            setShowReportModal(true);
        }
    };

    // 신고 확인 후 처리하는 핸들러
    const confirmReport = (reason: string) => {
        console.log("선택된 신고 사유:", reason);
        if (post) {
            setPost({ ...post, reportsCount: post.reportsCount + 1 });
        }
        setHasReported(true);
        setShowReportModal(false);
    };

    // 로딩 중 또는 게시글 데이터가 없을 경우의 처리
    if (loading) return <p>로딩 중...</p>;
    if (!post) return <p>게시물을 찾을 수 없습니다.</p>;

    return (
        <PostContainer>
            {/* 신고 모달: showReportModal이 true일 때 표시 */}
            {showReportModal && (
                <PostReportModal
                    onClose={() => setShowReportModal(false)}
                    onConfirm={confirmReport}
                />
            )}

            <div className="max-w-3xl mx-auto px-4">
                {/* 게시글 카드 영역 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="overflow-hidden">
                        {/* ── 카드 헤더: 썸네일 이미지 ── */}
                        <CardHeader className="p-0">
                            <img
                                src={post.thumbNailImage || "/placeholder.svg"}
                                alt="Thumbnail"
                                className="w-full h-64 object-cover"
                            />
                        </CardHeader>

                        {/* ── 카드 컨텐츠: 제목, 사용자 정보, 본문 내용 ── */}
                        <CardContent className="p-6">
                            <motion.h1
                                className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                {post.title}
                            </motion.h1>

                            {/* 사용자 정보: 아바타, 이름, 역할, 작성일 */}
                            <div className="flex items-center space-x-4 mb-6">
                                <Avatar>
                                    <AvatarImage src="/placeholder-avatar.jpg" alt={post.userId} />
                                    <AvatarFallback>
                                        {/* 여기에 사용자 아이콘(예: <User />)을 넣을 수 있음 */}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <Link
                                        to={`${ClientUrl.SPECIFICPROFILE}/${post.userId}`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-sm text-black dark:text-white hover:underline"
                                    >
                                        {post.userId}
                                    </Link>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(post.createAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* 게시글 본문: marked 라이브러리로 HTML 변환 */}
                            <motion.div
                                className="prose dark:prose-invert max-w-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                dangerouslySetInnerHTML={{ __html: marked(post.content) }}
                            />
                        </CardContent>

                        <Separator />

                        {/* ── 카드 풋터: 좋아요, 댓글, 신고 버튼 영역 ── */}
                        <CardFooter className="p-6 flex justify-between items-center">
                            <div className="flex space-x-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleLike}
                                    className={`flex items-center space-x-2 ${hasLiked ? "text-red-500" : ""}`}
                                >
                                    <Heart className={`w-6 h-6 ${hasLiked ? "fill-current" : ""}`} />
                                    <span>{post.likesCount}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                                    <MessageCircle className="w-6 h-6" />
                                    <span>{post.commentsCount}</span>
                                </Button>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleReport}
                                disabled={hasReported}
                                className={hasReported ? "text-red-500 cursor-not-allowed" : ""}
                            >
                                <Flag className="w-6 h-6" />
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                {/* ── 댓글 영역 ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Comments
                    </h2>
                    <PostComments postId={post.postId} />
                </motion.div>
            </div>
        </PostContainer>
    );
};

export default SpecificPost;
