import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Home from "./components/landing/Home";
import { CharacterProvider } from "./context/CharacterContext";

const App: React.FC = () => {
  return (
    <CharacterProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Router>
    </CharacterProvider>
  );
};

export default App;
