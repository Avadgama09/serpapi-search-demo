// CompetitorPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function CompetitorPage() {
  const nav = useNavigate();

  return (
    <div className="page-dark" style={{ gap: 16 }}>
      <header className="nav">
        <div className="nav__brand" style={{ cursor: 'pointer' }} onClick={() => nav('/')}>
          <div className="nav__badge">SEO</div>
          <strong>Competitor Intelligence</strong>
        </div>
        <div className="nav__links" />
        <div className="nav__cta" style={{ gap: 8 }}>
          <button className="btn btn--chip" onClick={() => nav('/')}>Back to Home</button>
        </div>
      </header>

      <section className="hero" style={{ minHeight: 200 }}>
        <div className="hero__col">
          <h2 style={{ margin: 0 }}>Analyze Competitors</h2>
          <p className="hero__sub" style={{ marginTop: 6 }}>
            Track SERP positions, backlink trends, content velocity, and gaps.
          </p>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <input className="input-dark" placeholder="Enter topic or domain (e.g., example.com)" />
            <button className="btn btn--primary-lg">Analyze</button>
          </div>
        </div>
        <div className="hero__viz" />
      </section>

      <section className="research-layout">
        <div className="card-dark">
          <div className="card-head">
            <div className="card-title">Filters</div>
            <div className="chip">SERP / Links</div>
          </div>
          <div className="chip-row">
            <span className="chip chip--on">Top 10</span>
            <span className="chip">Top 20</span>
            <span className="chip">Past 30d</span>
            <span className="chip">Past 90d</span>
            <span className="chip">Blog</span>
            <span className="chip">Docs</span>
          </div>
        </div>

        <div className="card-dark">
          <div className="card-head">
            <div className="card-title">Competitor Table</div>
            <div className="chip">Live</div>
          </div>

          <div className="results">
            <div className="result">
              <div className="result__title">competitor-a.com</div>
              <div className="result__meta">Top keywords: 1.2k • Avg pos: 8.4 • Links: 45.3k</div>
              <div className="result__snippet">Strength in topic clusters X and Y, weak in Z…</div>
            </div>
            <div style={{ borderTop: '1px solid var(--line)', margin: '10px 0' }} />
            <div className="result">
              <div className="result__title">competitor-b.com</div>
              <div className="result__meta">Top keywords: 950 • Avg pos: 10.2 • Links: 28.1k</div>
              <div className="result__snippet">Growing content velocity; link velocity steady…</div>
            </div>
          </div>
        </div>

        <div className="card-dark">
          <div className="card-head">
            <div className="card-title">Insights</div>
            <div className="chip">AI Draft</div>
          </div>
          <div className="synthesis">
            <p className="muted">Key opportunity topics and gaps will appear here after analysis.</p>
            <button className="btn btn--ghost-lg">Export CSV</button>
          </div>
        </div>
      </section>
    </div>
  );
}
