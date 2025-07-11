// src/navigation/DiarioNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DiarioScreen from '../screens/DiarioScreen';
import AdicionarRegistroScreen from '../screens/AdicionarRegistroScreen';
import { RegistroSono } from '../types/diario'; // Importe o tipo de registro

// --- AQUI ESTÁ A MUDANÇA PRINCIPAL ---
// Definimos os tipos de parâmetros para cada tela
export type RootStackParamList = {
  Diario: undefined; // A tela Diario não recebe parâmetros
  AdicionarRegistro: {
    // A tela AdicionarRegistro recebe uma função onSalvar
    onSalvar: (novoRegistro: RegistroSono) => void;
  };
};
// -----------------------------------------

// Agora, criamos o Stack com os tipos que definimos
const Stack = createNativeStackNavigator<RootStackParamList>();

const DiarioNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Diario"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Diario" component={DiarioScreen} />
      <Stack.Screen name="AdicionarRegistro" component={AdicionarRegistroScreen} />
    </Stack.Navigator>
  );
};

export default DiarioNavigator;