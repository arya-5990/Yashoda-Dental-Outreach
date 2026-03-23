import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import WorkDesk from './pages/WorkDesk';
import ClinicBrandToggle from './components/ui/ClinicBrandToggle';

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem('ysp_auth');
  return auth ? children : <Navigate to="/connect" />;
};

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ysp_theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ysp_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-enamel-White dark:bg-medical-900 font-sans flex justify-center text-slate-800 dark:text-slate-200">
      <div className="w-full max-w-md bg-white/40 dark:bg-medical-900/40 relative shadow-none min-h-screen pb-20">
        <header className="px-6 pt-8 pb-4 flex justify-between items-center z-10 sticky top-0 bg-enamel-White/80 dark:bg-medical-900/80 backdrop-blur-md">
          <h1 className="font-serif font-bold text-xl text-medical-800 dark:text-medical-TealLight tracking-tight">YSP <span className="text-slate-400 font-sans text-lg italic font-light">portal</span></h1>
          <ClinicBrandToggle isDark={theme === 'dark'} onToggle={toggleTheme} />
        </header>
        
        <Routes>
          <Route path="/" element={<Navigate to="/progress" />} />
          <Route path="/connect" element={<Login />} />
          <Route path="/progress" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/log-success" element={
            <PrivateRoute>
              <WorkDesk />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
