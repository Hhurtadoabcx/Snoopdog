import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Usamos react-native-vector-icons para los íconos
import PetForm from '../components/PetForm'; // Importamos el formulario

const PetApp = () => {
  const [activeTab, setActiveTab] = useState('pets');
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario
  
  const handleAddPet = () => {
    setShowForm(true); // Muestra el formulario cuando se presiona el ícono de '+'
  };

  const handleCancelForm = () => {
    setShowForm(false); // Oculta el formulario cuando se cancela
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <View style={{ backgroundColor: '#6b21a8', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="menu" size={24} color="white" />
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginLeft: 8 }}>PetCare</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="search" size={24} color="white" style={{ marginRight: 16 }} />
          <Icon name="user" size={24} color="white" />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={{ flex: 1, padding: 16 }}>
        {showForm ? (
          <PetForm onCancel={handleCancelForm} /> // Si showForm es true, mostrar el formulario
        ) : (
          <>
            {activeTab === 'pets' && (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <Text style={{ fontSize: 18, fontWeight: '600' }}>Mis Mascotas</Text>
                  <TouchableOpacity
                    style={{ backgroundColor: '#6b21a8', padding: 10, borderRadius: 50 }}
                    onPress={handleAddPet} // Cuando se presiona, mostramos el formulario
                  >
                    <Icon name="plus" size={24} color="white" />
                  </TouchableOpacity>
                </View>

                {/* Pet Card Example */}
                <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 64, height: 64, backgroundColor: '#e5e7eb', borderRadius: 32 }}></View>
                    <View style={{ marginLeft: 16 }}>
                      <Text style={{ fontWeight: '600' }}>Max</Text>
                      <Text style={{ color: '#6b7280' }}>Labrador • 3 años</Text>
                      <Text style={{ color: '#6b21a8' }}>Próxima vacuna: 15 días</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </>
        )}

{activeTab === 'marketplace' && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <View style={{ width: '48%', backgroundColor: 'white', padding: 16, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, marginBottom: 16 }}>
              <View style={{ width: '100%', height: 120, backgroundColor: '#e5e7eb', borderRadius: 8, marginBottom: 8 }}></View>
              <Text style={{ fontWeight: '600' }}>Alimento Premium</Text>
              <Text style={{ color: '#6b7280' }}>$29.99</Text>
            </View>
          </View>
        )}

        {activeTab === 'vaccines' && (
          <View>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>Registro de Vacunas</Text>
            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontWeight: '600' }}>Rabia</Text>
                  <Text style={{ color: '#6b7280' }}>Última: 12/01/2024</Text>
                </View>
                <TouchableOpacity>
                  <Icon name="plus" size={24} color="#6b21a8" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}


      </ScrollView>




        



      

      {/* Navigation Bar */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingVertical: 12 }}>
        <TouchableOpacity onPress={() => setActiveTab('pets')} style={{ alignItems: 'center' }}>
          <Icon name="dog" size={24} color={activeTab === 'pets' ? '#6b21a8' : '#6b7280'} />
          <Text style={{ fontSize: 12, color: activeTab === 'pets' ? '#6b21a8' : '#6b7280' }}>Mascotas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setActiveTab('marketplace')} style={{ alignItems: 'center' }}>
          <Icon name="shopping-bag" size={24} color={activeTab === 'marketplace' ? '#6b21a8' : '#6b7280'} />
          <Text style={{ fontSize: 12, color: activeTab === 'marketplace' ? '#6b21a8' : '#6b7280' }}>Tienda</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setActiveTab('vaccines')} style={{ alignItems: 'center' }}>
          <Icon name="syringe" size={24} color={activeTab === 'vaccines' ? '#6b21a8' : '#6b7280'} />
          <Text style={{ fontSize: 12, color: activeTab === 'vaccines' ? '#6b21a8' : '#6b7280' }}>Vacunas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetApp;
