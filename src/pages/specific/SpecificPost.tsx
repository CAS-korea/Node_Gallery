import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { PostEntity } from "../../types/PostEntity";
import { marked } from "marked";
import PostContainer from "../../components/Container";
import { motion } from "framer-motion";
import { Heart, Flag, MessageCircle, Share2 } from "lucide-react";
import PostReportModal from "../../components/PostReportModal";
import PostComments from "../../components/PostComments";
import {useServices} from "../../context/ServicesProvider.tsx";

import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card"
import { Separator } from "../../components/ui/separator"


const SpecificPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const validPostId = postId ?? "";
    const {getPostById} = useServices();

    const [post, setPost] = useState<PostEntity | null>(null);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasReported, setHasReported] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

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
    }, [validPostId]);

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

    const handleReport = () => {
        if (!hasReported) {
            setShowReportModal(true)
        }
    }

    const confirmReport = (reason: string) => {
        console.log("선택된 신고 사유:", reason);
        if (post) {
            setPost({ ...post, reportsCount: post.reportsCount + 1 })
        }
        setHasReported(true)
        setShowReportModal(false)
    }

    if (loading) return <p>로딩 중...</p>;
    if (!post) return <p>게시물을 찾을 수 없습니다.</p>;

    return (
        <PostContainer>
            {showReportModal && (
                <PostReportModal
                    onClose={() => setShowReportModal(false)}
                    onConfirm={confirmReport}
                />
            )}

    return (
        <Container>
        <div className="max-w-3xl mx-auto px-4 py-8">
            {showReportModal && <PostReportModal onClose={() => setShowReportModal(false)} onConfirm={confirmReport} />}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="overflow-hidden">
                    <CardHeader className="p-0">
                        <img src={post.thumbNailImage || "/placeholder.svg"} alt="Thumbnail" className="w-full h-64 object-cover" />
                    </CardHeader>
                    <CardContent className="p-6">
                        <motion.h1
                            className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            {post.title}
                        </motion.h1>

                        {/* 사용자 정보 (아바타 + 이름 + 역할) */}
                        <div className="flex items-center space-x-4 mb-6">
                            <Avatar>
                                <AvatarImage src="/placeholder-avatar.jpg" alt={post.userId} />
                                <AvatarFallback>
                                    <User />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{post.userId}</p>

                                    {/* 역할 표시 (배지 스타일) */}
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            post.role === "PROFESSOR"
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-500 text-white"
                                        }`}
                                    >
                                        {post.role}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(post.createAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* 본문 내용 */}
                        <motion.div
                            className="prose dark:prose-invert max-w-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            dangerouslySetInnerHTML={{ __html: marked(post.content) }}
                        />
                    </CardContent>
                    <Separator />

                    {/* 하단 버튼 영역 */}
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

                    {/* 댓글 영역: postId를 전달하여 해당 게시물의 댓글만 필터링 */}
                    <PostComments postId={post.postId} />
                </>
            ) : (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-600 dark:text-gray-300 py-10"
                >
                    게시물이 존재하지 않습니다.
                </motion.p>
            )};
        </PostContainer>
    );
};
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8"
            >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Comments</h2>
                <PostComments postId={post.postId} />
            </motion.div>
        </div>
        </Container>
    )
}

export default SpecificPost
