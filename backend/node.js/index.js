import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

import nftsRoutes from "./routes/nfts.js";

dotenv.config();

const app = express();

app.use("/nfts", nftsRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors);

const CONNECTION_URL = `mongodb+srv://Mijail:${encodeURIComponent(
  process.env.MONGODB_PASSWORD
)}@cluster0.zdqhjld.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.port || 3000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error));
