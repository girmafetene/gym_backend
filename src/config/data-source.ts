import { DataSource } from "typeorm";
import path from "path";
import * as dotenv from "dotenv";
import mysql from "mysql2"; // Add this import

dotenv.config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [path.join(__dirname, "../entities/*.{js,ts}")],
    migrations: [path.join(__dirname, "../migrations/*.{js,ts}")],
    driver: mysql // Use mysql2 driver
});

export default AppDataSource;