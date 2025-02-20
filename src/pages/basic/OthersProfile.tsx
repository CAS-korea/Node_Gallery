"use client"

import type React from "react"
import { useState } from "react"
import PostContainer from "../../components/Container"
import { Heart, Users, MessageSquare } from "lucide-react"
import PostCard from "../../components/PostCard"
import type { PostEntity } from "../../types/PostEntity"

const userInfo = {
    name: "김아프간타(진)",
    username: "africanta",
    role: "PROFESSOR",
    profileImageUrl: "/kimafganta.png?height=150&width=150",
    postsCount: 3,
    followersCount: 13,
    followingCount: 454,
    introduce: `
    중앙관리본부 개발 담당 인턴이지만 사실 우수 연구원으로써 대한민국에 굉장히 많은 기여를 하고 있습니다. 
    모두가 더 나은 개발자/연구원이 되시길 바라며, 무료로 제 연구 결과를 포스트하겠습니다.
    
1. 2020 대한민국 우수 연구자상
2. 2020 글로벌 학술 우수상
3. 2021 혁신 기술 개발상
4. 2021 국제 학술대회 우수 발표상
5. 2022 컴퓨팅 혁신상
6. 2022 연구 논문 최우수상
7. 2022 우수 교수상
8. 2023 미래 기술 선도상
9. 2023 글로벌 네트워킹상
10. 2023 학술 공로상
11. 2023 최우수 연구 성과상
12. 2024 국제 연구 협력상
13. 2024 학계 공헌상
14. 2024 혁신 교육상
15. 2024 최우수 논문상
16. 2025 글로벌 혁신상
17. 2025 미래 연구상
18. 2025 학문 발전상
19. 2025 우수 연구 프로젝트상
20. 2025 기술 리더십상
21. 2025 학술상
22. 2025 디지털 혁신상
23. 2025 교육 혁신상
24. 2025 우수 강의상
25. 2025 연구개발 우수상
26. 2025 학술 네트워크상
27. 2025 혁신 교수상
28. 2025 기술 발전상
29. 2025 국제 컨퍼런스상
30. 2025 최우수 기술상
    `.trim(),
}

const posts: PostEntity[] = [
    {
        postId: "1",
        userId: "africanta",
        title: "국제 학술대회 발표 후기",
        content:
            "지난 2025년 XX국에서 열린 국제 학술대회에서 최신 연구 결과를 발표하였습니다. 혁신적인 연구 동향과 실제 사례를 공유하며 많은 학자들과 네트워킹할 수 있었습니다.",
        summary: "국제 학술대회에서 발표한 연구 성과를 소개합니다.",
        userTag: ["#학술대회", "#연구발표", "#혁신"],
        createAt: new Date("2025-02-13T10:00:00"),
        commentsCount: 152,
        likesCount: 241,
        scrapsCount: 18,
        reportsCount: 0,
        postVisibility: "public" as const,
        thumbNailImage: "/placeholder.svg?height=200&width=300",
    },
    {
        postId: "2",
        userId: "africanta",
        title: "최신 연구 논문 출판 안내",
        content:
            "저의 최신 연구 논문이 국제 저명 학술지에 게재되었습니다. 이번 논문에서는 혁신적인 데이터 분석 기법과 인공지능(AI) 기술을 접목해 학계에 새로운 시각을 제시하였습니다.",
        summary: "최신 연구 논문 출판 및 주요 성과 안내",
        userTag: ["#논문", "#연구", "#AI", "#데이터분석"],
        createAt: new Date("2025-02-12T12:30:00"),
        commentsCount: 98,
        likesCount: 189,
        scrapsCount: 12,
        reportsCount: 0,
        postVisibility: "public" as const,
        thumbNailImage: "/placeholder.svg?height=200&width=300",
    },
    {
        postId: "3",
        userId: "africanta",
        title: "기술 워크숍 및 세미나 개최",
        content:
            "최근 교수진과 연구진이 함께한 기술 워크숍을 성공적으로 개최하였습니다. 이번 행사는 최신 연구 동향, 기술 응용 사례, 그리고 미래 발전 방향에 대해 심도 깊은 논의가 이루어졌습니다.",
        summary: "기술 워크숍 개최 소식과 세미나 후기",
        userTag: ["#워크숍", "#세미나", "#기술", "#연구"],
        createAt: new Date("2025-02-11T15:45:00"),
        commentsCount: 76,
        likesCount: 134,
        scrapsCount: 9,
        reportsCount: 0,
        postVisibility: "public" as const,
        thumbNailImage: "",
    },
]

const OthersProfile: React.FC = () => {
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)

    return (
        <PostContainer>
            <div className="max-w-4xl mx-auto">
                <p className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-100">
                    프로필
                </p>
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-center space-x-6">
                            <img
                                src={userInfo.profileImageUrl || "/placeholder.svg"}
                                alt={userInfo.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                            />
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold ml-2 text-gray-800 dark:text-gray-100">
                                    {userInfo.name}
                                </h1>
                                <p className="text-gray-400 dark:text-gray-300 ml-2">
                                    @{userInfo.username}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 ml-2">
                                    {userInfo.role}
                                </p>
                                <div className="flex space-x-4 mt-4 mr-4">
                                    <div className="flex flex-col items-center justify-center cursor-default px-2 py-1">
                                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                                            {userInfo.postsCount.toLocaleString()}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            포스트
                                        </p>
                                    </div>
                                    <div
                                        onClick={() => setIsFollowersModalOpen(true)}
                                        className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-xl transition"
                                    >
                                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                                            {userInfo.followersCount.toLocaleString()}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            팔로워
                                        </p>
                                    </div>
                                    <div
                                        onClick={() => setIsFollowingModalOpen(true)}
                                        className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-xl transition"
                                    >
                                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                                            {userInfo.followingCount.toLocaleString()}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            팔로잉
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setIsFollowing(!isFollowing)}
                                    className={`px-6 py-2 ${
                                        isFollowing
                                            ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                            : "bg-indigo-500 text-white hover:bg-indigo-600"
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
                                <button
                                    onClick={() => {
                                        // DM 버튼 클릭 시 동작 구현
                                    }}
                                    className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-full transition-colors flex items-center"
                                >
                                    <MessageSquare size={18} className="mr-2" />
                                    DM
                                </button>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                                자기소개 및 수상 기록
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                {userInfo.introduce}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            게시물
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <PostCard key={post.postId} post={post} />
                        ))}
                    </div>
                </div>
            </div>

            <FollowersModal
                isOpen={isFollowersModalOpen}
                onClose={() => setIsFollowersModalOpen(false)}
            />
            <FollowingModal
                isOpen={isFollowingModalOpen}
                onClose={() => setIsFollowingModalOpen(false)}
            />
        </PostContainer>
    )
}

const Modal: React.FC<{
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
}> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 dark:bg-black/70 flex">
            <div className="relative p-8 bg-white dark:bg-gray-800 w-full max-w-md m-auto flex-col flex rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        {title}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

const FollowersModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
                                                                                isOpen,
                                                                                onClose,
                                                                            }) => {
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
                        <img
                            src={follower.image || "/placeholder.svg"}
                            alt={follower.name}
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="text-gray-800 dark:text-gray-100">
                            {follower.name}
                        </span>
                    </li>
                ))}
            </ul>
        </Modal>
    )
}

const FollowingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
                                                                                isOpen,
                                                                                onClose,
                                                                            }) => {
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
                        <img
                            src={follow.image || "/placeholder.svg"}
                            alt={follow.name}
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="text-gray-800 dark:text-gray-100">
                            {follow.name}
                        </span>
                    </li>
                ))}
            </ul>
        </Modal>
    )
}

export default OthersProfile
