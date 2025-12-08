const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");


router.post("/:postId/likes", likeController.likePost);
router.delete("/:postId/likes", likeController.unlikePost);

module.exports = router;
