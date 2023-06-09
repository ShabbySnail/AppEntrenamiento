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

  const navigateToStatistics = () => {
    navigation.navigate('Estadisticas');
  };


  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <TouchableOpacity onPress={navigateToExerciseList} style={styles.button}>
            <Icon name="plus" style={styles.icon} />
            <Text style={styles.buttonText}>Registrar entrenamiento</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <TouchableOpacity onPress={navigateToChallengeList} style={styles.button2}>
            <Icon name="trophy" style={styles.icon} />
            <Text style={styles.buttonText}>Registrar</Text>
            <Text style={styles.buttonText}>desafío</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <TouchableOpacity onPress={navigateToStatistics} style={styles.button3}>
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
    backgroundColor: '#689F38', // Cambia el color del fondo a verde
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    width: '80%',
    height: '80%',
    borderRadius: 50,
    backgroundColor: 'orange', // Cambia el color del fondo a azul oscuro
    alignItems: 'center',
    justifyContent: 'center',
  },
  button3: {
    width: '80%',
    height: '80%',
    borderRadius: 50,
    backgroundColor: '#FF5733', // Cambia el color del fondo a gris oscuro
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