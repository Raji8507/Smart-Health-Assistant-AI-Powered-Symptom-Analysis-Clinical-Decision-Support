import { useState } from "react";

export default function SymptomForm({ onAnalyze, loading, history }) {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("adult");
  const [duration, setDuration] = useState("1-2 days");

  function handleSubmit() {
    if (!symptoms.trim()) return;
    onAnalyze(symptoms.trim(), age, duration);
  }

  function handleKeyDown(e) {
    if (e.ctrlKey && e.key === "Enter") handleSubmit();
  }

  return (
    <div className="input-card">
      <label className="field-label">Describe your symptoms in plain language</label>
      <textarea
        className="symptom-input"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. I've had a persistent headache for 2 days, mild fever around 38°C, and feel tired. No vomiting."
      />

      <div className="meta-row">
        <div className="meta-field">
          <label className="field-label">Patient age group</label>
          <select value={age} onChange={(e) => setAge(e.target.value)}>
            <option value="child">Child (0–12)</option>
            <option value="teen">Teen (13–17)</option>
            <option value="adult">Adult (18–59)</option>
            <option value="senior">Senior (60+)</option>
          </select>
        </div>
        <div className="meta-field">
          <label className="field-label">Symptom duration</label>
          <select value={duration} onChange={(e) => setDuration(e.target.value)}>
            <option value="a few hours">A few hours</option>
            <option value="1-2 days">1–2 days</option>
            <option value="3-7 days">3–7 days</option>
            <option value="1-2 weeks">1–2 weeks</option>
            <option value="chronic / ongoing">Chronic / ongoing</option>
          </select>
        </div>
      </div>

      <button className="analyze-btn" onClick={handleSubmit} disabled={loading || !symptoms.trim()}>
        {loading ? "Analyzing…" : "Analyze symptoms"}
      </button>

      {history.length > 0 && (
        <div className="history-section">
          <div className="history-title">Recent analyses</div>
          <div className="history-chips">
            {history.map((h, i) => (
              <span key={i} className="chip" onClick={() => setSymptoms(h)}>
                {h.length > 40 ? h.slice(0, 40) + "…" : h}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
