import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import addressNonceRoutes from "./routes/addressNonce-routes.js";
import nftInformationRoutes from "./routes/nftInformation-routes.js";
import nftsForSaleRoutes from "./routes/nftsForSale-routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/nfts/nftsforsale", nftsForSaleRoutes);
app.use("/api/nfts/nftinformation", nftInformationRoutes);
app.use("/api/nfts/addressnonce", addressNonceRoutes);

const CONNECTION_URL = `mongodb+srv://Mijail:${encodeURIComponent(
  process.env.MONGODB_PASSWORD
)}@cluster0.zdqhjld.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.port || 8000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error));
