import { useState } from "react";
import { Shuffle } from "lucide-react";

import useAvatars from "@/features/avatars/hooks/useAvatars";
import { useAuth } from "@/features/auth/context/AuthContext";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Avatar as AvatarComponent,
    AvatarImage,
} from "@/components/ui/avatar";
import Topbar from "@/components/Topbar";
import Container from "@/components/Container";
import useUpdateProfile from "@/features/user/hooks/useUpdateProfile";

export default function Avatar() {
    const { avatars = [], status } = useAvatars();
    const { user } = useAuth();
    const { updateProfile, status: isUpdatingAvatar } = useUpdateProfile();
    const [selectedId, setSelectedId] = useState<number>(
        user?.avatar?.id ?? 1
    );

    const selectedAvatar =
        avatars.find((avatar) => avatar.id === selectedId) ??
        user?.avatar ??
        avatars[0];

    const randomAvatar = () => {
        if (!avatars.length) return;

        const random =
            avatars[Math.floor(Math.random() * avatars.length)];

        setSelectedId(random.id);
    };

    if (status === "pending") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading avatars...
            </div>
        );
    }

    return (
        <>
            <Topbar />
            <Container >

                <div className="mt-4"></div>
                <div className="grid gap-2 lg:grid-cols-[320px_1fr]">
                    {/* Preview */}

                    <Card className="sticky top-6 h-fit w-60">
                        <CardContent className="flex flex-col gap-6 items-center p-8">
                            <AvatarComponent className="border size-30">
                                <AvatarImage
                                    src={selectedAvatar?.url}
                                    alt={selectedAvatar?.name}
                                />
                            </AvatarComponent>

                            <div className="text-center">
                                <h2 className="font-semibold text-xl">
                                    {selectedAvatar?.name}
                                </h2>

                                <p className="text-muted-foreground text-sm">
                                    This is how others will see you
                                </p>
                            </div>

                            <div className="flex gap-2 w-full">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={randomAvatar}
                                >
                                    <Shuffle className="mr-2 size-4" />
                                    Random
                                </Button>

                                <Button
                                    className="flex-1"
                                    disabled={
                                        selectedId === user?.avatar?.id || isUpdatingAvatar == "pending"
                                    }
                                    onClick={() => updateProfile({ avatar_id: selectedId })}
                                >
                                    Save
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Content */}

                    <div className="space-y-6">

                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-4">
                            {avatars.map((avatar) => (
                                <Card
                                    key={avatar.id}
                                    onClick={() =>
                                        setSelectedId(avatar.id)
                                    }
                                    className={`ring-2 ring-primary/20 transition-all cursor-pointer ${selectedId === avatar.id ? "border-primary" : ""} hover:scale-105`}
                                >
                                    <CardContent className="flex flex-col gap-3 items-center p-4">
                                        <AvatarComponent className="size-20">
                                            <AvatarImage
                                                src={avatar.url}
                                                alt={avatar.name}
                                            />
                                        </AvatarComponent>

                                        <span className="font-medium text-sm">
                                            {avatar.name}
                                        </span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {avatars.length === 0 && (
                            <div className="py-10 text-center text-muted-foreground">
                                No avatars found.
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </>

    );
}