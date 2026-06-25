
function SettingRow({
    icon: Icon,
    title,
    description,
    right,
    danger,
}: {
    icon: any
    title: string
    description?: string
    right?: React.ReactNode
    danger?: boolean
}) {
    return (
        <div className="flex items-center justify-between p-2 group my-2">
            <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-4 w-4" />
                </div>

                <div>
                    <p className={danger ? "text-sm font-medium text-destructive" : "text-sm font-medium"}>
                        {title}
                    </p>
                    {description && (
                        <p className="text-xs text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {right}
        </div>
    )
}

export default SettingRow