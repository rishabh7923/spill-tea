import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity("categories")
export class Category extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column({ length: 50, unique: true })
    name: string;
}