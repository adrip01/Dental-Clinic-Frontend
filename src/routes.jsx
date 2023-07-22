import React from "react";
import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";

// pages

import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import AccountPage from "./pages/AccountPage";
import MyAppointmentsPage from "./pages/MyAppointmentsPage";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users/profile" element={<ProfilePage />} />
        <Route path="/users/account" element={<AccountPage />} />
        <Route path="/users/my-appointments" element={<MyAppointmentsPage />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}
