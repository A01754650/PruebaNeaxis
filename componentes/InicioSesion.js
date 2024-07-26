import React, { useState } from "react";
import { Alert, View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { CommonActions } from '@react-navigation/native';
import { login as loginUsuario } from '../database/bd';
import { setIdGlobal } from "../idGlobal";

const InicioSesion = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const userId = await loginUsuario(email, password);
        if (userId) {
            setIdGlobal(userId);
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'PantallaPrincipal' }],

                })
            );
        } else {
            Alert.alert('Email o contraseña incorrectos');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicio de sesión</Text>
            <TextInput
                style={styles.inputEmail}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.inputEmail}
                placeholder='Contraseña'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.Button} onPress={login}>
                <Text>
                    Iniciar sesión
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF8DA',
    },
    title: {
        marginVertical: 8,
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 50,
    },
    inputEmail: {
        width: 300,
        height: 50,
        borderWidth: 1,
        padding: 9,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 10,
        color: 'black',
        backgroundColor: 'white',
    },
    Button: {
        width: 300,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
});

export default InicioSesion;
