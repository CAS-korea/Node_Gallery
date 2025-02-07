import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PostEntity } from '../types/PostEntity';
import { motion } from 'framer-motion';

interface PostCardProps {
    post: PostEntity;
    interactive?: boolean; // true면 클릭 가능, false면 단순 표시만 함
}

const PostCard: React.FC<PostCardProps> = ({ post, interactive = true }) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(post.likesCount);
    const [isReported, setIsReported] = useState<boolean>(false);
    const [reportCount, setReportCount] = useState<number>(post.reportCount);

    const handleLike = () => {
        if (!interactive) return;
        if (!isLiked) {
            setLikeCount(likeCount + 1);
            setIsLiked(true);
        } else {
            setLikeCount(likeCount > 0 ? likeCount - 1 : 0);
            setIsLiked(false);
        }
    };

    const handleReport = () => {
        if (!interactive) return;
        if (!isReported) {
            setReportCount(reportCount + 1);
            setIsReported(true);
        } else {
            setReportCount(reportCount > 0 ? reportCount - 1 : 0);
            setIsReported(false);
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg transition-transform duration-300"
        >
            <Link to={`/post/${post.postID}`}>
                <h2 className="text-2xl font-semibold text-black hover:underline">
                    {post.title}
                </h2>
            </Link>
            <p className="mt-2 text-sm text-black">작성자: {post.username}</p>
            <div className="mt-4 flex justify-end space-x-4">
                {interactive ? (
                    <>
                        <motion.button
                            onClick={handleLike}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isLiked}
                            className={`px-5 py-2 border-radius: 200.5rem font-medium transition-colors ${
                                isLiked
                                    ? 'bg-blue-700 text-black'
                                    : 'bg-gray-100 text-black hover:bg-blue-500'
                            }`}
                        >
                            👍 {likeCount}
                        </motion.button>
                        <motion.button
                            onClick={handleReport}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isReported}
                            className={`px-5 py-2 rounded-full font-medium transition-colors ${
                                isReported
                                    ? 'bg-gradient-to-r from-red-700 to-red-900 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-red-500'
                            }`}
                        >
                            🚨 {reportCount}
                        </motion.button>
                    </>
                ) : (
                    <>
                        <span className="px-5 py-2 rounded-full bg-gray-700 text-gray-300">👍 {likeCount}</span>
                        <span className="px-5 py-2 rounded-full bg-gray-700 text-gray-300">🚨 {reportCount}</span>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default PostCard;
