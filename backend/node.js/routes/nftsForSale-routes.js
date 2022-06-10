import express from "express";
import {
  getNftsForSale,
  addNftForSale,
  updateNftsForSale,
  deleteNftForSale,
} from "../controllers/nftsForSale-controller.js";

const router = express.Router();

router.get("/getall", getNftsForSale);
router.post("/add", addNftForSale);
router.put("/update/:id", updateNftsForSale);
router.delete("/delete/:id", deleteNftForSale);

export default router;
