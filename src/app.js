import express, { urlencoded } from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import "./cron/taskReminderCron.js";

dotenv.config({
    path: "./.env"
});

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json({limit: "1mb"}));
app.use(urlencoded({extended: true, limit: "1mb"}));
app.use(cookieParser());
app.use(express.static("public"));


//importing Routes
import userRoute from "./routes/user.routes.js";
import taskRoute from "./routes/task.routes.js";
import commentRoute from "./routes/comment.routes.js";
import ticketRoute from "./routes/ticket.routes.js";
import webhookRoutes from "./routes/webhook.js";

//User Route
app.use("/api/v1/user", userRoute);

//Task Route
app.use("/api/v1/task", taskRoute);

//Comment Route
app.use("/api/v1/comment", commentRoute);

//Ticket Route
app.use("/api/v1/support", ticketRoute);

//Webhook
app.use("/webhook", webhookRoutes);

export { app }