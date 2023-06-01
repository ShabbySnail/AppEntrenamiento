import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

interface UserData {
  results: {
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    location: {
      street: {
        number: number;
        name: string;
      };
      city: string;
      state: string;
      country: string;
      postcode: string;
      coordinates: {
        latitude: string;
        longitude: string;
      };
      timezone: {
        offset: string;
        description: string;
      };
    };

    email: string;
    login: {
      uuid: string;
      username: string;
      password: string;
      salt: string;
      md5: string;
      sha1: string;
      sha256: string;
    };
    dob: {
      date: string;
      age: number;
    };
    registered: {
      date: string;
      age: number;
    };
    phone: string;
    cell: string;
    id: {
      name: string;
      value: string;
    };
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    nat: string;
  }[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}
const App = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {

    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await
        axios.get<UserData>('https://randomuser.me/api/');
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const renderUserData = () => {
    if (!userData) {
      return <Text>Loading...</Text>;
    }
    const user = userData.results[0];
    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={() =>
          handleUserPress(user)}>
          <View>
            <Text>Nombre: {`${user.name.title} ${user.name.first}

${user.name.last}`}</Text>

            <Text>Email: {user.email}</Text>
            <Text>Telefono: {user.phone}</Text>
            <Text>Ciudad: {user.location.city} Pais:

              {user.location.country}</Text>

            <Text>Edad: {user.dob.age}</Text>
            <Text>Telefono: {user.cell}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const handleUserPress = (user: any) => {
    // Acciones a realizar al presionar un usuario
    console.log('Usuario seleccionado:', user);
  };

  return (
    <View style={styles.boton}>
      {renderUserData()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5
  },
  boton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }

})
export default App;