import {
    cardActivityInfo,
    cardPostInfo,
    cardUserInfo,
} from "../types/PostcardDto";
import { CommentDetailDto } from "../types/CommentDetailDto";

export interface MockCard {
    postInfo: cardPostInfo & { content?: string };
    userInfo: cardUserInfo;
    postActivity: cardActivityInfo;
    comments: CommentDetailDto[];
}

const base = import.meta.env.BASE_URL || "/";

export async function fetchMockPosts(): Promise<MockCard[]> {
    const res = await fetch(`${base}mock/postcards.json`);
    if (!res.ok) throw new Error("mock 게시물 로딩 실패");
    return res.json();
}

export async function fetchMockPostById(postId: string): Promise<MockCard | undefined> {
    const all = await fetchMockPosts();
    return all.find((p) => p.postInfo.postId === postId);
}
