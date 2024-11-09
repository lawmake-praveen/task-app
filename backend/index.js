import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import router from "./routes/taskRoutes.js";

const app = express();
const PORT = process.env.PORT || 3307;

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(PORT, async () => {
  console.log(`Listening PORT : ${PORT}`);
});

