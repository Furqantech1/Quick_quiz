
import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = "./scores.txt";

if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, "=== QuickQuiz Scores ===\n\n");


app.post("/api/save-score", (req, res) => {
  const { name, category, score, total, accuracy } = req.body;
  if (!name || !category) return res.status(400).send("Missing data");

  const now = new Date().toLocaleString();
  const entry = `Name: ${name}\nCategory: ${category}\nScore: ${score}/${total}\nAccuracy: ${accuracy}%\nDate: ${now}\n----------------------\n`;
  fs.appendFileSync(FILE_PATH, entry);
  res.send("Score saved successfully");
});

app.listen(4000, () => console.log("✅ Server running on http://localhost:4000"));
