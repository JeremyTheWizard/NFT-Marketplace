import express from "express";
import {
  changeBannerImage,
  changeRoundedIconImage,
} from "../controllers/users-controller";

const router = express.Router();

router.post("/banner", changeBannerImage);
router.post("/roundedIcon", changeRoundedIconImage);

export default router;
