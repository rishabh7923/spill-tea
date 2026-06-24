type ListProps<T> = {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    getKey?: (item: T, index: number) => React.Key;
    className?: string
};

export function List<T>({
    items,
    renderItem,
    getKey,
    className
}: ListProps<T>) {
    return (
        <ul className={className}>
            {items.map((item, index) => (
                <li key={getKey ? getKey(item, index) : index}>
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    );
}