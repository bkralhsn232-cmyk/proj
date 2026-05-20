import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
  display: 'flex',
  flexDirection: 'row', 
  flexWrap: 'wrap', 
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 15px',
  
};

  const linkStyle = {
    color: '#e0e0e0',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: '0.3s',
    marginLeft: '20px'
  };

  const logoStyle = {
    fontSize: '22px', 
    fontWeight: 'bold', 
    color: '#bb86fc', 
    letterSpacing: '1px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  };

  return (
    <nav style={navStyle}>
      {/* Brand Logo - Now clickable! */}
      <Link to="/" style={logoStyle}>
         <span style={{ color: 'white', marginLeft: '5px' }}>MOVIE</span>APP
      </Link>

      {/* Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>الصفحة الرئيسية 🏠</Link>
        <Link to="/about" style={linkStyle}>معلومات ℹ️</Link>
        <Link to="/register" style={linkStyle}>إنشاء حساب 📝</Link>
        <Link to="/login" style={linkStyle}>تسجيل الدخول 🔐</Link>
      </div>
    </nav>
  );
}

export default Navbar;