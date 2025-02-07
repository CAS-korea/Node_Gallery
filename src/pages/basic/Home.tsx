import React, { useEffect, useState } from 'react';
import { PostEntity } from '../../types/PostEntity';
import PostCard from "../../components/PostCard";
import PostContainer from "../../components/Container"; // container 컴포넌트 import

const Home: React.FC = () => {
    // ✅ 더미 데이터 (content 속성 추가)
    const dummyPosts: PostEntity[] = [
        {
            postID: "1",
            title: "첫 번째 게시글",
            username: "user1",
            likesCount: 10,
            reportCount: 2,
            content: "이것은 첫 번째 게시글의 내용입니다."
        },
        {
            postID: "2",
            title: "두 번째 게시글",
            username: "user2",
            likesCount: 5,
            reportCount: 1,
            content: "이것은 두 번째 게시글의 내용입니다."
        },
        {
            postID: "3",
            title: "세 번째 게시글",
            username: "user3",
            likesCount: 15,
            reportCount: 3,
            content: "이것은 세 번째 게시글의 내용입니다."
        }
    ];

    // ✅ 상태 관리 (초기값 빈 배열)
    const [posts, setPosts] = useState<PostEntity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setPosts(dummyPosts);
            setLoading(false);
        }, 500); // 네트워크 응답처럼 보이게 약간의 딜레이 추가
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                {/* Tailwind CSS 스피너 */}
                <div className="w-16 h-16 border-4 border-black opacity-5 border-t-transparent rounded-full animate-spin"></div>
                <div className="w-30 h-16 px-3 py-5 text-gray-400"> 잠시만 기다려주세요! </div>
            </div>
        );
    }

    return (
        <PostContainer>
            <h1 className="text-3xl font-semibold">홈</h1>
            <div className="space-y-4">
                {posts.length > 0 ? (
                    posts.map(post => <PostCard key={post.postID} post={post} />)
                ) : (
                    <p className="text-gray-400 text-center">게시물이 없습니다.</p>
                )}
            </div>
        </PostContainer>
    );
};

export default Home;
