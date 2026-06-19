import { getPostApi } from "@/api/post"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";

function usePost() {
    const { pid } = useParams();
    const { data: post, status } = useQuery({
        queryFn: () => getPostApi(pid!),
        queryKey: ["post", pid]
    }
    )
    return { post, status };
}

export default usePost