import "./style.css";
import { useNavigate } from "react-router-dom";
import React from "react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="homepage__header">
        <nav className="homepage__nav">
          <div className="homepage__brand">SEO Intelligence</div>
          <button className="btn-primary">Start Free Trial</button>
        </nav>
        <h1>The Complete SEO Intelligence Platform for Modern Marketers</h1>
        <p>
          Research, analyze, and optimize with AI-powered tools that give you the
          competitive edge. Integrate data from 20+ sources including Google, Bing,
          and Perplexity.
        </p>
        <div className="homepage__cta-buttons">
          <button className="btn-primary">Start Free Trial</button>
          <button className="btn-secondary">Watch Demo</button>
          <button
            className="btn-primary"
            onClick={() => navigate("/research")}
          >
            SEO Intelligence Dashboard
          </button>
        </div>
      </header>

      <main className="homepage__main">
        <section className="homepage__features">
          <h2>Powerful Features for Every SEO Need</h2>
          <p>
            Everything you need to dominate search rankings and outperform competitors
          </p>
          <div className="feature-cards">
            <article className="feature-card">
              <h3>Research Super Panel</h3>
              <ul>
                <li>Multi-engine search with AI synthesis across 20+ sources</li>
                <li>Google, Bing, Perplexity integration</li>
                <li>Real-time insights</li>
                <li>AI-powered analysis</li>
              </ul>
              <button
                className="btn-primary"
                onClick={() => navigate("/research")}
              >
                Launch Research Panel
              </button>
            </article>
            <article className="feature-card">
              <h3>AI Brief Developer</h3>
              <ul>
                <li>Generate comprehensive content briefs in minutes, not hours</li>
                <li>Competitor analysis</li>
                <li>SEO optimization</li>
                <li>Content structure</li>
              </ul>
              <button
              className="btn-primary"
              onClick={() => navigate("/brief")}
              >
                Launch AI Brief Developer
</button>

            </article>
            <article className="feature-card">
              <h3>Competitor Intelligence</h3>
              <ul>
                <li>Track competitors' strategies and identify opportunities</li>
                <li>SERP monitoring</li>
                <li>Backlink analysis</li>
                <li>Content gaps</li>
              </ul>
              <button className="btn-secondary" disabled>
                Coming Soon
              </button>
            </article>
            <article className="feature-card">
              <h3>Advanced Keyword Research</h3>
              <ul>
                <li>Discover high-value keywords with difficulty scoring</li>
                <li>Volume analysis</li>
                <li>Trend tracking</li>
                <li>Opportunity scoring</li>
              </ul>
              <button className="btn-secondary" disabled>
                Coming Soon
              </button>
            </article>
          </div>
        </section>
        <section className="homepage__stats">
          <div>20+ Search Engines Integrated</div>
          <div>1M+ Keywords Analyzed Daily</div>
          <div>95% Time Savings on Research</div>
          <div>24/7 AI-Powered Insights</div>
        </section>

        <section className="homepage__trust">
          <h2>Trusted by 500+ SEO agencies and marketing teams</h2>
          <ul className="trust-logos">
            <li>TechCorp</li>
            <li>GrowthAgency</li>
            <li>DigitalPro</li>
            <li>SEOExperts</li>
            <li>MarketLeaders</li>
          </ul>
          <blockquote>
            "This platform has revolutionized our SEO workflow. The AI insights are incredibly accurate."
            <footer>SC — Sarah Chen, SEO Director at GrowthCorp</footer>
          </blockquote>
          <blockquote>
            "Finally, a tool that combines multiple search engines with intelligent analysis."
            <footer>MR — Mike Rodriguez, Founder of DigitalScale Agency</footer>
          </blockquote>
        </section>
      </main>

      <footer className="homepage__footer">
        <div>SEO Intelligence</div>
        <div>The complete SEO intelligence platform for modern marketers.</div>
        <ul>
          <li>Product</li>
          <li>Resources</li>
          <li>Company</li>
        </ul>
        <small>© 2025 SEO Intelligence Platform. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default HomePage;
