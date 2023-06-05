import React from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet, Alert, Text } from 'react-native';
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
      [name]: value
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
      <Text style={styles.Text}>Crear nuevo ejercicio</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del ejercicio"
          value={exerciseData.nombre}
          onChangeText={(value) => handleInputChange('nombre', value)}/>


        <Text style={styles.Text}>Tipo de ejercicio</Text>
        <Picker
          selectedValue={exerciseData.tipo} style={styles.input} label="Tipo de ejercicio"
          onValueChange={(value) => handleInputChange('tipo', value)}
        >
          <Picker.Item label="Aerobico" value="Aerobico" />
          <Picker.Item label="Flexibilidad" value="Flexibilidad" />
          <Picker.Item label="Fuerza" value="Fuerza" />
        </Picker>
        <Text style={styles.Text}>Tiempo de sesion</Text>
        <TextInput
          style={styles.input}
          placeholder="Tiempo (minutos)"
          value={exerciseData.tiempo}
          onChangeText={(value) => handleInputChange('tiempo', value)} keyboardType='numeric'
        />

        <Text style={styles.Text}>Intensidad</Text>
        <TextInput
          style={styles.input}
          placeholder="(1-10)"
          value={exerciseData.intensidad}
          onChangeText={(value) => handleInputChange('intensidad', value)} keyboardType='numeric'
        />

        <Button style={styles.button} title="Crear Ejercicio" onPress={createExercise} />
      </View>
    </ScrollView>
  );



};

const styles = new StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    fontSize: 20,
    borderRadius: 5,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  Text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 16,
  },
  orangeBorder: {
    borderColor: 'orange',
    borderWidth: 2,
  },
});

export default ExerciseComponent;