import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import dotenv from "dotenv"
import router from "./routes/index.js";
import { responseEnhancer } from "express-response-formatter";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log("Sukses konek ke db");
} catch (error) {
    console.error(error)
    console.log("DB tidak konek")
}
app.use(cors());
app.use(responseEnhancer())
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', router);

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running")
})