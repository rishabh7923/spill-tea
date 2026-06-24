import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from './Comment.js'
import { Avatar } from "./Avatar.js";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @Column({ unique: true })
    username: string

    @Column({ length: 255 })
    email: string

    @Column({ select: false })
    password: string

    @Column()
    display_name: string

    @ManyToOne(() => Avatar, { nullable: true, onDelete: 'SET NULL', eager: true })
    @JoinColumn({ name: "avatar_id" })
    avatar: Avatar;

    @Column({ type: 'text', nullable: true })
    bio: string

    @Column({ default: false })
    verified: boolean

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[]
}