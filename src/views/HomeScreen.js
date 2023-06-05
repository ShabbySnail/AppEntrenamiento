import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToExerciseList = () => {
    navigation.navigate('Ejercicios');
  };

  const navigateToChallengeList = () => {
    navigation.navigate('Desafíos');
  };

  const navigateToProfile = () => {
    navigation.navigate('Perfil');
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToExerciseList} style={styles.button}>
        <Text style={styles.buttonText}>Registrar entrenamiento</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToChallengeList} style={styles.button}>
        <Text style={styles.buttonText}>Registrar un nuevo Desafio</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToProfile} style={styles.button}>
        <Text style={styles.buttonText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
