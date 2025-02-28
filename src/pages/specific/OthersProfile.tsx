"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, MessageSquare, X } from "lucide-react";
import PostContainer from "../../components/Container";
import PostCard from "../../components/PostCard";
import { useServices } from "../../context/ServicesProvider";
import { UserService } from "../../services/UserService";
import { UserProfileDto, PostCardDto } from "../../types/UserProfileDto";

// 애니메이션 설정: 부드러운 페이드 인 및 슬라이드 업 효과
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

// 모달 애니메이션 설정: 등장 및 사라짐 효과
const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

const OthersProfile: React.FC = () => {
    const { userId } = useParams<{ userId: string }>(); // URL에서 사용자 ID 가져오기
    const [userProfile, setUserProfile] = useState<UserProfileDto | null>(null); // 사용자 프로필 상태
    const [posts, setPosts] = useState<PostCardDto[]>([]); // 게시물 목록 상태
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
    const [isLiking, setIsLiking] = useState(false); // 좋아요 처리 중 상태
    const [isScrapping, setIsScrapping] = useState(false); // 스크랩 처리 중 상태
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false); // 팔로워 모달 상태
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false); // 팔로잉 모달 상태
    const [isFollowing, setIsFollowing] = useState(false); // 팔로우 여부 상태

    const { likePost, scrapPost, getUserProfile } = useServices(); // 서비스 컨텍스트에서 API 함수 가져오기

    // 사용자 프로필과 게시물을 한 번에 가져오는 함수
    const fetchPosts = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const profile = await getUserProfile(userId); // API 호출로 프로필과 게시물 가져오기
            if (profile) {
                setUserProfile(profile);
                setPosts(profile.postCardDtoList); // 프로필에 포함된 게시물 설정
                setIsFollowing(profile.followActivityDto.isFollowing); // 팔로우 상태 설정
            }
        } catch (error) {
            console.error("프로필 불러오기 실패: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(); // 컴포넌트 마운트 시 데이터 가져오기
    }, [userId]);

    // 팔로우/언팔로우 토글 함수
    const handleFollowToggle = async () => {
        if (!userId) return;
        try {
            await UserService.followUser(userId); // 팔로우 상태 변경 API 호출
            setIsFollowing(!isFollowing); // 로컬 상태 업데이트
            await fetchPosts(); // 데이터 갱신
        } catch (error) {
            console.error("팔로우 실패: ", error);
        }
    };

    // 게시물 좋아요 처리 함수
    const handleLikePost = async (postId: string) => {
        if (isLiking) return; // 중복 요청 방지
        setIsLiking(true);
        try {
            await likePost(postId); // 좋아요 API 호출
            await fetchPosts(); // 데이터 갱신
        } catch (error) {
            console.error("좋아요 실패: ", error);
        } finally {
            setIsLiking(false);
        }
    };

    // 게시물 스크랩 처리 함수
    const handleScrapPost = async (postId: string) => {
        if (isScrapping) return; // 중복 요청 방지
        setIsScrapping(true);
        try {
            await scrapPost(postId); // 스크랩 API 호출
            await fetchPosts(); // 데이터 갱신
        } catch (error) {
            console.error("스크랩 실패: ", error);
        } finally {
            setIsScrapping(false);
        }
    };

    // 로딩 중 UI
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">잠시만 기다려주세요!</p>
            </div>
        );
    }

    // 프로필 데이터가 없는 경우 UI
    if (!userProfile) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">사용자를 찾을 수 없습니다</p>
            </div>
        );
    }

    // 메인 프로필 및 게시물 UI
    return (
        <PostContainer>
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* 프로필 제목 */}
                <motion.h1 {...fadeInUp} className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    프로필
                </motion.h1>

                {/* 프로필 정보 섹션 */}
                <motion.div {...fadeInUp} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src={userProfile.userInformationDto.profileImageUrl || "/placeholder.svg"}
                                alt={userProfile.userInformationDto.name}
                                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                            />
                            <div className="ml-4">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                    {userProfile.userInformationDto.name}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">@{userId}</p>
                                <p className="text-gray-500 dark:text-gray-400">{userProfile.userInformationDto.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* 팔로우/언팔로우 버튼 */}
                            <button
                                onClick={handleFollowToggle}
                                className={`px-6 py-2.5 rounded-full transition-all duration-200 font-medium ${
                                    isFollowing
                                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                                        : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600"
                                } flex items-center gap-2`}
                            >
                                {isFollowing ? (
                                    <>
                                        <Users size={18} /> 팔로잉
                                    </>
                                ) : (
                                    <>
                                        <Heart size={18} /> 팔로우
                                    </>
                                )}
                            </button>
                            {/* DM 버튼 (미구현) */}
                            <button
                                onClick={() => {
                                    /* DM 기능 구현 필요 */
                                }}
                                className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-all duration-200 font-medium flex items-center gap-2"
                            >
                                <MessageSquare size={18} /> DM
                            </button>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">자기소개</h3>
                        <p className="text-gray-600 dark:text-gray-300">{userProfile.userInformationDto.introduce}</p>
                    </div>
                </motion.div>

                {/* 게시물 섹션 */}
                <div className="mt-8 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">게시물</h2>
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.postInfo.postId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <PostCard
                                postInfo={post.postInfo}
                                userInfo={post.userInfo}
                                postActivity={post.postActivity}
                                onLike={() => handleLikePost(post.postInfo.postId)}
                                onScrap={() => handleScrapPost(post.postInfo.postId)}
                                isLiking={isLiking}
                                isScrapping={isScrapping}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 팔로워/팔로잉 모달 */}
            <AnimatePresence>
                {isFollowersModalOpen && (
                    <Modal isOpen={true} onClose={() => setIsFollowersModalOpen(false)} title="팔로워">
                        <ul className="space-y-4">
                            {/* 실제 데이터는 API에서 가져와야 함 */}
                            {[
                                { id: 1, name: "이서연", image: "/placeholder.svg?height=50&width=50" },
                                { id: 2, name: "장규리", image: "/placeholder.svg?height=50&width=50" },
                            ].map((follower) => (
                                <motion.li
                                    key={follower.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-center space-x-3"
                                >
                                    <img src={follower.image || "/placeholder.svg"} alt={follower.name} className="w-10 h-10 rounded-full object-cover" />
                                    <span className="text-gray-800 dark:text-gray-100">{follower.name}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </Modal>
                )}
                {isFollowingModalOpen && (
                    <Modal isOpen={true} onClose={() => setIsFollowingModalOpen(false)} title="팔로잉">
                        <ul className="space-y-4">
                            {/* 실제 데이터는 API에서 가져와야 함 */}
                            {[
                                { id: 1, name: "이채영", image: "/placeholder.svg?height=50&width=50" },
                                { id: 2, name: "박지원", image: "/placeholder.svg?height=50&width=50" },
                            ].map((follow) => (
                                <motion.li
                                    key={follow.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-center space-x-3"
                                >
                                    <img src={follow.image || "/placeholder.svg"} alt={follow.name} className="w-10 h-10 rounded-full object-cover" />
                                    <span className="text-gray-800 dark:text-gray-100">{follow.name}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </Modal>
                )}
            </AnimatePresence>
        </PostContainer>
    );
};

// 재사용 가능한 모달 컴포넌트
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({
                                                                                                                 isOpen,
                                                                                                                 onClose,
                                                                                                                 title,
                                                                                                                 children,
                                                                                                             }) => {
    if (!isOpen) return null;
    return (
        <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:bg-gray-100 rounded-full p-2">
                        <X size={20} />
                    </button>
                </div>
                {children}
            </div>
        </motion.div>
    );
};

export default OthersProfile;
