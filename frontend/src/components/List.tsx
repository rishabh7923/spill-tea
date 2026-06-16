import type { ReactNode } from "react";

function List({ children }: { children: ReactNode }) {
    return <ul>{children}</ul>;
}

function ListItem({ children }: { children: ReactNode }) {
    return <li>{children}</li>;
}

List.Item = ListItem;

export default List