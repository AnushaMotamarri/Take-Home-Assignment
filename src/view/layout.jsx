// components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

export default function Layout({ theme, setTheme }) {
  return (
    <div>
      <Navbar theme={theme} setTheme={setTheme} />

      <Outlet />
    </div>
  );
}
