import React, { useEffect, useState } from 'react';
import { useServices } from '../../contextAPI/ServicesProvider.tsx';
import { PostEntity } from '../../types/PostEntity.tsx';
import PostCard from "../../components/PostCard.tsx";


const Home: React.FC = () => {
    const { getAllPosts } = useServices();
    const [posts, setPosts] = useState<PostEntity[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getAllPosts();
                setPosts(fetchedPosts);
            } catch (error) {
                console.error('게시물 로딩 실패:', error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="w-full bg-gray-900 text-white p-6 space-y-6">
            <h1 className="text-3xl font-semibold">홈</h1>
            <div className="space-y-4">
                {posts.map(post => (
                    <PostCard key={post.postID} post={post}/>
                ))}
            </div>
        </div>
    );
};

export default Home;
