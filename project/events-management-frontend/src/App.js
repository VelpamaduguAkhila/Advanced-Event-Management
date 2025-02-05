// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/Register';

const App = () => {
  // Mock user object (replace with actual authentication logic)
  const user = { role: 'admin' }; // Change to 'user' to test disabled button

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <HomePage user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;