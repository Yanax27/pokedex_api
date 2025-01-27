import React from "react";
import { Outlet, Link } from "react-router-dom";

const HomeLayout = () => (
  <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500">
    {/* Capa de fondo para degradado */}
    <div className="absolute inset-0 z-0"></div>

    {/* Contenido principal */}
    <div className="relative z-10 text-center text-white flex flex-col items-center">
      <img
        src="https://i.gifer.com/KdHg.gif"
        alt="Pikachu"
        className="w-40 md:w-60 animate-bounce mb-6"
      />
      <h1 className="text-5xl font-bold mb-4 uppercase drop-shadow-lg mt-4">
        ¡Bienvenido a la Pokédex!
      </h1>
      <p className="text-lg mb-8">
        Explora todos los Pokémon, descubre sus estadísticas y habilidades.
      </p>
      <Link
        to="/dashboard"
        className="relative bg-yellow-400 text-black font-bold px-8 py-4 rounded-full transition transform hover:scale-110 hover:bg-yellow-500 shadow-lg animate-pulse"
      >
        ¡Entrar al Dashboard!
      </Link>
    </div>

    {/* Pie de página */}
    <footer className="absolute bottom-0 w-full bg-gray-900 text-white text-center py-3">
      <p className="text-sm">
        Hecho por{" "}
        <a
          href="https://github.com/Yanax27"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 hover:underline"
        >
          YanaxDev
        </a>
      </p>
    </footer>

    <Outlet />
  </div>
);

export default HomeLayout;
