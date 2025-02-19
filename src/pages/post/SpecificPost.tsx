"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { PostEntity } from "../../types/PostEntity"
import { marked } from "marked"
import { motion } from "framer-motion"
import { Heart, Flag, MessageCircle, User } from "lucide-react"
import PostReportModal from "../../components/PostReportModal"
import PostComments from "../../components/PostComments"
import { dummyPosts } from "../../data/dummyPosts"
import Container from "../../components/Container"

import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card"
import { Separator } from "../../components/ui/separator"



const SpecificPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>()
    const [post, setPost] = useState<PostEntity | null>(null)
    const [hasLiked, setHasLiked] = useState(false)
    const [hasReported, setHasReported] = useState(false)
    const [showReportModal, setShowReportModal] = useState(false)

    useEffect(() => {
        if (postId) {
            const foundPost = dummyPosts.find((p) => p.postId === postId) || null
            setPost(foundPost)
        } else {
            console.error("postId was not provided")
        }
    }, [postId])

    const handleLike = () => {
        if (!post) return
        setPost({ ...post, likesCount: hasLiked ? Math.max(0, post.likesCount - 1) : post.likesCount + 1 })
        setHasLiked(!hasLiked)
    }

    const handleReport = () => {
        if (!hasReported) {
            setShowReportModal(true)
        }
    }

    const confirmReport = (reason: string) => {
        console.log("Selected report reason:", reason)
        if (post) {
            setPost({ ...post, reportsCount: post.reportsCount + 1 })
        }
        setHasReported(true)
        setShowReportModal(false)
    }

    if (!post) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-600 dark:text-gray-300">Loading post...</p>
            </div>
        )
    }

    return (
        <Container>
        <div className="max-w-3xl mx-auto px-4 py-8">
            {showReportModal && <PostReportModal onClose={() => setShowReportModal(false)} onConfirm={confirmReport} />}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="overflow-hidden">
                    <CardHeader className="p-0">
                        <img src={post.thumbNailImage || "/placeholder.svg"} alt="Thumbnail" className="w-full h-64 object-cover" />
                    </CardHeader>
                    <CardContent className="p-6">
                        <motion.h1
                            className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            {post.title}
                        </motion.h1>

                        {/* 사용자 정보 (아바타 + 이름 + 역할) */}
                        <div className="flex items-center space-x-4 mb-6">
                            <Avatar>
                                <AvatarImage src="/placeholder-avatar.jpg" alt={post.userId} />
                                <AvatarFallback>
                                    <User />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{post.userId}</p>

                                    {/* 역할 표시 (배지 스타일) */}
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            post.role === "PROFESSOR"
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-500 text-white"
                                        }`}
                                    >
                                        {post.role}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(post.createAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* 본문 내용 */}
                        <motion.div
                            className="prose dark:prose-invert max-w-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            dangerouslySetInnerHTML={{ __html: marked(post.content) }}
                        />
                    </CardContent>
                    <Separator />

                    {/* 하단 버튼 영역 */}
                    <CardFooter className="p-6 flex justify-between items-center">
                        <div className="flex space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLike}
                                className={`flex items-center space-x-2 ${hasLiked ? "text-red-500" : ""}`}
                            >
                                <Heart className={`w-6 h-6 ${hasLiked ? "fill-current" : ""}`} />
                                <span>{post.likesCount}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                                <MessageCircle className="w-6 h-6" />
                                <span>{post.commentsCount}</span>
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleReport}
                            disabled={hasReported}
                            className={hasReported ? "text-red-500 cursor-not-allowed" : ""}
                        >
                            <Flag className="w-6 h-6" />
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8"
            >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Comments</h2>
                <PostComments postId={post.postId} />
            </motion.div>
        </div>
        </Container>
    )
}

export default SpecificPost
