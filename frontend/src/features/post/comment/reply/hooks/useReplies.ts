import { getRepliesApi } from "@/api/reply";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const LIMIT = 10;


export const useReplies = ({ parentCommentId }: { parentCommentId: string | number }) => {
    const { pid } = useParams()
    return useInfiniteQuery({
        queryKey: ["replies", parentCommentId.toLocaleString()],

        queryFn: async ({ pageParam }) => {
            return getRepliesApi(
                {
                    postId: pid!,
                    commentId: parentCommentId!,
                    page: pageParam,
                    limit: LIMIT
                }
            );
        },

        initialPageParam: 1,

        getNextPageParam: (lastPage) => {
            return lastPage.next_page
        },

    });
};