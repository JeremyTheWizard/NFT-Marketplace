import express from "express";
import {
  getNonce,
  incrementNonce,
} from "../controllers/addressNonce-controller.js";

const router = express.Router();

router.get("/getnonce/:address", getNonce);
router.post("/incrementnonce/:address", incrementNonce);

export default router;
