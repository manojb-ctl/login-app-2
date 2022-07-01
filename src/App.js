import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  const ProtectedRoute = ({ user, children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
