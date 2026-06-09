import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Info, Lock, User } from "lucide-react"

export default function UpdateProfileModal() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="edit-profile">
                        <TabsList variant="line">
                            <TabsTrigger value="profile"><User /> Profile</TabsTrigger>
                            <TabsTrigger value="security"><Lock /> Security</TabsTrigger>
                            <TabsTrigger value="experience"><Briefcase /> Experience</TabsTrigger>
                            <TabsTrigger value="about"><Info /> About</TabsTrigger>
                        </TabsList>
                        <TabsContent className="mt-2" value="profile">
                            <FieldGroup>
                                <Field>
                                    <Label htmlFor="name-1">Display Name</Label>
                                    <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                                </Field>
                                <Field>
                                    <Label htmlFor="username-1">Username</Label>
                                    <Input id="username-1" name="username" defaultValue="@peduarte" />
                                </Field>
                                <Field>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" defaultValue="peduarte.goo.in" />
                                </Field>
                            </FieldGroup>
                        </TabsContent>
                        <TabsContent className="mt-2" value="security">
                            <FieldGroup>
                                <Field>
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" name="current-password" type="password"/>
                                </Field>
                                <Field>
                                    <Label htmlFor="new-password">New password</Label>
                                    <Input id="new-password" name="new-password" type="password"/>
                                </Field>
                                <Field>
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <Input id="confirm-password" name="confirm-password" type="password" />
                                </Field>
                            </FieldGroup>
                        </TabsContent>
                        <TabsContent value="experience">Coming soon...</TabsContent>
                        <TabsContent value="about">Coming soon...</TabsContent>
                    </Tabs>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="destructive">Discard</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
