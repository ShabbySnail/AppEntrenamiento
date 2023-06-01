import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

const ChallengeComponent = () => {
    const [challengeData, setChallengeData] = React.useState({
      ejercicioId: '',
      fecha: '',
      completado: false
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setChallengeData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const createChallenge = () => {
      const newChallenge = {
        id: firebase.database().ref().child('challenges').push().key,
        ...challengeData
      };
  
      firebase.database().ref(`challenges/${newChallenge.id}`).set(newChallenge);
    };
  
    return (
      <div>
        {/* Formulario */}
        <input
          type="text"
          name="ejercicioId"
          placeholder="ID del ejercicio"
          value={challengeData.ejercicioId}
          onChange={handleInputChange}
        />
  
        <input
          type="date"
          name="fecha"
          placeholder="Fecha del desafío"
          value={challengeData.fecha}
          onChange={handleInputChange}
        />
  
        <label>
          Completado:
          <input
            type="checkbox"
            name="completado"
            checked={challengeData.completado}
            onChange={() =>
              setChallengeData((prevState) => ({
                ...prevState,
                completado: !prevState.completado
              }))
            }
          />
        </label>
  
        {/* Botón de crear desafío */}
        <button onClick={createChallenge}>Crear Desafío</button>
      </div>
    );
  };
  
  export default ChallengeComponent;
  