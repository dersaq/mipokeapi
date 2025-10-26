import React from "react";
import { Link } from "react-router-dom";

export const NavComponent = () => {
  return (
    <>
      <nav className="mi-nav">
        <ul>
          <li className="li-nav">
            <Link to="/">Inicio</Link>
          </li>
          <li className="li-nav">
            <Link to="/equipo">Crear equipo</Link>
          </li>
          <li className="li-nav">
            <Link to="/quiz">Quiz</Link>
          </li>
          <li className="li-nav">
            <Link to="/sobremi">Sobre mi</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
