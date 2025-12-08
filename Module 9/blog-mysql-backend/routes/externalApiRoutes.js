const express = require("express");
const router = express.Router();
const externalApiController = require("../controllers/externalApiController");


router.get("/external/posts", externalApiController.getExternalPosts);


router.get("/external/posts/:id", externalApiController.getExternalPostById);

module.exports = router;
