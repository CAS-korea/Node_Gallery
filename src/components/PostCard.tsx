"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import type { PostEntity } from "../types/PostEntity"
import { motion } from "framer-motion"
import { Bookmark } from "lucide-react"
import {ClientUrl} from "../constants/ClientUrl.ts";

interface PostCardProps {
    post: PostEntity
    interactive?: boolean
}

const PostCard: React.FC<PostCardProps> = ({ post, interactive = true }) => {
    const [isScrapped, setIsScrapped] = useState<boolean>(false)

    const handleScrap = () => {
        if (!interactive) return
        setIsScrapped((prev) => !prev)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
            <div className="p-6 space-y-4">
                <Link to={`${ClientUrl.SPECIFICPOST}/${post.postId}`} className="block">
                    <motion.h2
                        className="text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {post.title}
                    </motion.h2>
                </Link>
                <Link to={`${ClientUrl.SPECIFICPROFILE}/${post.userId}`} className="block">
                    <motion.p
                        className="text-sm text-gray-500 dark:text-gray-400"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        By {post.userId}
                    </motion.p>
                </Link>
                <p className="text-base text-gray-700 dark:text-gray-300 line-clamp-3">{post.content}</p>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end items-center">
                <motion.button
                    onClick={handleScrap}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 transition-colors duration-300"
                >
                    <motion.div
                        animate={{ scale: isScrapped ? 1.2 : 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                        <Bookmark
                            className={`w-5 h-5 ${
                                isScrapped
                                    ? "fill-current text-blue-500"
                                    : "stroke-current text-gray-600 dark:text-gray-300"
                            }`}
                        />
                    </motion.div>
                    <span className="font-medium">{isScrapped ? "스크랩됨" : "스크랩하기"}</span>
                </motion.button>
            </div>
        </motion.div>
    )
}

export default PostCard;
