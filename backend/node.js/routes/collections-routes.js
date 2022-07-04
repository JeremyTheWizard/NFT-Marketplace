import express from "express";
import { getTopCollections } from "../controllers/collections-controller";

const router = express.Router();

router.get("/topcollections", getTopCollections);

export default router;
