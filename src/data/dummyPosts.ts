// src/data/dummyPosts.ts
import type { PostEntity } from "../types/PostEntity";

export const dummyPosts: PostEntity[] = [
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
        postVisibility: "public",
        thumbNailImage: "https://via.placeholder.com/50",
        role: "STUDENT"
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
        postVisibility: "public",
        thumbNailImage: "https://via.placeholder.com/50",
        role: "STUDENT"
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
        postVisibility: "followersOnly",
        thumbNailImage: "https://via.placeholder.com/50",
        role: "STUDENT"
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
        postVisibility: "private",
        thumbNailImage: "https://via.placeholder.com/50",
        role: "PROFESSOR"
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
        postVisibility: "public",
        thumbNailImage: "https://via.placeholder.com/50",
        role: "STUDENT"
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
        postVisibility: "followersOnly",
        thumbNailImage: "https://via.placeholder.com/50",
        role: "STUDENT"
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
        postVisibility: "public",
        thumbNailImage: "https://via.placeholder.com/50",
        role: "STUDENT"
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
        postVisibility: "private",
        thumbNailImage: "https://via.placeholder.com/50",
        role: "PROFESSOR"
    },
];

// 9번부터 30번까지 무작위 값을 부여하여 더미 데이터를 추가 (총 30개까지)
for (let i = 9; i <= 30; i++) {
    const userIdArray = ["hajin", "sejin", "seonkyo", "geunwoo"];
    const roles = ["STUDENT", "STUDENT", "STUDENT", "PROFESSOR"];
    const idx = i % 4;
    dummyPosts.push({
        postId: `${i}`,
        userId: userIdArray[idx],
        title: `테스트 게시글 ${i}`,
        content: `이것은 테스트 게시글 ${i}의 내용입니다.`,
        summary: `테스트 게시글 요약 ${i}`,
        userTag: [`#태그${i}`, `#테스트${i}`],
        createAt: new Date(`2025-02-13T${(i % 24).toString().padStart(2, "0")}:00:00`),
        commentsCount: Math.floor(Math.random() * 10),
        likesCount: Math.floor(Math.random() * 50),
        scrapsCount: Math.floor(Math.random() * 10),
        reportsCount: Math.floor(Math.random() * 5),
        postVisibility: "public",
        thumbNailImage: "https://via.placeholder.com/50",
        role: roles[idx]
    });
}
