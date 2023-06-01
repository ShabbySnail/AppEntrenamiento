import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const ProfileComponent = () => {
  const [profileData, setProfileData] = useState({
    nombre: '',
    edad: '',
    sexo: '',
    peso: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const saveProfile = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;
      firebase.database().ref(`profiles/${userId}`).set(profileData);
    }
  };

  return (
    <div>
      {/* Formulario */}
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={profileData.nombre}
        onChange={handleInputChange}
      />

      <input
        type="number"
        name="edad"
        placeholder="Edad"
        value={profileData.edad}
        onChange={handleInputChange}
      />

      <input
        type="text"
        name="sexo"
        placeholder="Sexo"
        value={profileData.sexo}
        onChange={handleInputChange}
      />

      <input
        type="number"
        name="peso"
        placeholder="Peso"
        value={profileData.peso}
        onChange={handleInputChange}
      />

      {/* Botón de guardar perfil */}
      <button onClick={saveProfile}>Guardar Perfil</button>
    </div>
  );
};

export default ProfileComponent;