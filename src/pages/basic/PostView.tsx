"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { PostEntity } from "../../types/PostEntity"
import { marked } from "marked"
import PostContainer from "../../components/Container"
import { motion } from "framer-motion"
import { Heart, Flag, MessageCircle, Share2 } from "lucide-react"
import PostReportModal from "../../components/PostReportModal" // 신고 모달
import PostComments from "../../components/PostComments" // 댓글 컴포넌트 추가

const PostView: React.FC = () => {
    const { postId } = useParams<{ postId: string }>()

    const [post, setPost] = useState<PostEntity | null>(null)
    const [hasLiked, setHasLiked] = useState(false)
    const [hasReported, setHasReported] = useState(false)
    const [showReportModal, setShowReportModal] = useState(false)

    useEffect(() => {
        // 예시: 더미 데이터
        const dummyPost: PostEntity = {
            postID: "1",
            title: "김아프간타의 은밀한 사생활",
            username: "김아프간타",
            content: "# 하핫!\n\n이 게시물은 UI 테스트를 위한 임시 데이터입니다.",
            likesCount: 42,
            reportCount: 3,
        }

        if (postId) {
            setPost(dummyPost)
        } else {
            console.error("postId가 전달되지 않았습니다.")
        }
    }, [postId])

    /** 좋아요 토글 */
    const handleLike = () => {
        if (!post) return
        if (hasLiked) {
            // 좋아요 취소
            setPost({ ...post, likesCount: Math.max(0, post.likesCount - 1) })
            setHasLiked(false)
        } else {
            // 좋아요 누르기
            setPost({ ...post, likesCount: post.likesCount + 1 })
            setHasLiked(true)
        }
    }

    /** 신고 버튼 -> 모달 열기 */
    const handleReport = () => {
        if (!hasReported) {
            setShowReportModal(true)
        }
    }

    /** 모달에서 확인 시 신고 처리 */
    const confirmReport = (reason: string) => {
        console.log("선택된 신고 사유:", reason)
        if (post) {
            setPost({ ...post, reportCount: post.reportCount + 1 })
        }
        setHasReported(true)
        setShowReportModal(false)
    }

    return (
        <PostContainer>
            {/* 신고 모달 */}
            {showReportModal && (
                <PostReportModal
                    onClose={() => setShowReportModal(false)}
                    onConfirm={confirmReport}
                />
            )}

            {post ? (
                <>
                    {/* 게시물 UI */}
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
                                작성자: {post.username}
                            </motion.p>
                            <motion.div
                                className="prose dark:prose-invert max-w-none mt-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                                dangerouslySetInnerHTML={{ __html: marked(post.content) }}
                            />
                        </div>

                        {/* 하단 버튼 영역 */}
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                            <div className="flex space-x-4">
                                {/* 좋아요 버튼 (빈 하트 ↔ 빨간 하트) */}
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

                                {/* 댓글 버튼 */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                </motion.button>

                                {/* 공유 버튼 */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors duration-300"
                                >
                                    <Share2 className="w-5 h-5" />
                                </motion.button>
                            </div>

                            {/* 신고 버튼 */}
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

                    {/* 댓글 영역 - 게시물 하단에 위치 */}
                    <PostComments />
                </>
            ) : (
                // 게시물 없는 경우 로딩 메시지
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-600 dark:text-gray-300 py-10"
                >
                    게시물을 불러오는 중...
                </motion.p>
            )}
        </PostContainer>
    )
}

export default PostView;
