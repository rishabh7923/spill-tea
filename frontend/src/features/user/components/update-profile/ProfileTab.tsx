"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { TabsContent } from "@/components/ui/tabs"
import AvatarPicker from "./sections/AvatarPicker"
import { Spinner } from "@/components/ui/spinner"
import useUpdateProfile from "../../hooks/useUpdateProfile"
import { useAuth } from "@/features/auth/context/AuthContext"

const formSchema = z.object({
    displayName: z
        .string()
        .trim()
        .min(3, "Display name must be at least 3 characters.")
        .max(32, "Display name cannot exceed 32 characters."),

    bio: z
        .string()
        .trim()
        .min(20, "Bio must be at least 20 characters.")
        .max(100, "Bio cannot exceed 100 characters."),
    avatarId: z.number()
})

export default function ProfileTab() {
    const { user } = useAuth();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: user?.displayName || user?.displayname,
            bio: user?.bio,
            avatarId: user?.avatar.id
        },
    })
    const { updateProfile, status } = useUpdateProfile();
    return (
        <TabsContent className="mt-2 px-0" value="profile">
            <Card className="w-full bg-transparent border-0 p-0 m-0">
                <CardContent className="px-0">
                    <form id="form-profile-update" onSubmit={form.handleSubmit((data) => updateProfile(data))}>
                        <FieldGroup>
                            <Controller
                                name="avatarId"
                                control={form.control}
                                render={({ field }) => (
                                    <AvatarPicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <Controller
                                name="displayName"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-profile-update-displayname">
                                            Display name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-profile-update-displayname"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Display name"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="bio"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-profile-update-bio">
                                            Bio
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupTextarea
                                                {...field}
                                                id="form-profile-update-bio"
                                                placeholder="I'm rock"
                                                rows={6}
                                                className="min-h-24 resize-none"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            <InputGroupAddon align="block-end">
                                                <InputGroupText className="tabular-nums">
                                                    {field.value.length}/100 characters
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="px-0 inline-block ml-auto">
                    <Field orientation="horizontal">
                        <Button type="button" variant="outline" onClick={() => form.reset()} disabled={status === "pending"}>
                            Reset
                        </Button>
                        <Button type="submit" form="form-profile-update" disabled={status === "pending"}>
                            {status === "pending" && <Spinner />} Submit
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
        </TabsContent>
    )
}
