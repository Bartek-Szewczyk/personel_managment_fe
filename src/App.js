import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/home/home";
import Navigation from "../src/components/navigartion/navigation";
import Statistic from "../src/pages/statistic/statistic";
import Staff from "../src/pages/staff/staff";
import Error from "../src/pages/error/error";
import Login from "../src/pages/login/login";
import Reset from "../src/pages/resetPassword/reset";
import authService from "./services/authService";
import ProtectedRoute from "./services/auth/ProtectedRoute";
import { AuthProvider } from "./services/auth/authProvider";
import MyEvents from "./pages/myEvents/myEvents";
import Faq from "./pages/faq/faq";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Login />} />
          <Route
            path="personel_managment_fe"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="statistic"
            element={
              <ProtectedRoute>
                <Statistic />
              </ProtectedRoute>
            }
          />
          <Route
            path="staff"
            element={
              <ProtectedRoute>
                <Staff />
              </ProtectedRoute>
            }
          />
          <Route
            path="my_events"
            element={
              <ProtectedRoute>
                <MyEvents />
              </ProtectedRoute>
            }
          />
          <Route path="faq" element={<Faq />} />
          <Route path="login" element={<Login />} />
          <Route path="login/reset" element={<Reset />} />
          <Route path="*" element={<Error />} />
          <Route path="/error" element={<Error />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
