import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Location from "./pages/Location";
import LocationDetails from "./pages/LocationDetails";
import Login from "./pages/Login";

// Components
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location/:city" element={<Location />} />
        <Route path="/details/:id" element={<LocationDetails />} />
        <Route path="/login" element={<Login />} />
        {/* Placeholder for future route */}
        {/* <Route path="/reservations" element={<Reservations />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
