import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.post("/api/brief/generate", async (req, res) => {
  try {
    const form = req.body;
    if (!form?.deliverable || !form?.topic) {
      return res.status(400).json({ error: "Missing required fields: deliverable, topic" });
    }

    const system = `You are an expert SEO content strategist. Produce a comprehensive content brief suitable for expert writers and editors. Be precise, cite sources inline with [n] and include links in the Sources section. Reflect E-E-A-T, avoid speculation, and prefer recent, reputable sources. Output strictly in the requested JSON schema.`;

    const user = buildUserPrompt(form);

    const resp = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.PPLX_API_KEY}`
      },
      body: JSON.stringify({
        model: "sonar-pro", // change to the model your plan supports
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ],
        temperature: 0.2,
        max_tokens: 2000
      })
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(resp.status).json({ error: text || "Perplexity error" });
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content || "";
    const brief = safeJsonExtract(content) || { note: "Non-JSON response", content };

    res.json({ brief, raw: content });
  } catch (err) {
    console.error("Brief generation failed:", err);
    res.status(500).json({ error: "Brief generation failed" });
  }
});

function buildUserPrompt(f) {
  const list = (x) => Array.isArray(x) ? x : (typeof x === "string" ? x.split(",").map(s=>s.trim()).filter(Boolean) : []);
  const join = (x) => list(x).join(", ");

  return `Task: Create a content brief.

Deliverable: ${f.deliverable}
Topic: ${f.topic}
Brand context: ${f.brand_context}
Audience: ${f.audience}
Buyer journey stage: ${f.journey_stage}
Goal / CTA: ${f.goal_cta}

Inputs:
- Reference URLs: ${join(f.reference_urls)}
- Competitors: ${join(f.competitors)}
- Seed keywords: ${join(f.seed_keywords)}
- Region: ${f.region}
- Language: ${f.language}

Constraints and style:
- Tone: ${f.tone_style}
- Constraints: ${f.constraints}
- Word count target: ${f.word_count}
- Outline depth: ${f.outline_depth}
- SERP scan depth: ${f.serp_depth}
- Include sections: ${join(f.include)}

Output JSON schema:
{
  "search_intent": "string",
  "target_readers": "string",
  "primary_keywords": ["string"],
  "secondary_keywords": ["string"],
  "questions_to_answer": ["string"],
  "people_also_ask": ["string"],
  "outline": [
    {"heading": "H2 text", "children": [
      {"heading": "H3 text", "bullets": ["string"]}
    ]}
  ],
  "key_points": ["string"],
  "unique_angle": "string",
  "examples_and_stats_needed": ["string"],
  "internal_links": ["string"],
  "external_sources": [{"title":"string","url":"string"}],
  "metadata": {
    "title_tag": "string (<=60 chars)",
    "meta_description": "string (<=155 chars)",
    "url_slug": "string"
  },
  "onpage_checklist": ["string"],
  "estimated_read_time_minutes": number
}

Rules:
- Use the form inputs to tailor the outline and keywords.
- Map each claim requiring evidence to a source in external_sources.
- Prefer Top ${f.serp_depth} SERP insights if relevant.
- Keep metadata within character limits.
- If an input is missing, pick sensible defaults and proceed.`;
}

function safeJsonExtract(text) {
  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(text.slice(start, end + 1));
    }
  } catch {}
  return null;
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
