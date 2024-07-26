import AsyncStorage from '@react-native-async-storage/async-storage';


const USERS_KEY = '@users';
const NOTES_KEY = '@notes';


export const Registro = async () => {
    try {
        const users = [
            { id: '1', email: 'admin', password: 'admin' },
            { id: '2', email: 'user', password: 'user' }
        ];

        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
        console.error('Error al registrar usuarios:', error);
    }
};

// Autentica a un usuario
export const login = async (email, password) => {
    try {
        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        const users = usersJson ? JSON.parse(usersJson) : [];

        const user = users.find(u => u.email === email && u.password === password);
        return user ? user.id : null;
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        return null;
    }
};

// Obtiene todas las notas de un usuario
export const getNotes = async (userId) => {
    try {
        const notesJson = await AsyncStorage.getItem(NOTES_KEY);
        const notes = notesJson ? JSON.parse(notesJson) : [];
        console.log('Notas en getNotes:', notes.filter(note => note.userId === userId));

        // Filtrar notas por el id de usuario
        return notes.filter(note => note.userId === userId);
    } catch (error) {
        console.error('Error al obtener notas:', error);
        return [];
    }
};

// Agrega una nueva nota
export const addNote = async (note) => {
    try {
        const notesJson = await AsyncStorage.getItem(NOTES_KEY);
        const notes = notesJson ? JSON.parse(notesJson) : [];

        notes.push(note);
        await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (error) {
        console.error('Error al agregar nota:', error);
    }
};


// Elimina una nota por ID
export const deleteNote = async (noteId) => {
    try {
        const notesJson = await AsyncStorage.getItem(NOTES_KEY);
        const notes = notesJson ? JSON.parse(notesJson) : [];

        const updatedNotes = notes.filter(note => note.id !== noteId);
        await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    } catch (error) {
        console.error('Error al eliminar nota:', error);
    }
};
