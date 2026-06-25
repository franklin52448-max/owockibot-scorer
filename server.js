import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// FIRST middleware - body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Health check
app.get("/api/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// Score endpoint
app.post("/api/score", async (req, res) => {
  try {
    let { url, requirements } = req.body;

    if (!url || !requirements) {
      return res.status(400).json({ error: "url and requirements are required" });
    }

    // Accept both string and array
    if (typeof requirements === "string") {
      requirements = [requirements];
    }

    const prompt = `You are a bounty submission scorer. Score this submission:

URL: ${url}
Requirements: ${requirements.join(", ")}

Return ONLY valid JSON:
{
  "overallScore": <0-100>,
  "dimensions": [
    {"name": "URL Accessibility", "score": <0-20>, "maxScore": 20, "feedback": "..."},
    {"name": "Requirements Coverage", "score": <0-35>, "maxScore": 35, "feedback": "..."},
    {"name": "Submission Quality", "score": <0-25>, "maxScore": 25, "feedback": "..."},
    {"name": "Documentation", "score": <0-10>, "maxScore": 10, "feedback": "..."},
    {"name": "Effort Signals", "score": <0-10>, "maxScore": 10, "feedback": "..."}
  ],
  "summary": "...",
  "flags": [],
  "feedback": []
}`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3,
        }),
      }
    );

    const data = await response.json();
    const text = data.choices[0].message.content;
    const clean = text.replace(/```json\n?|```\n?/g, "").trim();
    const result = JSON.parse(clean);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scoring failed", detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
