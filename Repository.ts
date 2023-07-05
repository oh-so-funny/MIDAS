import { AppDataSource } from "./database";
import Interview from "./Interview";

const InterviewRepository = AppDataSource.getRepository(Interview);

export { InterviewRepository };
