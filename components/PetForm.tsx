// PetForm.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { firestore, auth } from '../firebase-config'; // Asegúrate de que la ruta sea correcta
import { collection, addDoc } from 'firebase/firestore';

const PetForm = ({ onCancel, onPetAdded }) => { // Añadimos onPetAdded como prop
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async () => {
    // Validaciones básicas
    if (!petName || !breed || !weight || !age) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (isNaN(weight) || isNaN(age)) {
      Alert.alert('Error', 'El peso y la edad deben ser números.');
      return;
    }

    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert('Error', 'No hay un usuario autenticado.');
        return;
      }

      // Referencia a la colección 'pets'
      const petsCollection = collection(firestore, 'pets');

      // Datos de la mascota
      const petData = {
        petName,
        breed,
        weight: parseFloat(weight),
        age: parseInt(age, 10),
        ownerID: user.uid, // Asigna la ID del dueño
        createdAt: new Date()
      };

      // Añadir documento a Firestore
      await addDoc(petsCollection, petData);

      Alert.alert('Éxito', 'Mascota añadida correctamente.');

      // Invocar la función de callback para actualizar la pantalla
      if (onPetAdded) {
        onPetAdded();
      }

      // Opcional: Limpiar campos
      setPetName('');
      setBreed('');
      setWeight('');
      setAge('');
    } catch (error) {
      console.error('Error al añadir la mascota:', error);
      Alert.alert('Error', 'No se pudo añadir la mascota. Intenta nuevamente.');
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Añadir Nueva Mascota</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre de la mascota"
        value={petName}
        onChangeText={setPetName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Raza"
        value={breed}
        onChangeText={setBreed}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Peso en kg"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Edad en años"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar Mascota</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
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
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6b21a8',
    fontWeight: '600',
  },
});

export default PetForm;
