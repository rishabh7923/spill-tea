import PostFeed from '@/features/post/PostFeed';
import EditCreatePost from '@/features/post/create-edit-post/PostEditor';
import Layout from '@/components/Layout';

function Home() {
    return (<>
        <Layout><PostFeed /></Layout>
        <EditCreatePost />
    </ >
    )
}

export default Home