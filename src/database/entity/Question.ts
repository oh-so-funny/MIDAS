import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./enum/Category";
import { Reply } from "./Reply";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: Category,
    nullable: false,
  })
  category!: Category;

  @Column({ nullable: false, type: "text" })
  question!: string;

  @OneToMany(() => Reply, (reply) => reply.id)
  @JoinColumn({ name: "response" })
  reply!: Reply[];
}
