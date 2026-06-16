import { AxiosError, type AxiosResponse } from "axios";
import axios from "../utils/axios"
import type { CreateReplyParams, GetRepliesParams, RepliesPage, RepliesResponse } from "@/types/reply";

export async function getRepliesApi(data: GetRepliesParams): Promise<RepliesPage> {
    try {
        const res: AxiosResponse = await axios.get(`posts/${data.postId}/comments/${data.commentId}/replies`);
        const repliesResponse: RepliesResponse = res.data;
        const { replies } = repliesResponse.data;
        const { next_page } = repliesResponse.pagination;
        return {
            replies,
            next_page,
        };
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message);
        }
        throw e;
    }
}

export async function createReplyApi(data: CreateReplyParams) {
    try {
        await axios.post(`posts/${data.postId}/comments/${data.commentId}/replies`, data);
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message)
        }
    }
}
