import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3307;

app.use(cors());
app.use(express.json());
app.use("/", router);


app.listen(PORT, "0.0.0.0", () => {
  console.log("Env PORT:", process.env.PORT);
  console.log(`Listening PORT : ${PORT}`);
});
