import { ChatCompletionResponseMessage } from "openai";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Interview {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text", nullable: false })
  question!: string;

  @Column({ type: "text", nullable: false })
  reply!: string;

  @Column({ type: "text", nullable: false })
  feedback!: ChatCompletionResponseMessage | undefined;
}
