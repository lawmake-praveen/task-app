import pool from "../config/config.js";

export const getUsers = async () => pool.execute(`SELECT * FROM users`);

export const checkIfUserExist = async (name) =>
  pool.execute(`SELECT * FROM users WHERE name = ?`, [name]);

export const addUser = async (name, password) => {
  pool.execute(
    `INSERT INTO users (name, password)VALUES ('${name}', '${password}');`
  );
};

export const validateUser = async (name, password) =>
  pool.execute(`SELECT * FROM users WHERE name = ? AND password = ?`, [name, password]);
