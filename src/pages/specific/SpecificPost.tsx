// src/pages/specific/SpecificPost.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    Flag,
    MessageCircle,
    Bookmark,
    Send,
    ChevronLeft,
    Calendar,
} from "lucide-react";

import PostReportModal from "../../components/postcard/PostReportModal";
import PostComment from "../../components/postcard/PostComment";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { ClientUrl } from "../../constants/ClientUrl";

import {
    fetchMockPostById,
    MockCard,
} from "../../api/mockPosts";

// 댓글 shape 간략 정의
interface DummyComment {
    id: string;
    comment: string;
    user: { name: string; avatar: string };
    activity: { liked: boolean; reported: boolean };
}

const SpecificPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();

    const [data, setData] = useState<MockCard | null>(null);
    const [loading, setLoading] = useState(true);

    // 로컬 토글 상태
    const [liked, setLiked] = useState(false);
    const [scraped, setScraped] = useState(false);
    const [reported, setReported] = useState(false);
    const [counts, setCounts] = useState({ likes: 0, scraps: 0, comments: 0 });

    // 댓글
    const [comments, setComments] = useState<DummyComment[]>([]);
    const [newComment, setNewComment] = useState("");
    const maxLen = 500;

    // 신고 모달
    const [showReportModal, setShowReportModal] = useState(false);

    // ───────────────────────────────── fetch 목데이터
    useEffect(() => {
        (async () => {
            if (!postId) return;
            const res = await fetchMockPostById(postId);
            if (!res) return setLoading(false);

            setData(res);
            setLiked(res.postActivity.liked);
            setScraped(res.postActivity.scraped);
            setReported(res.postActivity.reported);
            setCounts({
                likes: res.postInfo.likesCount,
                scraps: res.postInfo.scrapsCount,
                comments: res.comments.length,
            });
            setComments(
                res.comments.map((c, idx) => ({
                    id: String(idx),
                    comment: c.content.comment,
                    user: {
                        name: c.specificPostCommentAuthor.name,
                        avatar: c.specificPostCommentAuthor.profileImageUrl,
                    },
                    activity: c.commentActivity,
                }))
            );
            setLoading(false);
        })();
    }, [postId]);

    // ───────────────────────────────── helpers
    const toggleField = (
        field: "liked" | "scraped" | "reported",
        countKey?: "likes" | "scraps"
    ) => {
        if (field === "liked") {
            setLiked((prev) => !prev);
            if (countKey)
                setCounts((c) => ({ ...c, [countKey]: c[countKey] + (liked ? -1 : 1) }));
        } else if (field === "scraped") {
            setScraped((prev) => !prev);
            if (countKey)
                setCounts((c) => ({
                    ...c,
                    [countKey]: c[countKey] + (scraped ? -1 : 1),
                }));
        } else setReported(true);
    };

    const addComment = () => {
        if (!newComment.trim()) return;
        const dummy: DummyComment = {
            id: Date.now().toString(),
            comment: newComment,
            user: { name: "세진", avatar: "public/node_black.png" },
            activity: { liked: false, reported: false },
        };
        setComments((c) => [...c, dummy]);
        setCounts((c) => ({ ...c, comments: c.comments + 1 }));
        setNewComment("");
    };

    const processContent = (md: string) => marked.parse(md ?? "");

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );

    if (!data)
        return (
            <div className="min-h-screen flex items-center justify-center">
                게시물을 찾을 수 없습니다
            </div>
        );

    const { postInfo, userInfo } = data;
    const authorLink =
        userInfo.userId === "100"
            ? ClientUrl.PROFILE
            : `${ClientUrl.OTHERSPROFILE}/${userInfo.userId}`;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            {/* 신고 모달 */}
            <AnimatePresence>
                {showReportModal && (
                    <PostReportModal
                        onClose={() => setShowReportModal(false)}
                        onConfirm={() => toggleField("reported")}
                    />
                )}
            </AnimatePresence>

            {/* 히어로 섹션 */}
            {postInfo.thumbNailImage && (
                <div className="relative w-full h-[50vh] overflow-hidden">
                    <motion.img
                        src={"./public/city.jpg"}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10 dark:from-gray-950"></div>
                    <Link
                        to="/home"
                        className="fixed top-6 left-6 z-20 bg-black/70 text-white rounded-full p-2"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                </div>
            )}

            {/* 본문 카드 */}
            <div className={`max-w-3xl mx-auto px-4 ${postInfo.thumbNailImage ? "-mt-20" : "pt-8"} relative z-20`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="overflow-hidden shadow-xl border-0 dark:bg-gray-900">
                        <CardContent className="p-8">
                            {/* 날짜 */}
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                <Calendar className="w-4 h-4" />
                                {new Date(postInfo.createAt).toLocaleDateString()}
                            </div>

                            {/* 제목 */}
                            <motion.h1
                                className="text-4xl font-bold mb-6"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {postInfo.title}
                            </motion.h1>

                            {/* 작성자 */}
                            <Link
                                to={authorLink}
                                className="flex items-center gap-3 mb-8 group"
                            >
                                <Avatar className="h-12 w-12 border">
                                    <AvatarImage src={userInfo.profileImageUrl} alt="" />
                                    <AvatarFallback>{userInfo.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium group-hover:text-blue-600">
                                        {userInfo.name}
                                    </p>
                                    <p className="text-xs text-gray-500">{userInfo.role}</p>
                                </div>
                            </Link>

                            {/* 콘텐츠 */}
                            <motion.div
                                className="prose dark:prose-invert prose-lg max-w-none mb-8"
                                dangerouslySetInnerHTML={{ __html: processContent(postInfo.content!) }}
                            />

                            <Separator className="my-8" />

                            {/* 인터랙션 버튼들 */}
                            <div className="flex justify-between items-center">
                                <div className="flex gap-6">
                                    {/* 좋아요 */}
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => toggleField("liked", "likes")}
                                                    className={`rounded-full ${
                                                        liked ? "text-red-500" : "text-gray-500"
                                                    }`}
                                                >
                                                    <Heart
                                                        className={`w-5 h-5 mr-1.5 ${
                                                            liked ? "fill-current" : ""
                                                        }`}
                                                    />
                                                    {counts.likes}
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{liked ? "좋아요 취소" : "좋아요"}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    {/* 스크랩 */}
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => toggleField("scraped", "scraps")}
                                                    className={`rounded-full ${
                                                        scraped ? "text-yellow-500" : "text-gray-500"
                                                    }`}
                                                >
                                                    <Bookmark
                                                        className={`w-5 h-5 mr-1.5 ${
                                                            scraped ? "fill-current" : ""
                                                        }`}
                                                    />
                                                    {counts.scraps}
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{scraped ? "스크랩 취소" : "스크랩"}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    {/* 댓글 숫자 */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-full text-gray-500"
                                        onClick={() =>
                                            document
                                                .getElementById("comments-section")
                                                ?.scrollIntoView({ behavior: "smooth" })
                                        }
                                    >
                                        <MessageCircle className="w-5 h-5 mr-1.5" />
                                        {counts.comments}
                                    </Button>
                                </div>

                                {/* 신고 */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={reported}
                                    onClick={() => setShowReportModal(true)}
                                    className={`rounded-full ${
                                        reported
                                            ? "text-red-500 cursor-not-allowed opacity-70"
                                            : "text-gray-500"
                                    }`}
                                >
                                    <Flag className={`w-5 h-5 ${reported ? "fill-current" : ""}`} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* ───────────────── 댓글 영역 ───────────────── */}
                <motion.div
                    id="comments-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-10 mb-20"
                >
                    <h2 className="text-2xl font-bold mb-6">
                        Comments ({counts.comments})
                    </h2>

                    {/* 새 댓글 입력 */}
                    <Card className="mb-8 shadow-lg border-0 dark:bg-gray-900">
                        <CardContent className="p-6">
                            <div className="flex gap-4">
                <textarea
                    className="flex-1 p-3 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none min-h-[100px]"
                    placeholder="댓글을 입력하세요..."
                    value={newComment}
                    onChange={(e) => {
                        if (e.target.value.length <= maxLen) setNewComment(e.target.value);
                    }}
                />
                                <Button
                                    onClick={addComment}
                                    disabled={!newComment.trim()}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Send className="w-4 h-4 mr-2" /> 댓글 게시
                                </Button>
                            </div>
                            <div className="text-sm text-gray-500 mt-1 text-right">
                                {newComment.length}/{maxLen}
                            </div>
                        </CardContent>
                    </Card>

                    {/* 댓글 리스트 */}
                    {comments.length ? (
                        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl">
                            {comments.map((c, idx) => (
                                <motion.div
                                    key={c.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                                >
                                    <PostComment
                                        commentContent={{ commentId: c.id, comment: c.comment }}
                                        commentActivity={c.activity}
                                        commentUserInfo={{
                                            name: c.user.name,
                                            profileImageUrl: c.user.avatar,
                                            userId: "dummy",
                                            role: "USER",
                                        }}
                                        onLikeComment={() => {
                                            setComments((prev) =>
                                                prev.map((cm) =>
                                                    cm.id === c.id
                                                        ? {
                                                            ...cm,
                                                            activity: {
                                                                ...cm.activity,
                                                                liked: !cm.activity.liked,
                                                            },
                                                        }
                                                        : cm
                                                )
                                            );
                                        }}
                                        onReportComment={() => {
                                            setComments((prev) =>
                                                prev.map((cm) =>
                                                    cm.id === c.id
                                                        ? {
                                                            ...cm,
                                                            activity: { ...cm.activity, reported: true },
                                                        }
                                                        : cm
                                                )
                                            );
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <Card className="shadow-md border-0 dark:bg-gray-900">
                            <CardFooter className="p-8 flex flex-col items-center">
                                <MessageCircle className="w-12 h-12 text-gray-300 mb-3" />
                                <p className="text-gray-500 text-center">
                                    아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
                                </p>
                            </CardFooter>
                        </Card>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default SpecificPost;
