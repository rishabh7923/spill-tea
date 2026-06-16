import { createPostApi } from "@/api/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useCreatePost({ onSuccess, onError }: { onSuccess: () => void, onError: () => void }) {
    const client = useQueryClient();
    const { isSuccess, data, error, status, mutate: createPost } = useMutation({
        mutationFn: createPostApi,
        onSuccess: () => {
            toast.success("Post created successfully");
            if (onSuccess) onSuccess();
            client.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (e) => {
            toast(e.message);
            if (onError) onError();
        }
    })
    return { createPost, isSuccess, data, error, status }
}

export default useCreatePost