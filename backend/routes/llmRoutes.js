import express from "express";

import * as llmController from "../controllers/llmController.js";

const router = express.Router();

router.post("/", llmController.getIdeas);

export default router;
