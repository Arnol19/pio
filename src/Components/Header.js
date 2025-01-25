import React from 'react';
import logo from '../assets/img/logo.svg';

const Header = () => (
  <header className="bg-primary text-white text-center py-3">
    <img src={logo} alt="Logo" width="50" className="d-inline-block mb-2" />
    <h2>Mi Aplicación</h2>
    <p className="mt-2" style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>
      ¡Bienvenido a mi página! Aquí encontrarás innovación, creatividad y soluciones de calidad. 🚀
    </p>
  </header>
);

export default Header;
