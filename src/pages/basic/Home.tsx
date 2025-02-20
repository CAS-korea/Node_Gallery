import React, {useEffect, useState} from 'react';
import {PostEntity} from '../../types/PostEntity.ts';
import PostCard from "../../components/PostCard";
import PostContainer from "../../components/Container";
import {useServices} from "../../context/ServicesProvider.tsx";

const Home: React.FC = () => {
    const [posts, setPosts] = useState<PostEntity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // const [visibleCount, setVisibleCount] = useState(5);
    const {getAllPosts} = useServices()
    // const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const allPosts = await getAllPosts();
            setPosts(allPosts);
            // setPosts(allPosts.slice(0, visibleCount));
            setLoading(false);
        }
        fetchPosts();
    }, []);

    // const lastPostRef = useCallback((node: HTMLDivElement) => {
    //     if (loading) return;
    //     if (observerRef.current) observerRef.current.disconnect();
    //     observerRef.current = new IntersectionObserver((entries) => {
    //         if (entries[0].isIntersecting && visibleCount < dummyPosts.length) {
    //             setVisibleCount((prev) => prev + 5);
    //         }
    //     });
    //     if (node) observerRef.current.observe(node);
    // }, [loading, visibleCount]);

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

    return (
        <PostContainer>
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">홈</h1>
            <div className="space-y-4">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard key={post.postId} post={post}/>
                    ))
                ) : (
                    <p className="text-gray-400 dark:text-gray-500 text-center">게시물이 없습니다.</p>

                    //     posts.map((post, index) => (
                    //         <div ref={index === posts.length - 1 ? lastPostRef : null} key={post.postId}>
                    //             <PostCard post={post} />
                    //         </div>
                    //     ))
                    // ) : (
                    //     <p className="text-gray-400 dark:text-gray-500 text-center">게시물이 없습니다.</p>
                    //
                )}
            </div>
        </PostContainer>
    );
};

export default Home;
