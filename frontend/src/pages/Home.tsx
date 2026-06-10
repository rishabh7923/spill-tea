import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import PostFeed from '@/features/post/PostFeed';
import Topbar from '@/components/Topbar';
import Bottombar from '@/components/Bottombar';
import Container from '@/components/Container';
import TrendingSection from '@/components/TrendingSection';
import { toast } from 'sonner';
import FloatingSidebar from '@/components/FloatingSidebar';
import EditCreatePost from '@/features/post/create-edit-post/PostEditor';

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
            <div className='top-16 relative flex md:px-2 gap-4'>
                <FloatingSidebar />
                <div className='flex-1 w-full mx-auto min-h-screen'>
                    <div>
                        <PostFeed />
                    </div>
                </div>
                <TrendingSection />
            </div>
            <Bottombar />
        </Container>
        <EditCreatePost/>
    </>
    )
}

export default Home