import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { db } from '../services/firebase';
import { Button, IconButton } from 'react-native-paper';

import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ChallengeList = () => {
  const navigation = useNavigation();
  const [challengeData, setChallengeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [borrarModalVisible, setBorrarModalVisible] = useState(false);
  const [desafioIdBorrar, setDesafioIdBorrar] = useState(null);


  const borrarDesafio = async (desafioId) => {
    try {
      setBorrarModalVisible(true);
      setDesafioIdBorrar(desafioId);
    } catch (error) {
      console.log('Error al borrar el desafío:', error);
    }
  };

  const borrarEjercicioConfirmado = async () => {
    try {
      setIsLoading(true);
      await deleteDoc(doc(db, 'challenges', desafioIdBorrar));
      setDesafioIdBorrar(null);
      Alert.alert('Desafío borrado correctamente');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Error al borrar el desafío:', error);
    }
  };


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
        tipo: challenge.tipo,
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

          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.headerButtonText}>Desafíos completados</Text>
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
          tipo: challenge.tipo,
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
            <Text style={styles.label}>Tipo de ejercicio:</Text>
            <Text style={styles.value}>{item.tipo}</Text>
            <Text style={styles.label}>Fecha de inicio:</Text>
            <Text style={styles.value}>{item.fechaInicio.toLocaleString()}</Text>
            <Text style={styles.label}>Fecha de fin:</Text>
            <Text style={styles.value}>{item.fechaFin.toLocaleString()}</Text>
            <Text style={styles.label}>Tiempo objetivo:</Text>
            <Text style={styles.value}>{item.tiempoObjetivo}</Text>
            <Text style={styles.label}>Peso objetivo:</Text>
            <Text style={styles.value}>{item.pesoObjetivo}</Text>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                mode="contained"
                labelStyle={styles.buttonText}
                onPress={() => marcarComoCompletado(item.id)}
              >
                Marcar como completado
              </Button>
              <Button
                style={styles.button}
                mode="contained"
                labelStyle={styles.buttonText}
                onPress={() => borrarDesafio(item.id)}
              >
                Borrar
              </Button>
            </View>

            <Modal
              visible={borrarModalVisible}
              transparent
              animationType="fade"
              onRequestClose={() => setBorrarModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>¿Estás seguro de que deseas borrar el desafio?</Text>
                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={borrarEjercicioConfirmado}
                  >
                    <Text style={styles.modalButtonText}>Borrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setBorrarModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
    color: 'black',
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    height: 40,
    backgroundColor: 'orange',
    color: 'white',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: 'orange',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  headerButton: {
    backgroundColor: 'orange',
    borderRadius: 5,
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
  iconButton: {
    marginLeft: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'orange',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color : 'black',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 24,
    marginRight: 24,
  },
  modalButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ChallengeList;
