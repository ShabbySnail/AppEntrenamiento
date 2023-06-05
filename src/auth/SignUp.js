import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import { createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import { auth, db } from '../services/firebase';

const SignUp = () => {
    setPersistence(auth, browserLocalPersistence);
    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [weight, setWeight] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            // Crear el usuario con correo y contraseña
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Obtener el ID del usuario creado
            const userId = userCredential.user.uid;

            // Guardar los datos del perfil en Firestore
            await addDoc(collection(db, 'profiles'), {
                userId,
                fullName,
                age,
                gender,
                weight,
            });

            // Redirigir a la página de inicio o perfil
            navigation.navigate('Inicio');
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro de usuario</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Edad"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            <View style={styles.genderContainer}>
                <Text style={styles.label}>Sexo:</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={gender}
                    onValueChange={setGender}
                >
                    <Picker.Item label="Selecciona una opción" value="" />
                    <Picker.Item label="Masculino" value="Masculino" />
                    <Picker.Item label="Femenino" value="Femenino" />
                    <Picker.Item label="Otro" value="Otro" />
                </Picker>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Peso"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity onPress={handleSignup} style={styles.button}>
                <Text style={styles.buttonText}>Registrarse</Text>
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    button: {
        backgroundColor: 'orange',
        padding: 2,
        textAlign: 'center',
        fontSize: 16,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        paddingTop: 10,
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        color: 'orange',
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
    headerButton: {
        backgroundColor: 'orange',
        borderRadius: 10,
        padding: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 5,
        marginTop: 10,
        marginRight: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    genderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        marginRight: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        paddingHorizontal: 10,
    },

});

export default SignUp;
