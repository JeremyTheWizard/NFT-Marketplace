import express from "express";
import {
  addNftForSale,
  deleteNftForSale,
  getNftForSale,
  getNftsForSale,
  updateNftsForSale,
} from "../controllers/nftsForSale-controller.js";

const router = express.Router();

router.get("/getall", getNftsForSale);
router.get("/getnft/:contract/:tokenid", getNftForSale);
router.post("/add", addNftForSale);
router.put("/update/:id", updateNftsForSale);
router.delete("/delete/:contract/:tokenid", deleteNftForSale);

export default router;
