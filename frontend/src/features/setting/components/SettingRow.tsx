import type { ReactNode } from "react";

type SettingRowProps = {
    icon: any;
    title: string;
    description?: string;
    right?: ReactNode;
    danger?: boolean;
    onClick: () => void;
};

export default function SettingRow({
    icon: Icon,
    title,
    description,
    right,
    danger,
    onClick
}: SettingRowProps) {
    return (
        <div className="group my-2 flex items-center justify-between p-2" onClick={onClick}>
            <div className="flex items-center gap-4">
                <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
                    <Icon className="h-4 w-4" />
                </div>

                <div>
                    <p
                        className={
                            danger
                                ? "text-destructive text-sm font-medium"
                                : "text-sm font-medium"
                        }
                    >
                        {title}
                    </p>

                    {description && (
                        <p className="text-muted-foreground text-xs">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {right}
        </div>
    );
}