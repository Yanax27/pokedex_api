import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeLayout from './layuots/HomeLayout';
import DashboardLayout from './layuots/DashboardPage';
import DashboardPage from './components/DashboardPage';
import NotFound from './components/404';
import Pokemon from './components/Pokemon';

const App = () => {
  return (
    <Routes>
      {/* Página de inicio */}
      <Route path="/" element={<HomeLayout />}>
      </Route>

      {/* Dashboard con Sidebar */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="pokemon" element={<Pokemon />} /> {/* Subruta sin "/" */}
      </Route>

      {/* Página no encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;