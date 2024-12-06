// App.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Login from '@/components/Login';
import Register from '@/components/Register';
import PetApp from '@/components/PetApp';
import PetForm from '@/components/PetForm';
import { auth } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  // Estado para manejar la pantalla actual
  const [currentScreen, setCurrentScreen] = useState('Loading');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener para el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentScreen('PetApp');
      } else {
        setCurrentScreen('Login');
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar el componente
  }, []);

  // Funciones para manejar la navegación
  const navigateToRegister = () => {
    setCurrentScreen('Register');
  };

  const navigateToLogin = () => {
    setCurrentScreen('Login');
  };

  const navigateToPetApp = () => {
    setCurrentScreen('PetApp');
  };

  const navigateToPetForm = () => {
    setCurrentScreen('PetForm');
  };

  const handlePetAdded = () => {
    setCurrentScreen('PetApp');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentScreen === 'Login' && (
        <Login
          onNavigateToRegister={navigateToRegister}
          onLoginSuccess={navigateToPetApp}
        />
      )}
      {currentScreen === 'Register' && (
        <Register
          onNavigateToLogin={navigateToLogin}
          onRegisterSuccess={navigateToPetApp}
        />
      )}
      {currentScreen === 'PetApp' && (
        <PetApp
          onAddPet={navigateToPetForm} // Pasar función para abrir PetForm
        />
      )}
      {currentScreen === 'PetForm' && (
        <PetForm
          onCancel={navigateToPetApp} // Pasar función para cancelar y volver a PetApp
          onPetAdded={handlePetAdded} // Pasar función para volver a PetApp después de añadir
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
