import { editPostApi } from "@/api/post";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom'

function useEditPost({ onSuccess, onError }: { onSuccess: () => void, onError: () => void }) {
    const navigate = useNavigate();
    const { isSuccess, data, error, status, mutate: editPost } = useMutation({
        mutationFn: editPostApi,
        onSuccess: (data) => {
            navigate(`/p/${String(data.data.post.id)}`);
            toast.success("Post edited successfully");
            if (onSuccess) onSuccess();
        },
        onError: (e) => {
            toast(e.message);
            if (onError) onError();
        }
    })
    return { editPost, isSuccess, data, error, status }
}

export default useEditPost