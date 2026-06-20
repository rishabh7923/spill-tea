import type { Pagination } from "./pagination";
import type { UserPreview } from "./user";

//
// Core Types
//
export type Comment = {
    id: number;
    content: string;
    created_at: string;
    parent_id: number | string | null;
    user: UserPreview;
    reply_count: number;
    optimistic?: boolean
};

//
// Base Params
//
type PostParams = {
    postId: string | number;
};

//
// API Params
//
export type GetCommentsParams = PostParams;

export type DeleteCommentParams = PostParams & {
    commentId: string | number
};

export type CreateCommentParams = PostParams & {
    content: string;
};

//
// API Responses
//
export type CommentsResponse = {
    success: boolean;
    data: {
        comments: Comment[];
    };
    pagination: Pagination;
};