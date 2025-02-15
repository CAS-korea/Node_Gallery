import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flag, Heart } from "lucide-react";

interface Comment {
    id: number;
    username: string;
    role: string;
    date: string;
    content: string;
    liked: boolean;
    likesCount: number;
}

const initialComments: Comment[] = [
    {
        id: 1,
        username: "김아프간타",
        role: "관리자",
        date: "2025-02-15",
        content: "ㅋㅋㅋ 제 사생활이 궁금하셨나요?",
        liked: false,
        likesCount: 31268,
    },
    {
        id: 2,
        username: "홍길동",
        role: "사용자",
        date: "2025-02-16",
        content: "좋은 정보 감사합니다.",
        liked: false,
        likesCount: 1,
    },
];

const PostComments: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState("");

    const handleCommentLike = (id: number) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === id
                    ? {
                        ...comment,
                        liked: !comment.liked,
                        likesCount: comment.liked
                            ? comment.likesCount - 1
                            : comment.likesCount + 1,
                    }
                    : comment
            )
        );
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        const comment: Comment = {
            id: Date.now(),
            username: "김아프간타", // 현재 로그인된 유저의 이름이라고 가정
            role: "관리자",
            date: new Date().toLocaleDateString(),
            content: newComment,
            liked: false,
            likesCount: 0,
        };
        setComments((prevComments) => [comment, ...prevComments]);
        setNewComment("");
    };

    return (
        <div className="mt-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">댓글</h2>

            {/* 댓글 작성 폼 */}
            <form onSubmit={handleAddComment} className="mb-4 flex gap-2">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                >
                    작성
                </button>
            </form>

            {/* 댓글 리스트 */}
            {comments.map((comment) => (
                <motion.div
                    key={comment.id}
                    className="bg-white dark:bg-gray-700 p-4 rounded-md shadow mb-4 flex justify-between items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div>
                        <div className="flex items-center mb-2">
                            <span className="font-bold text-gray-800 dark:text-gray-100 mr-2">
                                {comment.username}
                            </span>
                            <span className="text-sm text-blue-600 border border-blue-600 rounded px-2 py-0.5">
                                {comment.role}
                            </span>
                            <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                                {comment.date}
                            </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                    </div>
                    <div className="flex space-x-2 items-center">
                        {/* 댓글 좋아요 버튼 */}
                        <motion.button
                            onClick={() => handleCommentLike(comment.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {comment.liked ? (
                                <Heart className="w-5 h-5 fill-current text-red-500" />
                            ) : (
                                <Heart
                                    className="w-5 h-5 stroke-current text-gray-600 dark:text-gray-300"
                                    fill="none"
                                    strokeWidth={2}
                                />
                            )}
                        </motion.button>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {comment.likesCount}
                        </span>
                        {/* 댓글 신고 버튼 (기능은 추후 구현) */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-gray-600 dark:text-gray-300 hover:text-red-500"
                        >
                            <Flag className="w-5 h-5" />
                        </motion.button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default PostComments;
