import React, { useState, useRef } from 'react';
import { View, Button, Text, StyleSheet, TextInput, Switch, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { collection, addDoc, getDocs } from 'firebase/firestore';
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
    if (name === 'fecha_Fin') {
      // Convertir el valor de fecha a un timestamp en milisegundos
      value = getTime(value);
    }
    setChallengeData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const createChallenge = async () => {
    try {
      const challengesCollection = collection(db, 'challenges');
      const newChallenge = { ...challengeData };
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
          selectedValue={challengeData.tipo}
          onValueChange={(value) => handleInputChange('tipo', value)}
        >
          <Picker.Item label="Aerobico" value="Aerobico" />
          <Picker.Item label="Flexibilidad" value="Flexibilidad" />
          <Picker.Item label="Fuerza" value="Fuerza" />
        </Picker>


        <Text style={styles.Text}>Fecha limite de Desafio</Text>
        <DatePicker
          style={styles.orangeBorder}
          placeholder="Fecha Final de Desafio"
          date={challengeData.fecha_Fin instanceof Date ? challengeData.fecha_Fin : new Date()}
          mode="date"
          format="YYYY-MM-DD"
          onDateChange={date => handleInputChange('fecha_Fin', date)}
        />

        <Text style={styles.Text}>Tiempo Objetivo</Text>
        <TouchableOpacity onPress={handleInputPress}>
          <TextInput
            style={styles.input}
            placeholder="Tiempo Objetivo (minutos)"
            value={challengeData.tiempo_Objetivo}
            onChangeText={(value) => handleInputChange('tiempo_Objetivo', value)} keyboardType="numeric" />
        </TouchableOpacity>

        <Text style={styles.Text}>Peso Objetivo</Text>
        <TouchableOpacity onPress={handleInputPress}>
          <TextInput
            style={styles.input}
            placeholder="Peso Objetivo (Kg)"
            value={challengeData.peso_objetivo}
            onChangeText={(value) => handleInputChange('peso_objetivo', value)} keyboardType="numeric" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={createChallenge}>
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