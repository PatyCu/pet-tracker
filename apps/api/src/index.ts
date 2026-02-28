import express from "express";
import cors from "cors";
import petRouter from "./routes/v1/pet.routes";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1/pets", petRouter);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
