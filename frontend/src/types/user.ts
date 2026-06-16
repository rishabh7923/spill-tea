import { type Avatar } from "./avatar"

export type BaseUser = {
    id: number;
    username: string;
};

export type UserPreview = BaseUser & {
    display_name: string;
    avatar_url: string | null;
};

export type User = BaseUser & {
    email: string;
    password: string;
    displayName: string;
    avatar: Avatar;
    bio: string;
    verified: boolean;
};

export type UserResponse = {
    success: boolean;
    data: {
        user: User;
    };
};