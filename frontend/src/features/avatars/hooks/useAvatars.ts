import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getAvatarsApi } from "@/api/avatar";

function useAvatars() {
    const { pid } = useParams();
    const { data:avatars, status } = useQuery({
        queryFn: getAvatarsApi,
        queryKey:["comments", pid]
        
    })
    return {avatars, status}
}

export default useAvatars