import express from "express";
import {
  changeBannerImage,
  changeRoundedIconImage,
  getUser,
} from "../controllers/users-controller";

const router = express.Router();

router.post("/banner", changeBannerImage);
router.post("/roundedIcon", changeRoundedIconImage);
router.get("/user/:account", getUser);

export default router;
