import express from "express";
import getNfts from "../controllers/nfts.js";

const router = express.Router();

router.get("/", getNfts);

export default router;
