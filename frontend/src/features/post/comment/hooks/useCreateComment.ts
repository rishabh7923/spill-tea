import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentApi } from "@/api/comment";
import { createReplyApi } from "@/api/reply";
import { toast } from "sonner";
import type { CreateReplyParams } from "@/types/reply";
import type { CreateCommentParams } from "@/types/comment";
import { useParams } from "react-router-dom";

type Mode = "comment" | "reply";

function useCreateComment<T extends Mode>(mode: T) {
    const { pid } = useParams();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (
            data: T extends "reply"
                ? CreateReplyParams
                : CreateCommentParams
        ) => {
            return mode === "reply"
                ? createReplyApi({ ...data } as CreateReplyParams)
                : createCommentApi({ ...data } as CreateCommentParams);
        },

        onSuccess: (data) => {
            toast.success("comment added successfully");
            queryClient.setQueryData<Comment[]>(["comments", pid], (old = []) => [...old, data])
        },

        onError: (error: unknown) => {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        },
    });
}

export default useCreateComment;