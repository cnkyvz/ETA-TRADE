import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Projects from "./components/Projects";
import "./i18n";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dil parametresi ile rotalar */}
        <Route path="/:lang" element={<Header />} />
        <Route path="/:lang/projects" element={<Projects />} />

        {/* Varsayılan rota */}
        <Route path="/" element={<Navigate to="/en" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
