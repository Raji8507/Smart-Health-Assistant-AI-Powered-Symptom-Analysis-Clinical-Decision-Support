import FollowUpChat from "./FollowUpChat";

const SEVERITY_MAP = {
  low: { label: "Low severity", cls: "sev-low" },
  medium: { label: "Moderate severity", cls: "sev-medium" },
  high: { label: "High severity", cls: "sev-high" },
};

export default function ResultCard({ result, symptoms, onFollowUp }) {
  if (!result) return (
    <div className="empty-state">
      <div className="empty-icon">♥</div>
      Enter your symptoms above to receive an AI-powered clinical analysis
    </div>
  );

  const sev = SEVERITY_MAP[result.severity] || SEVERITY_MAP.low;
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="result-card">
      <div className="result-header">
        <span className="result-title">Clinical analysis report</span>
        <span className={`severity-badge ${sev.cls}`}>{sev.label}</span>
        <span className="result-time">{time}</span>
      </div>

      <p className="severity-reason">{result.severity_reason}</p>

      <div className="section-label">Possible conditions</div>
      <div className="conditions-grid">
        {result.conditions.map((c, i) => (
          <div key={i} className="condition-item">
            <div className="condition-name">{c.name}</div>
            <div className="condition-prob">{c.probability}% likelihood</div>
            <div className="condition-desc">{c.description}</div>
            <div className="prob-bar">
              <div className="prob-fill" style={{ width: `${Math.min(c.probability, 100)}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="section-label">Recommended actions</div>
      <ul className="action-list">
        {result.recommended_actions.map((a, i) => (
          <li key={i}><span className="action-dot">✓</span>{a}</li>
        ))}
      </ul>

      <div className="info-box emergency-box">
        <div className="info-box-label">When to seek emergency care</div>
        <p>{result.when_to_seek_emergency}</p>
      </div>

      <div className="info-box home-box">
        <div className="info-box-label">Home care tip</div>
        <p>{result.lifestyle_note}</p>
      </div>

      <FollowUpChat symptoms={symptoms} onFollowUp={onFollowUp} />
    </div>
  );
}
