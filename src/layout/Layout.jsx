import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  //Obtener info adicional de la ruta actual
  //useLocation retorna un Object -> {hash: '#id', key, pathname: 'ruta', search: 'parametros de la url (?id=20)', state}
  const { pathname: urlActual } = useLocation();

  return (
    <div className="md:flex md:min-h-screen bg-gray-100">
      <div className="md:w-1/4 bg-blue-900 px-5 py-10">
        <h2 className="text-4xl text-white font-black text-center">
          CRM - Clientes
        </h2>
        <nav className="mt-10">
          <Link
            to="/clientes"
            className={`${
              urlActual === "/clientes" ? "text-blue-300" : "text-white"
            }  text-2xl block mt-2 hover:text-blue-300`}
          >
            Clientes
          </Link>
          <Link
            to="/clientes/nuevo"
            className={`${
              urlActual === "/clientes/nuevo" ? "text-blue-300" : "text-white"
            }  text-2xl block mt-2 hover:text-blue-300`}
          >
            Nuevo Cliente
          </Link>
        </nav>
      </div>

      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
