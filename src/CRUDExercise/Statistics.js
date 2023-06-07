import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

const ExerciseGraphComponent = () => {
  const [exerciseData, setExerciseData] = useState([]);
  const [completedChallengeData, setCompletedChallengeData] = useState([]);
  const [timeAerobico, setTimeAerobico] = useState(0);
  const [timeFlexibilidad, setTimeFlexibilidad] = useState(0);
  const [timeFuerza, setTimeFuerza] = useState(0);

  const [completedTimeAerobico, setCompletedTimeAerobico] = useState(0);
  const [completedTimeFlexibilidad, setCompletedTimeFlexibilidad] = useState(0);
  const [completedTimeFuerza, setCompletedTimeFuerza] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const exerciseQuerySnapshot = await getDocs(collection(db, 'exercises'));
      const exerciseData = exerciseQuerySnapshot.docs.map((doc) => doc.data());
      setExerciseData(exerciseData);

      const completedChallengeQuerySnapshot = await getDocs(collection(db, 'completedChallenges'));
      const completedChallengeData = completedChallengeQuerySnapshot.docs.map((doc) => doc.data());
      setCompletedChallengeData(completedChallengeData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calcular las sumas de tiempo para la colección 'exercises'
    const sumTimes = () => {
      let timeAerobicoTotal = 0;
      let timeFlexibilidadTotal = 0;
      let timeFuerzaTotal = 0;

      exerciseData.forEach((exercise) => {
        const tiempo = parseInt(exercise.tiempo);

        if (exercise.tipo === 'Aerobico') {
          timeAerobicoTotal += tiempo;
        } else if (exercise.tipo === 'Flexibilidad') {
          timeFlexibilidadTotal += tiempo;
        } else if (exercise.tipo === 'Fuerza') {
          timeFuerzaTotal += tiempo;
        }
      });

      setTimeAerobico(timeAerobicoTotal);
      setTimeFlexibilidad(timeFlexibilidadTotal);
      setTimeFuerza(timeFuerzaTotal);
    };

    sumTimes();
  }, [exerciseData]);

  useEffect(() => {
    // Calcular las sumas de tiempo para la colección 'completedChallenges'
    const sumCompletedTimes = () => {
      let completedTimeAerobicoTotal = 0;
      let completedTimeFlexibilidadTotal = 0;
      let completedTimeFuerzaTotal = 0;

      completedChallengeData.forEach((challenge) => {
        const tiempo = parseInt(challenge.tiempo_Objetivo);

        if (challenge.tipo === 'Aerobico') {
          completedTimeAerobicoTotal += tiempo;
        } else if (challenge.tipo === 'Flexibilidad') {
          completedTimeFlexibilidadTotal += tiempo;
        } else if (challenge.tipo === 'Fuerza') {
          completedTimeFuerzaTotal += tiempo;
        }
      });

      setCompletedTimeAerobico(completedTimeAerobicoTotal);
      setCompletedTimeFlexibilidad(completedTimeFlexibilidadTotal);
      setCompletedTimeFuerza(completedTimeFuerzaTotal);
    };

    sumCompletedTimes();
  }, [completedChallengeData]);

  // Datos para la gráfica de barras de la colección 'exercises'
  const exerciseChartData = {
    labels: ['Aerobico', 'Flexibilidad', 'Fuerza'],
    datasets: [
      {
        data: [timeAerobico, timeFlexibilidad, timeFuerza],
      },
    ],
  };

  // Datos para la gráfica de barras de la colección 'completedChallenges'
  const completedChallengeChartData = {
    labels: ['Aerobico', 'Flexibilidad', 'Fuerza'],
    datasets: [
      {
        data: [completedTimeAerobico, completedTimeFlexibilidad, completedTimeFuerza],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tiempo total dedicado por tipo de ejercicio</Text>
      <BarChart
        data={exerciseChartData}
        width={300}
        height={200}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />

      <Text style={styles.title}>Tiempo dedicado a Desafios completados</Text>
      <BarChart
        data={completedChallengeChartData}
        width={300}
        height={200}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default ExerciseGraphComponent;
