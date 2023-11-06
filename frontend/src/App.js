import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import CVEditor from "./pages/CVEditor";
import CVReader from "./pages/CVReader";
import CVCreator from "./pages/CVCreator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cv/create/:templateNumber" element={<CVCreator />} />
        <Route path="/cv/edit/:id" element={<CVEditor />} />
        <Route path="/cv/view/:id" element={<CVReader />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
