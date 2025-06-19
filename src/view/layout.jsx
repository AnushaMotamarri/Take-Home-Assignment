import { Outlet } from 'react-router-dom';
import Navbar from '../components/navBar';

export default function Layout({ theme, setTheme }) {
  return (
    <div className="bg-background h-screen">
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="px-5 pt-2.5 h-[calc(100vh-var(--header-height))]">
        <Outlet />
      </div>
    </div>
  );
}
