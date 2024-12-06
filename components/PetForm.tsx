import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PetForm = ({ onCancel }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [petName, setPetName] = useState('');

  const handleSubmit = () => {
    console.log('Mascota añadida:', { name, breed, weight, petName });
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
        value={name}
        onChangeText={setName}
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
