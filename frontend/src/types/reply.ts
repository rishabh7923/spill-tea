import type { Pagination } from "./pagination";
import type { Comment } from "./comment";
type Reply = Comment;

export type GetRepliesParams = {
    postId: number | string;
    commentId: number | string;
    page?: number;
    limit?: number;
};

export type RepliesResponse = {
    success: boolean;
    data: {
        replies: Reply[];
    };
    pagination: Pagination;
};

export type RepliesPage = {
    replies: Reply[];
    next_page: number | null;
};

export type CreateReplyParams = {
    postId: string | number;
    commentId: string | number;
    content: string
}