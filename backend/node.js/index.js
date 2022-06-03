import express from "express";
import { MongoClient } from "mongodb";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://Mijail:${process.env.MONGODB_PASSWORD}@cluster0.zdqhjld.mongodb.net/?retryWrites=true&w=majority`;

const PORT = 3000;
const app = express();

// app.get("/marketplace", (req, res) => {
//   res.json("Hello to my app!");
// });

app.get("/marketplace", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const itemsOnSale = database.collection("Items-on-sale");

    const returnedItemsOnSale = await itemsOnSale.find().toArray();
    console.log(returnedItemsOnSale);
    res.send(returnedItemsOnSale);
  } catch {
    console.log("error");
  } finally {
    await client.close();
  }
});

app.listen(PORT, (req, res) => {});
