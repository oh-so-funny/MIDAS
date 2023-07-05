import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  response!: string;

  @Column("text")
  feedback!: string;

  @ManyToOne(() => Question, (question) => question.id, { nullable: false })
  question!: Question;
}
