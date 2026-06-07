import { Button } from '@/components/ui/button'
import { FcGoogle } from "react-icons/fc";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuth } from './AuthContext';
import { useRef, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import CommunityBanner from './CommunityBanner';
import { toast } from 'sonner';

function AuthForm({ variant }: { variant: "login" | "signup" }) {
    const title = variant === "login" ? "Login" : "Create Account";
    const submitBtnText = variant === "login" ? "Login" : "Sign up";
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const { login, signup, isAuthenticated, isLoading } = useAuth();
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const email = emailRef.current?.value || "";
        const username = usernameRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        if (variant === "login") {
            login({ username, password });
        } else {
            signup({ username, password, email });
        }

    }
    if (isAuthenticated) return <Navigate to="/" replace />
    return (
        <div className='flex flex-col lg:flex-row'>

            <div className="lg:w-1/2 bg-[url('/images/bg.jpg')] bg-top bg-cover lg:min-h-screen p-4 md:p-0">
                <div className='flex h-full flex-col gap-16 lg:gap-8 justify-center lg:pl-8'>
                    <Badge className="p-2 flex items-center gap-2" variant="secondary">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

                            <span className="relative h-2 w-2 rounded-full bg-green-500" />
                        </span>
                        Live community
                    </Badge>
                    <h1 className='text-4xl font-bold'>
                        Connect With your <br /> campus.
                    </h1>
                    <p className='text-sm max-w-lg'>Join the exclusive digital discourse designed for students. Real-time updates, study groups, and campus events—all in one place.</p>
                    <CommunityBanner />
                </div>
            </div>
            <div className='lg:w-1/2 text-left justify-center p-4 py-8 md:p-0'>
                <div className='lg:px-20'>
                    <div className='w-10 h-10 border border-amber-600 my-8'></div>
                    <h3 className='text-3xl font-semibold'>
                        {title}
                    </h3>
                    <p className='mt-2 text-gray-500'>Join the exclusive digital discourse designed for students. Real-time updates, study groups, and campus events—all in one place.</p>
                    <div className='mt-8'>
                        <Button className="w-full  text-base py-4" variant="outline" onClick={()=>toast("coming soon...")}><FcGoogle /> Continue with google</Button>
                        {/* <Button className="w-full  text-base py-4 mt-2" variant="outline"><FaDiscord /> Continue with Discord</Button> */}
                    </div>
                    <p className='text-center my-4 uppercase text-gray-500'>or</p>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                    Username
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-name-43j"
                                    placeholder="Evil Rabbit"
                                    ref={usernameRef}
                                    required
                                />
                            </Field>
                            {variant === "signup" && <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                    Email
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-name-43j"
                                    placeholder="Evil Rabbit"
                                    type='email'
                                    ref={emailRef}
                                    required
                                />
                            </Field>}
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                    Password
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-name-43j"
                                    placeholder="Evil Rabbit"
                                    type='password'
                                    ref={passwordRef}
                                    required
                                />
                            </Field>
                        </FieldGroup>
                        <Button className="w-full  text-base py-4 mt-4" disabled={isLoading}>{submitBtnText}</Button>
                        {variant === "login" ?
                            <div className='text-center'>
                               New to spill? <Button className='px-0' variant="link" onClick={()=> navigate("/signup")}>Create an account</Button>
                            </div>
                        :
                        <div className='text-center'>
                               Already have an account <Button className='px-0' variant="link" onClick={()=> navigate("/login")}>Login</Button>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthForm