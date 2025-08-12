import React from "react";

function BriefOutput({ formData, briefData, onBack, onReset }) {
  // Fallback to demo data if no briefData (shouldn’t happen)
  const data = briefData || {
    research: {
      keywords: [],
      competitors: [],
      questions: [],
    },
    outline: [],
    guidelines: {},
  };

  return (
    <div style={{
      maxWidth: 700,
      margin: "32px auto",
      textAlign: "left",
      background: "#fff",
      padding: 40,
      borderRadius: 14,
      boxShadow: "0 2px 8px #e0e6ee"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <button className="btn-secondary" onClick={onBack}>Back/Edit Brief</button>
        <button className="btn-secondary" onClick={onReset}>Start New Brief</button>
      </div>
      <h2 style={{ textAlign: "center", marginBottom: 28, color: "#1a237e" }}>Your AI Brief</h2>
      
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: "#1565c0" }}>1. Research &amp; Analysis</h3>
        <div style={{ color: "#263238" }}>
          <b>Keywords:</b> {data.research.keywords.join(", ") || "-"}
        </div>
        <div style={{ color: "#263238" }}>
          <b>Top SERP competitors:</b> {data.research.competitors.join(", ") || "-"}
        </div>
        <div style={{ color: "#263238" }}>
          <b>Popular Questions:</b>
          <ul>
            {data.research.questions.map((q, idx) => <li key={idx}>{q}</li>)}
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: "#1565c0" }}>2. Suggested Outline</h3>
        <ul style={{ color: "#263238" }}>
          {data.outline.map((item, idx) => (
            <li key={idx}>
              <b>{item.type}:</b> {item.heading}
              {item.subpoints && (
                <ul>
                  {item.subpoints.map((sp, sid) => <li key={sid}>{sp}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: "#1565c0" }}>3. Content Guidelines</h3>
        <ul style={{ color: "#263238" }}>
          <li><b>Target Word Count:</b> {data.guidelines.wordCount || "-"}</li>
          <li><b>Tone:</b> {data.guidelines.tone || "-"}</li>
          <li><b>Internal Links:</b> {(data.guidelines.internalLinks || []).join(", ")}</li>
          <li><b>External Links:</b> {(data.guidelines.externalLinks || []).join(", ")}</li>
        </ul>
      </section>

      <section>
        <h3 style={{ color: "#1565c0" }}>4. Review & Customize</h3>
        <div style={{ color: "#757575" }}>
          <i>[Here you'll be able to edit, add reviewer comments, and export your brief in the next phase!]</i>
        </div>
      </section>
    </div>
  );
}

export default BriefOutput;
