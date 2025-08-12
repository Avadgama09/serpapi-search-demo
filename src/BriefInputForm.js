import React, { useState } from "react";

function BriefInputForm({ onSubmit, initialValues = {} }) {
  // Ensure initialValues is always an object
  const iv = initialValues || {};

  // Group 1 — Basics
  const [briefType, setBriefType] = useState(iv.deliverable ?? "SEO Article");
  const [keyword, setKeyword] = useState(iv.topic ?? "");
  const [brandContext, setBrandContext] = useState(iv.brand_context ?? "");

  // Group 2 — Audience and goal
  const [audience, setAudience] = useState(iv.audience ?? "");
  const [journeyStage, setJourneyStage] = useState(iv.journey_stage ?? "Consideration");
  const [goalCta, setGoalCta] = useState(iv.goal_cta ?? "");

  // Group 3 — Research inputs
  const [referenceUrls, setReferenceUrls] = useState(
    Array.isArray(iv.reference_urls) ? iv.reference_urls.join(", ") : ""
  );
  const [competitors, setCompetitors] = useState(
    Array.isArray(iv.competitors) ? iv.competitors.join(", ") : ""
  );
  const [seedKeywords, setSeedKeywords] = useState(
    Array.isArray(iv.seed_keywords) ? iv.seed_keywords.join(", ") : ""
  );

  // Group 4 — Constraints and output controls
  const [toneStyle, setToneStyle] = useState(iv.tone_style ?? "Expert, practical, concise; avoid hype");
  const [constraints, setConstraints] = useState(iv.constraints ?? "E-E-A-T; no claims without sources");
  const [region, setRegion] = useState(iv.region ?? "Global");
  const [language, setLanguage] = useState(iv.language ?? "English");
  const [wordCount, setWordCount] = useState(iv.word_count ?? "1000-1500");
  const [outlineDepth, setOutlineDepth] = useState(iv.outline_depth ?? "H2+H3");
  const [serpDepth, setSerpDepth] = useState(iv.serp_depth ?? "Top 10");
  const [include, setInclude] = useState(
    Array.isArray(iv.include)
      ? iv.include
      : ["Search intent", "Outline", "Key talking points", "Sources list", "Metadata", "FAQs"]
  );

  const handleCheckbox = (name) => {
    setInclude((prev) => (prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]));
  };

  // Helpers
  const toList = (str) =>
    String(str || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const toUrlList = (str) => toList(str).filter((s) => /^https?:\/\//i.test(s));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      deliverable: briefType,
      topic: keyword,
      brand_context: brandContext || "TBD",
      audience: audience || "TBD",
      journey_stage: journeyStage,
      goal_cta: goalCta || "TBD",
      reference_urls: toUrlList(referenceUrls),
      competitors: toList(competitors),
      seed_keywords: toList(seedKeywords.length ? seedKeywords : keyword),
      tone_style: toneStyle,
      constraints,
      region,
      language,
      word_count: wordCount,
      outline_depth: outlineDepth,
      serp_depth: serpDepth,
      include,
    };
    onSubmit(payload);
  };

  const fieldStyle = { width: "100%", padding: 8, margin: "8px 0 16px 0" };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: "32px auto", textAlign: "left" }}>
      {/* Group 1 — Basics */}
      <label>
        <b>Type of Brief:</b>
        <select value={briefType} onChange={(e) => setBriefType(e.target.value)} style={fieldStyle}>
          <option>SEO Article</option>
          <option>Landing Page</option>
          <option>Blog Post</option>
          <option>Product Page</option>
          <option>Newsletter</option>
          <option>LinkedIn Post</option>
          <option>YouTube Script</option>
        </select>
      </label>

      <label>
        <b>Main Topic or Working Title:</b>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g. AI-powered SEO tools"
          style={fieldStyle}
          required
        />
      </label>

      <label>
        <b>Business / Brand Context:</b>
        <input
          type="text"
          value={brandContext}
          onChange={(e) => setBrandContext(e.target.value)}
          placeholder="e.g. B2B SaaS; target = mid-market marketing teams"
          style={fieldStyle}
        />
      </label>

      {/* Group 2 — Audience and goal */}
      <label>
        <b>Target Audience:</b>
        <input
          type="text"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          placeholder="e.g. Marketing managers at SaaS companies (50–500 employees)"
          style={fieldStyle}
        />
      </label>

      <label>
        <b>Buyer Journey Stage:</b>
        <select value={journeyStage} onChange={(e) => setJourneyStage(e.target.value)} style={fieldStyle}>
          <option>Awareness</option>
          <option>Consideration</option>
          <option>Decision</option>
          <option>Retention</option>
        </select>
      </label>

      <label>
        <b>Primary Goal / CTA:</b>
        <input
          type="text"
          value={goalCta}
          onChange={(e) => setGoalCta(e.target.value)}
          placeholder="e.g. Generate demo requests for Research Panel"
          style={fieldStyle}
        />
      </label>

      {/* Group 3 — Research inputs */}
      <label>
        <b>Reference Domains or URLs:</b>
        <input
          type="text"
          value={referenceUrls}
          onChange={(e) => setReferenceUrls(e.target.value)}
          placeholder="Comma-separated URLs (https://...)"
          style={fieldStyle}
        />
      </label>

      <label>
        <b>Top Competitors (names or URLs):</b>
        <input
          type="text"
          value={competitors}
          onChange={(e) => setCompetitors(e.target.value)}
          placeholder="e.g. SurferSEO, Clearscope, GrowthBar"
          style={fieldStyle}
        />
      </label>

      <label>
        <b>Seed Keywords:</b>
        <input
          type="text"
          value={seedKeywords}
          onChange={(e) => setSeedKeywords(e.target.value)}
          placeholder="Comma-separated keywords; defaults to your main topic"
          style={fieldStyle}
        />
      </label>

      {/* Group 4 — Constraints and output controls */}
      <label>
        <b>Tone & Style:</b>
        <input
          type="text"
          value={toneStyle}
          onChange={(e) => setToneStyle(e.target.value)}
          placeholder="e.g. Expert, practical, concise; avoid hype"
          style={fieldStyle}
        />
      </label>

      <label>
        <b>Brand / SEO Constraints:</b>
        <input
          type="text"
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          placeholder="e.g. E-E-A-T; US spelling; cite sources; include internal link to /research"
          style={fieldStyle}
        />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <label>
          <b>Region:</b>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="e.g. Global, US, UK, India"
            style={fieldStyle}
          />
        </label>
        <label>
          <b>Language:</b>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="e.g. English"
            style={fieldStyle}
          />
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <label>
          <b>Word Count:</b>
          <select value={wordCount} onChange={(e) => setWordCount(e.target.value)} style={fieldStyle}>
            <option>600-800</option>
            <option>1000-1500</option>
            <option>1500-2500</option>
            <option>Custom</option>
          </select>
        </label>
        <label>
          <b>Outline Depth:</b>
          <select value={outlineDepth} onChange={(e) => setOutlineDepth(e.target.value)} style={fieldStyle}>
            <option>H2 only</option>
            <option>H2+H3</option>
            <option>H2+H3+H4</option>
          </select>
        </label>
        <label>
          <b>SERP Scan:</b>
          <select value={serpDepth} onChange={(e) => setSerpDepth(e.target.value)} style={fieldStyle}>
            <option>Top 5</option>
            <option>Top 10</option>
          </select>
        </label>
      </div>

      <fieldset style={{ border: "1px solid #ddd", borderRadius: 6, padding: 12, marginTop: 8 }}>
        <legend style={{ padding: "0 6px" }}>
          <b>Include Sections</b>
        </legend>
        {[
          "Search intent",
          "People Also Ask",
          "Outline",
          "Key talking points",
          "Sources list",
          "On-page SEO checklist",
          "Suggested visuals",
          "FAQs",
          "Internal links",
          "Metadata",
        ].map((name) => (
          <label key={name} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginRight: 12, marginBottom: 8 }}>
            <input type="checkbox" checked={include.includes(name)} onChange={() => handleCheckbox(name)} />
            {name}
          </label>
        ))}
      </fieldset>

      <button type="submit" className="btn btn--primary btn--full-width" style={{ padding: 12, fontSize: 17, marginTop: 16 }}>
        Generate AI Brief
      </button>
      <div style={{ color: "var(--color-text-secondary)", fontSize: 12, marginTop: 8 }}>
        Estimated 8–15 seconds. You can edit inputs and regenerate.
      </div>
    </form>
  );
}

export default BriefInputForm;
