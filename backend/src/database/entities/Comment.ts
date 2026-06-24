import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinColumn, type Relation, OneToMany, RelationId, VirtualColumn } from "typeorm";
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

    @ManyToOne(() => Comment, comment => comment.children, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: "parent_id" })
    parent: Comment | null;

    @RelationId((comment: Comment) => comment.parent)
    parent_id: number | null;

    @OneToMany(() => Comment, comment => comment.parent)
    children: Comment[]

    @VirtualColumn({ query: (alias) => `SELECT COUNT(*) FROM comments WHERE parent_id = ${alias}.id` })
    reply_count: number;
    
    @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
    @JoinColumn({ name: "post_id"})
    post: Relation<Post>;

    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "user_id"})
    user: Relation<User>;
}