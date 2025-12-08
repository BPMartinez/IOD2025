const pool = require("../config/db");

exports.likePost = async ({ postId, userId }) => {
  const [result] = await pool.execute(
    `INSERT INTO likes (post_id, user_id)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP`,
    [postId, userId]
  );
  return result.insertId;
};


exports.unlikePost = async ({ postId, userId }) => {
  const [result] = await pool.execute(
    `DELETE FROM likes
     WHERE post_id = ? AND user_id = ?`,
    [postId, userId]
  );
  return result.affectedRows;
};


exports.countLikesForPost = async (postId) => {
  const [rows] = await pool.execute(
    `SELECT COUNT(*) AS like_count
     FROM likes
     WHERE post_id = ?`,
    [postId]
  );
  return rows[0].like_count;
};
