import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useServices } from '../../contextAPI/ServicesProvider.tsx';
import { PostEntity } from '../../types/PostEntity.tsx';
import { marked } from 'marked';

const PostView: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const { getPostById, likePost, reportPost } = useServices();
    const [post, setPost] = useState<PostEntity | null>(null);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasReported, setHasReported] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                try {
                    console.log("게시물 불러오기 시작, postId:", postId);
                    const fetchedPost = await getPostById(postId);
                    setPost(fetchedPost);
                    console.log("게시물 불러오기 완료", fetchedPost);
                } catch (error) {
                    console.error('게시물 불러오기 실패:', error);
                }
            } else {
                console.error('postId가 전달되지 않았습니다.');
            }
        };
        fetchPost();
    }, [postId]);

    const handleLike = async () => {
        if (post && !hasLiked) {
            try {
                await likePost(post.postID);
                setPost({ ...post, likesCount: post.likesCount + 1 });
                setHasLiked(true);
            } catch (error) {
                console.error('좋아요 실패:', error);
            }
        }
    };

    const handleReport = async () => {
        if (post && !hasReported) {
            try {
                await reportPost(post.postID);
                setPost({ ...post, reportCount: post.reportCount + 1 });
                setHasReported(true);
            } catch (error) {
                console.error('신고 실패:', error);
            }
        }
    };

    return (
        <div className="w-full bg-gray-900 text-white p-6 space-y-6">
            {post ? (
                <div className="bg-gray-800 p-6 rounded-md">
                    <h1 className="text-3xl font-semibold">{post.title}</h1>
                    <p className="text-gray-400 text-sm">작성자: {post.username}</p>
                    <div className="prose prose-invert mt-4" dangerouslySetInnerHTML={{ __html: marked(post.content) }} />

                    {/* 좋아요 및 신고 버튼 */}
                    <div className="flex space-x-4 mt-4">
                        <button
                            onClick={handleLike}
                            className={`px-4 py-2 rounded-md ${hasLiked ? "bg-blue-500" : "bg-gray-600"}`}
                            disabled={hasLiked}
                        >
                            👍 {post.likesCount}
                        </button>
                        <button
                            onClick={handleReport}
                            className={`px-4 py-2 rounded-md ${hasReported ? "bg-red-500" : "bg-gray-600"}`}
                            disabled={hasReported}
                        >
                            🚨 {post.reportCount}
                        </button>
                    </div>
                </div>
            ) : (
                <p>게시물을 불러오는 중...</p>
            )}
        </div>
    );
};

export default PostView;
