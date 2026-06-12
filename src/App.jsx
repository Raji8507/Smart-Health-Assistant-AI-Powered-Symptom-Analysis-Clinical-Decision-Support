import { useState } from "react";
import Header from "./components/Header";
import SymptomForm from "./components/SymptomForm";
import ResultCard from "./components/ResultCard";
import SessionStats from "./components/SessionStats";
import { analyzeSymptoms } from "./services/claudeService";

export default function App() {
  const [result, setResult] = useState(null);
  const [currentSymptoms, setCurrentSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ analyses: 0, conditions: 0, followups: 0 });

  async function handleAnalyze(symptoms, age, duration) {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await analyzeSymptoms(symptoms, age, duration);
      setResult(data);
      setCurrentSymptoms(symptoms);
      setHistory((prev) => [symptoms, ...prev.filter((h) => h !== symptoms)].slice(0, 5));
      setStats((prev) => ({
        ...prev,
        analyses: prev.analyses + 1,
        conditions: prev.conditions + data.conditions.length,
      }));
    } catch {
      setError("Analysis failed. Please check your connection and try again.");
    }
    setLoading(false);
  }

  function handleFollowUp() {
    setStats((prev) => ({ ...prev, followups: prev.followups + 1 }));
  }

  return (
    <div className="app">
      <Header />
      <SessionStats stats={stats} />
      <SymptomForm onAnalyze={handleAnalyze} loading={loading} history={history} />

      {loading && (
        <div className="loading-state">
          <div className="spinner" />
          Analyzing symptoms with AI — this takes a few seconds...
        </div>
      )}

      {error && <div className="error-banner">{error}</div>}

      <ResultCard result={result} symptoms={currentSymptoms} onFollowUp={handleFollowUp} />

      <p className="disclaimer">
        This tool is for informational purposes only and does not constitute medical advice.
        Always consult a qualified healthcare professional for diagnosis and treatment.
      </p>
    </div>
  );
}
