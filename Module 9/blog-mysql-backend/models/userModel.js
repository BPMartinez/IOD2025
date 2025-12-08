const pool = require("../config/db");


exports.createUser = async ({ username, email, password, fullName }) => {
  const [result] = await pool.execute(
    `INSERT INTO users (username, email, password_hash, full_name)
     VALUES (?, ?, ?, ?)`,
    [username, email, password, fullName]
  );
  return result.insertId;
};


exports.getAllUsers = async () => {
  const [rows] = await pool.execute(
    `SELECT user_id, username, email, full_name, created_at
     FROM users`
  );
  return rows;
};

exports.getUserById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT user_id, username, email, full_name, created_at
     FROM users
     WHERE user_id = ?`,
    [id]
  );
  return rows[0];
};
