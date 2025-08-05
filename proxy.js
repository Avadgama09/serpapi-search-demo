const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = 3001;
const SERPAPI_KEY = process.env.SERPAPI_KEY || "YOUR_SERPAPI_KEY";

app.get("/api/search", async (req, res) => {
  // Use `engine` if provided, default to "google"
  const engine = req.query.engine || "google";
  const q = req.query.q;
  console.log(`[PROXY] Received search request: engine="${engine}" q="${q}"`);
  if (!q) return res.status(400).json({ error: "Missing query" });

  // Build new params to support `engine`
  const urlParams = new URLSearchParams({
    engine,
    api_key: SERPAPI_KEY,
    q,
  });

  const url = `https://serpapi.com/search.json?${urlParams}`;

  try {
    console.log(`[PROXY] Fetching: ${url}`);
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.log(`[PROXY] Error from SerpAPI:`, data);
      return res.status(500).json({ error: data.error || "Unknown error from SerpAPI" });
    }

    res.json(data);
  } catch (e) {
    console.log(`[PROXY] Server exception:`, e);
    res.status(500).json({ error: e.toString() });
  }
});

// *** THIS IS THE ESSENTIAL FINAL LINE TO START YOUR SERVER! ***
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
