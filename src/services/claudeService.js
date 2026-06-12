const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";

export async function analyzeSymptoms(symptoms, age, duration) {
  const prompt = `You are a clinical decision support AI. Analyze these symptoms and return ONLY a JSON object (no markdown, no preamble).

Patient: ${age}, symptoms for ${duration}
Symptoms: ${symptoms}

Return this exact JSON structure:
{
  "severity": "low" | "medium" | "high",
  "severity_reason": "one sentence why",
  "conditions": [
    {"name": "Condition name", "probability": 75, "description": "Brief 1-sentence description"},
    {"name": "Condition name", "probability": 45, "description": "Brief 1-sentence description"},
    {"name": "Condition name", "probability": 20, "description": "Brief 1-sentence description"}
  ],
  "recommended_actions": [
    "Specific action 1",
    "Specific action 2",
    "Specific action 3",
    "Specific action 4"
  ],
  "when_to_seek_emergency": "Specific red flag symptoms to watch for",
  "lifestyle_note": "One brief lifestyle/home care tip"
}`;

  const response = await fetch(CLAUDE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) throw new Error("API request failed");

  const data = await response.json();
  const raw = data.content.map((i) => i.text || "").join("");
  const clean = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

export async function askFollowUp(symptoms, question) {
  const response = await fetch(CLAUDE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `A patient has these symptoms: "${symptoms}". They ask: "${question}". Answer concisely in 2-3 sentences as a clinical support assistant. End with a reminder to consult a doctor.`,
        },
      ],
    }),
  });

  if (!response.ok) throw new Error("API request failed");

  const data = await response.json();
  return data.content.map((i) => i.text || "").join("");
}
