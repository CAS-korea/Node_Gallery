import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PostEntity } from '../types/PostEntity.ts';
import { motion } from 'framer-motion';
import { FaHeart } from "react-icons/fa";
import {ClientUrl} from "../constants/ClientUrl.ts";

interface PostCardProps {
    post: PostEntity;
    interactive?: boolean; // true면 클릭 가능, false면 단순 표시만 함
}

const PostCard: React.FC<PostCardProps> = ({ post, interactive = true }) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(post.likesCount);

    const handleLike = () => {
        if (!interactive) return;
        setIsLiked(!isLiked);
        setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg transition-transform duration-300"
        >
            {/* 게시글 제목 */}
            <Link to={`${ClientUrl.SPECIFICPOST}/${post.postId}`}>
                <h2 className="text-2xl font-semibold text-black hover:underline">
                    {post.title}
                </h2>
            </Link>
            <Link to={`${ClientUrl.SPECIFICPROFILE}/${post.userId}`}>
                <p className="mt-2 text-sm text-black hover:underline">
                    {post.userId}
                </p>
            </Link>
            {/* 게시글 내용 */}
            <p className="mt-4 text-gray-700 text-sm line-clamp-3 pb-16">
                {post.content}
            </p>

            {/* ❤️ 좋아요 버튼 (왼쪽 아래 고정, 간격 조정) */}
            <motion.button
                onClick={handleLike}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-6 left-6 flex items-center space-x-2"
            >
                <FaHeart
                    size={15}
                    color={isLiked ? "#FF4757" : "#D3D3D3"}
                    className="transition-colors duration-300"
                />
                <span className="text-black font-medium text-base">{likeCount}</span>
            </motion.button>
        </motion.div>
    );
};

export default PostCard;
