import React, {useCallback, useEffect, useRef, useState} from 'react';
import {PostEntity} from '../../types/PostEntity.ts';
import PostCard from "../../components/PostCard";
import PostContainer from "../../components/Container"; // container 컴포넌트 import

const Home: React.FC = () => {
    // 더미 데이터 (content 속성 추가)
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

    // 상태 관리 (초기값 빈 배열)
    const [posts, setPosts] = useState<PostEntity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visibleCount, setVisibleCount] = useState(5);
    // 특정 게시물이 화면에 보이는지 감지하는 옵저버
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        setPosts(dummyPosts.slice(0, visibleCount));
        setLoading(false);
    }, [visibleCount]);

    const lastPostRef = useCallback((node: HTMLDivElement) => {
        if (loading) return;
        // 기존 IntersectionObserver가 있다면 해제
        if (observerRef.current) observerRef.current.disconnect();

        // 새로운 IntersectionObserver 생성
        observerRef.current = new IntersectionObserver((entries) => {
            // 마지막 게시물이 보이면 isIntersection === true
            if (entries[0].isIntersecting && visibleCount < dummyPosts.length) {
                // 새로운 데이터(게시물 5개 추가)를 불러옴
                setVisibleCount((prev) => prev + 5);
            }
        });
        // 마지막 게시물이 존재하면 IntersectionObserver로 관찰을 시작
        if (node) observerRef.current.observe(node);
    }, [loading, visibleCount]);

    useEffect(() => {
        setPosts(dummyPosts.slice(0, visibleCount));
    }, [visibleCount]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
                {/* Tailwind CSS 스피너 / Loading Bar */}
                <div className="w-16 h-16 border-4 border-black dark:border-white opacity-5 border-t-transparent rounded-full animate-spin"></div>
                <div className="w-30 h-16 px-3 py-5 text-gray-400 dark:text-gray-300">
                    잠시만 기다려주세요!
                </div>
            </div>
        );
    }

    return (
        <PostContainer>
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">홈</h1>
            <div className="space-y-4">
                {posts.length > 0 ? (
                    posts.map((post, index) => {
                        if (index === posts.length - 1) {
                            // 마지막 요소에 ref 연결하여 감지
                            return <div ref={lastPostRef} key={post.postId}><PostCard post={post}/></div>;
                        } else {
                            return <PostCard key={post.postId} post={post}/>;
                        }
                    })
                ) : (
                    <p className="text-gray-400 dark:text-gray-500 text-center">게시물이 없습니다.</p>
                )}
            </div>
        </PostContainer>
    );
};

export default Home;
