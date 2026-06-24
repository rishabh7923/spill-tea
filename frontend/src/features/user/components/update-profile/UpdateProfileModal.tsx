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
import { ScrollArea } from "@/components/ui/scroll-area"

export default function UpdateProfileModal() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg h-[90vh] p-0 flex flex-col">
                    <DialogHeader className="p-4">
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="flex-1 overflow-auto">
                        <Tabs defaultValue="profile">
                            <TabsList variant="line" className="mt-0 mb-2">
                                <TabsTrigger value="profile"><User /> Profile</TabsTrigger>
                                <TabsTrigger value="security"><Lock /> Security</TabsTrigger>
                                <TabsTrigger value="experience"><Briefcase /> Experience</TabsTrigger>
                                <TabsTrigger value="about"><Info /> About</TabsTrigger>
                            </TabsList>
                            <div className="px-4">
                                <ProfileTab />
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
                            </div>
                        </Tabs>
                    </ScrollArea>
                </DialogContent>
            </form>
        </Dialog>
    )
}
