export default function SessionStats({ stats }) {
  if (stats.analyses === 0) return null;

  return (
    <div className="session-stats">
      <div className="stat-box">
        <div className="stat-num">{stats.analyses}</div>
        <div className="stat-label">Analyses run</div>
      </div>
      <div className="stat-box">
        <div className="stat-num">{stats.conditions}</div>
        <div className="stat-label">Conditions reviewed</div>
      </div>
      <div className="stat-box">
        <div className="stat-num">{stats.followups}</div>
        <div className="stat-label">Follow-up queries</div>
      </div>
    </div>
  );
}
