import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function useNavigateToLogin() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    return () => {
        if (!isAuthenticated) navigate("/login");
    }
}