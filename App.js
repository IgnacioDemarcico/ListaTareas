import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ListGroup from 'react-bootstrap/ListGroup';
import { Row } from 'react-bootstrap';

export default function App() {
  return (
    <View style={styles.container}>
      <Row Style={styles.titulo}>Lista de tareas</Row>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
  
  },
});

