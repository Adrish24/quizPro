import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import getRoutes from "./routes/getRoutes.js";
import createSessionToken from "./routes/createSessionToken.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



app.use("/generate", createSessionToken);
app.use("/post", postRoutes);
app.use("/get", getRoutes);

app.get("/", async (req, res) => {
  res.send("hello from QUIZPRO");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(5000, () =>
      console.log("server started at port http://localhost:5000")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
