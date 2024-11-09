import mysql from "mysql2/promise";


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Mysqlroot@password",
  database: "todo_app",
  port: "3306",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
