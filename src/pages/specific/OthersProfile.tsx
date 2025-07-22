// src/pages/specific/OthersProfile.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, MessageSquare } from "lucide-react";

import PostContainer from "../../components/postcard/Container";
import PostCard from "../../components/postcard/PostCard";
import FollowModal from "../../components/profile/FollowModal";

import {
    cardActivityInfo,
    cardPostInfo,
    cardUserInfo,
} from "../../types/PostcardDto";

/* ───────────── 1. 더미 데이터 ───────────── */

const makeUser = (
    id: string,
    name: string,
    role: "PROFESSOR" | "STUDENT" | "RESEARCHER",
    img: string
): cardUserInfo => ({
    userId: id,
    name,
    role,
    profileImageUrl: img,
});

const makePost = (
    uid: string,
    id: string,
    title: string,
    user: cardUserInfo
) => ({
    postVisibility: "PUBLIC" as const,
    postInfo: {
        postId: id,
        title,
        summary: "더미 게시물입니다.",
        userTag: ["#Dummy"],
        likesCount: 0,
        scrapsCount: 0,
        commentsCount: 0,
        createAt: "2025‑07‑22T00:00:00Z",
    } as cardPostInfo,
    userInfo: user,
    postActivity: {
        liked: false,
        scraped: false,
        reported: false,
    } as cardActivityInfo,
});

const prof = makeUser(
    "kimafganta1",
    "김아프간타1",
    "PROFESSOR",
    "../kimafganta.png"
);
const student = makeUser(
    "kimafganta2",
    "김아프간타2",
    "STUDENT",
    "../kimafganta.png"
);
const researcher = makeUser(
    "kimafganta3",
    "김아프간타3",
    "RESEARCHER",
    "../kimafganta.png"
);

export const dummyDB = {
    kimafganta1: {
        profile: {
            userInformationDto: {
                ...prof,
                introduce: "AI Lab 교수 김아프간타1입니다.",
                postNumber: 2,
                followersCount: 5,
                followingCount: 1,
            },
            postCardDtoList: [
                makePost("kimafganta1", "11", "교수님의 글 1", prof),
                makePost("kimafganta1", "12", "교수님의 글 2", prof),
            ],
        },
        followers: [student, researcher],
        following: [student],
    },

    kimafganta2: {
        profile: {
            userInformationDto: {
                ...student,
                introduce: "김아프간타2, 컴공 학부생입니다.",
                postNumber: 1,
                followersCount: 2,
                followingCount: 3,
            },
            postCardDtoList: [makePost("kimafganta2", "21", "학생의 글 1", student)],
        },
        followers: [prof],
        following: [prof, researcher],
    },

    kimafganta3: {
        profile: {
            userInformationDto: {
                ...researcher,
                introduce: "김아프간타3, 석사 과정 연구원.",
                postNumber: 0,
                followersCount: 0,
                followingCount: 1,
            },
            postCardDtoList: [],
        },
        followers: [],
        following: [prof],
    },
} as const;

/* ───────────── 2. 애니메이션 preset ───────────── */

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

/* ───────────── 3. 컴포넌트 ───────────── */

const OthersProfile: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();

    const defaultKey = "kimafganta1" as keyof typeof dummyDB;
    const [profile, setProfile] = useState(dummyDB[defaultKey].profile);
    const [followers, setFollowers] = useState(dummyDB[defaultKey].followers);
    const [following, setFollowing] = useState(dummyDB[defaultKey].following);
    const [isFollowing, setIsFollowing] = useState(false);

    const [followersOpen, setFollowersOpen] = useState(false);
    const [followingOpen, setFollowingOpen] = useState(false);

    /* 좋아요·스크랩 로컬 토글 */
    const toggleField =
        (field: "liked" | "scraped") => (postId: string) => {
            setProfile((prev) => ({
                ...prev,
                postCardDtoList: prev.postCardDtoList.map((p) =>
                    p.postInfo.postId === postId
                        ? {
                            ...p,
                            postActivity: {
                                ...p.postActivity,
                                [field]: !p.postActivity[field],
                            },
                        }
                        : p
                ),
            }));
        };

    /* 더미 “API” fetch */
    useEffect(() => {
        const key = (userId as keyof typeof dummyDB) ?? defaultKey;
        const user = dummyDB[key] ?? dummyDB[defaultKey];

        setProfile(user.profile);
        setFollowers(user.followers);
        setFollowing(user.following);
        setIsFollowing(false);
    }, [userId]);

    if (!profile)
        return (
            <div className="min-h-screen flex items-center justify-center">
                사용자를 찾을 수 없습니다
            </div>
        );

    /* ───────────── 렌더 ───────────── */

    return (
        <PostContainer>
            <div className="max-w-4xl mx-auto">
                <motion.h1 {...fadeInUp} className="text-3xl font-bold mb-8">
                    프로필
                </motion.h1>

                {/* 프로필 카드 */}
                <motion.div
                    {...fadeInUp}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8"
                >
                    <HeaderSection
                        profile={profile}
                        isFollowing={isFollowing}
                        onFollow={() => setIsFollowing((p) => !p)}
                    />

                    <Stats
                        profile={profile}
                        openFollowers={() => setFollowersOpen(true)}
                        openFollowing={() => setFollowingOpen(true)}
                    />

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-3">자기소개</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {profile.userInformationDto.introduce}
                        </p>
                    </div>
                </motion.div>

                {/* 게시물 리스트 */}
                <div className="mt-8 space-y-6">
                    <h2 className="text-2xl font-bold">게시물</h2>
                    {profile.postCardDtoList.length ? (
                        profile.postCardDtoList.map((p, idx) => (
                            <motion.div
                                key={p.postInfo.postId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <PostCard
                                    postInfo={p.postInfo}
                                    userInfo={p.userInfo}
                                    postActivity={p.postActivity}
                                    onLike={toggleField("liked")}
                                    onScrap={toggleField("scraped")}
                                    isLiking={false}
                                    isScrapping={false}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center">
                            이 유저는 게시물이 없습니다.
                        </p>
                    )}
                </div>
            </div>

            {/* 팔로워/팔로잉 모달 */}
            <AnimatePresence>
                <FollowModal
                    isOpen={followersOpen}
                    onClose={() => setFollowersOpen(false)}
                    title="팔로워"
                    users={followers}
                />
                <FollowModal
                    isOpen={followingOpen}
                    onClose={() => setFollowingOpen(false)}
                    title="팔로잉"
                    users={following}
                />
            </AnimatePresence>
        </PostContainer>
    );
};

/* ───────────── Sub‑components ───────────── */

const HeaderSection = ({
                           profile,
                           isFollowing,
                           onFollow,
                       }: {
    profile: any;
    isFollowing: boolean;
    onFollow: () => void;
}) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center">
            <img
                src={profile.userInformationDto.profileImageUrl}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            />
            <div className="ml-4">
                <h2 className="text-3xl font-bold">
                    {profile.userInformationDto.name}
                </h2>
                <p className="text-gray-500">@{profile.userInformationDto.userId}</p>
                <p className="text-gray-400">{profile.userInformationDto.role}</p>
            </div>
        </div>

        <div className="flex gap-4">
            <button
                onClick={onFollow}
                className={`px-6 py-2.5 rounded-full flex items-center gap-2 ${
                    isFollowing
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        : "bg-blue-500 text-white"
                }`}
            >
                {isFollowing ? <Users size={18} /> : <Heart size={18} />}
                {isFollowing ? "팔로잉" : "팔로우"}
            </button>
            <button className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full flex items-center gap-2">
                <MessageSquare size={18} /> DM
            </button>
        </div>
    </div>
);

const Stats = ({
                   profile,
                   openFollowers,
                   openFollowing,
               }: {
    profile: any;
    openFollowers: () => void;
    openFollowing: () => void;
}) => (
    <div className="flex justify-around mt-6">
        <Stat label="포스트" value={profile.userInformationDto.postNumber} />
        <Stat
            label="팔로워"
            value={profile.userInformationDto.followersCount}
            onClick={openFollowers}
        />
        <Stat
            label="팔로잉"
            value={profile.userInformationDto.followingCount}
            onClick={openFollowing}
        />
    </div>
);

const Stat = ({
                  label,
                  value,
                  onClick,
              }: {
    label: string;
    value: number;
    onClick?: () => void;
}) => (
    <div
        onClick={onClick}
        className={`flex flex-col items-center ${
            onClick
                ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-1 rounded-xl"
                : ""
        }`}
    >
        <p className="font-semibold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
    </div>
);

export default OthersProfile;
