import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Form from "./pages/Form";

export default function App() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ margin: "0 10px" }}>Главная</Link>
        <Link to="/add" style={{ margin: "0 10px" }}>Добавить</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/add" element={<Form />} />
        <Route path="/edit/:id" element={<Form />} />
      </Routes>
    </div>
  );
}