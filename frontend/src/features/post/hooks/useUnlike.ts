/* eslint-disable @typescript-eslint/no-explicit-any */
import { unlikePostApi } from "@/api/post"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function useUnlike(postId: string|number) {
  const queryClient = useQueryClient()

  const { mutate: unlike, status } = useMutation({
    mutationFn: unlikePostApi,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts"] })

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
                    liked: false,
                    likes_count: Math.max(post.likes_count - 1, 0),
                  }
                : post
            ),
          })),
        }
      })

      return { previousData }
    },

    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["posts"], context.previousData)
      }
    },
  })

  return { unlike, status }
}

export default useUnlike