import { useAuth } from '@/features/auth/context/AuthContext'
import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

function ProtectRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to='/login' replace />
    return (
        <>
            {children}
        </>
    )
}

export default ProtectRoute