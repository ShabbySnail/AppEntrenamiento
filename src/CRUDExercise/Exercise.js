import React from 'react';
import firebase from '../services/firebase';



const ExerciseComponent = () => {
  const [exerciseData, setExerciseData] = React.useState({
    nombre: '',
    tipo: '',
    tiempo: 0,
    intensidad: 0,
    fecha: new Date().getTime()
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExerciseData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const createExercise = () => {  
    const newExercise = {
      id: firebase.database().ref().child('exercises').push().key,
      ...exerciseData
    };

    firebase.database().ref(`exercises/${newExercise.id}`).set(newExercise);
  };

  return (
    <div>
      {/* Formulario */}
      <input
        type="text"
        name="nombre"
        placeholder="Nombre del ejercicio"
        value={exerciseData.nombre}
        onChange={handleInputChange}
      />

      <label htmlFor="tipo">Tipo:</label>
      <select name="tipo" id="tipo" value={exerciseData.tipo} onChange={handleInputChange}>
        <option value="Aerobico">Aerobico</option>
        <option value="Flexibilidad">Flexibilidad</option>
        <option value="Fuerza">Fuerza</option>
      </select>


      <input
        type="number"
        name="tiempo"
        placeholder="Tiempo (minutos)"
        value={exerciseData.tiempo}
        onChange={handleInputChange}
      />

      <input
        type="number"
        name="intensidad"
        placeholder="Intensidad (1-10)"
        value={exerciseData.intensidad}
        onChange={handleInputChange}
      />

      <button onClick={createExercise}>Crear Ejercicio</button>
    </div>
  );
};

export default ExerciseComponent;
