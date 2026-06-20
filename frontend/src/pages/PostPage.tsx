import PostComments from '@/features/post/comment/CommentsList';
import AddComment from '@/features/post/comment/CreateComment';
import PostCard from '@/features/post/PostCard';
import Layout from '@/components/Layout';
import usePost from '@/features/post/hooks/usePost';
import PostCardSkeleton from '@/features/post/PostCardSkeleton';


function PostPage() {
  const { post, status } = usePost();
  return (
    <Layout>
      <div className='w-full mx-auto min-h-screen my-4'>
        {status === "pending" && <PostCardSkeleton />}
        {post && <PostCard key={post.id}
          id={post.id}
          createdAt="2h ago"
          content={post.content}
          likesCount={post.likes_count}
          comments={8}
          liked={post.liked}
          saved={false}
          user={post.user}
          category={post.category}
          attachments={post.attachments} />}
        <div className="px-2 lg:px-4 my-4">
          <AddComment mode="comment" />
        </div>

        {/*  COMMENTS */}
        <PostComments />
      </div>
    </Layout>
  )
}

export default PostPage

