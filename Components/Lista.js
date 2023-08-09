import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, CheckBox } from 'react-native';

const Lista = () => {
  const [data, setData] = useState([
    { id: '1', text: 'Item 1', checked: false },
    { id: '2', text: 'Item 2', checked: false },
    { id: '3', text: 'Item 3', checked: false },
    { id: '4', text: 'Item 4', checked: false },
    { id: '5', text: 'Item 5', checked: false },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleAddItem = () => {
    if (inputText.trim() !== '') {
      const newItem = {
        id: String(data.length + 1),
        text: inputText,
        checked: false,
      };
      setData([...data, newItem]);
      setInputText('');
      setModalVisible(false);
    }
  };

  const handleCheckboxToggle = (itemId) => {
    const updatedData = data.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setData(updatedData);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <CheckBox
              value={item.checked}
              onValueChange={() => handleCheckboxToggle(item.id)}
            />
            <Text style={styles.itemText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Agregar Item</Text>
      </TouchableOpacity>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Escribe el nuevo item"
              onChangeText={(text) => setInputText(text)}
              value={inputText}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
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
