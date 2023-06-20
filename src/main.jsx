import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import EditCamp from "./pages/edit_camp.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<App />} />
          <Route path="/edit/:id/:title/:slug/:price" element={<EditCamp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
