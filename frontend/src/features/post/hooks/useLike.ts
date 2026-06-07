/* eslint-disable @typescript-eslint/no-explicit-any */
import { likePostApi } from "@/api/post"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

function useLike(postId: string|number) {
    const queryClient = useQueryClient()
    const { data, mutate: like, status } = useMutation({
        mutationFn: likePostApi,

        onMutate: async () => {
            const previousData = queryClient.getQueryData(["posts"])

            queryClient.setQueryData(["posts"], (old: any) => {
                if (!old) return old

                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        posts: page.posts.map((post: any) =>
                            post.id === postId
                                ? {
                                    ...post,
                                    liked: !post.liked,
                                    likes_count: post.liked ? post.likes_count - 1 : post.likes_count + 1,
                                }
                                : post
                        ),
                    })),
                }
            })

            return { previousData };
        },

        onError: (_err, _variables, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(["posts"], context.previousData)
            }
            toast(_err.message);
        },
    })

    return { data, like, status }
}

export default useLike
