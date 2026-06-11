import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Post } from "./Post.js";

@Entity({ name: "hashtags" })
export class Hashtag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, unique: true })
    name: string;

    @ManyToMany(() => Post, (post) => post.hashtags)
    posts: Relation<Post[]>;
}