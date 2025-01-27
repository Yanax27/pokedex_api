import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/navBar'; // Ruta correcta al componente Navbar

const DashboardLayout = () => (
  <div className="flex flex-col h-screen">
    {/* Navbar */}
    <Navbar />

    {/* Contenido principal */}
    <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
      <Outlet />
    </div>
  </div>
);

export default DashboardLayout;
