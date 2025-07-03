import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LocationDetails from "./pages/LocationDetails";
import MyReservations from "./pages/MyReservations";
import Login from "./pages/Login";
// import Register from "./pages/Register";
import Header from "./components/Header";
import HostDashboard from "./pages/HostDashboard";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings/:id" element={<LocationDetails />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/host-dashboard" element={<HostDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Router>
  );
};

export default App;
