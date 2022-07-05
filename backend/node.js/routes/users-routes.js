import express from "express";
import {
  addCollection,
  addTokenToCollection,
  changeBannerImage,
  changeRoundedIconImage,
  getUser,
} from "../controllers/users-controller";

const router = express.Router();

router.post("/banner", changeBannerImage);
router.post("/roundedIcon", changeRoundedIconImage);
router.get("/user/:account", getUser);
router.post("/token", addTokenToCollection);
router.post("/user/collection", addCollection);

export default router;
