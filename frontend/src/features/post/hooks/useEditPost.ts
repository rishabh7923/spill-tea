import { editPostApi } from "@/api/post";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function useEditPost({ onSuccess, onError }: { onSuccess: () => void, onError: () => void }) {
    const { isSuccess, data, error, status, mutate: editPost } = useMutation({
        mutationFn: editPostApi,
        onSuccess: () => {
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