import express from "express";

import * as postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", postController.getPosts);
router.post("/", postController.createPost);
router.put("/:id/rating", postController.updateRating);
router.delete("/:id", postController.deletePost);

export default router;
