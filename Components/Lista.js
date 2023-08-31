import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Lista = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [data]);

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('items');
      if (storedData !== null) {
        setData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('items', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleAddItem = () => {
    if (inputName.trim() !== '' && inputDescription.trim() !== '') {
      const newItem = {
        id: String(data.length + 1),
        name: inputName,
        description: inputDescription,
        checked: false,
      };
      setData([...data, newItem]);
      setInputName('');
      setInputDescription('');
      setModalVisible(false);
    }
  };

  const handleCheckboxToggle = (itemId) => {
    const updatedData = data.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setData(updatedData);
  };

  const handleRemoveItem = (itemId) => {
    const updatedData = data.filter((item) => item.id !== itemId);
    setData(updatedData);
  };

  const renderRightActions = (itemId) => {
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveItem(itemId)}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <View style={styles.listItem}>
              <CheckBox
                checked={item.checked}
                onPress={() => handleCheckboxToggle(item.id)}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            </View>
          </Swipeable>
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonLabel}>Agregar Item</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nombre del nuevo item"
              onChangeText={(text) => setInputName(text)}
              value={inputName}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción del nuevo item"
              onChangeText={(text) => setInputDescription(text)}
              value={inputDescription}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleAddItem}>
              <Text style={styles.modalButtonText}>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButtonText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 20,
    alignSelf: 'center',
  },
  addButtonLabel: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Lista;
