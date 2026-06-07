import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePost from '@/features/post/CreatePost';
import { useAuth } from '@/features/auth/AuthContext';
import PostFeed from '@/features/post/PostFeed';
import Topbar from '@/components/Topbar';
import Bottombar from '@/components/Bottombar';
import Container from '@/components/Container';
import TrendingSection from '@/components/TrendingSection';
import { toast } from 'sonner';
import FloatingSidebar from '@/components/FloatingSidebar';

function Home() {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    useEffect(() => {
        if (!user) return
        if (isAuthenticated && !user?.verified) {
            toast("Please verify your email", {
                action: {
                    label: "Verify",
                    onClick: () => navigate("/verify")
                }
            })
        }
    }, [user, isAuthenticated, navigate])
    return (<>
        <Topbar />
        <Container>
            <div className='top-16 relative flex md:px-2'>
                <FloatingSidebar />
                <div className='max-w-xl w-full mx-auto min-h-screen border'>
                    <div className='mx-auto'>
                        <div className='border-b py-4 px-2'>
                            <CreatePost />
                        </div>
                        <PostFeed />
                    </div>
                </div>
                <TrendingSection />
            </div>
            <Bottombar />
        </Container>
    </>
    )
}

export default Home