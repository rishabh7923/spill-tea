import Topbar from '@/components/Topbar';
import Bottombar from '@/components/Bottombar';
import Container from '@/components/Container';
import TrendingSection from '@/components/TrendingSection';
import FloatingSidebar from '@/components/FloatingSidebar';
import PostCardSkeleton from '@/features/post/PostCardSkeleton';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import PostComments from '@/features/post/comment/PostComments';
import AddComment from '@/features/post/comment/AddComment';


function PostPage() {
  const [showAddComment, setShowAddComment] = useState(false);
  return (
    <>
      <Topbar />
      <Container>
        <div className='top-16 relative flex md:px-2'>
          <FloatingSidebar />
          <div className='max-w-xl w-full mx-auto min-h-screen border'>
            <PostCardSkeleton />

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

