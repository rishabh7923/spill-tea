import { createPostApi } from "@/api/post";
import { useNavigate } from 'react-router-dom'
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

function useCreatePost() {
    const navigate = useNavigate();
    const { isSuccess, data, error, status, mutate: createPost } = useMutation({
        mutationFn: createPostApi,
        onSuccess: (data) => {
            navigate(`/p/${String(data.data.post.id)}`);
            toast.success("Post created successfully");
        },
        onError: (e) => {
            toast.error(e.message);
        }
    })
    return { createPost, isSuccess, data, error, status }
}

export default useCreatePost