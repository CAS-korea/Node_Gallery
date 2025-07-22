// src/components/profile/Profile.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Heart, ImageIcon, Users, X } from "lucide-react";
import PostContainer from "../../components/postcard/Container.tsx";
import PostCard from "../../components/postcard/PostCard.tsx";
import FollowModal from "../../components/profile/FollowModal";


import {
    cardActivityInfo,
    cardPostInfo,
    cardUserInfo,
} from "../../types/PostcardDto";

import { PostCardDto } from "../../types/UserProfileDto";

/* ───────────────────────── 1. 더미 데이터 ───────────────────────── */

const dummyUserInfo = {
    name: "테스트용 더미 계정",
    profileImageUrl: "/mock/node_black.png",
    userId: "dummy123",
    role: "Front‑end Tester",
    introduce: "백엔드 없이도 UI만으로 확인할 수 있는 더미 프로필입니다.",
    postNumber: 2,
    followersCount: 3,
    followingCount: 5,
};

const makePost = (
    id: string,
    title: string,
    visibility: "PUBLIC" | "PRIVATE"
): PostCardDto => ({
    postVisibility: visibility,
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
    userInfo: dummyUserInfo as unknown as cardUserInfo,
    postActivity: { liked: false, scraped: false, reported: false } as cardActivityInfo,
});

const dummyPosts: PostCardDto[] = [
    makePost("1", "프론트 데모용 공개 글", "PUBLIC"),
    makePost("2", "나만 보는 비공개 글", "PRIVATE"),
];

const dummyFollowers = [
    { userId: "f1", name: "Alice", profileImageUrl: "/mock/avatar_alice.png" },
    { userId: "f2", name: "Bob", profileImageUrl: "/mock/avatar_bob.png" },
    { userId: "f3", name: "Charlie", profileImageUrl: "/mock/avatar_charlie.png" },
];

const dummyFollowing = [
    { userId: "u1", name: "Dana", profileImageUrl: "/mock/avatar_dana.png" },
    { userId: "u2", name: "Eve", profileImageUrl: "/mock/avatar_eve.png" },
    { userId: "u3", name: "Frank", profileImageUrl: "/mock/avatar_frank.png" },
    { userId: "u4", name: "Grace", profileImageUrl: "/mock/avatar_grace.png" },
    { userId: "u5", name: "Heidi", profileImageUrl: "/mock/avatar_heidi.png" },
];

/* ───────────────────────── 2. 애니메이션 preset ───────────────────────── */

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

/* ───────────────────────── 3. 컴포넌트 ───────────────────────── */

const Profile: React.FC = () => {
    const [postVisibility, setPostVisibility] =
        useState<"PUBLIC" | "PRIVATE">("PUBLIC");
    const [isFollowersModalOpen, setFollowersModal] = useState(false);
    const [isFollowingModalOpen, setFollowingModal] = useState(false);
    const [isEditModalOpen, setEditModal] = useState(false);

    // 에디터용 로컬 상태
    const [profileImageUrl, setProfileImageUrl] = useState(
        dummyUserInfo.profileImageUrl
    );
    const [editName, setEditName] = useState(dummyUserInfo.name);
    const [editIntro, setEditIntro] = useState(dummyUserInfo.introduce);

    // 좋아요/스크랩 토글은 간단히 로컬 상태만 갱신
    const toggleField =
        (field: "liked" | "scraped") => (postId: string) => {
            dummyPosts.forEach((p) => {
                if (p.postInfo.postId === postId)
                    // @ts-ignore
                    p.postActivity[field] = !p.postActivity[field];
            });
        };

    const filteredPosts = dummyPosts.filter(
        (p) => p.postVisibility === postVisibility
    );

    /* ─────────────────── UI ─────────────────── */

    return (
        <PostContainer>
            <div className="max-w-4xl mx-auto">
                <motion.h1 {...fadeInUp} className="text-3xl font-bold mb-8">
                    내 프로필
                </motion.h1>

                {/* 프로필 카드 */}
                <motion.div {...fadeInUp} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src={profileImageUrl || "/placeholder.svg"}
                                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                            />
                            <div className="ml-4">
                                <h2 className="text-3xl font-bold">{dummyUserInfo.name}</h2>
                                <p className="text-gray-500">@{dummyUserInfo.userId}</p>
                                <p className="text-gray-400">{dummyUserInfo.role}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setEditModal(true)}
                            className="px-6 py-2.5 bg-blue-500 text-white rounded-full flex items-center gap-2"
                        >
                            <Edit2 size={18} /> 프로필 수정
                        </button>
                    </div>

                    {/* 팔로우 숫자 */}
                    <div className="flex justify-around mt-6">
                        <Stat label="포스트" value={dummyUserInfo.postNumber} />
                        <Stat
                            label="팔로워"
                            value={dummyUserInfo.followersCount}
                            onClick={() => setFollowersModal(true)}
                        />
                        <Stat
                            label="팔로잉"
                            value={dummyUserInfo.followingCount}
                            onClick={() => setFollowingModal(true)}
                        />
                    </div>

                    {/* 소개 */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-3">자기소개</h3>
                        <p className="text-gray-600 dark:text-gray-300">{dummyUserInfo.introduce}</p>
                    </div>
                </motion.div>

                {/* 게시물 필터 */}
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">내 게시물</h2>
                        <div className="flex gap-2">
                            {(["PUBLIC", "PRIVATE"] as const).map((v) => (
                                <button
                                    key={v}
                                    onClick={() => setPostVisibility(v)}
                                    className={`px-4 py-2 rounded-full ${
                                        postVisibility === v
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                                    }`}
                                >
                                    {v === "PUBLIC" ? "공개 글" : "비공개 글"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredPosts.length ? (
                        filteredPosts.map((p, idx) => (
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
                        <p className="text-gray-400 text-center">게시물이 없습니다.</p>
                    )}
                </div>
            </div>

            {/* 팔로워/팔로잉 모달 */}
            <AnimatePresence>
                <FollowModal
                    isOpen={isFollowersModalOpen}
                    onClose={() => setFollowersModal(false)}
                    title="팔로워"
                    users={dummyFollowers}
                />
                <FollowModal
                    isOpen={isFollowingModalOpen}
                    onClose={() => setFollowingModal(false)}
                    title="팔로잉"
                    users={dummyFollowing}
                />

                {/* 프로필 수정 모달 */}
                {isEditModalOpen && (
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                            <div className="flex justify-between mb-6">
                                <h2 className="text-xl font-bold">프로필 수정</h2>
                                <button
                                    onClick={() => setEditModal(false)}
                                    className="text-gray-500 hover:bg-gray-100 rounded-full p-2"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* 간단 편집 폼 → 로컬 상태만 변경 */}
                            <form
                                className="space-y-4"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    dummyUserInfo.name = editName;
                                    dummyUserInfo.introduce = editIntro;
                                    setEditModal(false);
                                }}
                            >
                                <Input
                                    label="이름"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <Textarea
                                    label="자기소개"
                                    value={editIntro}
                                    onChange={(e) => setEditIntro(e.target.value)}
                                />

                                {/* 이미지 업로드 생략 — 데모용 */}
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setEditModal(false)}
                                        className="px-4 py-2 bg-gray-200 rounded"
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        저장
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PostContainer>
    );
};

/* ───────────────────────── 헬퍼 컴포넌트 ───────────────────────── */

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
            onClick ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-xl" : ""
        }`}
    >
        <p className="font-semibold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
    </div>
);

const Input = ({
                   label,
                   value,
                   onChange,
               }: {
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <input
            value={value}
            onChange={onChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        />
    </div>
);

const Textarea = ({
                      label,
                      value,
                      onChange,
                  }: {
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <textarea
            rows={3}
            value={value}
            onChange={onChange}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        />
    </div>
);

export default Profile;
