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
