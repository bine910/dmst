import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import các trang
import Home from "./pages/HomeScreen";
import Schedule from "./pages/Schedule";
import Pomodoro from "./pages/Pomodoro";
function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/Schedule">Schedule </Link>|{" "}
          <Link to="/Pomodoro">Pomodoro</Link>
        </nav>

        {/* Định nghĩa các route */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Schedule" element={<Schedule />} />
          <Route path="/Pomodoro" element={<Pomodoro/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
