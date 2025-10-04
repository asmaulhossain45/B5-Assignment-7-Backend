/* eslint-disable no-console */
import { Server } from "http";
import { disconnectDB } from "../config/database";

const shutDownHandler = (server: Server) => {
  let isShutingDown = false;

  const shutdown = async (reason: string, error?: unknown) => {
    if (isShutingDown) return;
    isShutingDown = true;

    if (error) {
      console.error(`🔥 ${reason}:`, error);
    } else {
      console.info(`\n🛑 Shutting down due to: ${reason}`);
    }

    server.close(async () => {
      await disconnectDB();
      console.info("🛑 Server closed");
    });

    setTimeout(() => {
      console.warn("⚠️  Forcing shutdown after timeout.");
      process.exit(1);
    }, 10000).unref();
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));

  process.on("uncaughtException", (err) => shutdown("Uncaught Exception", err));
  process.on("unhandledRejection", (err) =>
    shutdown("Unhandled Rejection", err)
  );
};

export default shutDownHandler;
