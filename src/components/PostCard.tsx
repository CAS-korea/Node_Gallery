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

const PostCard: React.FC<PostCardProps> = ({ post, interactive = true }) => {
    const [isScrapped, setIsScrapped] = useState<boolean>(false)
    const [hasLiked, setHasLiked] = useState<boolean>(false)

    const handleScrap = () => {
        if (!interactive) return
        setIsScrapped((prev) => !prev)
    }

    const handleLike = () => {
        if (!interactive) return
        setHasLiked((prev) => !prev)
        // 실제 좋아요 수 업데이트 로직은 필요에 따라 구현
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
            {/* 썸네일 영역: Link로 감싸서 클릭 시 상세 페이지로 이동 */}
            <Link to={`${ClientUrl.SPECIFICPOST}/${post.postId}`}>
                <div className="h-48 overflow-hidden rounded-t-[50px] rounded-b-[20px] opacity-80">
                    <img
                        src={post.thumbNailImage}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>

            {/* 상단 영역: 제목, 작성자, 날짜, 요약 내용 */}
            <Link to={`${ClientUrl.SPECIFICPOST}/${post.postId}`} className="block">
                <div className="p-6 space-y-4">
                    <motion.h2
                        className="text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {post.title}
                    </motion.h2>
                    <div className="flex items-center">
                        <Link
                            to={`${ClientUrl.SPECIFICPROFILE}/${post.userId}`}
                            onClick={(e) => e.stopPropagation()}
                            className="block"
                        >
                            <motion.p
                                className="text-sm text-gray-500 dark:text-gray-400"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                By {post.userId}
                            </motion.p>
                        </Link>
                        <span className="ml-2 text-xs text-gray-400">
              {new Date(post.createAt).toLocaleDateString()}
            </span>
                    </div>
                    <p className="text-base text-gray-700 dark:text-gray-300 line-clamp-3">
                        {post.summary}
                    </p>
                </div>
            </Link>

            {/* 하단 영역: 아이콘 영역 */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                {/* 왼쪽 영역: 태그 */}
                <div className="flex space-x-2">
                    {post.userTag.map((tag, index) => (
                        <span
                            key={index}
                            className="text-sm text-blue-500 dark:text-blue-400 hover:underline cursor-default"
                        >
              {tag}
            </span>
                    ))}
                </div>
                {/* 오른쪽 영역: 좋아요, 댓글, 스크랩 아이콘 */}
                <div className="flex items-center space-x-4">
                    {/* 좋아요 아이콘 */}
                    <div
                        onClick={handleLike}
                        className="flex cursor-pointer items-center space-x-1 text-red-600"
                    >
                        <Heart
                            className={`w-5 h-5 ${
                                hasLiked
                                    ? "fill-current"
                                    : "stroke-current text-gray-600 dark:text-gray-300 dark:stroke-white hover:text-red-500"
                            }`}
                        />
                        <span className="text-xs">{post.likesCount}</span>
                    </div>
                    {/* 댓글 아이콘 */}
                    <div className="flex items-center space-x-1 text-blue-600">
                        <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
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
                                        : "stroke-current text-gray-600 dark:text-gray-300 dark:stroke-white"
                                }`}
                            />
                        </motion.div>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}

export default PostCard
