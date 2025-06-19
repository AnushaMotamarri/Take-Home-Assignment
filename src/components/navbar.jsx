import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TimelineIcon from '@mui/icons-material/Timeline';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
export default function Navbar({ theme, setTheme }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = e => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };
  return (
    <nav className="p-[15px] bg-primary text-white flex border-b border-primary">
      <div onClick={() => navigate('')} className="app-title cursor-pointer">
        <TimelineIcon /> <span className="font-semibold">Crypto Asset Tracker</span>
      </div>
      <div
        className="theme ml-auto text-base cursor-pointer flex flex-row gap-5"
        onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
      >
        {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        <div
          onClick={toggleMenu}
          className="md:hidden outline-none
 !bg-primary"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-2 top-14 w-52 rounded-lg bg-white border border-gray-200 shadow-lg p-2 z-50 md:hidden">
          <a
            className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded"
            onClick={() => navigate('')}
          >
            Crypto Performance
          </a>
          <a
            className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded"
            onClick={() => navigate('/connectWallet')}
          >
            Connect Wallet
          </a>
        </div>
      )}

      {/* Desktop links */}
      <div className="cursor-pointer hidden md:flex space-x-4 ml-5">
        <a onClick={() => navigate('')} className="!text-white">
          Crypto Performance
        </a>
        <a onClick={() => navigate('/connectWallet')} className="!text-white cursor-pointer">
          Connect Wallet
        </a>
      </div>
    </nav>
  );
}
