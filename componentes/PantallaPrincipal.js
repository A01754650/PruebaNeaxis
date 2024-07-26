import React, { useState, useEffect } from "react";
import { Alert, View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { getNotes, addNote, deleteNote, updateNote } from '../database/bd';
import { getIdGlobal } from "../idGlobal";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const PantallaPrincipal = ({ navigation }) => {
    const [notas, setNotas] = useState([]);
    const userId = getIdGlobal();

    useEffect(() => {
        const loadNotes = async () => {
            console.log('userId en async:', userId);
            const fetchedNotes = await getNotes(userId);
            setNotas(fetchedNotes);
        };

        loadNotes();
    }, [userId]);

    const agregarNota = async (nota) => {

        const nuevaNota = {
            id: Date.now().toString(),
            ...nota,
            userId: userId
        };

        await addNote(nuevaNota);
        setNotas(prevNotas => [...prevNotas, nuevaNota]);
    };

    const eliminarNota = async (id) => {
        await deleteNote(id);
        setNotas(prevNotas => prevNotas.filter(nota => nota.id !== id));
    };

    const editarNota = async (nota) => {
        const previd = nota.id;
        nota.id = Date.now().toString();
        const nuevaNota = {
            id: Date.now().toString(),
            ...nota,
            userId: userId
        };
        await addNote(nuevaNota);
        setNotas(prevNotas => [...prevNotas, nuevaNota]);
        eliminarNota(previd);
    };

    const verNotas = ({ item }) => (
        <View style={styles.nota}>
            <Text style={styles.tituloNota}>{item.titulo}</Text>
            <Text style={styles.contenidoNota}>{item.contenido}</Text>
            <View style={styles.botonesContainer}>
                <TouchableOpacity style={styles.borrar} onPress={() => eliminarNota(item.id)}>
                    <Text style={styles.textoBotonNota}>Eliminar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.editar}
                    onPress={() => navigation.navigate('PantallaNota', { nota: item, guardarNota: editarNota })}
                >
                    <Text style={styles.textoBotonNota}>Editar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PantallaNota', { guardarNota: agregarNota })}>
                <Text style={styles.textoBoton}>Agregar nota</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scroll}>
                <FlatList
                    data={notas}
                    renderItem={verNotas}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFBE9',
    },
    title: {
        marginVertical: 8,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
    },
    nota: {
        marginVertical: 8,
        fontSize: 25,
        backgroundColor: 'white',
        padding: 10,
        width: 350,
        borderRadius: 10,
        marginBottom: 10,
    },
    tituloNota: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    contenidoNota: {
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'left',
    },
    button: {
        marginTop: 50,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        width: 300,
        marginBottom: 20,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBoton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scroll: {
        flex: 1,
        width: '100%',
        height: 'auto'
    },
    borrar: {
        backgroundColor: '#FF0000',
        padding: 10,
        borderRadius: 5,
        width: 75,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    editar: {
        backgroundColor: '#FFA500',
        padding: 10,
        borderRadius: 5,
        width: 75,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 15,
    },
    textoBotonNota: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    botonesContainer: {
        flexDirection: 'row',
    },
});

export default PantallaPrincipal;
