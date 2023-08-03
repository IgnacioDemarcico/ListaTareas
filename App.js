import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ListGroup from 'react-bootstrap/ListGroup';
import { Row } from 'react-bootstrap';


export default function App() {
  return (
    <View style={styles.container}>
    <Row style={styles.titulo}>Lista de tareas</Row>

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
  fontSize:'30px',
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
  },
});

