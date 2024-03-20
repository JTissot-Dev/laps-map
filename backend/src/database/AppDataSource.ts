import { DataSource } from "typeorm";
import Lap from "../models/Lap";
import 'dotenv/config';


const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [
    Lap
  ],
  migrations: [
    "src/database/migrations/*.ts"
  ],
});

export default AppDataSource;