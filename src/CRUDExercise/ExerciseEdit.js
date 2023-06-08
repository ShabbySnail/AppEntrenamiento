import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Picker } from '@react-native-picker/picker';


const ExerciseEdit = React.memo(({ route, navigation }) => {

    const { ejercicioId } = route.params;
    const [nombre, setNombre] = useState('');
    const [selectedTipo, setSelectedTipo] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [intensidad, setIntensidad] = useState('');

    useEffect(() => {
        const cargarEjercicio = async () => {
            try {
                const ejercicioDoc = await getDoc(doc(db, 'exercises', ejercicioId));
                if (ejercicioDoc.exists()) {
                    const ejercicioData = ejercicioDoc.data();
                    setNombre(ejercicioData.nombre);
                    setSelectedTipo(ejercicioData.tipo);
                    setTiempo(ejercicioData.tiempo);
                    setIntensidad(ejercicioData.intensidad);
                }
            } catch (error) {
                console.error('Error al cargar el ejercicio', error);
            }
        };

        cargarEjercicio();
    }, [ejercicioId]);

    const guardarCambios = async () => {
        try {
            await updateDoc(doc(db, 'exercises', ejercicioId), {
                nombre,
                tipo: selectedTipo,
                tiempo,
                intensidad,
            });
            //con un alert se puede mostrar un mensaje de que se guardo correctamente y luego volver a la pantalla anterior
            Alert.alert('Ejercicio actualizado');
            navigation.goBack();
        } catch (error) {
            console.error('Error al actualizar el ejercicio', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre: </Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <Text style={styles.label}>Tipo de ejercicio: </Text>
            <Picker
                selectedValue={selectedTipo}
                onValueChange={(itemValue) => setSelectedTipo(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Aerobico" value="Aerobico" />
                <Picker.Item label="Flexibilidad" value="Flexibilidad" />
                <Picker.Item label="Fuerza" value="Fuerza" />
            </Picker>
            <Text style={styles.label}>Tiempo: </Text>
            <TextInput
                style={styles.input}
                placeholder="Tiempo"
                value={tiempo}
                onChangeText={setTiempo}
            />
            <Text style={styles.label}>Intensidad: </Text>
            <TextInput
                style={styles.input}
                placeholder="Intensidad"
                value={intensidad}
                onChangeText={setIntensidad}
            />
            <TouchableOpacity style={styles.button} onPress={guardarCambios}>
                <Text style={styles.buttonText}>Guardar cambios</Text>
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        color: 'black',
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
        color : 'black',
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
    picker: {
        fontSize: 18,
        padding: 5,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 5,
        color: 'black',
    },
    
});


export default ExerciseEdit;
