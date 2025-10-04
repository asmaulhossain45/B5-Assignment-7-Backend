import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import { envConfig } from "./config/envConfig";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFoundHandler from "./middleware/notFoundHandler";
import routes from "./routes/index";

const app: Application = express();

app.use(cors({ origin: envConfig.FRONTEND_URL, credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", routes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
