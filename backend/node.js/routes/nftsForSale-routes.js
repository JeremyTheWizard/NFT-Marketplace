import express from "express";
import {
  addNftForSale,
  createTokenURI,
  deleteNftForSale,
  getNftForSale,
  getNftsForSale,
  getNonce,
  incrementNonce,
  updateNftsForSale,
} from "../controllers/nftsForSale-controller.js";

const router = express.Router();

router.get("/getall", getNftsForSale);
router.get("/getnft/:contract/:tokenid", getNftForSale);
router.post("/add", addNftForSale);
router.get("/getnonce", getNonce);
router.post("/createtokenuri", createTokenURI);
router.post("/incrementnonce", incrementNonce);
router.put("/update/:id", updateNftsForSale);
router.delete("/delete/:contract/:tokenid", deleteNftForSale);

export default router;
