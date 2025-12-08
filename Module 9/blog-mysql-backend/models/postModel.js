const pool = require("../config/db");


exports.createPost = async ({ userId, title, description, imageUrl }) => {
  const [result] = await pool.execute(
    `INSERT INTO posts (user_id, title, description, image_url)
     VALUES (?, ?, ?, ?)`,
    [userId, title, description, imageUrl || null]
  );
  return result.insertId;
};


exports.getAllPosts = async () => {
  const [rows] = await pool.execute(
    `SELECT p.post_id, p.title, p.description, p.image_url,
            p.created_at, p.updated_at,
            u.user_id AS author_id, u.username AS author_username, u.full_name AS author_full_name
     FROM posts p
     JOIN users u ON p.user_id = u.user_id
     ORDER BY p.created_at DESC`
  );
  return rows;
};


exports.getPostById = async (postId) => {
  const [rows] = await pool.execute(
    `SELECT p.post_id, p.title, p.description, p.image_url,
            p.created_at, p.updated_at,
            u.user_id AS author_id, u.username AS author_username, u.full_name AS author_full_name
     FROM posts p
     JOIN users u ON p.user_id = u.user_id
     WHERE p.post_id = ?`,
    [postId]
  );
  return rows[0];
};


exports.getPostsByUser = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT post_id, title, description, image_url, created_at, updated_at
     FROM posts
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
};
