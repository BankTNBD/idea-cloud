import express from "express";

import * as llmController from "../controllers/llmController.js";

const router = express.Router();

router.post("/", llmController.getIdeas);
router.post("/more", llmController.getIdeaDetail);

export default router;
