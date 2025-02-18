export type postVisibility = 'PUBLIC' | 'PRIVATE' | 'FOLLOWERS_ONLY';

export interface PostDTO {
    title : string,
    content : string,
    userTag: string[],
    postVisibility: postVisibility
}