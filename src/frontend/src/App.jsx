import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Partners from "./pages/Partners";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Footer from "./components/UI/Footer/Footer";

function App() {
  useEffect(() => {
    // Try to reauthenticate on page reload if a session id is found
  }, []);
  return (
    <div className="font-body overflow-x-hidden -z-50">
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
