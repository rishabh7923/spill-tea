import type { User } from "./user";

export type CreatePostResponse = {
    success: boolean;
    message: string;
    data: Post
}


export type CreatePostSchema = {
    content: string,
    category_id: string | number,
    attachments: File[]
}

export type EditPostSchema = {
    id: string | number
    content?: string;
    categoryId?: string;
    attachmentsToRemove?: string[];
    attachmentsToAdd?: File[];
};

export type Post = {
    id: string;
    user_id: string;
    created_at: string;
    content: string;
    attachments: PostImage[];
    liked: boolean
    likes_count: number
    user: User;
    category: {
        id: number;
        name: string;
    }
}

export type PostImage = {
    id: number | string
    url: string;
    type: string;
    post_id: number;
    created_at: string;

}

export type PostCardProps = {
    id: string | number;
    author: string;
    avatar?: string;
    title?: string;
    content: string;
    user: User
    createdAt: string;
    likes: number;
    comments: number;
    liked: boolean;
    saved?: boolean;
    category: PostCategory;
    attachments: PostImage[];
};


export type PostCategory = {
    id: number;
    name: string;
}
