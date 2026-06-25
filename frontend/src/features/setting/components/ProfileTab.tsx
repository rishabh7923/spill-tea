import SettingRow from "./SettingRow"
import { ChevronRight, FileText, Signature, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import SettingDialog from "./SettingDialog"
import useUpdateProfile from "@/features/user/hooks/useUpdateProfile"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useAuth } from "@/features/auth/context/AuthContext"
import type { UpdateProfileParams } from "@/types/user"

function ProfileTab() {
    const { user } = useAuth();
    const { updateProfile } = useUpdateProfile();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            display_name: user?.display_name,
            bio: user?.bio
        }
    });


    const onSubmit: SubmitHandler<UpdateProfileParams> = (data) => {
        updateProfile(data);
    };

    return (
        <section>
            <SettingRow
                icon={Signature}
                title="Display name"
                description="Changing your display name won't change your username."
                right={
                    <SettingDialog
                        title="Display name"
                        description="Changing your display name won't change your username."
                        onSubmit={handleSubmit(onSubmit)}
                        trigger={
                            <Button
                                className="group-hover:bg-accent rounded-full"
                                variant="ghost"
                                size="icon"
                                type="button">
                                <ChevronRight />
                            </Button>}>
                        <Field>
                            <InputGroup className="h-auto">
                                <InputGroupInput {...register("display_name", { required: true })}
                                    id="block-start-input"
                                    placeholder="Enter your name"
                                />
                                <InputGroupAddon align="block-start">
                                    <InputGroupText>Display Name</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>
                    </SettingDialog>
                }
            />
            <SettingRow
                icon={FileText}
                title="About description"
                description="Tell us a bit about yourself..."
                right={
                    <SettingDialog
                        title="About description"
                        description="Tell us a bit about yourself..."
                        onSubmit={handleSubmit(onSubmit)}
                        trigger={
                            <Button
                                className="group-hover:bg-accent rounded-full"
                                variant="ghost"
                                size="icon"
                                type="button">
                                <ChevronRight />
                            </Button>}>
                        <Field>
                            <InputGroup className="h-auto">
                                <InputGroupInput {...register("bio", { required: true })}
                                    id="block-start-input"
                                    placeholder="Tell us a bit about yourself"
                                />
                                <InputGroupAddon align="block-start">
                                    <InputGroupText>Bio</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>
                    </SettingDialog>
                }
            />

            <SettingRow
                icon={User}
                title="Avatar"
                description="Edit your avatar or upload an image"
                right={
                    <Button className="group-hover:bg-accent rounded-full" variant="ghost" size="icon">
                        <ChevronRight />
                    </Button>
                }
            />
        </section>
    )
}

export default ProfileTab
