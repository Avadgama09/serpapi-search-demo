import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import TopPanel from "./components/TopPanel.jsx";
import BriefInputForm from "./BriefInputForm.js";
import BriefOutput from "./BriefOutput.js";

export default function BriefGenerator() {
  // Form data the user last submitted (used to repopulate on Back)
  const [formData, setFormData] = useState(null);
  // Parsed brief object to display in BriefOutput
  const [briefData, setBriefData] = useState(null);
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Called by BriefInputForm on submit
  const handleGenerate = async (values) => {
    setError("");
    setLoading(true);
    setFormData(values);
    setBriefData(null);

    try {
      // TODO: Replace this stub with your Perplexity-backed endpoint when ready.
      // For now we simulate a brief so the screens are connected end-to-end.
      // Example real call:
      // const resp = await fetch("http://localhost:3001/api/brief/generate", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(values),
      // });
      // const text = await resp.text();
      // if (!resp.ok) throw new Error(text || `Request failed: ${resp.status}`);
      // let parsed = null;
      // try {
      //   const start = text.indexOf("{");
      //   const end = text.lastIndexOf("}");
      //   if (start !== -1 && end !== -1 && end > start) {
      //     parsed = JSON.parse(text.slice(start, end + 1));
      //   }
      // } catch {}
      // setBriefData(parsed || { note: "Non-JSON response", content: text });

      // Stubbed demo brief (remove when API is wired)
      const demo = {
        research: {
          keywords: [values.topic || values.keyword || "ai seo tools", "seo platforms", "content briefs"],
          competitors: values.competitors?.length ? values.competitors : ["Surfer", "Clearscope", "GrowthBar"],
          questions: [
            "What is an AI SEO platform?",
            "How do AI briefs improve content quality?",
            "What are best practices for E-E-A-T?",
          ],
        },
        outline: [
          { type: "H2", heading: "What is an AI SEO Platform?", subpoints: ["Definition", "Key capabilities"] },
          { type: "H2", heading: "Why Use AI for Briefs", subpoints: ["Speed", "Consistency", "SEO alignment"] },
          { type: "H2", heading: "How to Create a High-Quality Brief", subpoints: ["Inputs", "Research", "Structure"] },
          { type: "H2", heading: "Checklist and FAQs" },
        ],
        guidelines: {
          wordCount: values.word_count || "1000-1500",
          tone: values.tone_style || "Expert, practical",
          internalLinks: ["/research"],
          externalLinks: ["https://developers.google.com/search", "https://ahrefs.com/blog/eeat/"],
        },
      };

      // Simulate a short delay to show loading
      await new Promise((r) => setTimeout(r, 600));
      setBriefData(demo);
    } catch (e) {
      setError(e.message || "Brief generation failed");
    } finally {
      setLoading(false);
    }
  };

  // From BriefOutput: go back to edit (keep existing form values)
  const handleBack = () => {
    setBriefData(null);
  };

  // From BriefOutput: start fresh
  const handleReset = () => {
    setFormData(null);
    setBriefData(null);
    setError("");
    setLoading(false);
  };

  // 1) No brief yet → show the form (pre-fill if formData exists)
  if (!briefData) {
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
            <strong>Brief Generator</strong>
          </div>
          <div className="nav__links" />
          <div className="nav__cta" style={{ gap: 8 }}>
            <button className="btn btn--chip" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        </header>

        {/* Hero section matching Research Panel */}
        <TopPanel
          title="AI Brief Developer"
          subtitle="Enter your inputs below. We'll generate a structured brief you can refine."
          error={error}
          loading={loading}
        />

        {/* Form content */}
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <BriefInputForm onSubmit={handleGenerate} initialValues={formData} />
        </div>
      </div>
    );
  }

  // 2) Have a brief → show the output screen
  return (
    <BriefOutput
      formData={formData}
      briefData={briefData}
      onBack={handleBack}
      onReset={handleReset}
    />
  );
}
