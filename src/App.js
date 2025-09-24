import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import các trang
import Home from "./pages/HomeScreen";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/Schedule">Schedule</Link>
        </nav>

        {/* Định nghĩa các route */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Schedule" element={<Schedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
