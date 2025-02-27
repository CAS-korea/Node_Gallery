"use client"

import React, { useEffect, useState } from "react";
import PostContainer from "../../components/Container.tsx";
import { Heart, Users, MessageSquare } from "lucide-react";
import PostCard from "../../components/PostCard.tsx";
import { useServices } from "../../context/ServicesProvider.tsx";
import { useParams } from "react-router-dom";
import { UserProfileDto, PostCardDto } from "../../types/UserProfileDto.ts";
import { UserService } from "../../services/UserService.ts"; // UserService 임포트 추가

const OthersProfile: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [userProfile, setUserProfile] = useState<UserProfileDto | null>(null);
    const [posts, setPosts] = useState<PostCardDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isLiking, setIsLiking] = useState(false);
    const [isScrapping, setIsScrapping] = useState(false);
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const { likePost, scrapPost, getUserProfile } = useServices();

    const fetchPosts = async () => {
        if (!userId) {
            console.error("userId가 없습니다.");
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const profile = await getUserProfile(userId);
            console.log("Profile data:", profile);
            if (profile) {
                setUserProfile(profile);
                setPosts(profile.postCardDtoList);
                setIsFollowing(profile.followActivityDto.isFollowing);
            } else {
                console.error("프로필 데이터가 없습니다.");
            }
        } catch (error) {
            console.error("프로필 불러오기 실패: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [userId]);

    const handleLikePost = async (postId: string) => {
        setIsLiking(true);
        try {
            await likePost(postId);
            await fetchPosts(); // 좋아요 후 데이터 갱신
        } catch (error) {
            console.error("좋아요 실패: ", error);
        } finally {
            setIsLiking(false);
        }
    };

    const handleScrapPost = async (postId: string) => {
        setIsScrapping(true);
        try {
            await scrapPost(postId);
            await fetchPosts(); // 스크랩 후 데이터 갱신
        } catch (error) {
            console.error("스크랩 실패: ", error);
        } finally {
            setIsScrapping(false);
        }
    };

    const handleFollowToggle = async () => {
        if (!userId) {
            console.error("userId가 없습니다.");
            return;
        }

        try {
            const response = await UserService.followUser(userId); // 팔로우/언팔로우 API 호출
            console.log("Follow toggle response:", response);
            setIsFollowing(!isFollowing); // 현재 상태 토글
            await fetchPosts(); // 최신 프로필 데이터 갱신 (팔로우 상태 반영)
        } catch (error) {
            console.error("팔로우 상태 변경 실패: ", error);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
                <div className="w-16 h-16 border-4 border-black dark:border-white opacity-5 border-t-transparent rounded-full animate-spin"></div>
                <div className="w-30 h-16 px-3 py-5 text-gray-400 dark:text-gray-300">
                    잠시만 기다려주세요!
                </div>
            </div>
        );
    }

    if (!userProfile) return <p>사용자를 찾을 수 없습니다.</p>;

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
                                src={userProfile.userInformationDto.profileImageUrl || "/placeholder.svg"}
                                alt={userProfile.userInformationDto.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                            />
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-bold ml-2 text-gray-800 dark:text-gray-100">
                                    {userProfile.userInformationDto.name}
                                </h1>
                                <p className="text-gray-400 dark:text-gray-300 ml-2">
                                    @{userProfile.userInformationDto.userId}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 ml-2">
                                    {userProfile.userInformationDto.role}
                                </p>
                                <div className="flex space-x-4 mt-4 mr-4">
                                    <div className="flex flex-col items-center justify-center cursor-default px-2 py-1">
                                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                                            {userProfile.userInformationDto.postNumber}
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
                                            {userProfile.userInformationDto.followersCount}
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
                                            {userProfile.userInformationDto.followingCount}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            팔로잉
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleFollowToggle}
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
                                        console.log("DM 버튼 클릭됨");
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
                                {userProfile.userInformationDto.introduce}
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
                            <PostCard
                                key={post.postInfo.postId}
                                postInfo={{
                                    postId: post.postInfo.postId,
                                    title: post.postInfo.title,
                                    summary: post.postInfo.summary,
                                    userTag: post.postInfo.userTag,
                                    likesCount: post.postInfo.likesCount,
                                    scrapsCount: post.postInfo.scrapsCount,
                                    commentsCount: post.postInfo.commentsCount,
                                    createAt: post.postInfo.createAt,
                                    thumbNailImage: post.postInfo.thumbNailImage,
                                }}
                                userInfo={post.userInfo} // role 변환 제거
                                postActivity={{
                                    liked: post.postActivity.liked,
                                    reported: post.postActivity.reported,
                                    scraped: post.postActivity.scraped,
                                }}
                                onLike={() => handleLikePost(post.postInfo.postId)}
                                onScrap={() => handleScrapPost(post.postInfo.postId)}
                                isLiking={isLiking}
                                isScrapping={isScrapping}
                            />
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
    );
};

// Modal, FollowersModal, FollowingModal 컴포넌트는 그대로 유지
const Modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 dark:bg-black/70 flex">
            <div className="relative p-8 bg-white dark:bg-gray-800 w-full max-w-md m-auto flex-col flex rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                {children}
            </div>
        </div>
    );
};

const FollowersModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const followers = [
        { id: 1, name: "이서연", image: "/placeholder.svg?height=50&width=50" },
        { id: 2, name: "장규리", image: "/placeholder.svg?height=50&width=50" },
        { id: 3, name: "이나경", image: "/placeholder.svg?height=50&width=50" },
    ];

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
                        <span className="text-gray-800 dark:text-gray-100">{follower.name}</span>
                    </li>
                ))}
            </ul>
        </Modal>
    );
};

const FollowingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const following = [
        { id: 1, name: "이채영", image: "/placeholder.svg?height=50&width=50" },
        { id: 2, name: "박지원", image: "/placeholder.svg?height=50&width=50" },
        { id: 3, name: "노지선", image: "/placeholder.svg?height=50&width=50" },
    ];

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
                        <span className="text-gray-800 dark:text-gray-100">{follow.name}</span>
                    </li>
                ))}
            </ul>
        </Modal>
    );
};

export default OthersProfile;