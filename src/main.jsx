import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Reviews from './pages/Reviews.jsx';
import { AnimatePresence } from 'framer-motion';
import Products2 from './pages/products2.jsx';
import View from './pages/View.jsx';
import Login from './pages/Login.jsx';
import { AuthProvider } from './pages/AuthContext.jsx';
import SignIn from './pages/ignIn.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatePresence mode='wait'>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />  {/* Main App Page */}
          <Route path="home" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="products2" element={<Products2 />} />
          <Route path="view" element={<View />} />
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<SignIn />} />
        </Routes>
        </AuthProvider>
      </AnimatePresence>
    </BrowserRouter>
  </StrictMode>
);
