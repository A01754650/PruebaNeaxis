import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';

const PantallaNota = ({ route, navigation }) => {
    const { guardarNota, nota } = route.params || {};
    const [titulo, setTitulo] = useState(nota ? nota.titulo : '');
    const [contenido, setContenido] = useState(nota ? nota.contenido : '');

    const guardar = async () => {
        if (titulo.length === 0 || contenido.length === 0) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }
        const nuevaNota = {
            id: nota ? nota.id
                : Date.now().toString(),
            titulo,
            contenido
        };
        await guardarNota(nuevaNota);
        navigation.goBack();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Nota</Text>
                <Text style={styles.tituloNota}>Titulo</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={titulo}
                    onChangeText={setTitulo}
                />
                <Text style={styles.tituloNota}>Contenido</Text>
                <TextInput
                    style={styles.inputMultiline}
                    value={contenido}
                    onChangeText={setContenido}
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={guardar}>
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFF8DA',
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tituloNota: {
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#FFF',
    },
    inputMultiline: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        height: 100,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PantallaNota;
