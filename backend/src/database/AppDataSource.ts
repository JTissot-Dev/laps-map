import { DataSource } from "typeorm";
import Lap from "../models/Lap/Lap";
import Image from "../models/Image/Image";
import Difficulty from "../models/Difficulty/Difficulty";
import 'dotenv/config';


const appDataSource: DataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  // logging:  ['development', 'test'].includes(process.env.APP_ENV) ? true : false,
  logging:  true,
  synchronize: false,
  entities: [
    Lap,
    Image,
    Difficulty
  ],
  migrations: [
    "src/database/migrations/*.ts"
  ],
});

export default appDataSource;