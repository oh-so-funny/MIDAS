import { AppDataSource } from "../database";
import { Question } from "../entity/Question";
import { Reply } from "../entity/Reply";

const QuestionRepository = AppDataSource.getRepository(Question);
const ReplyRepository = AppDataSource.getRepository(Reply);

export { QuestionRepository, ReplyRepository };
