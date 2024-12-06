// PetApp.js

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Usamos react-native-vector-icons para los íconos
import { auth, firestore } from '../firebase-config';
import { signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const PetApp = ({ onAddPet }) => { // Recibe onAddPet como prop para abrir PetForm
  const [activeTab, setActiveTab] = useState('pets');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'No hay un usuario autenticado.');
      return;
    }

    const petsCollectionRef = collection(firestore, 'pets');
    const q = query(petsCollectionRef, where('ownerID', '==', user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const petsData = [];
      querySnapshot.forEach((doc) => {
        petsData.push({ id: doc.id, ...doc.data() });
      });
      setPets(petsData);
      setLoading(false);
    }, (error) => {
      console.error('Error al obtener las mascotas:', error);
      Alert.alert('Error', 'No se pudieron obtener las mascotas.');
      setLoading(false);
    });

    // Limpiar el listener al desmontar el componente
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // La navegación a 'Login' será manejada por el listener en App.js
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión.');
    }
  };

  const renderPet = ({ item }) => (
    <View style={styles.petCard}>
      <View style={styles.petInfo}>
        <View style={styles.petImage}></View>
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.petName}>{item.petName}</Text>
          <Text style={styles.petDetails}>{item.breed} • {item.age} años</Text>
          <Text style={styles.petVaccination}>Próxima vacuna: {item.nextVaccination}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando mascotas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="menu" size={24} color="white" />
          <Text style={styles.headerTitle}>Snoop Dog</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => Alert.alert('Buscar', 'Función de búsqueda')}>
            <Icon name="search" size={24} color="white" style={{ marginRight: 16 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => Alert.alert('Perfil', 'Función de perfil')}>
            <Icon name="user" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <Icon name="log-out" size={24} color="white" style={{ marginLeft: 16 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.mainContent}>
        {activeTab === 'pets' && (
          <View>
            <View style={styles.petsHeader}>
              <Text style={styles.sectionTitle}>Mis Mascotas</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={onAddPet} // Usar la función de callback para abrir PetForm
              >
                <Icon name="plus" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Lista de Mascotas */}
            {pets.length === 0 ? (
              <Text style={styles.noPetsText}>No tienes mascotas registradas.</Text>
            ) : (
              <FlatList
                data={pets}
                keyExtractor={(item) => item.id}
                renderItem={renderPet}
                contentContainerStyle={styles.petsList}
              />
            )}
          </View>
        )}

        {activeTab === 'marketplace' && (
          <View>
            <Text style={styles.sectionTitle}>Tienda</Text>
            {/* Contenido de la Tienda */}
            <Text>Contenido de la Tienda aquí...</Text>
          </View>
        )}

        {activeTab === 'vaccines' && (
          <View>
            <Text style={styles.sectionTitle}>Vacunas</Text>
            {/* Contenido de Vacunas */}
            <Text>Contenido de Vacunas aquí...</Text>
          </View>
        )}
      </ScrollView>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setActiveTab('pets')} style={styles.navItem}>
          <Icon name="dog" size={24} color={activeTab === 'pets' ? '#6b21a8' : '#6b7280'} />
          <Text style={[styles.navText, { color: activeTab === 'pets' ? '#6b21a8' : '#6b7280' }]}>Mascotas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setActiveTab('marketplace')} style={styles.navItem}>
          <Icon name="shopping-bag" size={24} color={activeTab === 'marketplace' ? '#6b21a8' : '#6b7280'} />
          <Text style={[styles.navText, { color: activeTab === 'marketplace' ? '#6b21a8' : '#6b7280' }]}>Tienda</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setActiveTab('vaccines')} style={styles.navItem}>
          <Icon name="syringe" size={24} color={activeTab === 'vaccines' ? '#6b21a8' : '#6b7280'} />
          <Text style={[styles.navText, { color: activeTab === 'vaccines' ? '#6b21a8' : '#6b7280' }]}>Vacunas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header styles
  header: {
    backgroundColor: '#6b21a8',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  // Main content styles
  mainContent: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  petsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#6b21a8',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  petsList: {
    paddingBottom: 20,
  },
  petCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  petImage: {
    width: 64,
    height: 64,
    backgroundColor: '#e5e7eb',
    borderRadius: 32,
  },
  petName: {
    fontSize: 18,
    fontWeight: '600',
  },
  petDetails: {
    color: '#6b7280',
  },
  petVaccination: {
    color: '#6b21a8',
  },
  noPetsText: {
    textAlign: 'center',
    color: '#6b21a8',
    fontSize: 16,
    marginTop: 20,
  },
  // Navigation bar styles
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 12,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
  // Logout button styles (eliminado)
  // logoutButton: {
  //   position: 'absolute',
  //   top: 40, // Ajusta según tu diseño
  //   right: 16,
  //   backgroundColor: '#e53e3e',
  //   padding: 8,
  //   borderRadius: 8,
  // },
  // logoutButtonText: {
  //   color: 'white',
  //   fontWeight: '600',
  // },
  // Loading container
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PetApp;
