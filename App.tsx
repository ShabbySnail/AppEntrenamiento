import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/views/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
    </AuthProvider>
  );
}
