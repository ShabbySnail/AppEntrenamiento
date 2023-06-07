import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importamos los componentes ExerciseComponent, ChallengeComponent, StatisticsComponent y SessionsComponent
import ExerciseComponent from '../CRUDExercise/Exercise';
import ChallengeComponent from '../CRUDExercise/Challenge';

import ExerciseList from './ExerciseList';
import ChallengeList from './ChallengeList';
import ExerciseEdit from '../CRUDExercise/ExerciseEdit';
import ChallengeCompletedList from './ChallengeCompletedList';
import ExerciseGraphComponent from '../CRUDExercise/Statistics';
//Sesiones 
import SignUp from '../auth/SignUp';
import LogIn from '../auth/LogIn';
//import Profile from './Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName = '';
        switch (route.name) {
          case 'Inicio':
            iconName = focused ? 'home' : 'home-outline';
            color = focused ? '#FFA500' : 'gray';
            break;
          case 'Registro de ejercicios':
            iconName = focused ? 'barbell' : 'barbell-outline';
            color = focused ? '#FFA500' : 'gray';
            break;
          case 'Lista de Desafios':
            iconName = focused ? 'trophy' : 'trophy-outline';
            color = focused ? '#FFA500' : 'gray';
            break;
          case 'Estadisticas':
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            color = focused ? '#FFA500' : 'gray';
            break;
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      }
    })}>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Registro de ejercicios" component={ExerciseList} />
      <Tab.Screen name="Lista de Desafios" component={ChallengeList}/>
    </Tab.Navigator>
  );
};

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Hom"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Ejercicios" component={ExerciseComponent} />
        <Stack.Screen name="Desafíos" component={ChallengeComponent}/>
        <Stack.Screen name="ExerciseEdit" component={ExerciseEdit} options={{ title: 'Editar Ejercicio' }} initialParams={{ ejercicioId: null, onClose: null }} />
        <Stack.Screen name="ChallengeCompletedList" component={ChallengeCompletedList} options={{title: 'Desafios Completados'}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{title: 'Registro'}}/>
        <Stack.Screen name="LogIn" component={LogIn} options={{title: 'Iniciar Sesión'}}/>
        <Stack.Screen name="Estadisticas" component={ExerciseGraphComponent} options={{title: 'Estadisticas'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;