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
    ejercicioId: '',
    fechaInicio: new Date().getTime(),
    fecha_Fin: new Date(),
    tiempo_Objetivo: 0,
    peso_objetivo: 0
  });

  const [exerciseOptions, setExerciseOptions] = useState([]);

  React.useEffect(() => {
    fetchExerciseOptions();
  }, []);

  const fetchExerciseOptions = async () => {
    const exercisesRef = collection(db, 'exercises');
    const querySnapshot = await getDocs(exercisesRef);

    const options = querySnapshot.docs.map((doc) => ({
      label: doc.data().nombre,
      value: doc.id
    }));

    setExerciseOptions(options);
  };


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
        ejercicioId: '',
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
          selectedValue={challengeData.ejercicioId}
          onValueChange={(value) => handleInputChange('ejercicioId', value)}
        >
          {exerciseOptions.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.label} />
          ))}
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
        {/* Botón de crear desafío */}
        <Button title="Crear Desafío" onPress={createChallenge} />
      </View>
    </ScrollView>
  );

};

export default ChallengeComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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