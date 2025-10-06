import http, { Server } from "http";
import app from "./app";
import { connectDB } from "./config/database";
import { envConfig } from "./config/envConfig";
import shutDownHandler from "./middleware/shutDownHandler";

let server: Server;
const port = envConfig.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    server = http.createServer(app);

    server.listen(envConfig.PORT, () => {
      console.info(`✅ Server started successfully on ${port}`);
    });

    shutDownHandler(server);
  } catch (error) {
    console.error("❌ Server start failed!", error);
    process.exit(1);
  }
};

startServer();
