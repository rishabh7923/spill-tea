import Container from '@/components/Container'
import AuthForm from '@/features/auth/components/AuthForm'

function Login() {
    return (
        <Container>
            <div className='flex items-center min-h-screen px-2 lg:px-4'>
                <AuthForm variant='login' />
            </div>
        </Container>
    )
}

export default Login