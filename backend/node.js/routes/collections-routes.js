import express from "express";
import {
  addCollection,
  addTokenToCollection,
  changeBannerImage,
  changeDescription,
  changeRoundedIconImage,
  getCollectionInfo,
} from "../controllers/collections-controller";

const router = express.Router();

router.post("/collection", addCollection);
router.get("/collection/:collectionSlug", getCollectionInfo);
router.post("/collection/banner", changeBannerImage);
router.post("/collection/roundedicon", changeRoundedIconImage);
router.post("/collection/description", changeDescription);
router.post("/collection/token", addTokenToCollection);

export default router;
