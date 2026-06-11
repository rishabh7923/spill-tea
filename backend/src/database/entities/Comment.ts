import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, BaseEntity, JoinColumn, type Relation } from "typeorm";
import { Post } from "./Post.js";
import { User } from "./User.js";

@Entity("comments")
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    content: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE"})
    @JoinColumn({ name: "post_id"})
    post: Relation<Post>;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: "user_id"})
    user: Relation<User>;
}