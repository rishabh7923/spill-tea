import { AxiosError } from "axios";
import axios from "../utils/axios"
import type { Comment, CreateCommentParams, DeleteCommentParams, GetCommentsParams } from "@/types/comment";

export async function createCommentApi(data: CreateCommentParams) {
    try {
        await axios.post(`posts/${data.postId}/comments`, {
            content: data.content
        })
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message);
        }
        throw e;
    }
}

export async function getCommentsApi({ postId }: GetCommentsParams): Promise<Comment[]> {
    try {
        const res = await axios.get(`posts/${postId}/comments`)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return res.data.data.comments.map((comment: any) => ({ ...comment, replies: 2 }));
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message);
        }
        throw e;
    }
}

export async function deleteCommentApi({ postId, commentId }: DeleteCommentParams) {
    try {
        await axios.delete(`posts/${postId}/comments/${commentId}`)
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message);
        }
        throw e;
    }
}