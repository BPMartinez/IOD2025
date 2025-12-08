const pool = require("../config/db");


exports.addComment = async ({ postId, userId, content }) => {
  const [result] = await pool.execute(
    `INSERT INTO comments (post_id, user_id, content)
     VALUES (?, ?, ?)`,
    [postId, userId, content]
  );
  return result.insertId;
};


exports.getCommentsByPost = async (postId) => {
  const [rows] = await pool.execute(
    `SELECT c.comment_id, c.content, c.created_at,
            u.user_id, u.username, u.full_name
     FROM comments c
     JOIN users u ON c.user_id = u.user_id
     WHERE c.post_id = ?
     ORDER BY c.created_at DESC`,
    [postId]
  );
  return rows;
};
