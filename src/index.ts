import express, { Request, Response } from "express";
import cors from "cors";
import { fetchMatches } from "./utils/fetchMatches";
import { fetchTrainings } from "./utils/fetchTrainings";
import { fetchPosition } from "./utils/fetchPosition";

const app = express();
const PORT = 3000;
app.use(cors());

app.get("/matches", async (req: Request, res: Response) => {
  const { year } = req.query;
  if (!year || typeof year !== "string") {
    return res.status(400).json({ error: "year query param is not defined" });
  }

  try {
    const data = await fetchMatches(req, res);

    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/trainings", async (req: Request, res: Response) => {
  const { day } = req.query;
  if (!day || typeof day !== "string") {
    return res.status(400).json({ error: "Invalid day parameter" });
  }

  try {
    const data = await fetchTrainings(req, res);

    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/currentPlace", async (req: Request, res: Response) => {
  const { year } = req.query;
  if (!year || typeof year !== "string") {
    return res.status(400).json({ error: "Invalid year parameter" });
  }

  try {
    const data = await fetchPosition(req, res);

    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
