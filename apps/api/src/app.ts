import express from "express";
import cors from "cors";
import petRouter from "./routes/v1/pet.routes";

export const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1/pets", petRouter);
