"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Users, MessageSquare, X } from "lucide-react"
import PostContainer from "../../components/Container"
import PostCard from "../../components/PostCard"
import type { cardActivityInfo, cardPostInfo, cardUserInfo } from "../../types/PostcardDto"
import type { UserInfoDto } from "../../types/UserInfoDto"
import { useServices } from "../../context/ServicesProvider"
import {ClientUrl} from "../../constants/ClientUrl.ts";

const OthersProfile: React.FC = () => {
    const { userId } = useParams<{ userId: string }>()
    const [userInfo, setUserInfo] = useState<UserInfoDto>()
    const [posts, setPosts] = useState<
        {
            postInfo: cardPostInfo
            userInfo: cardUserInfo
            postActivity: cardActivityInfo
        }[]
    >([])

    const [loading, setLoading] = useState<boolean>(true)
    const [isLiking, setIsLiking] = useState(false)
    const [isScrapping, setIsScrapping] = useState(false)
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)

    const { getAllPosts, likePost, scrapPost, getUserInfo } = useServices()

    const fetchPosts = async () => {
        if (!userId) return

        setLoading(true)
        try {
            const fetchedUserInfo = await getUserInfo(userId)
            const allPosts = await getAllPosts()
            if (Array.isArray(allPosts)) {
                setPosts(allPosts)
            } else {
                console.error("Invalid response format:", allPosts)
                setPosts([])
            }
            setUserInfo(fetchedUserInfo)
        } catch (error) {
            console.error("Failed to fetch posts:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [userId])

    const handleLikePost = async (postId: string) => {
        if (isLiking) return
        setIsLiking(true)
        try {
            await likePost(postId)
            fetchPosts()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLiking(false)
        }
    }

    const handleScrapPost = async (postId: string) => {
        if (isScrapping) return
        setIsScrapping(true)
        try {
            await scrapPost(postId)
            fetchPosts()
        } catch (error) {
            console.error(error)
        } finally {
            setIsScrapping(false)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <div className="mt-4 text-gray-600 dark:text-gray-300 font-medium">잠시만 기다려주세요!</div>
            </div>
        )
    }

    if (!userInfo) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">사용자를 찾을 수 없습니다</h2>
                    <p className="text-gray-600 dark:text-gray-400">요청하신 사용자가 존재하지 않거나 삭제되었습니다.</p>
                </div>
            </div>
        )
    }

    return (
        <PostContainer>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                    {/* Profile Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">프로필</h1>
                    </div>

                    {/* Profile Card */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                        <div className="p-8">
                            {/* Section 1: 프로필 이미지, 사용자 정보, 팔로우 버튼 */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img
                                        src={userInfo.profileImageUrl || "/placeholder.svg"}
                                        alt={userInfo.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                                    />
                                    <div className="ml-4">
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{userInfo.name}</h2>
                                        <p className="text-gray-600 dark:text-gray-300">@{userId}</p>
                                        <p className="text-gray-500 dark:text-gray-400">{userInfo.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setIsFollowing(!isFollowing)}
                                        className={`px-6 py-2.5 rounded-full transition-all duration-200 font-medium ${
                                            isFollowing
                                                ? "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                                        } flex items-center gap-2`}
                                    >
                                        {isFollowing ? (
                                            <>
                                                <Users size={18} />
                                                팔로잉
                                            </>
                                        ) : (
                                            <>
                                                <Heart size={18} />
                                                팔로우
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => {
                                            // DM 기능 구현
                                        }}
                                        className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-all duration-200 font-medium flex items-center gap-2"
                                    >
                                        <MessageSquare size={18} />
                                        DM
                                    </button>
                                </div>
                            </div>

                            {/* Section 2: 통계 (포스트, 팔로워, 팔로잉) */}
                            <div className="flex justify-around mt-6">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                                        {posts.length}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">포스트</p>
                                </div>
                                <button
                                    onClick={() => setIsFollowersModalOpen(true)}
                                    className="flex flex-col items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-1 rounded-xl transition"
                                >
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                                        {userInfo.followersCount || "2,024"}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">팔로워</p>
                                </button>
                                <button
                                    onClick={() => setIsFollowingModalOpen(true)}
                                    className="flex flex-col items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-1 rounded-xl transition"
                                >
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                                        {userInfo.followingCount || "1,223"}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">팔로잉</p>
                                </button>
                            </div>

                            {/* Section 3: 자기소개 */}
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">자기소개</h3>
                                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                    {userInfo.introduce}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Posts Section */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">게시물</h2>
                        <div className="grid gap-6">
                            {posts.map(({ postInfo, userInfo, postActivity }, index) => (
                                <motion.div
                                    key={postInfo.postId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <PostCard
                                        postInfo={postInfo}
                                        userInfo={userInfo}
                                        postActivity={postActivity}
                                        onLike={() => handleLikePost(postInfo.postId)}
                                        onScrap={() => handleScrapPost(postInfo.postId)}
                                        isLiking={isLiking}
                                        isScrapping={isScrapping}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {isFollowersModalOpen && (
                    <Modal isOpen={true} onClose={() => setIsFollowersModalOpen(false)} title="팔로워">
                        <ul className="space-y-4">
                            {[
                                { id: 1, name: "홍길동", image: "/placeholder.svg?height=50&width=50" },
                                { id: 2, name: "김철수", image: "/placeholder.svg?height=50&width=50" },
                                { id: 3, name: "이영희", image: "/placeholder.svg?height=50&width=50" },
                            ].map((follower) => (
                                <motion.li
                                    key={follower.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-center space-x-3"
                                >
                                    <img
                                        src={follower.image || "/placeholder.svg"}
                                        alt={follower.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span className="text-gray-800 dark:text-gray-100">{follower.name}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </Modal>
                )}

                {isFollowingModalOpen && (
                    <Modal isOpen={true} onClose={() => setIsFollowingModalOpen(false)} title="팔로잉">
                        <ul className="space-y-4">
                            {[
                                { id: 1, name: "박지성", image: "/placeholder.svg?height=50&width=50" },
                                { id: 2, name: "손흥민", image: "/placeholder.svg?height=50&width=50" },
                                { id: 3, name: "김연아", image: "/placeholder.svg?height=50&width=50" },
                            ].map((follow) => (
                                <motion.li
                                    key={follow.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-center space-x-3"
                                >
                                    <img
                                        src={follow.image || "/placeholder.svg"}
                                        alt={follow.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span className="text-gray-800 dark:text-gray-100">{follow.name}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </Modal>
                )}
            </AnimatePresence>
        </PostContainer>
    )
}

// 재사용 Modal 컴포넌트
const Modal: React.FC<{
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
}> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>
                    {children}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default OthersProfile
