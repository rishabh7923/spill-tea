import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn, type Relation } from 'typeorm';
import { Post } from './Post.js';
import { User } from './User.js';

@Entity('reactions')
@Unique(['post', 'user'])
export class Reaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Post, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'post_id' })
    post: Relation<Post>;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id', })
    user: Relation<User>;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}