import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/personel_managment_fe" exact element={<Home />} />
    </Routes>
  );
}

export default App;
