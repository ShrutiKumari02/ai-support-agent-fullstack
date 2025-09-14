import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const token = localStorage.getItem('token');
  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/chat" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={ <ProtectedRoute> <Chat /> </ProtectedRoute> } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;