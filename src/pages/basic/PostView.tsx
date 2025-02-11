import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostEntity } from '../../types/PostEntity.ts';
import { marked } from 'marked';
import PostContainer from "../../components/Container";
import { motion } from 'framer-motion';
import { FaHeart, FaFlag } from "react-icons/fa";

const PostView: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();

    const [post, setPost] = useState<PostEntity | null>(null);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasReported, setHasReported] = useState(false);

    useEffect(() => {
        const dummyPost: PostEntity = {
            postID: "1",
            title: "김아프간타의 은밀한 사생활",
            username: "김아프간타",
            content: "# 하핫!\n\n이 게시물은 UI 테스트를 위한 임시 데이터입니다.",
            likesCount: 42,
            reportCount: 3
        };

        if (postId) {
            setPost(dummyPost);
        } else {
            console.error('postId가 전달되지 않았습니다.');
        }
    }, [postId]);

    const handleLike = () => {
        if (post && !hasLiked) {
            setPost({ ...post, likesCount: post.likesCount + 1 });
            setHasLiked(true);
        }
    };

    const handleReport = () => {
        if (post && !hasReported) {
            setPost({ ...post, reportCount: post.reportCount + 1 });
            setHasReported(true);
        }
    };

    return (
        <PostContainer>
            {post ? (
                <div className="relative p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg">

                    {/* 신고 버튼 (오른쪽 상단) */}
                    <motion.button
                        onClick={handleReport}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-4 right-4"
                        disabled={hasReported}
                    >
                        <FaFlag
                            size={15}
                            color={hasReported ? "#fb6e67" : "#aeaeae"}
                            className="transition-colors duration-300"
                        />
                    </motion.button>

                    {/* 게시글 제목 & 내용 */}
                    <h1 className="text-3xl font-semibold">{post.title}</h1>
                    <p className="text-gray-400 text-sm">작성자: {post.username}</p>

                    {/* 본문 (아래쪽 여유 공간 확보) */}
                    <div
                        className="prose mt-4 pb-16" // 본문 아래쪽 공간 확보
                        dangerouslySetInnerHTML={{ __html: marked(post.content) }}
                    />

                    {/* 좋아요 버튼 */}
                    <motion.button
                        onClick={handleLike}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute bottom-6 left-4" // 기존보다 아래쪽으로 이동
                        disabled={hasLiked}
                    >
                        <FaHeart
                            size={15}
                            color={hasLiked ? "#ff2d3e" : "#ffc7c7"}
                            className="transition-colors duration-300"
                        />
                    </motion.button>

                    {/* 좋아요 개수 표시 */}
                    <span className="absolute bottom-4 left-10 text-black font-medium text-lg">
                        {post.likesCount}
                    </span>

                </div>
            ) : (
                <p>게시물을 불러오는 중...</p>
            )}
        </PostContainer>
    );
};

export default PostView;
