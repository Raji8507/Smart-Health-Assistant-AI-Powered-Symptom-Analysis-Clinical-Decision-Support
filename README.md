# Smart Health Assistant 🏥

An AI-powered symptom analysis and clinical decision support web application built with React and the Groq AI API.

## Overview

Smart Health Assistant addresses the problem of delayed and inaccessible preliminary health guidance. Users describe symptoms in plain language, and the system uses Generative AI to return a structured clinical report — helping patients make faster, more informed decisions before seeing a doctor.

## Features

- **AI Symptom Analysis** — Describe symptoms in plain English and get an instant structured clinical report
- **Condition Probability** — Top 3 possible conditions with likelihood scores and visual probability bars
- **Severity Assessment** — Low / Medium / High severity classification with reasoning
- **Recommended Actions** — Specific, actionable next steps tailored to the symptoms
- **Emergency Red Flags** — Clear indicators of when to seek emergency care
- **Home Care Tips** — Lifestyle and home remedy guidance
- **Follow-up Chat** — Ask natural language follow-up questions about your results
- **Session Tracking** — Tracks analyses run, conditions reviewed, and follow-up queries
- **Analysis History** — Quick-access chips to re-run recent symptom checks

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Styling | Plain CSS (no UI library) |
| AI Engine | Groq API (llama-3.3-70b-versatile) |
| API Communication | Fetch API |

## Project Structure
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Anthropic API key

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

1. Enter your symptoms in the text area in plain language
2. Select your age group and how long you have had the symptoms
3. Click Analyze symptoms (or press Ctrl+Enter)
4. Review the clinical analysis report
5. Ask follow-up questions using the chat input at the bottom

## Sample Symptoms to Try

"I have a throbbing headache on one side of my head for 2 days, sensitivity to light, and mild nausea. No fever. Pain worsens with movement."

"Sore throat, mild fever of 38 degrees, and swollen glands for 3 days. Difficulty swallowing."

"Sharp chest pain when breathing deeply, started this morning. No fever. Feels worse when lying down."

## Healthcare Domain

This project focuses on:
- AI in Healthcare — Generative AI for clinical insights
- Clinical Decision Support — Structured guidance to aid patient decisions
- Telemedicine — Remote, accessible health guidance

## Disclaimer

This tool is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional for diagnosis and treatment.

