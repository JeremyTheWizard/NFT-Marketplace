import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileUpload";
import mongoose from "mongoose";

import collectionsRoutes from "./routes/collections-routes.js";
import nftInformationRoutes from "./routes/nftInformation-routes.js";
import nftsForSaleRoutes from "./routes/nftsForSale-routes.js";
import usersRoutes from "./routes/users-routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use("/api/nfts/nftsforsale", nftsForSaleRoutes);
app.use("/api/nfts/nftinformation", nftInformationRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/collections", collectionsRoutes);

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
