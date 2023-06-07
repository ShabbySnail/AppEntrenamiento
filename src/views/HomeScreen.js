import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


const HomeScreen = () => {
  const navigation = useNavigation();



  const navigateToExerciseList = () => {
    navigation.navigate('Ejercicios');
  };

  const navigateToChallengeList = () => {
    navigation.navigate('Desafíos');
  };

 // const navigateToProfile = () => {
 //   navigation.navigate('Perfil');
 // };

  const navigateToStatistics = () => {
    navigation.navigate('Estadisticas');
  };


  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <TouchableOpacity onPress={navigateToExerciseList} style={styles.button}>
            <Icon name= 'running' style={styles.icon} />
            <Text style={styles.buttonText}>Registrar entrenamiento</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <TouchableOpacity onPress={navigateToChallengeList} style={styles.button}>
            <Icon name="trophy" style={styles.icon} />
            <Text style={styles.buttonText}>Registrar un nuevo Desafio</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
        <TouchableOpacity onPress={navigateToChallengeList} style={styles.button}>
            <Icon name="user" style={styles.icon} />
            <Text style={styles.buttonText}>Perfil</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <TouchableOpacity onPress={navigateToStatistics} style={styles.button}>
            <Icon name="bar-chart" style={styles.icon} />
            <Text style={styles.buttonText}>Estadisticas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyColumn: {
    backgroundColor: 'transparent', // Deja el cuadrante vacío sin color de fondo
  },
  button: {
    width: '80%',
    height: '80%',
    borderRadius: 50,
    backgroundColor: '#FFA500', // Cambia el color del fondo a naranja
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold', // Ajusta el tamaño y el estilo del texto
  },
  icon: {
    fontSize: 30, // Ajusta el tamaño del icono
    color: '#ffffff', // Ajusta el color del icono
  },

});

export default HomeScreen;