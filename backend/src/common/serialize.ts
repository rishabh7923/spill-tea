import type { Comment } from "../database/entities/Comment.js";
import type { User } from "../database/entities/User.js";

export function serializeComment(comment: Comment) {
    return {
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        parent_id: comment.parent_id,
        reply_count: comment.reply_count ?? 0,
        user: {
            id: comment.user.id,
            username: comment.user.username,
            display_name: comment.user.display_name,
            avatar_url: comment.user.avatar.url
        },
    }
}

export function serializeUser(user: User) {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        display_name: user.display_name,
        bio: user.bio,
        verified: user.verified,
        avatar: {
            id: user.avatar.id,
            url: user.avatar.url
        }
    }
}