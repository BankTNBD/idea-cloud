import express from "express";
import cors from "cors";

import postRoute from "./routes/postRoutes.js";
import llmRoute from "./routes/llmRoutes.js";

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
app.use("/posts", postRoute);
app.use("/llm", llmRoute);

export default app;
