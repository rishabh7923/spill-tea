import { type Avatar } from "./avatar"
export type User = {
    id: string;
    email: string;
    displayname: string;
    displayName: string;
    username: string;
    avatar: Avatar
    bio:string;
    verified: number;
}