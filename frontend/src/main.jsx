import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import App from "./App.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Home from "./pages/Home.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/events" element={<Home />} />
      <Route path="/events/:eventId" element={<EventDetails />} />
    </Routes>
  </BrowserRouter>
);
