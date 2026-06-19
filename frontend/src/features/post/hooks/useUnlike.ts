/* eslint-disable @typescript-eslint/no-explicit-any */
import { unlikePostApi } from "@/api/post"
import type { Post } from "@/types/post"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

function useUnlike(postId: string | number) {
  const queryClient = useQueryClient()
  const { pid } = useParams();
  const { mutate: unlike, status } = useMutation({
    mutationFn: unlikePostApi,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts"] })

      const previousData = queryClient.getQueryData(["posts"])

      if (pid) {
        queryClient.setQueryData<Post>(["post", pid], (old: Post | undefined) => {
          if (!old) return old
          console.log(old, "old")
          return { ...old, liked: !old.liked, likes_count: old.likes_count - 1 }
        })
      }

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