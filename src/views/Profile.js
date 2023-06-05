import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { currentUser, logout } = useContext(AuthContext);

  if (!currentUser) {
    return <Text>No hay usuario autenticado</Text>;
  }

  return (
    <div>
      <h2>Perfil de usuario</h2>
      <p>Correo electrónico: {currentUser.email}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Profile;
