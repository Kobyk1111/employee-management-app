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

connect();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticPath =
  process.env.NODE_ENV === "development"
    ? path.join(__dirname, "frontend/public")
    : path.join(__dirname, "frontend/dist");

app.use(express.static(staticPath));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.use(express.static(path.join(__dirname, "frontend/public")));

app.use("/admin", adminRouter);
app.use("/department", departmentRouter);
app.use("/employee", employeeRouter);
app.use("/leave", leaveRouter);
app.use("/refresh-token", refreshTokenRouter);
app.use("/logout", logoutRouter);

app.get("*", (req, res) => {
  // res.sendFile(__dirname + "/frontend/dist");
  res.sendFile(path.join(staticPath, "index.html"));
});

console.log("Serving static files from:", staticPath);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(globalErrorHandler);
