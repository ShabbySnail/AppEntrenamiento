import React from 'react';
import { View, TextInput, ScrollView, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import { db } from '../services/firebase';
import { addDoc, collection } from 'firebase/firestore';

const ExerciseComponent = () => {
  const navigation = useNavigation();

  const [exerciseData, setExerciseData] = React.useState({
    nombre: '',
    tipo: '',
    tiempo: 0,
    intensidad: 0,
    fecha: new Date().getTime(),
  });

  const handleInputChange = (name, value) => {
    setExerciseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createExercise = () => {
    const dataColl = collection(db, 'exercises');
    const exceriseDoc = addDoc(dataColl, exerciseData);
    console.log(exceriseDoc);
    Alert.alert('Ejercicio creado');
    navigation.goBack();
    setExerciseData({
      nombre: '',
      tipo: '',
      tiempo: 0,
      intensidad: 0,
      fecha: new Date().getTime(),
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Crear nuevo ejercicio</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del ejercicio"
          placeholderTextColor="#444"
          value={exerciseData.nombre}
          onChangeText={(value) => handleInputChange('nombre', value)}
        />

        <Text style={styles.title}>Tipo de ejercicio</Text>
        <Picker
          selectedValue={exerciseData.tipo}
          style={styles.picker}
          onValueChange={(value) => handleInputChange('tipo', value)}
        >
          <Picker.Item label="Aerobico" value="Aerobico" />
          <Picker.Item label="Flexibilidad" value="Flexibilidad" />
          <Picker.Item label="Fuerza" value="Fuerza" />
        </Picker>

        <Text style={styles.title}>Tiempo de sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Tiempo (minutos)"
          placeholderTextColor="#444"
          value={exerciseData.tiempo}
          onChangeText={(value) => handleInputChange('tiempo', value)}
          keyboardType="numeric"
        />

        <Text style={styles.title}>Intensidad</Text>
        <TextInput
          style={styles.input}
          placeholder="(1-10)"
          placeholderTextColor="#444"
          value={exerciseData.intensidad}
          onChangeText={(value) => handleInputChange('intensidad', value)}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={createExercise}>
          <Text style={styles.buttonText}>Crear nuevo ejercicio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ExerciseComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#222',
  },
  picker: {
    height: 40,
    marginBottom: 10,
    color: '#222',
  },
  buttonContainer: {
    backgroundColor: 'orange',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
