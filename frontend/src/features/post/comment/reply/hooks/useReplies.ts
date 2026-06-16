import { getRepliesApi } from "@/api/reply";
import { useInfiniteQuery } from "@tanstack/react-query";

const LIMIT = 10;

type UseRepliesParams = {
    postId: string | number;
    commentId: string | number;
};

export const useReplies = ({
    postId,
    commentId,
}: UseRepliesParams) => {
    return useInfiniteQuery({
        queryKey: ["replies", postId, commentId],

        queryFn: async ({ pageParam }) => {
            return getRepliesApi(
                {
                    postId,
                    commentId,
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