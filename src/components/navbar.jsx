// components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TimelineIcon from '@mui/icons-material/Timeline';
export default function Navbar({ theme, setTheme }) {
  const navigate = useNavigate();
  return (
    <nav className="p-[15px] bg-primary text-white flex border-b border-primary">
      <div onClick={() => navigate('')} className="app-title">
        <TimelineIcon /> <span className="font-semibold">Crypto Asset Tracker</span>
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
