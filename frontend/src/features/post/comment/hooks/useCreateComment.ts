import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentApi } from "@/api/comment";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

function useCreateComment() {
    const { pid } = useParams();
    const queryClient = useQueryClient();
    const { mutate: createComment, status: commenting } = useMutation({
        mutationFn: createCommentApi,

        onSuccess: (data) => {
            toast.success("comment added successfully");
            queryClient.setQueryData<Comment[]>(["comments", pid], (old = []) => [data, ...old])
        },

        onError: (error: unknown) => {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        },

    });
    return { createComment, commenting }
}

export default useCreateComment;