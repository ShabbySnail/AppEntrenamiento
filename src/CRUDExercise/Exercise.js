import React from 'react';
import { View, TextInput,ScrollView, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
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
          onChangeText={(value) => handleInputChange('nombre', value)} />


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

        <TouchableOpacity style={styles.button} onPress={createExercise}>
          <Text style={styles.buttonText}>Crear nuevo ejercicio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );



};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'orange',
  },
  input: {
    fontSize: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default ExerciseComponent;