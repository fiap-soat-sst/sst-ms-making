import "reflect-metadata";
import { DataSource } from "typeorm";
import { Order } from "./Models/Order";
import { Order1732678294020 as orderMigration } from './migrations/1732678294020-order'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false,
    entities: [Order],
    migrations: [orderMigration],
    synchronize: true,
})

AppDataSource.initialize()
  .then(() => {
    console.log(
      "[MySql Database]: Connection has been established successfully 🚀"
    );
  })
  .catch((error) => {
    throw error;
  });
