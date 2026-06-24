import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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

    avatarId: z.number(),
})

export default function ProfileTab() {
    const { user } = useAuth()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: user?.display_name ?? "",
            bio: user?.bio ?? "",
            avatarId: user?.avatar?.id ?? 0,
        },
    })

    const { updateProfile, status } = useUpdateProfile()

    return (
        <TabsContent value="profile">
            <Card className="border-0 bg-transparent shadow-none p-0">
                <CardContent className="p-0">
                    <form
                        id="form-profile-update"
                        onSubmit={form.handleSubmit((data) =>
                            updateProfile(data)
                        )}
                    >
                        <FieldGroup>
                            {/* Avatar Preview */}
                            <Field>
                                <div className="flex items-center gap-4 rounded-xl p-2 border">
                                    <img
                                        src="https://i.pravatar.cc/300"
                                        alt={user?.display_name}
                                        className="size-20 rounded-full border object-cover"
                                    />

                                    <div className="min-w-0">
                                        <h3 className="truncate font-semibold">
                                            {user?.display_name}
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            Avatar changes are currently
                                            disabled.
                                        </p>
                                    </div>
                                </div>

                                <input
                                    type="hidden"
                                    {...form.register("avatarId", {
                                        valueAsNumber: true,
                                    })}
                                />
                            </Field>

                            {/* Display Name */}
                            <Controller
                                name="displayName"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="display-name">
                                            Display Name
                                        </FieldLabel>

                                        <Input
                                            {...field}
                                            id="display-name"
                                            placeholder="Enter your display name"
                                            aria-invalid={
                                                fieldState.invalid
                                            }
                                        />

                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Bio */}
                            <Controller
                                name="bio"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="bio">
                                            Bio
                                        </FieldLabel>

                                        <InputGroup>
                                            <InputGroupTextarea
                                                {...field}
                                                id="bio"
                                                rows={4}
                                                placeholder="Tell everyone a little about yourself..."
                                                className="min-h-28 resize-none"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />

                                            <InputGroupAddon align="block-end">
                                                <InputGroupText className="tabular-nums">
                                                    {field.value?.length ?? 0}
                                                    /100
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>

                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>

                <CardFooter className="justify-end gap-2 px-0">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={status === "pending"}
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button>

                    <Button
                        type="submit"
                        form="form-profile-update"
                        disabled={status === "pending"}
                    >
                        {status === "pending" && <Spinner />}
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>
        </TabsContent>
    )
}