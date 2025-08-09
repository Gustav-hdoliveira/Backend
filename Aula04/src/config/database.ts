import mysql from 'mysql2/promise';
import * as dotenv from "dotenv";

dotenv.config()

const { BD_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env

export const connection = mysql.createPool({
    host: BD_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
})