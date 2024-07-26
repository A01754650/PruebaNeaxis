import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioSesion from './componentes/InicioSesion';
import PantallaPrincipal from './componentes/PantallaPrincipal';
import PantallaNota from './componentes/PantallaNota';
import { Registro } from './database/bd';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
  
    Registro();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='InicioSesion'>
        <Stack.Screen name="InicioSesion" component={InicioSesion} options={{ headerShown: false }} />
        <Stack.Screen name="PantallaPrincipal" component={PantallaPrincipal} options={{ headerShown: false }} />
        <Stack.Screen name="PantallaNota" component={PantallaNota} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
