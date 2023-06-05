import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';import { LineChart } from 'react-native-chart-kit';
import { Svg, LinearGradient, Defs, Stop } from 'react-native-svg';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

const Statistics = () => {
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    const getExerciseData = async () => {
      const exerciseCollection = collection(db, 'exercises');
      const exerciseSnapshot = await getDocs(exerciseCollection);
      const data = exerciseSnapshot.docs.map((doc) => doc.data());
      setExerciseData(data);
    };

    getExerciseData();
  }, []);

  // Crear los datos para la gráfica
const chartData = {
  labels: exerciseData.map(exercise => {
    const date = new Date(exercise.fecha);
    return date.toLocaleString('default', { month: 'long' });
  }), // Usar los meses como etiquetas
  datasets: [
    {
      data: exerciseData.map(exercise => exercise.tiempo), // Usar los tiempos como valores
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Opcional: color de la línea
      strokeWidth: 2 // Opcional: ancho de la línea
    }
  ]
};


  return (
    <View>
      <Text>Estadísticas</Text>
      <LineChart
        data={chartData}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
      />
    </View>
  );
};

export default Statistics;
