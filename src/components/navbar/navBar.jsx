import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { label: 'Inicio', to: '/' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Pokémon', to: '/dashboard/pokemon' },
  ];

  return (
    <nav className="bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
            alt="Pokédex"
            className="h-8 w-auto"
          />
          <span className="ml-3 text-white text-xl font-bold">Pokédex</span>
        </div>

        {/* Botón para menú móvil */}
        <button
          className="text-white lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Links para desktop */}
        <div className="hidden lg:flex items-center space-x-6">
          {routes.map((route, index) => (
            <NavLink
              key={index}
              to={route.to}
              className={({ isActive }) =>
                `text-white hover:text-gray-200 transition ${
                  isActive ? 'font-bold underline' : ''
                }`
              }
            >
              {route.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {isOpen && (
        <div className="lg:hidden bg-white text-gray-800 shadow-md">
          <ul className="flex flex-col p-4">
            {routes.map((route, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={route.to}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md ${
                      isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                    }`
                  }
                  onClick={() => setIsOpen(false)} // Cierra el menú al seleccionar
                >
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
