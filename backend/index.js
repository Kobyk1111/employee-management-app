import express from "express";
import connect from "./libs/database.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";

connect();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(globalErrorHandler);
