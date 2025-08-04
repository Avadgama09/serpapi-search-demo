import React, { useState } from "react";

const ENGINES = [
  { label: "Google Search", value: "google" },
  { label: "Google AI Overview", value: "google_ai_overview" },
];

function App() {
  const [query, setQuery] = useState("");
  const [engine, setEngine] = useState("google");
  const [results, setResults] = useState([]);
  const [aiOverview, setAiOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    setAiOverview(null);

    let url;
    if (engine === "google_ai_overview") {
      // Call SerpAPI with engine=google_ai_overview
      url = `http://localhost:3001/api/search?engine=google_ai_overview&q=${encodeURIComponent(query)}`;
    } else {
      // Default Google Search
      url = `http://localhost:3001/api/search?q=${encodeURIComponent(query)}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("API error: " + response.status);
      }
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
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f6ff 0%, #e8eaf6 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start"
    }}>
      <div style={{
        marginTop: 80,
        background: "#fff",
        boxShadow: "0 8px 32px 0 rgba(31,38,135,.20)",
        borderRadius: 18,
        padding: "32px 32px 24px 32px",
        width: "100%",
        maxWidth: 520,
        textAlign: "center"
      }}>
        <h2 style={{
          fontWeight: 700, color: "#304ffe", marginBottom: 24,
          letterSpacing: ".03em"
        }}>
          🔎 Multi-Engine Search with SerpAPI
        </h2>
        <form onSubmit={handleSearch} style={{ display: "flex", marginBottom: 10 }}>
          <select
            value={engine}
            onChange={e => setEngine(e.target.value)}
            style={{
              marginRight: 10,
              padding: 9,
              fontSize: 17,
              borderRadius: 8,
              border: "1px solid #b0bec5"
            }}>
            {ENGINES.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type your search and press Enter"
            style={{
              flex: 1,
              padding: 12,
              fontSize: 17,
              borderRadius: 8,
              border: "1px solid #b0bec5"
            }}
          />
          <button
            type="submit"
            style={{
              marginLeft: 12,
              padding: "12px 20px",
              fontSize: 17,
              borderRadius: 8,
              background: "#304ffe",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        {error && <div style={{ color: "#d32f2f", marginTop: 8 }}>{error}</div>}
      </div>
      <div style={{ width: "100%", maxWidth: 520, marginTop: 24 }}>
        {/* Show Google AI Overview results if available */}
        {aiOverview && (
          <div style={{
            background: "#f9fbe7",
            borderRadius: 16,
            boxShadow: "0 2px 16px 0 rgba(31,38,135,.07)",
            padding: 24,
            marginBottom: 20
          }}>
            <h3 style={{ color: "#43a047", margin: 0, fontWeight: 700 }}>AI Overview</h3>
            {aiOverview.text_blocks && aiOverview.text_blocks.map((block, i) => (
              <div key={i} style={{ margin: "18px 0", color: "#333", fontSize: 16 }}>
                {block.title && <div style={{ fontWeight: 600 }}>{block.title}</div>}
                {block.snippet && <div>{block.snippet}</div>}
                {block.list && Array.isArray(block.list) && (
                  <ul>
                    {block.list.map((item, j) => (
                      <li key={j}>{item.snippet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        {/* Show regular results (Google Search) */}
        {results.length > 0 && (
          <div style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 16px 0 rgba(31,38,135,.07)",
            padding: 20
          }}>
            <h3 style={{ color: "#222", margin: "0 0 18px 0" }}>Top Results:</h3>
            <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
              {results.map((r, i) => (
                <li key={i} style={{
                  marginBottom: 18,
                  borderBottom: i !== results.length - 1 ? "1px solid #e3e3e3" : "none",
                  paddingBottom: 10
                }}>
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#1976d2", fontWeight: 600, fontSize: 17 }}>
                    {r.title}
                  </a>
                  <br />
                  <span style={{ color: "#555", fontSize: 15 }}>{r.snippet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
