import express from "express";
import {
  addCollection,
  changeBannerImage,
  getCollectionInfo,
} from "../controllers/collections-controller";

const router = express.Router();

router.post("/collection", addCollection);
router.get("/collection/:collectionSlug", getCollectionInfo);
router.post("/collection/banner", changeBannerImage);
router.post("/collection/roundediconimage", changeBannerImage);

export default router;
