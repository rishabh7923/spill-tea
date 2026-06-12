import { AxiosError } from "axios";
import axios from "../utils/axios"
import type { Avatar } from "@/types/avatar";

export async function getAvatarsApi(): Promise<Avatar[] | undefined> {
    try {
        const res = await axios.get("/avatars");
        return res.data.data.avatars;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
        }
    }
}