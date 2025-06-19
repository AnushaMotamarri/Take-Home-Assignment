import './App.css';
import routes from './routes.jsx';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './rtkQuery/store';
function AppRoutes({ theme, setTheme }) {
  const element = useRoutes(
    routes.map(route =>
      route.path === '/'
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
    <Provider store={store}>
      <Router>
        <AppRoutes theme={theme} setTheme={setTheme} />
      </Router>
    </Provider>
  );
}

export default App;
