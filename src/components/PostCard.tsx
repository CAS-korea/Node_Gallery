"use client"

import React, {useMemo} from "react"
import {Link} from "react-router-dom"
import {motion} from "framer-motion"
import {Bookmark, Heart, MessageSquare} from 'lucide-react'
import {ClientUrl} from "../constants/ClientUrl.ts"
import {postInfo, userInfo} from "../types/PostcardDTO.ts";

interface PostCardProps {
    postInfo: postInfo
    userInfo: userInfo
}

const pastelColors = [
    "#FCE4EC", "#E3F2FD", "#E8F5E9", "#FFF3E0", "#F3E5F5", "#E0F7FA", "#E8EAF6",
]

const getFixedBackgroundColor = (seed: string) => {
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash)
    }
    const index = Math.abs(hash) % pastelColors.length
    return pastelColors[index]
}

const PostCard: React.FC<PostCardProps> = ({postInfo, userInfo}) => {
    const fixedBgColor = useMemo(() => getFixedBackgroundColor(postInfo.postId), [postInfo.postId]);

    if (postInfo.reported) return null; // 🚨 신고된 글 필터링 (보이지 않게 함)

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3, ease: "easeOut"}}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-[600px] mx-auto sm:mx-0 sm:ml-4"
        >
            <Link to={`${ClientUrl.SPECIFICPOST}/${postInfo.postId}`} className="block">
                {/* Thumbnail area */}
                <div
                    className="h-48 overflow-hidden rounded-t-[50px] rounded-b-[20px] opacity-80 flex items-center justify-center relative">
                    {postInfo.thumbNailImage ? (
                        <img
                            src={postInfo.thumbNailImage || "/placeholder.svg"}
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center text-black text-xl font-bold"
                            style={{backgroundColor: fixedBgColor}}
                        >
                            {postInfo.title}
                        </div>
                    )}
                </div>

                {/* Content area */}
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <motion.h2
                            className="text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight"
                            whileHover={{x: 5}}
                            transition={{type: "spring", stiffness: 300}}
                        >
                            {postInfo.title}
                        </motion.h2>
                        <span className="text-xs text-gray-400">
                            {new Date(postInfo.createAt).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center space-x-3 p-2 rounded-lg w-fit hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Link
                            to={`${ClientUrl.OTHERSPROFILE}/${userInfo.userId}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center space-x-3"
                        >
                            <img
                                src={userInfo.profileImageUrl}
                                alt="Profile"
                                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
                            />
                            <div>
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                    {userInfo.userId} ({userInfo.name})
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{userInfo.role}</p>
                            </div>
                        </Link>
                    </div>

                    <p className="text-base text-gray-700 dark:text-gray-300 line-clamp-3">
                        {postInfo.summary}
                    </p>
                </div>
            </Link>

            {/* Footer area */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {postInfo.userTag.map((tag, index) => (
                            <span key={index}
                                  className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200">
                                {tag}
                            </span>
                        ))}
                    </div>
                    {/* Interaction icons */}
                    <div className="flex items-center space-x-4">
                        {/* 댓글 */}
                        <div className="flex items-center space-x-1 text-gray-600 dark:text-white">
                            <MessageSquare className="w-5 h-5"/>
                            <span className="text-xs">{postInfo.commentsCount}</span>
                        </div>

                        {/* 좋아요 (liked 상태 반영) */}
                        <div className="flex items-center space-x-1">
                            <Heart
                                className={`w-5 h-5 ${postInfo.liked ? "fill-current text-red-500" : "stroke-current text-gray-600 dark:text-gray-300"}`}/>
                            <span className="text-xs">{postInfo.likesCount}</span>
                        </div>

                        {/* 스크랩 (scraped 상태 반영) */}
                        <div className="flex items-center space-x-1">
                            <Bookmark
                                className={`w-5 h-5 ${postInfo.scraped ? "fill-current text-yellow-400" : "stroke-current text-gray-600 dark:text-gray-300"}`}/>
                            <span className="text-xs">{postInfo.scrapsCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default PostCard
