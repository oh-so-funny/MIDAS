import { ChatCompletionResponseMessage } from "openai";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Interview {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  question!: string;

  @Column({ type: "text" })
  reply!: string;

  @Column({ type: "text" })
  feedback!: string;
}
