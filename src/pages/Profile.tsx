import React, { useEffect, useState } from 'react';
import { useServices } from '../contextAPI/ServicesProvider.tsx';
import { PostEntity } from '../types/PostEntity';
import PostCard from '../components/PostCard';

const Profile: React.FC = () => {
    const { getUserPosts, authState } = useServices();
    const [posts, setPosts] = useState<PostEntity[]>([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (authState.username) {
                try {
                    const fetchedPosts = await getUserPosts(authState.username);
                    setPosts(fetchedPosts);
                } catch (error) {
                    console.error("내 게시물 불러오기 실패:", error);
                }
            }
        };
        fetchUserPosts();
    }, [authState.username, getUserPosts]);

    return (
        <div className="w-full bg-gray-900 text-white p-6 space-y-6">
            <h1 className="text-3xl font-semibold">내 프로필</h1>
            <div className="space-y-4">
                <p className="text-lg">이름: {authState.username || "알 수 없음"}</p>
                <p className="text-lg">이메일: {/* 이메일 정보가 있다면 여기에 추가 */}</p>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                    프로필 수정
                </button>
            </div>

            {/* 내 게시물 리스트 */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold">내 게시물</h2>
                <div className="space-y-4 mt-4">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <PostCard key={post.postID} post={post} interactive={false} />
                        ))
                    ) : (
                        <p className="text-gray-400">게시물이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
