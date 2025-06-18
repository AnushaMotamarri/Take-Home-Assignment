import './App.css';
import routes from './routes.jsx';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
function AppRoutes({ theme, setTheme }) {
  const element = useRoutes(
    routes.map(route =>
      route.path === '/' // apply theme props to layout if needed
        ? {
            ...route,
            element: React.cloneElement(route.element, { theme, setTheme }),
          }
        : route
    )
  );
  return element;
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      <AppRoutes theme={theme} setTheme={setTheme} />
    </Router>
  );
}

export default App;
