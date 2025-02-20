import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import type { Comment } from "../types/CommentEntityDummy.ts"
import { dummyComments } from "../data/dummyComments"
import { Heart, Flag } from "lucide-react"

interface PostCommentsProps {
    postId: string
}

const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => {
        const filtered = dummyComments.filter((comment) => comment.postId === postId)
        setComments(filtered)
    }, [postId])

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">댓글</h2>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <motion.div
                        key={comment.commentId}
                        className="flex items-start space-x-4 p-4 border-b border-gray-200 dark:border-gray-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                            {comment.userName.charAt(0)}
                        </div>
                        <div className="flex-grow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{comment.userName}</span>
                                    <span className="ml-2 text-xs text-gray-500">({comment.userRole})</span>
                                </div>
                                <span className="text-xs text-gray-400">{new Date(comment.createAt).toLocaleString()}</span>
                            </div>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{comment.content}</p>
                            <div className="mt-2 flex items-center space-x-4">
                                <span className="text-xs text-gray-500">좋아요 {comment.likesCount}</span>
                                <button className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">답글</button>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button className="p-1 text-gray-500 hover:text-blue-500">
                                <Heart className="h-4 w-4" />
                                <span className="sr-only">좋아요</span>
                            </button>
                            <button className="p-1 text-gray-500 hover:text-red-500">
                                <Flag className="h-4 w-4" />
                                <span className="sr-only">신고</span>
                            </button>
                        </div>
                    </motion.div>
                ))
            ) : (
                <p className="text-gray-500">댓글이 없습니다.</p>
            )}
        </div>
    )
}

export default PostComments

