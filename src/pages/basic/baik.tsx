"use client"

import type React from "react"
import { useState } from "react"
import PostContainer from "../../components/Container"
import { Heart, Users } from "lucide-react"
// import PostCard from "../../components/PostCard"
// import type { PostEntity } from "../../types/PostEntity"

const userInfo = {
    name: "백지헌",
    username:  "baekjiheon",
    role: "Fromis_9 Member",
    profileImageUrl: "cheer/1-7.jpeg?height=150&width=150",
    postsCount: 3,
    followersCount: 13375191,
    followingCount: 454,
    introduce:
        "안녕하세요! 절 찾으셨군요! 혹시 플로버세요? 어서와요~ 노드 이번에 써봤는데 정말 좋더라구요 ㅎㅎ 개발자 분들 고마워요",
}

// const post: PostEntity[] = [
//     {
//         postId: "1",
//         userId: "baekjiheon",
//         title: "오늘의 콘서트 후기",
//         content: "플로버 여러분 정말 감사합니다...",
//         summary: "2024 Fromis_9 콘서트 'PUZZLE PIECE' 후기",
//         userTag: ["#Fromis_9", "#Concert", "#플로버"],
//         createAt: new Date("2025-02-13T10:00:00"),
//         commentsCount: 3521,
//         likesCount: 25631,
//         scrapsCount: 1892,
//         reportsCount: 0,
//         postVisibility: "public" as const,
//         thumbNailImage: "/placeholder.svg?height=200&width=300",
//     },
//     {
//         postId: "2",
//         userId: "baekjiheon",
//         title: "새로운 앨범 준비중!",
//         content: "곧 만나요 플로버~",
//         summary: "Fromis_9 새 앨범 준비 과정",
//         userTag: ["#NewAlbum", "#Comeback", "#Fromis_9"],
//         createAt: new Date("2025-02-12T12:30:00"),
//         commentsCount: 2891,
//         likesCount: 19872,
//         scrapsCount: 1245,
//         reportsCount: 0,
//         postVisibility: "public" as const,
//         thumbNailImage: "/placeholder.svg?height=200&width=300",
//     },
//     {
//         postId: "3",
//         userId: "baekjiheon",
//         title: "코딩 공부 시작했어요",
//         content: "Node.js 정말 재미있네요!",
//         summary: "개발 공부 일지",
//         userTag: ["#Coding", "#NodeJS", "#Developer"],
//         createAt: new Date("2025-02-11T15:45:00"),
//         commentsCount: 1523,
//         likesCount: 12453,
//         scrapsCount: 891,
//         reportsCount: 0,
//         postVisibility: "public" as const,
//         thumbNailImage: "",
//     },
// ]

const Baik: React.FC = () => {
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)

    return (
        <PostContainer>
            <div className="max-w-4xl mx-auto">
                <p className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-100">프로필</p>
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center space-x-6">
                            <img
                                src={userInfo.profileImageUrl || "/placeholder.svg"}
                                alt={userInfo.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-pink-500"
                            />
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold ml-2 text-gray-800 dark:text-gray-100">{userInfo.name}</h1>
                                <p className="text-gray-400 dark:text-gray-300 ml-2">@{userInfo.username}</p>
                                <p className="text-gray-600 dark:text-gray-300 ml-2">{userInfo.role}</p>
                                <div className="flex space-x-4 mt-4 mr-4">
                                    <div className="flex flex-col items-center justify-center cursor-default px-2 py-1">
                                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                                            {userInfo.postsCount.toLocaleString()}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">포스트</p>
                                    </div>
                                    <div
                                        onClick={() => setIsFollowersModalOpen(true)}
                                        className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-xl transition"
                                    >
                                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                                            {userInfo.followersCount.toLocaleString()}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">팔로워</p>
                                    </div>
                                    <div
                                        onClick={() => setIsFollowingModalOpen(true)}
                                        className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-xl transition"
                                    >
                                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                                            {userInfo.followingCount.toLocaleString()}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">팔로잉</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsFollowing(!isFollowing)}
                                className={`px-6 py-2 ${
                                    isFollowing
                                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                        : "bg-pink-500 text-white hover:bg-pink-600"
                                } rounded-full transition-colors flex items-center`}
                            >
                                {isFollowing ? (
                                    <>
                                        <Users size={18} className="mr-2" />
                                        팔로잉
                                    </>
                                ) : (
                                    <>
                                        <Heart size={18} className="mr-2" />
                                        팔로우
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">자기소개</h2>
                            <p className="text-gray-700 dark:text-gray-300">{userInfo.introduce}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">게시물</h2>
                    </div>
                    <div className="space-y-4">
                        {/*{post.map((post) => (*/}
                        {/*    <PostCard key={post.postId} postInfo={post} userInfo={userInfo} />*/}
                        {/*))}*/}
                    </div>
                </div>
            </div>

            <FollowersModal isOpen={isFollowersModalOpen} onClose={() => setIsFollowersModalOpen(false)} />
            <FollowingModal isOpen={isFollowingModalOpen} onClose={() => setIsFollowingModalOpen(false)} />
        </PostContainer>
    )
}

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({
                                                                                                                 isOpen,
                                                                                                                 onClose,
                                                                                                                 title,
                                                                                                                 children,
                                                                                                             }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 dark:bg-black/70 flex">
            <div className="relative p-8 bg-white dark:bg-gray-800 w-full max-w-md m-auto flex-col flex rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

const FollowersModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const followers = [
        { id: 1, name: "이서연", image: "/placeholder.svg?height=50&width=50" },
        { id: 2, name: "장규리", image: "/placeholder.svg?height=50&width=50" },
        { id: 3, name: "이나경", image: "/placeholder.svg?height=50&width=50" },
    ]

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="팔로워">
            <ul className="space-y-4">
                {followers.map((follower) => (
                    <li key={follower.id} className="flex items-center space-x-3">
                        <img src={follower.image || "/placeholder.svg"} alt={follower.name} className="w-10 h-10 rounded-full" />
                        <span className="text-gray-800 dark:text-gray-100">{follower.name}</span>
                    </li>
                ))}
            </ul>
        </Modal>
    )
}

const FollowingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const following = [
        { id: 1, name: "이채영", image: "/placeholder.svg?height=50&width=50" },
        { id: 2, name: "박지원", image: "/placeholder.svg?height=50&width=50" },
        { id: 3, name: "노지선", image: "/placeholder.svg?height=50&width=50" },
    ]

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="팔로잉">
            <ul className="space-y-4">
                {following.map((follow) => (
                    <li key={follow.id} className="flex items-center space-x-3">
                        <img src={follow.image || "/placeholder.svg"} alt={follow.name} className="w-10 h-10 rounded-full" />
                        <span className="text-gray-800 dark:text-gray-100">{follow.name}</span>
                    </li>
                ))}
            </ul>
        </Modal>
    )
}

export default Baik
