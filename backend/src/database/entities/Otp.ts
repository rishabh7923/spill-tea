import {
    BaseEntity,
    Entity,
    PrimaryColumn,
    Column,
    JoinColumn,
    OneToOne,
    type Relation
} from "typeorm";
import { User } from "./User.js";

@Entity('otps')
export class Otp extends BaseEntity {
    @PrimaryColumn()
    user_id: number;

    @Column({ length: 6 })
    otp: string;

    @Column()
    expires_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;
}