import PostComments from '@/features/post/comment/PostComments';
import AddComment from '@/features/post/comment/AddComment';
import PostCard from '@/features/post/PostCard';
import Layout from '@/components/Layout';
import usePost from '@/features/post/hooks/usePost';
import { useParams } from 'react-router-dom';
import PostCardSkeleton from '@/features/post/PostCardSkeleton';


function PostPage() {
  const { pid } = useParams();
  const { post, status } = usePost(pid as string);
  return (
    <Layout>
      <div className='w-full mx-auto min-h-screen'>
        {status === "pending" && <PostCardSkeleton />}
        {post && <PostCard key={post.id}
          id={post.id}
          createdAt="2h ago"
          content={post.content}
          likes={post.likesCount}
          comments={8}
          liked={post.liked}
          saved={false}
          user={post.user}
          category={post.category}
          attachments={post.attachments} />}

        <AddComment />

        {/*  COMMENTS */}
        <PostComments />
      </div>
    </Layout>
  )
}

export default PostPage

