import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

export default function useNavigateToLogin() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    return () => {
        if (!isAuthenticated) navigate("/login");
    }
}