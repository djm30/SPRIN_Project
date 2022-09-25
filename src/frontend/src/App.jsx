import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Partners from "./pages/Partners";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Admin from "./pages/Admin";

function App() {
  useEffect(() => {
    // Try to reauthenticate on page reload if a session id is found
  }, []);
  return (
    <div className="font-body">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
