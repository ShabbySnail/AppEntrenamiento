import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { HeaderButton, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { db } from '../services/firebase';
import { Button } from 'react-native-paper';

const ChallengeList = () => {
  const navigation = useNavigation();
  const [challengeData, setChallengeData] = useState([]);

  const CustomHeaderButton = (props) => (
    <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color="orange" />
  );
  const formatFecha = (fecha) => {
    if (isNaN(fecha) || fecha.toString() === 'Invalid Date') {
      return 'Fecha inválida';
    } else {
      const dia = fecha.getDate();
      const mes = fecha.toLocaleString('es', { month: 'long' });
      const año = fecha.getFullYear();
      return `${dia} de ${mes} del ${año}`;
    }
  };

  const marcarComoCompletado = async (challengeId) => {
    try {
      // Obtener los datos del desafío completado
      const challenge = challengeData.find((item) => item.id === challengeId);

      // Agregar el desafío completado a la colección "completedChallenges", quitando el id, el campo index y el campo completado
      await addDoc(collection(db, 'completedChallenges'), {
        ejercicioId: challenge.ejercicioId,
        fechaInicio: challenge.fechaInicio,
        fecha_Fin: challenge.fechaFin,
        tiempo_Objetivo: challenge.tiempoObjetivo,
        peso_objetivo: challenge.pesoObjetivo,
      });
      // Eliminar el desafío de la colección "challenges"
      await deleteDoc(doc(db, 'challenges', challengeId));

      Alert.alert('Desafío marcado como completado', 'movido a Desafíos completados');
    } catch (error) {
      console.error('Error al marcar el desafío como completado:', error);
    }
  };

  const handleOpenCompletedChallenges = () => {
    navigation.navigate('ChallengeCompletedList');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleOpenCompletedChallenges}
        >

          <Text style={styles.headerButtonText}>Desafíos completados</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const challengesCollection = collection(db, 'challenges');
    const challengesQuery = query(challengesCollection);

    const unsubscribe = onSnapshot(challengesQuery, (snapshot) => {
      const challenges = [];
      snapshot.forEach((doc) => {
        const challenge = doc.data();
        challenges.push({
          id: doc.id,
          index: challenges.length + 1,
          ejercicioId: challenge.ejercicioId,
          fechaInicio: formatFecha(new Date(challenge.fechaInicio)),
          fechaFin: formatFecha(new Date(challenge.fecha_Fin)),
          tiempoObjetivo: challenge.tiempo_Objetivo,
          pesoObjetivo: challenge.peso_objetivo,
        });
      });
      setChallengeData(challenges);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={challengeData}
        keyExtractor={(challenge) => challenge.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>Desafío No. {item.index}</Text>
            <Text style={styles.label}>Ejercicio:</Text>
            <Text style={styles.value}>{item.ejercicioId}</Text>
            <Text style={styles.label}>Fecha de inicio:</Text>
            <Text style={styles.value}>{item.fechaInicio.toLocaleString()}</Text>
            <Text style={styles.label}>Fecha de fin:</Text>
            <Text style={styles.value}>{item.fechaFin.toLocaleString()}</Text>
            <Text style={styles.label}>Tiempo objetivo:</Text>
            <Text style={styles.value}>{item.tiempoObjetivo}</Text>
            <Text style={styles.label}>Peso objetivo:</Text>
            <Text style={styles.value}>{item.pesoObjetivo}</Text>
            <Button
              style={styles.button}
              mode="contained"
              labelStyle={styles.buttonText}
              onPress={() => marcarComoCompletado(item.id)}
            >
              Marcar como completado
            </Button>
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
    padding: 2,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
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
  headerButton: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
    marginTop: 10,
    marginRight: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChallengeList;
