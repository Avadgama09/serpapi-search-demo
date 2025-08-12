// src/Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const features = [
  {
    key: 'research',
    icon: '➕',
    name: 'Research Super Panel',
    desc: 'Multi-engine search with AI synthesis across 20+ sources',
    bullets: ['Google, Bing, Perplexity integration', 'Real-time insights', 'AI-powered analysis'],
    cta: 'Launch Research Panel',
    color: 'var(--c-teal)',
  },
  {
    key: 'brief',
    icon: '🗂️',
    name: 'AI Brief Developer',
    desc: 'Generate comprehensive content briefs in minutes, not hours',
    bullets: ['Competitor analysis', 'SEO optimization', 'Content structure'],
    cta: 'Create Content Brief',
    color: 'var(--c-cyan)',
  },
  {
    key: 'competitors',
    icon: '📈',
    name: 'Competitor Intelligence',
    desc: "Track competitors' strategies and identify opportunities",
    bullets: ['SERP monitoring', 'Backlink analysis', 'Content gaps'],
    cta: 'Analyze Competitors',
    color: 'var(--c-blue)',
  },
  {
    key: 'keywords',
    icon: '✦',
    name: 'Advanced Keyword Research',
    desc: 'Discover high-value keywords with difficulty scoring',
    bullets: ['Volume analysis', 'Trend tracking', 'Opportunity scoring'],
    cta: 'Discover Keywords',
    color: 'var(--c-teal)',
  },
];

function Nav() {
  return (
    <header className="nav">
      <div className="nav__brand">
        <div className="nav__badge">SEO</div>
        <strong>SEO Intelligence</strong>
      </div>
      <nav className="nav__links">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#resources">Resources</a>
        <a href="#about">About</a>
        <a href="#login">Login</a>
      </nav>
      <div className="nav__cta">
        <button className="btn btn--chip">Start Free Trial</button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__col">
        <h1 className="hero__title">
          The Complete SEO Intelligence Platform for Modern Marketers
        </h1>
        <p className="hero__sub">
          Research, analyze, and optimize with AI-powered tools that give you the
          competitive edge. Integrate data from 20+ sources including Google,
          Bing, and Perplexity.
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary-lg">Start Free Trial</button>
          <button className="btn btn--ghost-lg">Watch Demo</button>
        </div>
      </div>
      <div className="hero__viz">
        <div className="viz__pill">
          <span>SEO Intelligence Dashboard</span>
          <span className="pill__dot" />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, name, desc, bullets, cta, color, onClick }) {
  return (
    <div className="fcard">
      <div className="fcard__icon" aria-hidden="true">{icon}</div>
      <div className="fcard__title">{name}</div>
      <div className="fcard__desc">{desc}</div>
      <ul className="fcard__list">
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
      <button
        className="btn btn--cta"
        style={{ '--btn-bg': color }}
        onClick={onClick}
      >
        {cta}
      </button>
    </div>
  );
}

export default function Homepage() {
  const navigate = useNavigate();

  const handleOpen = (key) => {
  if (key === 'research') navigate('/research');
  else if (key === 'brief') navigate('/brief');
  else if (key === 'competitors') navigate('/competitors');
  else if (key === 'keywords') window.alert('Coming soon: Keyword Research');
};


  return (
    <div className="page-dark">
      <Nav />
      <Hero />

      <section className="features" id="features">
        <h3 className="section__title">Powerful Features for Every SEO Need</h3>
        <p className="section__sub">
          Everything you need to dominate search rankings and outperform competitors
        </p>

        <div className="fgrid">
          {features.slice(0, 3).map((f) => (
            <FeatureCard
              key={f.key}
              {...f}
              onClick={() => handleOpen(f.key)}
            />
          ))}
        </div>

        <div className="fgrid fgrid--single">
          <FeatureCard
            {...features[3]}
            onClick={() => handleOpen(features[1].key)}
          />
        </div>
      </section>

      <section className="statsband">
        <div className="stat">
          <div className="stat__value">20+</div>
          <div className="stat__label">Search Engines Integrated</div>
        </div>
        <div className="stat">
          <div className="stat__value">1M+</div>
          <div className="stat__label">Keywords Analyzed Daily</div>
        </div>
        <div className="stat">
          <div className="stat__value">95%</div>
          <div className="stat__label">Time Savings on Research</div>
        </div>
        <div className="stat">
          <div className="stat__value">24/7</div>
          <div className="stat__label">AI-Powered Insights</div>
        </div>
      </section>

      <section className="trusted">
        <div className="trusted__title">
          Trusted by 500+ SEO agencies and marketing teams
        </div>
        <div className="trusted__logos">
          <span>TechCorp</span>
          <span>GrowthAgency</span>
          <span>DigitalPro</span>
          <span>SEOExperts</span>
          <span>MarketLeaders</span>
        </div>
      </section>
    </div>
  );
}
