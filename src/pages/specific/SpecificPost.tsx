import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { PostEntity } from "../../types/PostEntity";
import { marked } from "marked";
import PostContainer from "../../components/Container";
import { motion } from "framer-motion";
import { Heart, Flag, MessageCircle, Share2 } from "lucide-react";
import PostReportModal from "../../components/PostReportModal";
import PostComments from "../../components/PostComments";
import { dummyPosts } from "../../data/dummyPosts";

const SpecificPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();

    const [post, setPost] = useState<PostEntity | null>(null);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasReported, setHasReported] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);

    useEffect(() => {
        if (postId) {
            // dummyPosts에서 postId에 해당하는 게시물을 찾습니다.
            const foundPost = dummyPosts.find((p) => p.postId === postId) || null;
            setPost(foundPost);
        } else {
            console.error("postId가 전달되지 않았습니다.");
        }
    }, [postId]);

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
            setShowReportModal(true);
        }
    };

    const confirmReport = (reason: string) => {
        console.log("선택된 신고 사유:", reason);
        if (post) {
            setPost({ ...post, reportsCount: post.reportsCount + 1 });
        }
        setHasReported(true);
        setShowReportModal(false);
    };

    return (
        <PostContainer>
            {showReportModal && (
                <PostReportModal
                    onClose={() => setShowReportModal(false)}
                    onConfirm={confirmReport}
                />
            )}

            {post ? (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                    >
                        <div className="p-6 space-y-4">
                            <motion.h1
                                className="text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                            >
                                {post.title}
                            </motion.h1>
                            <motion.p
                                className="text-sm text-gray-500 dark:text-gray-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                작성자: {post.userId}
                            </motion.p>
                            <motion.div
                                className="prose dark:prose-invert max-w-none mt-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                                dangerouslySetInnerHTML={{ __html: marked(post.content) }}
                            />
                        </div>

                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                            <div className="flex space-x-4">
                                <motion.button
                                    onClick={handleLike}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center space-x-2 transition-colors duration-300"
                                >
                                    <motion.div
                                        animate={{ scale: hasLiked ? 1.2 : 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                    >
                                        {hasLiked ? (
                                            <Heart className="w-5 h-5 fill-current text-red-500" />
                                        ) : (
                                            <Heart
                                                className="w-5 h-5 stroke-current text-gray-600 dark:text-gray-300 hover:text-red-500"
                                                fill="none"
                                                strokeWidth={2}
                                            />
                                        )}
                                    </motion.div>
                                    <span
                                        className={`font-medium ${
                                            hasLiked
                                                ? "text-red-500"
                                                : "text-gray-600 dark:text-gray-300"
                                        }`}
                                    >
                                        {post.likesCount}
                                    </span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors duration-300"
                                >
                                    <Share2 className="w-5 h-5" />
                                </motion.button>
                            </div>

                            <motion.button
                                onClick={handleReport}
                                whileHover={{ scale: !hasReported ? 1.1 : 1 }}
                                whileTap={{ scale: !hasReported ? 0.95 : 1 }}
                                className={`transition-colors duration-300 ${
                                    hasReported
                                        ? "text-red-500 cursor-not-allowed"
                                        : "text-gray-600 dark:text-gray-300 hover:text-red-500"
                                }`}
                                disabled={hasReported}
                            >
                                <Flag className="w-5 h-5" />
                            </motion.button>
                        </div>
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
            )}
        </PostContainer>
    );
};

export default SpecificPost;
