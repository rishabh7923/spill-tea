import PostFeed from '@/features/post/PostFeed';
import Layout from '@/components/Layout';
import CreateEditPostForm from '@/features/post/create-edit-post/CreateEditPostForm';

function Home() {
    return (<>
        <Layout>
            <div className='my-4 bo'></div>
            <div className='border'>
                <CreateEditPostForm />
            </div>
            <PostFeed />
        </Layout>
    </ >
    )
}

export default Home
