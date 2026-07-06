import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ChevronRight, FileText, Signature, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";

import { useAuth } from "@/features/auth/context/AuthContext";
import useUpdateProfile from "@/features/user/hooks/useUpdateProfile";

import type { UpdateProfileParams } from "@/types/user";

import SettingDialog from "./SettingDialog";
import SettingRow from "./SettingRow";

const settings = [
    {
        key: "display_name",
        title: "Display name",
        description:
            "Changing your display name won't change your username.",
        icon: Signature,
        label: "Display Name",
        placeholder: "Enter your name",
    },
    {
        key: "bio",
        title: "About description",
        description: "Tell us a bit about yourself...",
        icon: FileText,
        label: "Bio",
        placeholder: "Tell us a bit about yourself",
    },
] as const;


function ProfileTab() {
    const [open, setOpen] = useState(false);

    const [activeSetting, setActiveSetting] = useState<
        (typeof settings)[number] | null
    >(null);

    const { user } = useAuth();
    const { updateProfile } = useUpdateProfile();

    const { register, handleSubmit } = useForm<UpdateProfileParams>({
        defaultValues: {
            display_name: user?.display_name ?? "",
            bio: user?.bio ?? "",
        },
    });

    const handleOpen = (setting: (typeof settings)[number]) => {
        setActiveSetting(setting);
        setOpen(true);
    };

    const onSubmit: SubmitHandler<UpdateProfileParams> = (data) => {
        updateProfile(data, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <section>
            {settings.map((setting) => (
                <SettingRow
                    key={setting.key}
                    icon={setting.icon}
                    title={setting.title}
                    description={setting.description}
                    onClick={() => handleOpen(setting)}
                    right={
                        <Button
                            variant="ghost"
                            size="icon"
                            className="group-hover:bg-accent rounded-full"
                        >
                            <ChevronRight />
                        </Button>
                    }
                />
            ))}

            <SettingRow
                icon={User}
                title="Avatar"
                description="Edit your avatar or upload an image"
                onClick={() =>
                    toast.info(
                        "Avatar changes are currently disabled"
                    )
                }
                right={
                    <Button
                        className="group-hover:bg-accent rounded-full"
                        variant="ghost"
                        size="icon"
                    >
                        <ChevronRight />
                    </Button>
                }
            />

            <SettingDialog
                open={open}
                onOpenChange={setOpen}
                title={activeSetting?.title ?? ""}
                description={activeSetting?.description}
                onSubmit={handleSubmit(onSubmit)}
            >
                {activeSetting?.key === "display_name" && (
                    <Field>
                        <InputGroup className="h-auto">
                            <InputGroupInput
                                {...register("display_name", {
                                    required: true,
                                })}
                                placeholder="Enter your name"
                            />

                            <InputGroupAddon align="block-start">
                                <InputGroupText>
                                    Display Name
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                )}

                {activeSetting?.key === "bio" && (
                    <Field>
                        <InputGroup className="h-auto">
                            <InputGroupInput
                                {...register("bio", {
                                    required: true,
                                })}
                                placeholder="Tell us a bit about yourself"
                            />

                            <InputGroupAddon align="block-start">
                                <InputGroupText>
                                    Bio
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                )}
            </SettingDialog>
        </section>
    );
}

export default ProfileTab;