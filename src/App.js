import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import ResearchPanel from "./ResearchPanel";
import BriefGenerator from "./BriefGenerator"; // <--- Add this here

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/research" element={<ResearchPanel />} />
        <Route path="/brief" element={<BriefGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
