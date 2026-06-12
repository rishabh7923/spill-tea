import { AxiosError } from "axios";
import axios from "../utils/axios"
import type { User } from "@/types/user";

export async function updateProfileApi(data: { displayName: string, avatarId: number, bio: string }): Promise<User | undefined> {
    try {
        const res = await axios.patch("/users/me", { display_name: data.displayName, avatar_id: data.avatarId, bio: data.bio });
        return res.data.data.user
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
    }
}