import express from "express";
import connect from "./libs/database.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/adminRoutes.js";
import departmentRouter from "./routes/departmentRoute.js";
import employeeRouter from "./routes/employeeRoute.js";
import leaveRouter from "./routes/leaveRoutes.js";
import refreshTokenRouter from "./routes/refreshTokenRoute.js";
import logoutRouter from "./routes/logoutRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import cron from "node-cron";
import axios from "axios";

connect();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "https://employee-management-app-ktfx.onrender.com",
      "https://employee-management-app-3mri.onrender.com",
    ],
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.use("/admin", adminRouter);
app.use("/department", departmentRouter);
app.use("/employee", employeeRouter);
app.use("/leave", leaveRouter);
app.use("/refresh-token", refreshTokenRouter);
app.use("/logout", logoutRouter);

// Create a ping endpoint
app.get("/ping", (req, res) => {
  res.send("Pong");
});

// Schedule a task to ping the server every 14 minutes
cron.schedule("*/14 * * * *", async () => {
  try {
    await axios.get("https://employee-management-app-3mri.onrender.com");
    console.log("Ping successful");
  } catch (error) {
    console.error("Error pinging the server:", error);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(globalErrorHandler);
