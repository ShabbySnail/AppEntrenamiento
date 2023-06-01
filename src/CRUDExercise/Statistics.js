import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import firebase from 'firebase/app';
import 'firebase/database';

const StatisticsComponent = () => {
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const exerciseRef = firebase.database().ref('exercises');
        const snapshot = await exerciseRef.once('value');
        const data = snapshot.val();

        if (data) {
          // Transformar los datos de Firebase al formato requerido por la gráfica
          const formattedData = Object.values(data).map((exercise) => ({
            fecha: exercise.fecha,
            tiempo: exercise.tiempo
          }));

          setExerciseData(formattedData);
        }
      } catch (error) {
        console.error('Error al obtener los datos de Firebase:', error);
      }
    };

    fetchExerciseData();
  }, []);

  // Configuración de la gráfica utilizando los datos de exerciseData
  // ...

  return (
    <div>
      <h2>Estadísticas</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default StatisticsComponent;
