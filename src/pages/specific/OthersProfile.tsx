"use client"

import React, {useEffect} from "react"
import { useState } from "react"
import PostContainer from "../../components/Container.tsx"
import { Heart, Users, MessageSquare } from "lucide-react"
import PostCard from "../../components/PostCard.tsx"
import {cardActivityInfo, cardPostInfo, cardUserInfo} from "../../types/PostcardDto.ts";
import {useServices} from "../../context/ServicesProvider.tsx";
import {UserInfoDto} from "../../types/UserInfoDto.ts";
import {useParams} from "react-router-dom";

const OthersProfile: React.FC = () => {
    const {userId} = useParams<{ userId: string }>();
    const [userInfo, setUserInfo] = useState<UserInfoDto>();

    const [posts, setPosts] = useState<{
        postInfo: cardPostInfo,
        userInfo: cardUserInfo,
        postActivity: cardActivityInfo
    }[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [isLiking, setIsLiking] = useState(false);
    const [isScrapping, setIsScrapping] = useState(false);

    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const {getAllPosts, likePost, scrapPost, getUserInfo} = useServices();

    const fetchPosts = async () => {
        if (!userId) return;

        setLoading(true);
        try {
            const userInfo = await getUserInfo(userId);
            const allPosts = await getAllPosts();
            if (Array.isArray(allPosts)) {
                // const userPosts = allPosts.filter((post) => post.userInfo.userId === userId);
                setPosts(allPosts);  // 정상적인 배열이면 상태 업데이트
            } else {
                console.error("제대로 된 반환값이 아닙니다: ", allPosts);
                setPosts([]);  // 예외 처리 (빈 배열 할당)
            }
            setUserInfo(userInfo);
            console.log(userInfo);
        } catch (error) {
            console.error("게시물 불러오기 실패: ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleLikePost = async (postId: string) => {
        setIsLiking(true);
        try {
            await likePost(postId);
            fetchPosts();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLiking(false);
        }
    };

    const handleScrapPost = async (postId: string) => {
        setIsScrapping(true);
        try {
            await scrapPost(postId);
            fetchPosts();
        } catch (error) {
            console.error(error);
        } finally {
            setIsScrapping(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
                <div
                    className="w-16 h-16 border-4 border-black dark:border-white opacity-5 border-t-transparent rounded-full animate-spin"></div>
                <div className="w-30 h-16 px-3 py-5 text-gray-400 dark:text-gray-300">
                    잠시만 기다려주세요!
                </div>
            </div>
        );
    }
    if (!userInfo) return <p>사용자를 찾을 수 없습니다.</p>;

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
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-bold ml-2 text-gray-800 dark:text-gray-100">
                                    {userInfo.name}
                                </h1>
                                <p className="text-gray-400 dark:text-gray-300 ml-2">
                                    @{userId}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 ml-2">
                                    {userInfo.role}
                                </p>
                                <div className="flex space-x-4 mt-4 mr-4">
                                    <div className="flex flex-col items-center justify-center cursor-default px-2 py-1">
                                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                                            {posts.length}
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
                                            {/*{userInfo.followersCount.toLocaleString()}*/}
                                            2024
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
                                            {/*{userInfo.followingCount.toLocaleString()}*/}
                                            1223
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
                        {posts.map(({ postInfo, userInfo, postActivity}) => (
                            <PostCard key={postInfo.postId} postInfo={postInfo} userInfo={userInfo} postActivity={postActivity} onLike={() => handleLikePost(postInfo.postId)} onScrap={() => handleScrapPost(postInfo.postId)} isLiking={isLiking} isScrapping={isScrapping} />
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
