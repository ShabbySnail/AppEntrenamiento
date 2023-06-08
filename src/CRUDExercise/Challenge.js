import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';
import { getTime } from 'date-fns';
import { useNavigation } from '@react-navigation/native';


import { db } from '../services/firebase';

const ChallengeComponent = () => {
  const navigation = useNavigation();

  const inputRef = useRef(null);

  const handleInputPress = () => {
    inputRef.current.focus();
  };

  const [challengeData, setChallengeData] = useState({
    tipo: '',
    fechaInicio: new Date().getTime(),
    fecha_Fin: new Date(),
    tiempo_Objetivo: 0,
    peso_objetivo: 0
  });


  const handleInputChange = (name, value) => {
    setChallengeData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  

  const createChallenge = async () => {
    try {
      const challengesCollection = collection(db, 'challenges');
      const newChallenge = { ...challengeData };
      newChallenge.fecha_Fin = newChallenge.fecha_Fin.getTime();
      const challengeDoc = await addDoc(challengesCollection, newChallenge);
      console.log('Challenge created with ID:', challengeDoc.id);
      Alert.alert('Desafío creado');
      navigation.goBack();

      setChallengeData({
        tipo: '',
        fecha_Fin: new Date(),
        tiempo_Objetivo: 0,
        peso_objetivo: 0
      });

    } catch (error) {
      console.log('Error creating challenge:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Formulario */}
        <Text style={styles.Text}>Crear desafío</Text>
        <Picker
          style={styles.picker}
          selectedValue={challengeData.tipo}
          onValueChange={(value) => handleInputChange('tipo', value)}
        >
          <Picker.Item label="Selecciona un tipo de ejercicio" value="" />
          <Picker.Item label="Aerobico" value="Aerobico" />
          <Picker.Item label="Flexibilidad" value="Flexibilidad" />
          <Picker.Item label="Fuerza" value="Fuerza" />
        </Picker>


        <Text style={styles.Text}>Fecha limite de Desafio</Text>
        <DatePicker
          placeholder="Fecha Final de Desafio"
          date={challengeData.fecha_Fin instanceof Date ? challengeData.fecha_Fin : new Date()}
          mode="date"
          format="YYYY-MM-DD"
          onDateChange={(date) => handleInputChange('fecha_Fin', date)}
          style={styles.datePickerContainer} // Actualiza el estilo del contenedor
          pickerStyle={styles.pickerStyle}
          customStyles={{
            datePicker: styles.datePicker, // Aplica el estilo personalizado al DatePicker
          }}
        />
        <Text style={styles.Text}>Tiempo Objetivo</Text>

        <TextInput
          style={styles.input}
          placeholder="Tiempo Objetivo (minutos)"
          placeholderTextColor={styles.placeholderText.color}
          value={challengeData.tiempo_Objetivo}
          onChangeText={(value) => handleInputChange('tiempo_Objetivo', value)} keyboardType="numeric" />

        <Text style={styles.Text}>Peso Objetivo</Text>
        <TextInput
          style={styles.input}
          placeholder="Peso Objetivo (Kg)"
          placeholderTextColor={styles.placeholderText.color}
          value={challengeData.peso_objetivo}
          onChangeText={(value) => handleInputChange('peso_objetivo', value)} keyboardType="numeric" />

        <TouchableOpacity style={styles.buttonContainer} onPress={createChallenge}>
          <Text style={styles.buttonText}>Crear nuevo desafío</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

};

export default ChallengeComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color : 'black'
  },
  picker: {
    width: '80%',
    marginBottom: 20,
    color: 'black',
  },
  datePickerContainer: {
    width: 300, // Ajusta el valor de ancho según tus necesidades
    marginBottom: 20,
  },
  datePicker: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
  },
  pickerStyle: {
    color: 'black',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: 'black',
  },
  placeholderText: {
    color: 'gray',
  },
  buttonContainer: {
    backgroundColor: 'orange',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
