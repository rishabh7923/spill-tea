import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

interface ReplyContextType {
    activeParentCommentId: string | number | null;
    openReplyBox: (commentId: string | number) => void;
    closeReplyBox: () => void;
    isReplyBoxOpen: (commentId: string | number) => boolean;
}

const ReplyContext = createContext<ReplyContextType | null>(null);

export function ReplyProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [activeParentCommentId, setActiveParentCommentId] =
        useState<string | number | null>(null);

    const openReplyBox = (commentId: string | number) => {
        setActiveParentCommentId(commentId);
    };

    const closeReplyBox = () => {
        setActiveParentCommentId(null);
    };

    const isReplyBoxOpen = (commentId: string | number) =>
        activeParentCommentId === commentId;

    return (
        <ReplyContext.Provider
            value={{
                activeParentCommentId,
                openReplyBox,
                closeReplyBox,
                isReplyBoxOpen,
            }}
        >
            {children}
        </ReplyContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useReply() {
    const context = useContext(ReplyContext);

    if (!context) {
        throw new Error(
            "useReply must be used within ReplyProvider"
        );
    }

    return context;
}