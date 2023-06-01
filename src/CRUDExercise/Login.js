import React from 'react';
import { login, register, logout } from '../auth/sessions';

const SessionsComponent = () => {
  const handleSignIn = () => {
    login(); // Llama a la función de inicio de sesión
  };

  const handleSignUp = () => {
    register(); // Llama a la función de registro
  };

  const handleSignOut = () => {
    logout(); // Llama a la función de cierre de sesión
  };

  const isUserLoggedIn = true; // Aquí debes implementar la lógica para determinar si el usuario está autenticado

  return (
    <div>
      <h2>Inicio de Sesión y Registro</h2>
      {isUserLoggedIn ? (
        <button onClick={handleSignOut}>Cerrar Sesión</button>
      ) : (
        <>
          <button onClick={handleSignIn}>Iniciar Sesión</button>
          <button onClick={handleSignUp}>Registrarse</button>
        </>
      )}
    </div>
  );
};

export default SessionsComponent;
