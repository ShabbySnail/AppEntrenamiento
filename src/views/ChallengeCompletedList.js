import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, query, onSnapshot} from 'firebase/firestore';
import { db } from '../services/firebase';

const ChallengeCompletedList = () => {
    const [challengeCompletedData, setChallengeCompletedData] = useState([]);

  useEffect(() => {
    const completedChallengesCollection = collection(db, 'completedChallenges');
    const completedChallengesQuery = query(completedChallengesCollection);
  
    const unsubscribe = onSnapshot(completedChallengesQuery, snapshot => {
      const completedChallenges = [];
      snapshot.forEach(doc => {
        const completedChallenge = doc.data();
        completedChallenges.push({
          id: doc.id,
          index: completedChallenge.length + 1,
          ejercicioId: completedChallenge.ejercicioId,
          fechaInicio: completedChallenge.fechaInicio,
          fechaFin: completedChallenge.fecha_Fin,
          tiempoObjetivo: completedChallenge.peso_objetivo,
          pesoObjetivo: completedChallenge.peso_objetivo
        });
      });
      setChallengeCompletedData(completedChallenges); // Actualiza el estado del componente ChallengeCompleted con los datos de los desafíos completados
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <View style={styles.container}>
      <FlatList
        data={challengeCompletedData}
        keyExtractor={challengesCompleted => challengesCompleted.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
          <Text style={styles.title}>Desafío: {item.ejercicioId}</Text>
            <Text style={styles.label}>Fecha de inicio:</Text>
            <Text style={styles.value}>{item.fechaInicio}</Text>
            <Text style={styles.label}>Fecha de fin:</Text>
            <Text style={styles.value}>{item.fechaFin}</Text>
            <Text style={styles.label}>Tiempo objetivo:</Text>
            <Text style={styles.value}>{item.tiempoObjetivo}</Text>
            <Text style={styles.label}>Peso objetivo:</Text>
            <Text style={styles.value}>{item.pesoObjetivo}</Text>
            <Text style={styles.label}>Estado: <Text style={{fontWeight: 'bold'}}>Completado</Text></Text>

          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',

  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: 'orange',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ChallengeCompletedList;
