import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    type Relation
} from 'typeorm';
import { Post } from './Post.js';

export enum AttachmentType {
    IMAGE = 'image',
}

@Entity('attachments')
export class Attachment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    url: string;

    @Column()
    public_id: string

    @Column({ type: 'enum', enum: AttachmentType, default: AttachmentType.IMAGE })
    type: AttachmentType;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Post, (post) => post.attachments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Relation<Post>;
}