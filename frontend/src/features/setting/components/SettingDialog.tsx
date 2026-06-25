import type { ReactNode } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type SettingDialogProps = {
    title: string;
    description?: string;
    trigger: ReactNode;
    children: ReactNode;
    onSubmit?: () => void;
};

export default function SettingDialog({
    title,
    description,
    trigger,
    children,
    onSubmit,
}: SettingDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{
                <button type="button">
                    {trigger}
                </button>
            }</DialogTrigger>
            <DialogContent className="p-4">
                <form
                    className="gap-4 flex flex-col"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit?.();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        {description && (
                            <DialogDescription>{description}</DialogDescription>
                        )}
                    </DialogHeader>

                    {children}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>

                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}