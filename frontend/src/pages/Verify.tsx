import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/features/auth/context/AuthContext"
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { sendOtpApi } from "@/api/auth";
import { toast } from "sonner";
import useVerifyOtp from "@/features/auth/hooks/verifyOtp";

function Verify() {
    const { user } = useAuth();
    const [otp, setOtp] = useState("");
    const { status, mutate } = useVerifyOtp();
    async function verifyOtp(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        mutate(otp);
    }

    async function sendOtp() {
        try {
            await sendOtpApi();
            toast("OTP has been sent to your email successfully");
        } catch (err) {
            toast.error((err as Error).message)
        }
    };

    useEffect(() => {
        sendOtp();
    }, [])


    return (
        <Container>
            {user?.verified && <Navigate to="/" replace={true} />}
            <div className='p-2 lg:px-4 min-h-screen flex flex-col items-center justify-center max-w-96 mx-auto space-y-8'>
                <div className='w-10 h-10 border border-amber-600 my-8'></div>
                <h3 className='text-3xl font-semibold'>
                    Check your inbox
                </h3>
                <p className='mt-2 text-gray-500 text-center'>An verification has been sent to your email to{user?.email}<br /> Confirm your email and start using pulse</p>
                <form onSubmit={verifyOtp}>
                    <Field>
                        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </Field>
                    <Button className="w-full text-base py-4 mt-4" disabled={status == "pending" || otp.length !== 6}>Verify</Button>
                </form>
            </div>
        </Container>)
}

export default Verify
