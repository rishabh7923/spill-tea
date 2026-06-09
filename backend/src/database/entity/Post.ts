import { BaseEntity, OneToMany, type Relation } from "typeorm";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";

import { User } from "./User.js";
import { Category } from "./Category.js";
import { Attachment } from "./Attachment.js";
import { Comment } from './Comment.js';
import { Hashtag } from "./Hashtag.js";

@Entity("posts")
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    content: string;

    @Column({ default: 0 })
    likes_count: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: Relation<User>;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Relation<Category>;

    @OneToMany(() => Attachment, (attachment) => attachment.post, { cascade: true, onDelete: "CASCADE" })
    attachments: Relation<Attachment[]>;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Relation<Comment[]>;

    @ManyToMany(() => Hashtag, { cascade: false })
    @JoinTable({
        name: "post_hashtags",
        joinColumn: { name: "post_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "hashtag_id", referencedColumnName: "id" }
    })
    hashtags: Relation<Hashtag[]>;
}


