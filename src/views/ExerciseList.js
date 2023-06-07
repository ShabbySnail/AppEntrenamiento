import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { collection, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import Modal from 'react-native-modal';
import { db } from '../services/firebase';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';



const ExerciseList = () => {
  const navigation = useNavigation();
  const [exerciseData, setExerciseData] = useState([]);
  const [borrarModalVisible, setBorrarModalVisible] = useState(false);
  const [ejercicioIdABorrar, setEjercicioIdABorrar] = useState(null);

  const borrarEjercicio = (ejercicioId) => {
    setBorrarModalVisible(true);
    setEjercicioIdABorrar(ejercicioId);
  };

  const borrarEjercicioConfirmado = async () => {
    try {
      const ejercicioId = ejercicioIdABorrar;
      const ejercicioRef = doc(db, 'exercises', ejercicioId);
      await deleteDoc(ejercicioRef);
      setEjercicioIdABorrar(null);
      console.log('Ejercicio borrado correctamente');
      Alert.alert('Ejercicio borrado correctamente');
    } catch (error) {
      console.error('Error al borrar el ejercicio', error);
      Alert.alert('Error al borrar el ejercicio');
    }
  };

  const editarEjercicio = (ejercicioId) => {
    navigation.navigate('ExerciseEdit', { ejercicioId, onClose: null });
  };
  


  useEffect(() => {
    const exercisesCollection = collection(db, 'exercises');
    const exercisesQuery = query(exercisesCollection);

    const unsubscribe = onSnapshot(exercisesQuery, snapshot => {
      const exercises = [];
      snapshot.forEach(doc => {
        exercises.push({ id: doc.id, ...doc.data() });
      });
      setExerciseData(exercises);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={exerciseData}
        keyExtractor={exercise => exercise.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.nombre}</Text>
            <Text style={styles.label}>Tipo:</Text>
            <Text style={styles.value}>{item.tipo}</Text>
            <Text style={styles.label}>Tiempo:</Text>
            <Text style={styles.value}>{item.tiempo} min.</Text>
            <Text style={styles.label}>Intensidad:</Text>
            <Text style={styles.value}>{item.intensidad}</Text>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{format(new Date(item.fecha), 'dd/MM/yyyy')}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => borrarEjercicio(item.id)}
              >
                <Text style={styles.buttonText}>Borrar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => editarEjercicio(item.id)}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        isVisible={borrarModalVisible}
        onBackdropPress={() => setBorrarModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>¿Estás seguro de que deseas borrar el ejercicio?</Text>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setBorrarModalVisible(false);
                borrarEjercicioConfirmado();
              }}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  itemContainer: {
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 15,
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 30,
    marginTop: 8,
    marginRight: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
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


export default ExerciseList;
