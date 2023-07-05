import { DataSource } from "typeorm";
import { Interview } from "./Interview";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  database: "osh",
  port: 8080,
  entities: [Interview],
  synchronize: true,
});

const DatabaseStart = () => {
  AppDataSource.initialize();
};

export { DatabaseStart, AppDataSource };
