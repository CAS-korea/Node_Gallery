"use client"

import React, { useState } from "react"
import { Link } from "react-router-dom"
import type { PostEntity } from "../types/PostEntity"
import { motion } from "framer-motion"
import { Bookmark, Heart, MessageSquare } from "lucide-react"
import { ClientUrl } from "../constants/ClientUrl.ts"

interface PostCardProps {
    post: PostEntity
    interactive?: boolean
}

const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 70%)`;
}

const PostCard: React.FC<PostCardProps> = ({ post, interactive = true }) => {
    const [isScrapped, setIsScrapped] = useState<boolean>(false)
    const randomBgColor = generateRandomColor();

    const handleScrap = () => {
        if (!interactive) return
        setIsScrapped((prev) => !prev)
    }

    return (
        <Link to={`${ClientUrl.SPECIFICPOST}/${post.postId}`} className="block">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer"
            >
                {/* 📌 썸네일 영역: 이미지 또는 랜덤 배경 */}
                <div className="h-48 overflow-hidden rounded-t-[50px] rounded-b-[20px] opacity-80 flex items-center justify-center">
                    {post.thumbNailImage ? (
                        <img
                            src={post.thumbNailImage}
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center text-white text-xl font-bold"
                            style={{ backgroundColor: randomBgColor }}
                        >
                            {post.title}
                        </div>
                    )}
                </div>

                {/* 본문 영역 */}
                <div className="p-6 space-y-4">
                    <motion.h2
                        className="text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {post.title}
                    </motion.h2>
                    {/* 사용자 정보: userId와 날짜 */}
                    <div className="flex items-center">
                        <motion.p
                            className="text-sm text-gray-500 dark:text-gray-400"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            By {post.userId}
                        </motion.p>
                        <span className="ml-2 text-xs text-gray-400">
                            {new Date(post.createAt).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="text-base text-gray-700 dark:text-gray-300 line-clamp-3">
                        {post.summary}
                    </p>
                </div>

                {/* 하단 영역 */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                    {/* 왼쪽 영역: 태그 */}
                    <div className="flex space-x-2">
                        {post.userTag.map((tag, index) => (
                            <span
                                key={index}
                                className="text-sm text-blue-500 hover:underline cursor-default"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    {/* 오른쪽 영역: 좋아요, 댓글, 스크랩 아이콘 */}
                    <div className="flex items-center space-x-4">
                        {/* 좋아요 아이콘 */}
                        <div className="flex items-center space-x-1 text-red-600">
                            <Heart className="w-5 h-5" />
                            <span className="text-xs">{post.likesCount}</span>
                        </div>
                        {/* 댓글 아이콘 */}
                        <div className="flex items-center space-x-1 text-blue-600">
                            <MessageSquare className="w-5 h-5" />
                            <span className="text-xs">{post.commentsCount}</span>
                        </div>
                        {/* 스크랩 버튼 */}
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
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}

export default PostCard
