"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { PostEntity } from "../../types/PostEntity.ts"
import { marked } from "marked"
import PostContainer from "../../components/Container.tsx"
import { motion } from "framer-motion"
import { Heart, Flag, MessageCircle, Share2 } from "lucide-react"
import PostReportModal from "../../components/PostReportModal.tsx" // 신고 모달
import PostComments from "../../components/PostComments.tsx" // 댓글 컴포넌트 추가

const SpecificPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>()

    const [post, setPost] = useState<PostEntity | null>(null)
    const [hasLiked, setHasLiked] = useState(false)
    const [hasReported, setHasReported] = useState(false)
    const [showReportModal, setShowReportModal] = useState(false)

    useEffect(() => {
        // 예시: 더미 데이터
        const dummyPosts: PostEntity[] = [
            {
                postId: "1",
                userId: "hajin",
                title: "오늘의 날씨가 참 좋아요!",
                content: "하늘이 맑고 기분 좋은 하루입니다.",
                summary: "맑은 하늘과 좋은 기분",
                userTag: ["#날씨", "#기분좋음"],
                createAt: new Date("2025-02-13T08:30:00"),
                commentsCount: 3,
                likesCount: 10,
                scrapsCount: 2,
                reportsCount: 1,
                postVisibility: "public"
            },
            {
                postId: "2",
                userId: "sejin",
                title: "React의 useEffect 완벽 정리",
                content: "useEffect를 활용한 비동기 데이터 패칭 기법",
                summary: "React의 useEffect 훅에 대한 심층 분석",
                userTag: ["#React", "#useEffect", "#프로그래밍"],
                createAt: new Date("2025-02-13T10:15:00"),
                commentsCount: 5,
                likesCount: 20,
                scrapsCount: 4,
                reportsCount: 0,
                postVisibility: "public"
            },
            {
                postId: "3",
                userId: "seonkyo",
                title: "Next.js vs React? 무엇을 선택할까?",
                content: "CSR과 SSR의 차이를 비교하며 어떤 상황에서 유리한지 알아봅니다.",
                summary: "Next.js와 React의 차이점 비교",
                userTag: ["#NextJS", "#React", "#웹개발"],
                createAt: new Date("2025-02-13T12:45:00"),
                commentsCount: 7,
                likesCount: 15,
                scrapsCount: 3,
                reportsCount: 2,
                postVisibility: "followersOnly"
            },
            {
                postId: "4",
                userId: "geunwoo",
                title: "자바스크립트 클로저 개념 정리",
                content: "클로저(Closure)는 내부 함수가 외부 함수의 변수를 기억하는 기능입니다.",
                summary: "클로저를 이해하고 활용하는 방법",
                userTag: ["#JavaScript", "#Closure", "#개발"],
                createAt: new Date("2025-02-13T14:30:00"),
                commentsCount: 6,
                likesCount: 18,
                scrapsCount: 5,
                reportsCount: 0,
                postVisibility: "private"
            },
            {
                postId: "5",
                userId: "hajin",
                title: "독서의 힘, 성공한 사람들의 비결",
                content: "성공한 사람들의 공통점은 독서를 즐긴다는 점입니다.",
                summary: "성공하는 습관 - 독서",
                userTag: ["#독서", "#성공", "#습관"],
                createAt: new Date("2025-02-13T16:10:00"),
                commentsCount: 8,
                likesCount: 25,
                scrapsCount: 7,
                reportsCount: 1,
                postVisibility: "public"
            },
            {
                postId: "6",
                userId: "sejin",
                title: "Git과 GitHub의 차이점",
                content: "Git은 분산 버전 관리 시스템이고, GitHub는 이를 활용한 플랫폼입니다.",
                summary: "Git과 GitHub의 개념 및 차이점",
                userTag: ["#Git", "#GitHub", "#버전관리"],
                createAt: new Date("2025-02-13T17:45:00"),
                commentsCount: 4,
                likesCount: 12,
                scrapsCount: 3,
                reportsCount: 0,
                postVisibility: "followersOnly"
            },
            {
                postId: "7",
                userId: "seonkyo",
                title: "Python과 Java의 차이점",
                content: "Python은 동적 타이핑 언어이며 Java는 정적 타이핑 언어입니다.",
                summary: "Python과 Java의 특징 및 차이점",
                userTag: ["#Python", "#Java", "#프로그래밍"],
                createAt: new Date("2025-02-13T19:20:00"),
                commentsCount: 5,
                likesCount: 9,
                scrapsCount: 2,
                reportsCount: 1,
                postVisibility: "public"
            },
            {
                postId: "8",
                userId: "geunwoo",
                title: "비동기 처리란? JavaScript의 Promise 이해",
                content: "비동기 처리란 프로그램이 다른 작업을 수행하는 동안 특정 작업을 기다릴 필요 없는 방식입니다.",
                summary: "비동기 프로그래밍 개념",
                userTag: ["#JavaScript", "#Promise", "#비동기"],
                createAt: new Date("2025-02-13T21:10:00"),
                commentsCount: 3,
                likesCount: 7,
                scrapsCount: 2,
                reportsCount: 0,
                postVisibility: "private"
            },
        ];

    // 총 30개까지 반복 생성
        for (let i = 9; i <= 30; i++) {
            dummyPosts.push({
                postId: `${i}`,
                userId: ["hajin", "sejin", "seonkyo", "geunwoo"][i % 4],
                title: `테스트 게시글 ${i}`,
                content: `이것은 테스트 게시글 ${i}의 내용입니다.`,
                summary: `테스트 게시글 요약 ${i}`,
                userTag: [`#태그${i}`, `#테스트${i}`],
                createAt: new Date(`2025-02-13T${(i % 24).toString().padStart(2, "0")}:00:00`),
                commentsCount: Math.floor(Math.random() * 10),
                likesCount: Math.floor(Math.random() * 50),
                scrapsCount: Math.floor(Math.random() * 10),
                reportsCount: Math.floor(Math.random() * 5),
                postVisibility: "public"
            });
        }

        // 📌 postId에 해당하는 게시글 찾기
        const foundPost = dummyPosts.find(post => post.postId === postId) || null;
        setPost(foundPost);
    }, [postId])

    /** 좋아요 토글 */
    const handleLike = () => {
        if (!post) return
        if (hasLiked) {
            // 좋아요 취소
            setPost({ ...post, likesCount: Math.max(0, post.likesCount - 1) })
            setHasLiked(false)
        } else {
            // 좋아요 누르기
            setPost({ ...post, likesCount: post.likesCount + 1 })
            setHasLiked(true)
        }
    }

    /** 신고 버튼 -> 모달 열기 */
    const handleReport = () => {
        if (!hasReported) {
            setShowReportModal(true)
        }
    }

    /** 모달에서 확인 시 신고 처리 */
    const confirmReport = (reason: string) => {
        console.log("선택된 신고 사유:", reason)
        if (post) {
            setPost({ ...post, reportsCount: post.reportsCount + 1 })
        }
        setHasReported(true)
        setShowReportModal(false)
    }

    return (
        <PostContainer>
            {/* 신고 모달 */}
            {showReportModal && (
                <PostReportModal
                    onClose={() => setShowReportModal(false)}
                    onConfirm={confirmReport}
                />
            )}

            {post ? (
                <>
                    {/* 게시물 UI */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                    >
                        <div className="p-6 space-y-4">
                            <motion.h1
                                className="text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                            >
                                {post.title}
                            </motion.h1>
                            <motion.p
                                className="text-sm text-gray-500 dark:text-gray-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                작성자: {post.userId}
                            </motion.p>
                            <motion.div
                                className="prose dark:prose-invert max-w-none mt-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                                dangerouslySetInnerHTML={{ __html: marked(post.content) }}
                            />
                        </div>

                        {/* 하단 버튼 영역 */}
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                            <div className="flex space-x-4">
                                {/* 좋아요 버튼 (빈 하트 ↔ 빨간 하트) */}
                                <motion.button
                                    onClick={handleLike}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center space-x-2 transition-colors duration-300"
                                >
                                    <motion.div
                                        animate={{ scale: hasLiked ? 1.2 : 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                    >
                                        {hasLiked ? (
                                            <Heart className="w-5 h-5 fill-current text-red-500" />
                                        ) : (
                                            <Heart
                                                className="w-5 h-5 stroke-current text-gray-600 dark:text-gray-300 hover:text-red-500"
                                                fill="none"
                                                strokeWidth={2}
                                            />
                                        )}
                                    </motion.div>
                                    <span
                                        className={`font-medium ${
                                            hasLiked
                                                ? "text-red-500"
                                                : "text-gray-600 dark:text-gray-300"
                                        }`}
                                    >
                                        {post.likesCount}
                                    </span>
                                </motion.button>

                                {/* 댓글 버튼 */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                </motion.button>

                                {/* 공유 버튼 */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors duration-300"
                                >
                                    <Share2 className="w-5 h-5" />
                                </motion.button>
                            </div>

                            {/* 신고 버튼 */}
                            <motion.button
                                onClick={handleReport}
                                whileHover={{ scale: !hasReported ? 1.1 : 1 }}
                                whileTap={{ scale: !hasReported ? 0.95 : 1 }}
                                className={`transition-colors duration-300 ${
                                    hasReported
                                        ? "text-red-500 cursor-not-allowed"
                                        : "text-gray-600 dark:text-gray-300 hover:text-red-500"
                                }`}
                                disabled={hasReported}
                            >
                                <Flag className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* 댓글 영역 - 게시물 하단에 위치 */}
                    <PostComments />
                </>
            ) : (
                // 게시물 없는 경우 로딩 메시지
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-600 dark:text-gray-300 py-10"
                >
                    게시물이 존재하지 않습니다.
                </motion.p>
            )}
        </PostContainer>
    )
}

export default SpecificPost;
