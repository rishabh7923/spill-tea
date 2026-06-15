import type { Comment } from "../database/entities/Comment.js";

export function serializeComment(comment: Comment) {
    return {
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        parent_id: comment.parent_id,
        user: {
            id: comment.user.id,
            username: comment.user.username,
            display_name: comment.user.display_name,
            avatar_url: comment.user.avatar.url
        },
    }
}