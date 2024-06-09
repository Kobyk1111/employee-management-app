import express from "express";
import connect from "./libs/database.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";
import departmentRouter from "./routes/departmentRoute.js";
import employeeRouter from "./routes/employeeRoute.js";
import leaveRouter from "./routes/leaveRoutes.js";

connect();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);

app.use("/department", departmentRouter);

app.use("/employee", employeeRouter);

app.use("/leave", leaveRouter);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(globalErrorHandler);
