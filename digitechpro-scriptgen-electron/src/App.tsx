import React, { useState } from "react";

/** ---------- Minimal single-file UI (no external components) ---------- */

type Angle = "Direct" | "Story" | "Explainer" | "UGC" | "Motion";
type Creativity = "Low (0.4)" | "Mid (0.6)" | "High (0.8)";

export default function App() {
  // header pills
  const [model, setModel] = useState("openrouter/gpt-4o-mini");
  const [angle, setAngle] = useState<Angle>("Direct");
  const [creativity, setCreativity] = useState<Creativity>("Mid (0.6)");
  const [active, setActive] = useState(false);

  // left overview
  const [scriptsGenerated, setScriptsGenerated] = useState(14);
  const [hooksGenerated, setHooksGenerated] = useState(1);

  // right form
  const [product, setProduct] = useState("");
  const [cta, setCta] = useState("");
  const [problem, setProblem] = useState("");
  const [oldSolution, setOldSolution] = useState("");
  const [probMech, setProbMech] = useState("");
  const [solMech, setSolMech] = useState("");
  const [proof, setProof] = useState("");

  const handleGenerate = () => {
    // এখানে চাইলে পরে OpenRouter/OpenAI কল যুক্ত করবে
    setScriptsGenerated((n) => n + 1);
    setHooksGenerated((n) => n + 1);
    alert("✅ Demo: Script generated (mock).");
  };

  const handleReset = () => {
    setProduct("");
    setCta("");
    setProblem("");
    setOldSolution("");
    setProbMech("");
    setSolMech("");
    setProof("");
  };

  return (
    <div style={styles.app}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.brandWrap}>
          <div style={styles.logo}>DP</div>
          <div>
            <div style={styles.title}>DigiTech-Pro Script Generator</div>
            <div style={styles.sub}>Powered by DigiTech-Pro • Andromeda Framework</div>
          </div>
        </div>

        <div style={styles.pillsRow}>
          <Pill label="Model">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              style={styles.select}
            >
              <option>openrouter/gpt-4o-mini</option>
              <option>openrouter/gpt-4.1-mini</option>
              <option>openai/gpt-4o-mini</option>
              <option>anthropic/claude-3.5-sonnet</option>
            </select>
          </Pill>

          <Segmented
            label="Angle"
            options={["Direct", "Story", "Explainer", "UGC", "Motion"] as Angle[]}
            value={angle}
            onChange={setAngle}
          />

          <Pill label="Creativity">
            <select
              value={creativity}
              onChange={(e) => setCreativity(e.target.value as Creativity)}
              style={styles.select}
            >
              <option>Low (0.4)</option>
              <option>Mid (0.6)</option>
              <option>High (0.8)</option>
            </select>
          </Pill>

          <button
            onClick={() => setActive((s) => !s)}
            style={{
              ...styles.badge,
              background: active ? "#17a34a22" : "#a3a3a333",
              border: active ? "1px solid #16a34a" : "1px solid #555",
              color: active ? "#22c55e" : "#ddd",
            }}
          >
            {active ? "Active" : "Inactive"}
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* Left column */}
        <div style={styles.left}>
          <Card title="Performance Overview">
            <Row label="Scripts Generated" value={scriptsGenerated} />
            <Row label="Hooks Generated" value={hooksGenerated} />
            <Row label="Model Used" value={model.split("/")[0]} />
          </Card>

          <Card title="Creative Mix (%)">
            <div style={{fontSize:12,opacity:.8,marginBottom:8}}>
              Story 30 • Explainer 20 • UGC 25 • Motion 15 • Offer 10
            </div>
            {/* donut বাদ—UI সিম্পল রাখা হলো */}
          </Card>

          <Card title="Tips">
            <ul style={styles.tips}>
              <li>গল্পের শুরুতেই সমস্যা দেখাও</li>
              <li>শেষে বেনিফিট-ড্রিভেন CTA দাও</li>
              <li>ভয়েসওভারের সাথে বি-রোল কাট ব্যবহার করো</li>
              <li>হুক ৬–১২ শব্দের মধ্যে</li>
              <li>প্যাটার্ন-ইন্টারাপ্ট ব্যবহার</li>
              <li>১০+ ক্রিয়েটিভ টেস্ট; জিতলে স্কেল, হারলে রোটেট</li>
            </ul>
          </Card>
        </div>

        {/* Right column – Script Form */}
        <div style={styles.right}>
          <Card title="Script Form">
            <TwoCol
              labelLeft="Product Name"
              valueLeft={product}
              onLeft={setProduct}
              placeholderLeft="Allergy Killer"
              labelRight="CTA Offer"
              valueRight={cta}
              onRight={setCta}
              placeholderRight="৫০% ছাড় — আজই নিন"
            />
            <Field
              label="Problem"
              value={problem}
              onChange={setProblem}
              placeholder="নাক বন্ধ ও হাঁচি"
            />
            <Field
              label="Old Solution"
              value={oldSolution}
              onChange={setOldSolution}
              placeholder="অ্যান্টিহিস্টামিন ওষুধ"
            />
            <TwoCol
              labelLeft="Mechanism of Problem"
              valueLeft={probMech}
              onLeft={setProbMech}
              placeholderLeft="ইমিউন অতি-সক্রিয় প্রতিক্রিয়া"
              labelRight="Mechanism of Solution"
              valueRight={solMech}
              onRight={setSolMech}
              placeholderRight="নাকের ইনফ্লেমেশন কমায়"
            />
            <Field
              label="Proof / Testimonial"
              value={proof}
              onChange={setProof}
              placeholder="৫০০+ গ্রাহক খুশি"
              multiline
            />

            <div style={{display:"flex",gap:12,marginTop:12}}>
              <button style={styles.primaryBtn} onClick={handleGenerate}>
                Generate Script
              </button>
              <button style={styles.secondaryBtn} onClick={handleReset}>
                Reset Inputs
              </button>
            </div>

            <div style={styles.helperNote}>
              Generated scripts appear in Output. Hooks auto-saved in Hooks tab.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/** -------- small internal UI helpers -------- */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>{title}</div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={styles.row}>
      <div>{label}</div>
      <div style={{opacity:.9}}>{value}</div>
    </div>
  );
}

function Pill({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={styles.pill}>
      <span style={styles.pillLabel}>{label}</span>
      {children}
    </div>
  );
}

function Segmented<T extends string>({
  label, options, value, onChange
}: { label: string; options: readonly T[]; value: T; onChange: (v:T)=>void }) {
  return (
    <div style={styles.pill}>
      <span style={styles.pillLabel}>{label}</span>
      <div style={styles.segment}>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              ...styles.segmentBtn,
              background: value===opt ? "#1e293b" : "transparent",
              borderColor: value===opt ? "#334155" : "#475569",
              color: value===opt ? "#e2e8f0" : "#cbd5e1",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, multiline
}: {
  label: string; value: string; onChange: (v:string)=>void;
  placeholder?: string; multiline?: boolean;
}) {
  const common = {
    width: "100%", background: "#0b1220", color: "#e5e7eb",
    border: "1px solid #334155", borderRadius: 10, padding: "10px 12px",
    outline: "none" as const
  };
  return (
    <div style={{marginBottom:12}}>
      <div style={styles.inputLabel}>{label}</div>
      {multiline ? (
        <textarea
          style={{...common, height: 96}}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          style={{...common, height: 36}}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function TwoCol(props: {
  labelLeft: string; valueLeft: string; onLeft: (v:string)=>void; placeholderLeft?: string;
  labelRight: string; valueRight: string; onRight: (v:string)=>void; placeholderRight?: string;
}) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Field label={props.labelLeft} value={props.valueLeft} onChange={props.onLeft} placeholder={props.placeholderLeft}/>
      <Field label={props.labelRight} value={props.valueRight} onChange={props.onRight} placeholder={props.placeholderRight}/>
    </div>
  );
}

/** -------- inline styles (to avoid external css) -------- */

const styles: Record<string, React.CSSProperties> = {
  app: { background:"#070d1a", color:"#e5e7eb", minHeight:"100vh", fontFamily:"system-ui, Segoe UI, Roboto" },
  header: { padding:"16px 18px 8px", borderBottom:"1px solid #0f172a" },
  brandWrap: { display:"flex", alignItems:"center", gap:12 },
  logo: { width:36, height:36, borderRadius:10, background:"#1d4ed8", display:"grid", placeItems:"center", fontWeight:700 },
  title: { fontSize:20, fontWeight:800 },
  sub: { fontSize:12, opacity:.7 },
  pillsRow: { display:"flex", gap:10, marginTop:12, flexWrap:"wrap" },
  badge: { padding:"6px 12px", borderRadius:999, fontSize:12, cursor:"pointer", background:"transparent" },
  select: { background:"transparent", color:"#e5e7eb", border:"none", outline:"none" },
  pill: { display:"flex", alignItems:"center", gap:10, border:"1px solid #334155", padding:"6px 10px", borderRadius:999 },
  pillLabel: { fontSize:12, opacity:.8 },
  segment: { display:"flex", gap:6 },
  segmentBtn: { padding:"6px 10px", borderRadius:999, border:"1px solid", cursor:"pointer", fontSize:12 },

  body: { display:"grid", gridTemplateColumns:"440px 1fr", gap:16, padding:16 },
  left: { display:"flex", flexDirection:"column", gap:12 },
  right: { display:"flex", flexDirection:"column" },

  card: { background:"#0b1020", border:"1px solid #0f172a", borderRadius:14, padding:12 },
  cardTitle: { fontWeight:800, marginBottom:8 },
  row: { display:"flex", justifyContent:"space-between", border:"1px solid #1f2937", padding:"10px 12px", borderRadius:12, marginBottom:8 },

  inputLabel: { fontSize:12, marginBottom:6, opacity:.85 },
  primaryBtn: { background:"#f97316", border:"1px solid #ea580c", color:"#111", padding:"10px 14px", borderRadius:12, cursor:"pointer", fontWeight:700 },
  secondaryBtn: { background:"#0b1220", border:"1px solid #475569", color:"#e5e7eb", padding:"10px 14px", borderRadius:12, cursor:"pointer" },
  tips: { margin:0, paddingLeft:18, lineHeight:1.6 },
  helperNote: { fontSize:12, opacity:.65, marginTop:8 }
};
