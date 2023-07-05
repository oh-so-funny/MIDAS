import { DataSource } from "typeorm";
import { Question } from "./entity/Question";
import { Reply } from "./entity/Reply";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  entities: [Question, Reply],
  synchronize: true,
  logging: ["info", "error"],
});

const DatabaseStart = () => {
  AppDataSource.initialize();
};

export { DatabaseStart, AppDataSource };
