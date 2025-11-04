
import React, { useEffect, useState } from 'react'
type Status = 'inactive' | 'active' | 'error'
declare global { interface Window { bridge: { getStatus(): Promise<{status: Status}>, setStatus(s: Status): Promise<{ok: boolean}>, openExternal(link: string): void } } }
export default function App(){
  const [status, setStatus] = useState<Status>('inactive')
  useEffect(() => { (async () => { const s = await window.bridge.getStatus(); if (s?.status) setStatus(s.status) })() }, [])
  return (
    <div className="win">
      <div className="titlebar"><div className="dots"><span className="d red"/><span className="d yellow"/><span className="d green"/></div><div className="appname">DigiTech‑Pro • Script Generator</div><div style={{width:60}}/></div>
      <header className="header">
        <div className="brand">
          <img className="logo" src="assets/logo.png" alt="DigiTech-Pro Logo" />
          <div className="titlewrap">
            <div className="title">DigiTech‑Pro Script Generator <span className="badge">v1.0 (Beta)</span></div>
            <div className="sub">Powered by DigiTech‑Pro • Andromeda Framework</div>
          </div>
        </div>
        <div className="controls">
          <div className="pill">Model
            <select defaultValue="openrouter/gpt-4o-mini"><option>openrouter/gpt-4o-mini</option><option>openrouter/qwen2.5</option><option>openrouter/llama-3.1</option><option>openrouter/gpt-4.1-mini</option></select>
          </div>
          <div className="pill">Angle
            <div className="seg"><button className="active">Direct</button><button>Story</button><button>Explainer</button><button>UGC</button><button>Motion</button></div>
          </div>
          <div className="pill">Creativity
            <select defaultValue="Mid (0.6)"><option>Low (0.4)</option><option>Mid (0.6)</option><option>High (0.8)</option></select>
          </div>
          <div className="pill"><span>Active</span><span className={`dot ${status}`} title={status}/></div>
        </div>
      </header>
      <main className="body">
        <section className="col">
          <div className="card"><h3>Performance Overview</h3>
            <ul className="list"><li className="item"><span>Scripts Generated</span><strong>14</strong></li><li className="item"><span>Hooks Generated</span><strong>1</strong></li><li className="item"><span>Model Used</span><strong>OpenRouter</strong></li></ul>
          </div>
          <div className="card"><div className="row"><h3>Creative Mix (%)</h3><span className="meta">Story 30 • Explainer 20 • UGC 25 • Motion 15 • Offer 10</span></div>
            <div className="wrapDonut"><div className="donut"/><div className="legend">
              <span className="c blue"/> <span>Storytelling</span> <span>30%</span>
              <span className="c orange"/> <span>Explainer</span> <span>20%</span>
              <span className="c green"/> <span>UGC</span> <span>25%</span>
              <span className="c yellow"/> <span>Motion</span> <span>15%</span>
              <span className="c red"/> <span>Offer</span> <span>10%</span>
            </div></div>
          </div>
          <div className="card"><h3>Tips</h3><ul className="tips"><li>গল্পের শুরুতেই সমস্যা দেখাও</li><li>শেষে অ্যাকশন‑ড্রিভেন CTA দাও</li><li>ভয়েসওভারের সাথে বি‑রোল কাট</li><li>হুক ৬–১২ শব্দ রাখো</li><li>১০+ ক্রিয়েটিভ টেস্ট; জাম্প কাট রোটেট</li></ul></div>
          <div className="card"><h3>Progress • Weekly targets</h3><div className="progress"><div/></div><div className="meta" style={{marginTop:6}}>21 out of 35 this week</div></div>
        </section>
        <section className="col">
          <div className="card" style={{flex:1}}><h3>Script Form</h3>
            <div className="grid2"><div><label>Product Name</label><input placeholder="Allergy Killer"/></div><div><label>CTA Offer</label><input placeholder="৫০% ছাড় — আজই নিন"/></div></div>
            <label>Problem</label><input placeholder="নাক বন্ধ ও হাঁচি"/>
            <label>Old Solution</label><input placeholder="অ্যান্টিহিস্টামিন ওষুধ"/>
            <div className="grid2"><div><label>Mechanism of Problem</label><input placeholder="ইমিউন অতিরিক্ত সংবেদনশীলতা"/></div><div><label>Mechanism of Solution</label><input placeholder="নাকের ইনফ্লেমেশন কমানো"/></div></div>
            <label>Proof / Testimonial</label><textarea placeholder="৫০০+ গ্রাহকের রিভিউ—অল্প সময়ে আরাম"/>
            <div className="toolbar"><button className="btn">🟠 Generate Script</button><button className="btn ghost">Reset Inputs</button><span className="help">Generated scripts appear in Output. Hooks auto‑saved.</span></div>
          </div>
        </section>
      </main>
    </div>
  )
}
