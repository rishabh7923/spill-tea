import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { createReplyApi } from "@/api/reply";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import type { RepliesPage } from "@/types/reply";
import { useAuth } from "@/features/auth/context/AuthContext";
import type { Comment } from "@/types/comment";

function useCreateReply() {
    const [searchParams] = useSearchParams();
    const replyTo = searchParams.get("replyTo");
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const { mutate: createReply, status: replying } = useMutation({
        mutationFn: createReplyApi,

        onMutate: async (newReply) => {
            const optimisticReply: Comment = {
                id: Date.now(),
                ...newReply,
                created_at: new Date().toISOString(),
                parent_id: replyTo,
                reply_count: 0,
                user: {
                    id: user!.id,
                    display_name: user?.display_name || "Unknown",
                    avatar_url: user?.avatar?.url || "No avatar",
                    username: user?.username || "Unknown"
                },
                optimistic: true
            };

            queryClient.setQueryData(
                ["replies", replyTo],
                (old: InfiniteData<RepliesPage> | undefined) => {
                    if (!old) {
                        return {
                            pages: [
                                {
                                    replies: [optimisticReply],
                                    next_page: null,
                                },
                            ],
                            pageParams: [1],
                        };
                    }

                    return {
                        ...old,
                        pages: [
                            {
                                ...old.pages[0],
                                replies: [optimisticReply, ...old.pages[0].replies],
                            },
                            ...old.pages.slice(1),
                        ],
                    };
                }
            );
        },

        onSuccess: (newReply) => {
            toast.success("reply added successfully");

            queryClient.setQueryData<InfiniteData<RepliesPage>>(
                ["replies", replyTo],
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        pages: [
                            {
                                ...old.pages[0],
                                replies: old.pages[0].replies.map((r) =>
                                    r.optimistic ? newReply : r
                                ),
                            },
                            ...old.pages.slice(1),
                        ],
                    };
                }
            );
        },

        onError: (error: unknown) => {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        },
    });
    return { createReply, replying };
}

export default useCreateReply;