// Login.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert , Image} from 'react-native';
import { auth } from '../firebase-config'; // Importa auth desde tu configuración
import Logo from '../assets/snoop.jpg'; // Asegúrate de que la ruta es correcta
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ onNavigateToRegister, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      // Iniciar sesión con email y contraseña
      await signInWithEmailAndPassword(auth, email, password);

      Alert.alert('Éxito', 'Sesión iniciada con éxito.');

      // Llamar a onLoginSuccess para mostrar PetApp
      onLoginSuccess();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagen de Logo */}
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Iniciar Sesión</Text>

      {/* Campo Email */}
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Campo Contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {/* Botón de Inicio de Sesión */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Enlace a Registro */}
      <TouchableOpacity style={styles.registerLink} onPress={onNavigateToRegister}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8fafc',
      justifyContent: 'center',
      alignItems: 'center', // Centrar contenido horizontalmente
    },
    logo: {
      width: 300, // Ajusta el tamaño según sea necesario
      height: 300,
      marginBottom: 20, // Espacio entre la imagen y el título
      resizeMode: 'contain', // Mantener la relación de aspecto
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#6b21a8',
    },
    input: {
      width: '100%', // Asegurar que los inputs ocupen todo el ancho
      height: 50,
      borderColor: '#e5e7eb',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 10,
      borderRadius: 8,
      backgroundColor: 'white',
    },
    button: {
      backgroundColor: '#6b21a8',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      width: '100%', // Asegurar que el botón ocupe todo el ancho
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: '600',
    },
    registerLink: {
      marginTop: 20,
      alignItems: 'center',
    },
    registerText: {
      color: '#6b21a8',
      fontWeight: '600',
    },
  });
  
export default Login;
