import pool from "../config/config.js";

export const getTasks = () => pool.execute(`SELECT * FROM task`);

export const addTask = (task, status, createdAt) =>
  pool.execute(
    `INSERT INTO task (name, status, create_time)VALUES ('${task}', ${status}, '${createdAt}');`
  );

export const getTaskStatus = (id) =>
  pool.execute(`SELECT status FROM task WHERE id = ?`, [id]);

export const toggleCheckBox = (newStatus, id) =>
  pool.execute(`UPDATE task SET status = ? WHERE id = ?`, [newStatus, id]);

export const updateStatus = (newStatus, id) =>
  pool.execute(`UPDATE task SET status = ? WHERE id = ?`, [newStatus, id]);

export const deleteTask = (id) =>
  pool.execute(`DELETE FROM task WHERE id = ?`, [id]);

export const deleteAllTasks = () => pool.execute(`DELETE FROM task`);

export const updateTask = (id, task, status) =>
  pool.execute(`UPDATE task SET name = ?, status = ? WHERE id = ?`, [
    task,
    status,
    id,
  ]);
