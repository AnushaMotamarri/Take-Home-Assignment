// components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
export default function Navbar({ theme, setTheme }) {
  const navigate = useNavigate();
  return (
    <nav className="p-[15px] flex border-b border-[#ccc]">
      <div onClick={() => navigate('')} className="app-title">
        Crypto Asset Tracker
      </div>
      <div
        className="theme ml-auto text-base"
        onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
      >
        {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </div>
    </nav>
  );
}
