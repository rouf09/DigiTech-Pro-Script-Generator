import React, { useState } from "react";
import SettingsPanel from "./components/SettingsPanel";

export default function App() {
  const [connected, setConnected] = useState(false);
  const [model, setModel] = useState("—");

  return (
    <div style={{ background: "#0b1023", minHeight: "100vh", color: "#dbeafe", fontFamily: "Poppins, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid #182041" }}>
        <div style={{ fontWeight: 800, fontSize: 20 }}>DigiTech-Pro • Script Generator</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 10, height: 10, borderRadius: 9999,
            background: connected ? "#22c55e" : "#ef4444",
            boxShadow: `0 0 8px ${connected ? "#22c55e" : "#ef4444"}`
          }}/>
          <span>{connected ? `Active (${model})` : "Not Connected"}</span>
        </div>
      </div>

      {/* Body: Left main + Right settings */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, padding: 16 }}>
        {/* Left placeholder (এখানে পরে Performance/Chart/Generator থাকবে) */}
        <div style={{ background: "#0f1330", border: "1px solid #1f2a54", borderRadius: 14, minHeight: 400, padding: 16 }}>
          <div style={{ opacity: 0.85 }}>
            <b>Performance Overview</b> &nbsp;·&nbsp; Model Used: <b>{model}</b>
          </div>
          <div style={{ marginTop: 10, opacity: 0.7, fontSize: 13 }}>
            (এখানে তোমার Metrics, Creative Mix chart, Tips, Script Generator form বসবে)
          </div>
        </div>

        {/* Right Settings panel */}
        <SettingsPanel
          onStatus={(ok, m) => {
            setConnected(ok);
            setModel(m);
          }}
        />
      </div>
    </div>
  );
}

