import React, { useEffect, useState } from "react";

type Provider = "openrouter" | "openai";

const MODELS: Record<Provider, string[]> = {
  openrouter: ["openrouter/gpt-4o-mini", "meta-llama/llama-3.1-8b-instruct", "nousresearch/hermes-3-llama-3.1-8b"],
  openai: ["gpt-4o-mini", "gpt-4o", "gpt-3.5-turbo"]
};

const TEMPS = [
  { label: "Low (0.4)", value: 0.4 },
  { label: "Mid (0.6)", value: 0.6 },
  { label: "High (0.8)", value: 0.8 },
];

export default function SettingsPanel({
  onStatus,
}: {
  onStatus?: (connected: boolean, model: string) => void;
}) {
  const [provider, setProvider] = useState<Provider>("openrouter");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState(MODELS.openrouter[0]);
  const [temp, setTemp] = useState(0.6);
  const [status, setStatus] = useState<"idle" | "connected" | "error">("idle");
  const [msg, setMsg] = useState("Not Connected");
  const [showKey, setShowKey] = useState(false);

  // Load saved values (localStorage — simple & works now)
  useEffect(() => {
    const p = (localStorage.getItem("dp.provider") as Provider) || "openrouter";
    const k = localStorage.getItem("dp.key") || "";
    const m = localStorage.getItem("dp.model") || MODELS[p][0];
    const t = parseFloat(localStorage.getItem("dp.temp") || "0.6");
    setProvider(p);
    setApiKey(k);
    setModel(m);
    setTemp(isNaN(t) ? 0.6 : t);

    if (k) {
      setStatus("connected");
      setMsg("Active");
      onStatus?.(true, m);
    }
  }, []);

  // switch provider -> default model
  useEffect(() => {
    if (!MODELS[provider].includes(model)) {
      setModel(MODELS[provider][0]);
    }
  }, [provider]);

  async function saveAll() {
    localStorage.setItem("dp.provider", provider);
    localStorage.setItem("dp.key", apiKey);
    localStorage.setItem("dp.model", model);
    localStorage.setItem("dp.temp", String(temp));
  }

  async function connect() {
    try {
      setMsg("Checking…");
      // lightweight health check: just shape-validate key
      if (!apiKey.startsWith("sk-")) throw new Error("Invalid API key");
      await saveAll();
      setStatus("connected");
      setMsg("Active");
      onStatus?.(true, model);
    } catch (e: any) {
      setStatus("error");
      setMsg(e?.message || "Failed");
      onStatus?.(false, model);
    }
  }

  function disconnect() {
    localStorage.removeItem("dp.key");
    setApiKey("");
    setStatus("idle");
    setMsg("Not Connected");
    onStatus?.(false, model);
  }

  const dotColor = status === "connected" ? "#22c55e" : status === "error" ? "#ef4444" : "#64748b";

  return (
    <div style={wrap}>
      <div style={head}>
        <div style={{ fontWeight: 800 }}>⚙️ Settings</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ ...dot, background: dotColor, boxShadow: `0 0 8px ${dotColor}` }} />
          <span style={{ opacity: 0.9 }}>{msg}</span>
        </div>
      </div>

      <div style={field}>
        <label style={label}>Provider</label>
        <select value={provider} onChange={(e) => setProvider(e.target.value as Provider)} style={input}>
          <option value="openrouter">OpenRouter</option>
          <option value="openai">OpenAI</option>
        </select>
      </div>

      <div style={field}>
        <label style={label}>API Key</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type={showKey ? "text" : "password"}
            placeholder="sk-xxxxxxxx"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ ...input, flex: 1 }}
          />
          <button onClick={() => setShowKey((s) => !s)} style={btnGhost}>{showKey ? "Hide" : "Show"}</button>
        </div>
      </div>

      <div style={row2}>
        <div style={field}>
          <label style={label}>Model</label>
          <select value={model} onChange={(e) => setModel(e.target.value)} style={input}>
            {MODELS[provider].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div style={field}>
          <label style={label}>Creativity</label>
          <select value={temp} onChange={(e) => setTemp(parseFloat(e.target.value))} style={input}>
            {TEMPS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <button onClick={connect} disabled={!apiKey} style={btnPrimary}>Connect</button>
        <button onClick={disconnect} disabled={!apiKey} style={btnSoft}>Disconnect</button>
        <button onClick={saveAll} style={btnGhost}>Save</button>
      </div>
    </div>
  );
}

const wrap: React.CSSProperties = {
  background: "#0f1630",
  border: "1px solid #1f2a54",
  borderRadius: 14,
  color: "#e5edff",
  padding: 14,
};
const head: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 };
const label: React.CSSProperties = { fontSize: 12, opacity: 0.8, marginBottom: 6 };
const field: React.CSSProperties = { display: "flex", flexDirection: "column", marginBottom: 10 };
const input: React.CSSProperties = { background: "#0b1228", color: "#e5edff", border: "1px solid #24315e", borderRadius: 10, padding: "10px 12px", outline: "none" };
const row2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 };
const dot: React.CSSProperties = { width: 10, height: 10, borderRadius: 9999 };
const btnPrimary: React.CSSProperties = { background: "#ff6a00", color: "#fff", border: "none", borderRadius: 10, padding: "10px 14px", fontWeight: 700, cursor: "pointer" };
const btnSoft: React.CSSProperties = { background: "#2d3a67", color: "#fff", border: "1px solid #3b4a7e", borderRadius: 10, padding: "10px 14px", cursor: "pointer" };
const btnGhost: React.CSSProperties = { background: "transparent", color: "#e5edff", border: "1px solid #3b4a7e", borderRadius: 10, padding: "10px 14px", cursor: "pointer" };

