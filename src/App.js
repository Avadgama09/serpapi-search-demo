// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import ResearchPanel from './ResearchPanel';
import BriefGenerator from './BriefGenerator';        // existing file
import CompetitorPage from './CompetitorPage';        // new file we’ll add

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/research" element={<ResearchPanel />} />
        <Route path="/brief" element={<BriefGenerator />} />
        <Route path="/competitors" element={<CompetitorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
