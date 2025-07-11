// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DiarioNavigator from './src/navigation/DiarioNavigator'; // Assumindo que você criou este arquivo
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <NavigationContainer>
      {/* O StatusBar do expo é um pouco diferente */}
      <StatusBar style="light" backgroundColor="#1A1A2E" />
      <DiarioNavigator />
    </NavigationContainer>
  );
};

export default App;

