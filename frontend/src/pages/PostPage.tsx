import Topbar from '@/components/Topbar';
import Bottombar from '@/components/Bottombar';
import Container from '@/components/Container';
import TrendingSection from '@/components/TrendingSection';
import FloatingSidebar from '@/components/FloatingSidebar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import PostComments from '@/features/post/comment/PostComments';
import AddComment from '@/features/post/comment/AddComment';
import { useLocation } from 'react-router-dom';
import PostCard from '@/features/post/PostCard';
import type { Post } from '@/types/post';

type LocationState = {
  post: Post;
};

function PostPage() {
  const [showAddComment, setShowAddComment] = useState(false);
  const location = useLocation();
  const post = (location.state as LocationState)?.post;

  return (
    <>
      <Topbar />
      <Container>
        <div className='top-16 relative flex md:px-2'>
          <FloatingSidebar />
          <div className='max-w-xl w-full mx-auto min-h-screen border'>
            <PostCard key={post.id}
              id={post.id}
              author={post.user_id}
              createdAt="2h ago"
              content={post.content}
              image={post.attachments?.[0]?.url as unknown as string}
              likes={post.likes_count}
              comments={8}
              liked={post.liked}
              saved={false}
              user={post.user}
              category={post.category} />

            {/* SHOW COMMENT CREATION BOX */}
            {showAddComment ? <AddComment /> :
              <div className='lg:p-4 p-2'>
                <Button className='w-full rounded-2xl' variant="outline" onClick={() => setShowAddComment(!showAddComment)}>Join the discussion</Button>
              </div>
            }

            {/*  COMMENTS */}
            <PostComments />
          </div>
          <TrendingSection />
        </div>
        <Bottombar />
      </Container>
    </>
  )
}

export default PostPage

