import { Button } from '@/components/ui/button';
import { useState } from 'react';
import PostComments from '@/features/post/comment/PostComments';
import AddComment from '@/features/post/comment/AddComment';
import PostCard from '@/features/post/PostCard';
import Layout from '@/components/Layout';
import usePost from '@/features/post/hooks/usePost';
import { useParams } from 'react-router-dom';
import PostCardSkeleton from '@/features/post/PostCardSkeleton';


function PostPage() {
  const [showAddComment, setShowAddComment] = useState(false);
  const { pid } = useParams();
  const { post, status } = usePost(pid as string);
  return (
    <Layout>
      <div className='w-full mx-auto min-h-screen'>
        {status === "pending" && <PostCardSkeleton />}
        {post && <PostCard key={post.id}
          id={post.id}
          author={post.user_id}
          createdAt="2h ago"
          content={post.content}
          likes={post.likes_count}
          comments={8}
          liked={post.liked}
          saved={false}
          user={post.user}
          category={post.category}
          attachments={post.attachments} />}

        {/* SHOW COMMENT CREATION BOX */}
        {showAddComment ? <AddComment /> :
          <div className='lg:p-4 p-2'>
            <Button className='w-full rounded-2xl' variant="outline" onClick={() => setShowAddComment(!showAddComment)}>Join the discussion</Button>
          </div>
        }

        {/*  COMMENTS */}
        <PostComments />
      </div>
    </Layout>
  )
}

export default PostPage

