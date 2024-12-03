import mysql from "mysql2/promise";


const pool = mysql.createPool({
  host: "task-app-database.c1qq6iakq0tg.eu-north-1.rds.amazonaws.com",
  user: "admin",
  password: "1x6GYjZzT05O6yOKydfR",
  database: "task-app-database",
  port: "3306",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
