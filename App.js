import React from 'react';
import { Row } from 'react-bootstrap';
import { View, StyleSheet } from 'react-native';
import Lista from './components/Lista';

export default function App() {
  return (
    <View style={styles.container}>
    <Row style={styles.titulo}>Lista de tareas</Row>
      <Lista/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titulo: {
    marginTop: '25px',
    marginBottom: '50px',
    fontWeight: 'Bold',
    fontFamily: 'Sans-Serif',
    fontSize: '30px',
  },
});
