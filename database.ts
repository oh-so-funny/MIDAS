import { DataSource } from "typeorm";
import Interview from "./Interview";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  database: "osf",
  password: "",
  port: 3306,
  synchronize: true,
  entities: [Interview],
});

const DatabaseStart = () => {
  AppDataSource.initialize().catch((error) => console.log(error));
};

export { DatabaseStart, AppDataSource };
