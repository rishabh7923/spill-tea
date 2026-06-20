import PostFeed from '@/features/post/PostFeed';
import Layout from '@/components/Layout';
import CreateEditPostForm from '@/features/post/create-edit-post/CreateEditPostForm';

function Home() {
    return (<>
        <Layout>
            <div className='my-4'></div>
            <CreateEditPostForm />
            <PostFeed />
        </Layout>
    </ >
    )
}

export default Home
