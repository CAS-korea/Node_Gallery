import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PostEntity } from '../types/PostEntity';
import { useServices } from '../contextAPI/ServicesProvider';

interface PostCardProps {
    post: PostEntity;
    interactive?: boolean; // true면 클릭 가능, false면 단순 표시만 함
}

const PostCard: React.FC<PostCardProps> = ({ post, interactive = true }) => {
    const { likePost, reportPost } = useServices();
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(post.likesCount);
    const [isReported, setIsReported] = useState<boolean>(false);
    const [reportCount, setReportCount] = useState<number>(post.reportCount);

    const handleLike = async () => {
        if (!interactive) return;
        if (!isLiked) {
            try {
                await likePost(post.postID);
                setLikeCount(prev => prev + 1);
                setIsLiked(true);
            } catch (error) {
                console.error('좋아요 실패:', error);
            }
        } else {
            // UI 상에서만 취소 (백엔드에는 취소 기능 없음)
            setLikeCount(prev => (prev > 0 ? prev - 1 : 0));
            setIsLiked(false);
        }
    };

    const handleReport = async () => {
        if (!interactive) return;
        if (!isReported) {
            try {
                await reportPost(post.postID);
                setReportCount(prev => prev + 1);
                setIsReported(true);
            } catch (error) {
                console.error('신고 실패:', error);
            }
        } else {
            // UI 상에서만 취소
            setReportCount(prev => (prev > 0 ? prev - 1 : 0));
            setIsReported(false);
        }
    };

    return (
        <div className="bg-gray-800 p-4 rounded-md">
            <Link to={`/post/${post.postID}`} className="text-xl font-semibold hover:underline">
                {post.title}
            </Link>
            <p className="text-gray-400 text-sm">작성자: {post.username}</p>
            <div className="flex space-x-4 mt-2">
                {interactive ? (
                    <>
                        <button
                            onClick={handleLike}
                            className={`px-4 py-2 rounded-md transition-colors ${isLiked ? 'bg-green-600' : 'bg-blue-600'}`}
                        >
                            👍 {likeCount}
                        </button>
                        <button
                            onClick={handleReport}
                            className={`px-4 py-2 rounded-md transition-colors ${isReported ? 'bg-yellow-600' : 'bg-red-600'}`}
                        >
                            🚨 {reportCount}
                        </button>
                    </>
                ) : (
                    <>
                        <span className="px-4 py-2 rounded-md bg-gray-600">👍 {likeCount}</span>
                        <span className="px-4 py-2 rounded-md bg-gray-600">🚨 {reportCount}</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default PostCard;
