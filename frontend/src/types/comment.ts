import type { User } from "./user";

export type Comment = {
    id: string;
    content: string;
    user: User
    created_at: Date
}

export type addCommentSchema = {
    postId: string,
    content: string
}
export type deleteCommentSchema = { postId: string, commentId: string }

export type getPostCommentsSchema = {
    postId: string
}

export type getPostCommentsResponse = Comment[]

