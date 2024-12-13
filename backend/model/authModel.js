import pool from "../config/config.js";

export const getUsers = async () => pool.execute(`SELECT * FROM users`);

export const checkIfUserExist = async (name) =>
  pool.execute(`SELECT * FROM users WHERE name = ?`, [name]);

export const getPassword = async (user) =>
  pool.execute(`SELECT password FROM users WHERE name = ?`, [user]);

export const addUser = async (name, password) => {
  pool.execute(
    `INSERT INTO users (name, password)VALUES ('${name}', '${password}');`
  );
};

export const updateAccessToken = async (token, user) =>
  pool.execute(`UPDATE users SET accessToken = ? WHERE name = ?`, [
    token,
    user,
  ]);

export const updateLastLogin = async (dateTime, user) =>
  pool.execute(`UPDATE users SET lastLogin = ? WHERE name = ?`, [
    dateTime,
    user,
  ]);

export const validateUser = async (name, password) =>
  pool.execute(`SELECT * FROM users WHERE name = ? AND password = ?`, [
    name,
    password,
  ]);
