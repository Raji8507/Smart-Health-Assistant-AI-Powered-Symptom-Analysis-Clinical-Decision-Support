import { useState } from "react";
import { askFollowUp } from "../services/claudeService";

export default function FollowUpChat({ symptoms, onFollowUp }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAsk() {
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    setAnswer("");
    try {
      const res = await askFollowUp(symptoms, question.trim());
      setAnswer(res);
      onFollowUp();
    } catch {
      setError("Failed to get answer. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="followup-section">
      <div className="section-label">Ask a follow-up question</div>
      <div className="followup-row">
        <input
          type="text"
          className="followup-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="e.g. Is this contagious? Should I avoid work?"
        />
        <button className="followup-btn" onClick={handleAsk} disabled={loading || !question.trim()}>
          {loading ? "…" : "Ask"}
        </button>
      </div>
      {answer && <div className="followup-answer">{answer}</div>}
      {error && <div className="followup-answer followup-error">{error}</div>}
    </div>
  );
}
