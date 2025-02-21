"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Bookmark, Heart, MessageSquare } from "lucide-react"
import { ClientUrl } from "../constants/ClientUrl"
import type { postInfo, userInfo } from "../types/PostcardDTO"

interface PostCardProps {
    postInfo: postInfo
    userInfo: userInfo
}

const pastelColors = ["#F3F4F6", "#E5E7EB", "#D1D5DB", "#E5E7EB", "#F3F4F6", "#F9FAFB", "#F3F4F6"]

const getFixedBackgroundColor = (seed = ""): string => {
    if (!seed) return pastelColors[0]
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash)
    }
    const index = Math.abs(hash) % pastelColors.length
    return pastelColors[index]
}

const PostCard: React.FC<PostCardProps> = ({ postInfo, userInfo }) => {
    const fixedBgColor = useMemo(() => getFixedBackgroundColor(postInfo.postId), [postInfo.postId])
    const [isBookmarked, setIsBookmarked] = useState(postInfo.scraped)

    if (postInfo.reported) return null

    const handleBookmarkClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsBookmarked((prev) => !prev)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full max-w-4xl mx-auto"
        >
            <Link to={`${ClientUrl.SPECIFICPOST}/${postInfo.postId}`} className="block">
                {/* Header - Author Info */}
                <div className="px-6 pt-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                        <Link
                            to={`${ClientUrl.OTHERSPROFILE}/${userInfo.userId}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center space-x-3 group"
                        >
                            <img
                                src={userInfo.profileImageUrl || "/placeholder.svg"}
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover shadow-sm group-hover:shadow-md transition-shadow duration-200"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {userInfo.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{userInfo.role}</p>
                            </div>
                        </Link>
                        <span className="text-xs text-gray-400">{new Date(postInfo.createAt).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Thumbnail with Bookmark */}
                <div className="relative h-64 bg-gray-100 dark:bg-gray-700">
                    {postInfo.thumbNailImage ? (
                        <img
                            src={postInfo.thumbNailImage || "/placeholder.svg"}
                            alt={postInfo.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div
                            className=" w-full h-full flex items-center justify-center p-6 text-center"
                            style={{ backgroundColor: fixedBgColor }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">{postInfo.title}</h2>
                        </div>
                    )}

                    {/* Container for fixed positioning */}
                    <div className="absolute bottom-[220px] left-[505px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isBookmarked ? "bookmarked" : "unbookmarked"}
                                onClick={handleBookmarkClick}
                                className="cursor-pointer"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Bookmark
                                    className={`transition-colors ${
                                        isBookmarked
                                            ? "fill-current text-blue-500 dark:text-blue-400"
                                            : "stroke-current text-gray-600 dark:text-gray-300"
                                    } w-10 h-10`}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                    {/* Content */}
                <div className="px-6 py-6">
                    <motion.h2
                        className="text-xl font-semibold text-gray-900 dark:text-gray-100 leading-tight mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {postInfo.title}
                    </motion.h2>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">{postInfo.summary}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {postInfo.userTag.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                {tag}
              </span>
                        ))}
                    </div>
                </div>

                {/* Footer - Interactions */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-end space-x-6">
                        {/* Likes */}
                        <div className="flex items-center space-x-2">
                            <Heart
                                className={`w-5 h-5 transition-colors ${
                                    postInfo.liked
                                        ? "fill-current text-red-500"
                                        : "stroke-current text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                }`}
                            />
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{postInfo.likesCount}</span>
                        </div>

                        {/* Comments */}
                        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                            <MessageSquare className="w-5 h-5" />
                            <span className="text-sm font-medium">{postInfo.commentsCount}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default PostCard

