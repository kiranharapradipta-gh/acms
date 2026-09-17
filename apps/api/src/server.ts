import express from "express";
import { prisma } from "./lib/prisma.js";

const app = express();

app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "ok",
      service: "acms-api",
      database: "connected"
    });
  } catch {
    res.status(500).json({
      status: "error",
      service: "acms-api",
      database: "disconnected"
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`ACMS API running on http://localhost:${PORT}`);
});