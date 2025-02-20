import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import type {PostEntity} from "../../types/PostEntity";
import {marked} from "marked";
import PostContainer from "../../components/Container";
import {motion} from "framer-motion";
import {Heart, Flag, MessageCircle} from "lucide-react";
import PostComments from "../../components/PostComments";
import {useServices} from "../../context/ServicesProvider.tsx";

import {Avatar, AvatarFallback, AvatarImage} from "../../components/ui/avatar";
import {Button} from "../../components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "../../components/ui/card";
import {Separator} from "../../components/ui/separator";
import {ClientUrl} from "../../constants/ClientUrl.ts";

// ─────────────────────────────────────────────
// SpecificPost 컴포넌트: 게시글 상세보기 페이지
// ─────────────────────────────────────────────
const SpecificPost: React.FC = () => {
    const {postId} = useParams<{ postId: string }>();

    const {getPostById, likesPost, scrapsPost, reportsPost} = useServices();

    const [post, setPost] = useState<PostEntity | null>(null);
    // const [comments, setComments] = useState<CommentsEntity | null>(null);

    // const [showReportModal, setShowReportModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    // ✅ 중복 요청 방지를 위한 상태값
    const [isLiking, setIsLiking] = useState(false);
    const [isScrapping, setIsScrapping] = useState(false);
    const [isReporting, setIsReporting] = useState(false);

    // 게시글 데이터를 비동기로 불러오기
    useEffect(() => {
        if (!postId) return;

        const fetchPost = async () => {
            try {
                const response = await getPostById(postId);
                setPost(response.post);
                // setComments(response.comments);
            } catch (error) {
                console.error("게시물 불러오기 실패: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId, getPostById]);

    // 좋아요 토글 핸들러
    const handleLike = async () => {
        if (!post || !postId || isLiking) return;
        setIsLiking(true);
        await likesPost(postId);

        try {
            const response = await likesPost(postId);
            if (response.status === 200) {
                setPost(prev => prev ? { ...prev, likesCount: prev.likesCount + (prev.likesCount > 0 ? -1 : 1) } : null);
            }
        } catch (error) {
            console.error("좋아요 처리 실패:", error);
        } finally {
            setIsLiking(false);
        }
    };

    // 신고 모달 열기 핸들러
    const handleScrap = async () => {
        if (!post || !postId || isScrapping) return;
        setIsScrapping(true);

        try {
            const response = await scrapsPost(postId);
            if (response.status === 200) {
                setPost(prev => prev ? { ...prev, scrapsCount: prev.scrapsCount + (prev.scrapsCount > 0 ? -1 : 1) } : null);
            }
        } catch (error) {
            console.error("스크랩 처리 실패:", error);
        } finally {
            setIsScrapping(false);
        }
    };


    const handleReport = async () => {
        if (!post || !postId || isReporting) return;
        setIsReporting(true);

        try {
            const response = await reportsPost(postId);
            if (response.status === 200) {
                alert("신고되었습니다.");
                setPost(prev => prev ? { ...prev, reportsCount: prev.reportsCount + 1 } : null);
            }
        } catch (error: any) {
            if (error.response?.status === 400) {
                alert("이미 신고된 상태입니다.");
            } else {
                console.error("신고 처리 실패:", error);
            }
        } finally {
            setIsReporting(false);
        }
    };

    // // 신고 확인 후 처리하는 핸들러
    // const confirmReport = (reason: string) => {
    //     console.log("선택된 신고 사유:", reason);
    //     if (post) {
    //         setPost({ ...post, reportsCount: post.reportsCount + 1 });
    //     }
    //     setHasReported(true);
    //     setShowReportModal(false);
    // };

    // 로딩 중 또는 게시글 데이터가 없을 경우의 처리
    if (loading) return <p>로딩 중...</p>;
    if (!post) return <p>게시물을 찾을 수 없습니다.</p>;

    return (
        <PostContainer>
            {showReportModal && (
                <PostReportModal
                    onClose={() => setShowReportModal(false)}
                    onConfirm={handleReport}
                />
            )}

            <div className="max-w-3xl mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card className="overflow-hidden">
                        <CardHeader className="p-0">
                            <img src={post.thumbNailImage || "/placeholder.svg"} alt="Thumbnail" className="w-full h-64 object-cover" />
                        </CardHeader>

                        <CardContent className="p-6">
                            <motion.h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                {post.title}
                            </motion.h1>

                            <div className="flex items-center space-x-4 mb-6">
                                <Avatar>
                                    <AvatarImage src="/placeholder-avatar.jpg" alt={post.userId} />
                                    <AvatarFallback />
                                </Avatar>
                                <div>
                                    <Link to={`${ClientUrl.OTHERSPROFILE}`} className="text-sm text-black dark:text-white hover:underline">
                                        {post.userId}
                                    </Link>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(post.createAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>

                            <motion.div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: marked(post?.content ?? "") }} />
                        </CardContent>

                        <Separator />

                        <CardFooter className="p-6 flex justify-between items-center">
                            <div className="flex space-x-4">
                                <Button variant="ghost" size="sm" onClick={handleLike} disabled={isLiking}>
                                    <Heart className={`w-6 h-6 ${post.likesCount > 0 ? "fill-current text-red-500" : ""}`} />
                                    <span>{post.likesCount}</span>
                                </Button>
                                <Button variant="ghost" size="sm" onClick={handleScrap} disabled={isScrapping}>
                                    📌 <span>{post.scrapsCount}</span>
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <MessageCircle className="w-6 h-6" />
                                    <span>{post.commentsCount}</span>
                                </Button>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleReport} disabled={isReporting}>
                                <Flag className="w-6 h-6" />
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Comments</h2>
                    <PostComments postId={post?.postId ?? ""} />
                </motion.div>
            </div>
        </PostContainer>
    );
};

export default SpecificPost;
