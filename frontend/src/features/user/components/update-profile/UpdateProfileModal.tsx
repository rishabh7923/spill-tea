import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Info, Lock, User } from "lucide-react"
import ProfileTab from "./ProfileTab"

export default function UpdateProfileModal() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg p-4 space-y-2 max-h-[90vh] overflow-auto no-scrollbar">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="profile">
                        <TabsList variant="line" className="mt-0 mb-2">
                            <TabsTrigger value="profile"><User /> Profile</TabsTrigger>
                            <TabsTrigger value="security"><Lock /> Security</TabsTrigger>
                            <TabsTrigger value="experience"><Briefcase /> Experience</TabsTrigger>
                            <TabsTrigger value="about"><Info /> About</TabsTrigger>
                        </TabsList>
                        <ProfileTab/>
                        <TabsContent className="mt-2" value="security">
                            <FieldGroup>
                                <Field>
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" name="current-password" type="password" />
                                </Field>
                                <Field>
                                    <Label htmlFor="new-password">New password</Label>
                                    <Input id="new-password" name="new-password" type="password" />
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
                </DialogContent>
            </form>
        </Dialog>
    )
}
