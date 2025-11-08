import React from "react";

interface DashboardProps {
  model?: string;
  scriptsGenerated?: number;
  hooksGenerated?: number;
}

export default function Dashboard({
  model = "openrouter/gpt-4o-mini",
  scriptsGenerated = 14,
  hooksGenerated = 1,
}: DashboardProps) {
  return (
    <div style={{ color: "#dbeafe", fontFamily: "Poppins, sans-serif", padding: "20px" }}>
      <h2 style={{ fontWeight: 700 }}>Performance Overview</h2>
      <div style={{ marginTop: 12 }}>
        <div>Scripts Generated: <b>{scriptsGenerated}</b></div>
        <div>Hooks Generated: <b>{hooksGenerated}</b></div>
        <div>Model Used: <b>{model}</b></div>
      </div>
    </div>
  );
}

