import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Home from "./components/landing/Home";
import { TableProvider } from "./context/TableContext"; // Ensure the import is correct

const App: React.FC = () => {
  return (
    <TableProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Router>
    </TableProvider>
  );
};

export default App;
