import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from '@/components/Login';;       // Asegúrate de que las rutas de importación sean correctas
import Register from '@/components/Register';
import PetApp from '@/components/PetApp';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<'Login' | 'Register' | 'PetApp'>('Login');

  // Función para manejar el éxito en el inicio de sesión
  const handleLoginSuccess = () => {
    setCurrentScreen('PetApp');
  };

  // Función para manejar el éxito en el registro
  const handleRegisterSuccess = () => {
    setCurrentScreen('PetApp');
  };

  // Función para navegar a la pantalla de registro
  const navigateToRegister = () => {
    setCurrentScreen('Register');
  };

  // Función para navegar a la pantalla de login
  const navigateToLogin = () => {
    setCurrentScreen('Login');
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'Login' && (
        <Login
          onNavigateToRegister={navigateToRegister}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {currentScreen === 'Register' && (
        <Register
          onNavigateToLogin={navigateToLogin}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
      {currentScreen === 'PetApp' && <PetApp />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
