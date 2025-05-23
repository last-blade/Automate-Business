import express, { urlencoded } from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config({
    path: "./.env"
});

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json({limit: "20kb"}));
app.use(urlencoded({extended: true, limit: "20kb"}));
app.use(cookieParser());
app.use(express.static("public"));


//importing Routes
import userRoute from "./routes/user.routes.js";
import taskRoute from "./routes/task.routes.js";


//User Route
app.use("/api/v1/user", userRoute);

//Task Route
app.use("/api/v1/task", taskRoute);

export { app }