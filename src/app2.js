import './App.css';
import MainLayout from './pages/MainLayout';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import React, { useState } from 'react';

function App2() {
  const [cartItems, setCartItems] = useState([]);  // Manage cart state

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <MainLayout cartItems={cartItems} setCartItems={setCartItems} />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App2;