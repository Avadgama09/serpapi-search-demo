// ResearchPanel.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import TopPanel from "./components/TopPanel.jsx";

const ENGINES = [
  { label: "Google Search", value: "google" },
  { label: "Google AI Overview", value: "google_ai_overview" },
  { label: "Bing Search", value: "bing" },
];

export default function ResearchPanel() {
  const [query, setQuery] = useState("");
  const [engine, setEngine] = useState("google");
  const [results, setResults] = useState([]);
  const [aiOverview, setAiOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    setAiOverview(null);

    let url;
    if (engine === "google_ai_overview") {
      url = `http://localhost:3001/api/search?engine=google_ai_overview&q=${encodeURIComponent(query)}`;
    } else {
      url = `http://localhost:3001/api/search?q=${encodeURIComponent(query)}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("API error: " + response.status);
      const data = await response.json();

      if (engine === "google_ai_overview" && data.ai_overview) {
        setAiOverview(data.ai_overview);
      } else if (data.organic_results) {
        setResults(data.organic_results.slice(0, 5));
      } else {
        setResults([]);
        setError("No results found.");
      }
    } catch (err) {
      setError("Failed to fetch results: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="page-dark" style={{ gap: 16 }}>
      {/* Top bar consistent with site */}
      <header className="nav">
        <div
          className="nav__brand"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <div className="nav__badge">SEO</div>
          <strong>Research Panel</strong>
        </div>
        <div className="nav__links" />
        <div className="nav__cta" style={{ gap: 8 }}>
          <button className="btn btn--chip" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </header>

      {/* Query hero - now using TopPanel */}
      <TopPanel
        title="Launch Research Panel"
        subtitle="Search across multiple engines, synthesize answers with AI, and capture insights."
        error={error}
      >
        <form onSubmit={handleSearch} style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <select
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
            className="input-dark"
            style={{ maxWidth: 230 }}
          >
            {ENGINES.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input
            className="input-dark"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your search and press Enter"
          />
          <button type="submit" className="btn btn--primary-lg" style={{ whiteSpace: "nowrap" }}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </TopPanel>

      {/* Three-column workspace */}
      <section className="research-layout">
        {/* Sources */}
        <div className="card-dark">
          <div className="card-head">
            <div className="card-title">Sources</div>
            <div className="chip">Engines</div>
          </div>
          <div className="chip-row">
            <span className={`chip ${engine === "google" ? "chip--on" : ""}`} onClick={() => setEngine("google")}>Google</span>
            <span className={`chip ${engine === "bing" ? "chip--on" : ""}`} onClick={() => setEngine("bing")}>Bing</span>
            <span className={`chip ${engine === "google_ai_overview" ? "chip--on" : ""}`} onClick={() => setEngine("google_ai_overview")}>AI Overview</span>
          </div>
        </div>

        {/* Results */}
        <div className="card-dark">
          <div className="card-head">
            <div className="card-title">Results</div>
            <div className="chip">{loading ? "Loading…" : "Live"}</div>
          </div>

          {/* AI Overview */}
          {aiOverview && (
            <div className="card-dark" style={{ background: "#0f1a16", borderColor: "#20463d" }}>
              <div className="card-title">AI Overview</div>
              {aiOverview.text_blocks && aiOverview.text_blocks.map((block, i) => (
                <div key={i} style={{ margin: "12px 0" }}>
                  {block.title && <div style={{ fontWeight: 700 }}>{block.title}</div>}
                  {block.snippet && <div className="muted">{block.snippet}</div>}
                  {block.list && Array.isArray(block.list) && (
                    <ul style={{ marginTop: 6 }}>
                      {block.list.map((item, j) => (
                        <li key={j} className="muted">{item.snippet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Organic results */}
          {results.length > 0 && (
            <div className="results">
              {results.map((r, i) => (
                <div className="result" key={i}>
                  <div className="result__title">
                    <a href={r.link} target="_blank" rel="noreferrer">{r.title}</a>
                  </div>
                  <div className="result__meta">{r.source || r.domain || 'source'} • {r.date || ''}</div>
                  <div className="result__snippet">{r.snippet}</div>
                  {i < results.length - 1 && <div style={{ borderTop: "1px solid var(--line)", margin: "10px 0" }} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Synthesis */}
        <div className="card-dark">
          <div className="card-head">
            <div className="card-title">AI Synthesis</div>
            <div className="chip">Draft</div>
          </div>
          <div className="synthesis">
            <p className="muted">Your synthesized insights will appear here after searching.</p>
            <button className="btn btn--ghost-lg">Save Insight</button>
          </div>
        </div>
      </section>
    </div>
  );
}
