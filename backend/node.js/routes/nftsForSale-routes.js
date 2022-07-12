import express from "express";
import {
  addNftForSale,
  createTokenURI,
  deleteNftForSale,
  getNftForSale,
  getNftsForSale,
  getNonce,
  incrementNonce,
  removeTokenURI,
  updateNftsForSale,
} from "../controllers/nftsForSale-controller.js";

const router = express.Router();

router.get("/getall", getNftsForSale);
router.get("/getnft", getNftForSale);
router.post("/add", addNftForSale);
router.get("/getnonce", getNonce);
router.post("/createtokenuri", createTokenURI);
router.delete("/removetokenuri", removeTokenURI);
router.post("/incrementnonce", incrementNonce);
router.put("/update/:id", updateNftsForSale);
router.delete("/delete", deleteNftForSale);

export default router;
