import React, { useEffect, useState } from 'react';
import { useServices } from '../../contextAPI/ServicesProvider.tsx';
import { PostEntity } from '../../types/PostEntity.tsx';
import PostCard from '../../components/PostCard.tsx';
import Cookies from "js-cookie";

const Profile: React.FC = () => {
    const { getUserPosts } = useServices();
    const [posts, setPosts] = useState<PostEntity[]>([]);
    const [userInfo, setUserInfo] = useState<{ name: string; email: string; phoneNumber: string; role: string;} | null >(null);


    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const parsedInfo = JSON.parse(token);
                setUserInfo(parsedInfo);
            } catch (error) {
                console.error("토큰 파싱 오류: ", error);
            }
        }

        const fetchUserPosts = async () => {
            if (userInfo) {
                try {
                    const fetchedPosts = await getUserPosts(userInfo.name);
                    setPosts(fetchedPosts);
                } catch (error) {
                    console.error("내 게시물 불러오기 실패:", error);
                }
            }
        };
        fetchUserPosts();
    }, [userInfo, getUserPosts]);

    return (
        <div className="w-full bg-gray-900 text-white p-6 space-y-6">
            <h1 className="text-3xl font-semibold">내 프로필</h1>
            <div className="space-y-4">
                <p className="text-lg">이름: {userInfo?.name || "알 수 없음"}</p>
                <p className="text-lg">이메일: {userInfo?.email}</p>
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
