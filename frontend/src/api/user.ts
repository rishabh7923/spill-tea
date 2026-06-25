import { AxiosError } from "axios";
import axios from "../utils/axios"
import type { UpdateProfileParams, User } from "@/types/user";

export async function updateProfileApi(data: UpdateProfileParams): Promise<User | undefined> {
    try {
        const res = await axios.patch("/users/me", data);
        return res.data.data.user
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
    }
}