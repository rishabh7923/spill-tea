/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { LOGINSCHEMA, SIGNUPSCHEMA } from "@/types/auth";
import { loginApi, signupApi } from "@/api/auth";
import Loader from "@/components/Loader";
import axios from "@/utils/axios";
import type { User } from "@/types/user";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isVerified: boolean;
    login: (creds: LOGINSCHEMA) => Promise<void>;
    signup: (creds: SIGNUPSCHEMA) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthChecking, setIsAuthChecking] = useState(true)

    const isAuthenticated = user !== null;
    const isVerified = user?.verified === 1;

    async function login(creds: LOGINSCHEMA) {
        try {
            setIsLoading(true);
            const response = await loginApi(creds);
            const { data } = response;

            localStorage.setItem("token", data.token);
            setUser(data.user);
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function signup(creds: SIGNUPSCHEMA) {
        try {
            setIsLoading(true);

            const response = await signupApi(creds);
            const { data } = response;

            localStorage.setItem("token", data.token);
            setUser(data.user);

        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
    }

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                setIsAuthChecking(false)
                return
            }

            try {
                const res = await axios("/users/me")

                // IF USER IS NOT VERIFIED SEND ALERT
                // toast("Please verify your email", {
                //     action: {
                //         label: "Verify",
                //         onClick: () => navigate("/verify")
                //     }
                // })
                setUser({ ...res.data.data.user, displayName: res.data.data.user.display_name })
            } catch {
                localStorage.removeItem("token")
                setUser(null)
            } finally {
                setIsAuthChecking(false)
            }
        }

        checkAuth()
    }, [])

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        isVerified,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {isAuthChecking ?
                <div className="min-h-screen w-full flex items-center justify-center">
                    <Loader />
                </div>
                : children
            }
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}

export default AuthProvider;