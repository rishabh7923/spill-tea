import useInfinitePosts from './hooks/useInfinitePosts';
import usePosts from './hooks/usePosts'
import PostCard from './PostCard'
import PostCardSkeleton from './PostCardSkeleton'

function PostFeed() {
    const { data, isFetchingNextPage, status, error, fetchNextPage } = usePosts();
    const lastPostRef = useInfinitePosts(fetchNextPage)

    if (status === "pending") {
        return (
            <ul className="mt-2 w-full">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
            </ul>
        );
    }

    const posts = data?.pages.flatMap((page) => page.posts) ?? [];
    return (
        <ul className="mx-auto w-full px-2 md:px-4 divide-y">
            {posts.map((post, i) => (
                <li>
                    <PostCard
                        key={post.id}
                        id={post.id}
                        createdAt={post.created_at}
                        content={post.content}
                        likesCount={post.likes_count}
                        comments={8}
                        liked={post.liked}
                        saved={false}
                        ref={i === posts.length - 1 ? lastPostRef : null}
                        user={post.user}
                        category={post.category}
                        attachments={post.attachments}
                    />
                </li>

            ))}

            {isFetchingNextPage && <PostCardSkeleton />}
            {status === "error" && <p>{error?.message}</p>}
        </ul>
    );
}

export default PostFeed