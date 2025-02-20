"use client"

import React, { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import type { PostEntity } from "../types/PostEntity"
import { motion } from "framer-motion"
import { Bookmark, Heart, MessageSquare } from 'lucide-react'
import { ClientUrl } from "../constants/ClientUrl.ts"

interface PostCardProps {
    post: PostEntity
    interactive?: boolean
}

const pastelColors = [
    "#FCE4EC", "#E3F2FD", "#E8F5E9", "#FFF3E0", "#F3E5F5", "#E0F7FA", "#E8EAF6",
]

// seed에 기본값을 부여하여 seed가 없을 경우에도 오류가 발생하지 않도록 함
const getFixedBackgroundColor = (seed: string = ""): string => {
    if (!seed) return pastelColors[0];
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % pastelColors.length;
    return pastelColors[index];
}

const PostCard: React.FC<PostCardProps> = ({ post, interactive = true }) => {
    const [isScrapped, setIsScrapped] = useState<boolean>(false);
    // post.postId가 undefined일 경우 빈 문자열을 전달
    const fixedBgColor = useMemo(() => getFixedBackgroundColor(post.postId || ""), [post.postId]);

    const handleScrap = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!interactive) return;
        setIsScrapped((prev) => !prev);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
            <Link to={`${ClientUrl.SPECIFICPOST}/${post.postId}`} className="block">
                {/* Thumbnail area */}
                <div className="h-48 overflow-hidden rounded-t-[50px] rounded-b-[20px] opacity-80 flex items-center justify-center relative">
                    {post.thumbNailImage ? (
                        <img
                            src={post.thumbNailImage || "/placeholder.svg"}
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center text-black text-xl font-bold"
                            style={{ backgroundColor: fixedBgColor }}
                        >
                            {post.title}
                        </div>
                    )}
                </div>

                {/* Content area */}
                <div className="p-6 space-y-4">
                    <motion.h2
                        className="text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {post.title}
                    </motion.h2>

                    {/* Author and date info in vertical layout */}
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                            <Link
                                to={`${ClientUrl.OTHERSPROFILE}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
                            >
                                By {post.userId}
                            </Link>
                        </div>
                        <span className="text-xs text-gray-400">
                            {new Date(post.createAt).toLocaleDateString()}
                        </span>
                    </div>

                    <p className="text-base text-gray-700 dark:text-gray-300 line-clamp-3">
                        {post.summary}
                    </p>
                </div>
            </Link>

            {/* Footer area */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {post.userTag.map((tag) => (
                            <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200">
                                {tag}
                            </span>
                        ))}
                    </div>
                    {/* Interaction icons */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-red-500 dark:text-white">
                            <Heart className="w-5 h-5" />
                            <span className="text-xs">{post.likesCount}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-blue-500 dark:text-white">
                            <MessageSquare className="w-5 h-5" />
                            <span className="text-xs">{post.commentsCount}</span>
                        </div>
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
                                            ? "fill-current text-blue-400"
                                            : "stroke-current text-gray-600 dark:text-gray-300"
                                    }`}
                                />
                            </motion.div>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PostCard;
