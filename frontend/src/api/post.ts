import { AxiosError } from "axios"
import axios from "../utils/axios"
import type { CreatePostResponse, CreatePostSchema, Post } from "@/types/post"


type GetPostsResponse = {
    posts: Post[],
    nextCursor: string | null
}

export async function getPostApi(postId: string): Promise<Post> {
    try {
        const res = await axios(`posts/${postId}`);
        const post = res.data.data.post
        return {
            ...post, likesCount: post.likes_count,
            userId: post.user_id,
            createdAt: post.created_at,
            user: { ...post.user, displayName: post.user.display_name, userName: post.userName },
        }
    }
    catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message)
        }
        throw new Error("something went wrong while creating post")
    }
}
export async function createPostApi(data: CreatePostSchema): Promise<CreatePostResponse> {
    try {
        const res = await axios("/posts", {
            method: "POST",
            data
        })
        return res.data
    }
    catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message)
        }
        throw new Error("something went wrong while creating post")
    }
}

export async function editPostApi(data: FormData): Promise<CreatePostResponse> {
    try {
        const res = await axios(`posts/${data.get("id")}`, {
            method: "PATCH",
            data
        })
        return res.data
    }
    catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message)
        }
        throw new Error("something went wrong while editing post")
    }
}

export async function getPostsApi(cursor: string | null = null): Promise<GetPostsResponse> {
    try {
        const url = cursor ? `/posts?cursor=${cursor}` : `/posts`;
        const res = await axios(url);
        //@ts-expect-errorts-ignore
        const posts = res.data.data.posts.map((post) => ({
            ...post,
            likesCount: post.likes_count,
            createdAt: post.created_at,
            user: { ...post.user, displayName: post.user.display_name, userName: post.userName },
        }));
        return { posts, nextCursor: res.data.pagination.next_cursor as string | null }
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message)
        }
        throw new Error("Something went wrong");
    }
}

export async function likePostApi(postId: string | number) {
    try {
        await axios.post(`posts/${postId}/likes`);
    }
    catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message)
        }
        throw new Error("Something went wrong");
    }
}

export async function unlikePostApi(postId: string | number) {
    try {
        await axios.delete(`posts/${postId}/likes`);
    }
    catch (e: unknown) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message)
        }
        throw new Error("Something went wrong");
    }
}

export async function deletePostApi(postId: string | number) {
    try {
        await axios.delete(`posts/${postId}`)
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error.message)
        }
        throw new Error("Something went wrong");
    }
}