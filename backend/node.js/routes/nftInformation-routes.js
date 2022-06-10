import express from "express";
import {
  getNftsInformation,
  getNftInformation,
  addNftInformation,
  updateNftInformation,
  increaseLikeCountByOne,
  decreaseLikeCountByOne,
  deleteNftInformation,
} from "../controllers/nftInformation-controller.js";

const router = express.Router();

router.get("/getall", getNftsInformation);
router.get("/getnft/:contract/:tokenid", getNftInformation);
router.post("/add", addNftInformation);
router.put("/update/:contract/:tokenid", updateNftInformation);
router.put("/likecount/increase/:contract/:tokenid", increaseLikeCountByOne);
router.put("/likecount/decrease/:contract/:tokenid", decreaseLikeCountByOne);
router.delete("/delete/:contract/:tokenid", deleteNftInformation);

export default router;
