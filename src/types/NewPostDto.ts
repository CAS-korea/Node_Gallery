export type postVisibility = 'PUBLIC' | 'PRIVATE' | 'FOLLOWERS_ONLY';

export interface NewPostDto {
    title : string,
    content : string,
    userTag: string[],
    postVisibility: postVisibility,
    thumbNailImage: string
}