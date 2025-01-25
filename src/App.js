import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Product from './pages/Product';
import Users from './pages/Users';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Navbar />
        <main className="container mt-4">
          <Routes>
            <Route path="/products" element={<Product />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
