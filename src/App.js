import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/home/home";
import Navigation from "../src/components/navigartion/navigation";
import Statistic from "../src/pages/statistic/statistic";
import Staff from "../src/pages/staff/staff";
import Error from "../src/pages/error/error";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="personel_managment_fe" element={<Home />} />
        <Route path="statistic" element={<Statistic />} />
        <Route path="staff" element={<Staff />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
