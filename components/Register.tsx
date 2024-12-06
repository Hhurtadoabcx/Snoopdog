// Register.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { auth } from '../firebase-config'; // Importa auth desde tu configuración
import Logo from '../assets/snoop.jpg'; // Asegúrate de que la ruta es correcta
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = ({ onNavigateToLogin, onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      // Crear usuario con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Opcional: actualizar el perfil del usuario con el nombre
      await updateProfile(user, {
        displayName: name,
      });

      Alert.alert('Éxito', 'Usuario registrado con éxito.');

      // Llamar a onRegisterSuccess para mostrar PetApp
      onRegisterSuccess();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>

        <Image source={Logo} style={styles.logo} />


      <Text style={styles.title}>Registro de Usuario</Text>

      {/* Campo Nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />

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

      {/* Campo Confirmar Contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />

      {/* Botón de Registro */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      {/* Enlace a Login */}
      <TouchableOpacity style={styles.registerLink} onPress={onNavigateToLogin}>
        <Text style={styles.registerText}>¿Ya tienes cuenta? Inicia sesión</Text>
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

export default Register;
