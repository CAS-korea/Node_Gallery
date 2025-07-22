import React, { useEffect, useState } from "react";
import PostCard from "../../components/postcard/PostCard";
import PostContainer from "../../components/postcard/Container";
import PostGridView from "../../components/postcard/PostGridView";
import LayoutToggleButton from "../../components/postcard/HomeLayoutButton";

import {
    cardActivityInfo,
    cardPostInfo,
    cardUserInfo,
} from "../../types/PostcardDto";
import { fetchMockPosts } from "../../api/mockPosts.ts";

type Card = {
    postInfo: cardPostInfo;
    userInfo: cardUserInfo;
    postActivity: cardActivityInfo;
};

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [layoutMode, setLayoutMode] = useState<"scroll" | "grid">("scroll");

    // ───────────────────────────────── fetch
    useEffect(() => {
        (async () => {
            try {
                const data = await fetchMockPosts();
                setPosts(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // ───────────────────────────────── 로컬 상태로 좋아요/스크랩 토글
    const toggleField =
        (field: "liked" | "scraped", countField: "likesCount" | "scrapsCount") =>
            (postId: string) =>
                setPosts((prev) =>
                    prev.map((p) =>
                        p.postInfo.postId === postId
                            ? {
                                ...p,
                                postActivity: { ...p.postActivity, [field]: !p.postActivity[field] },
                                postInfo: {
                                    ...p.postInfo,
                                    [countField]:
                                        p.postInfo[countField] + (p.postActivity[field] ? -1 : 1),
                                },
                            }
                            : p
                    )
                );

    const handleLikePost = toggleField("liked", "likesCount");
    const handleScrapPost = toggleField("scraped", "scrapsCount");

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-gray-400">잠시만 기다려주세요!</p>
            </div>
        );

    return (
        <PostContainer>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">홈</h1>
                <LayoutToggleButton layoutMode={layoutMode} setLayoutMode={setLayoutMode} />
            </div>

            {layoutMode === "scroll" ? (
                <div className="space-y-4 mt-4">
                    {posts.length ? (
                        posts.map(({ postInfo, userInfo, postActivity }) => (
                            <PostCard
                                key={postInfo.postId}
                                postInfo={postInfo}
                                userInfo={userInfo}
                                postActivity={postActivity}
                                onLike={() => handleLikePost(postInfo.postId)}
                                isLiking={false}
                                onScrap={() => handleScrapPost(postInfo.postId)}
                                isScrapping={false}
                            />
                        ))
                    ) : (
                        <p className="text-gray-400 text-center">게시물이 없습니다.</p>
                    )}
                </div>
            ) : (
                <PostGridView
                    posts={posts}
                    isLiking={false}
                    isScrapping={false}
                    onLike={handleLikePost}
                    onScrap={handleScrapPost}
                />
            )}
        </PostContainer>
    );
};

export default Home;
