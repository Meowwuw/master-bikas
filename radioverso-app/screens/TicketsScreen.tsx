import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Importa los tipos

const { width, height } = Dimensions.get('window');

const tickets = [
  'Tienes una entrada para Gabriel Martinez',
  'Escucha en exclusiva la nueva canción de...',
  'Tienes un descuento para café Piola',
  'Mira la entrevista a Melissa Cabrera',
  'Tienes dos entradas para nuestro evento'
];

export default function TicketsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Usa los tipos

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.ticketItem}>
      <Text style={styles.ticketText}>{item}</Text>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <Image source={require('../assets/images/Fondo.png')} style={styles.backgroundImage} />
      <Image source={require('../assets/images/Galaxia.png')} style={styles.galaxyImage} />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0.7 }}
        style={styles.gradientOverlay}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Text style={styles.menuItem}>Mi cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Genres')}>
            <Text style={styles.menuItem}>Géneros</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Tickets')}>
            <Text style={styles.menuItem}>Entradas</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={tickets}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.ticketsContainer}
        style={{ zIndex: 5 }} // Añadir zIndex aquí para asegurarse de que esté por encima
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 1,
  },
  galaxyImage: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 2,
  },
  gradientOverlay: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    zIndex: 4,
  },
  logo: {
    marginTop: 40,
    marginLeft: 10,
    width: 40,
    height: 40,
  },
  menuContainer: {
    marginTop: 40,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    color: '#D3F22A',
    fontSize: 18,
    marginLeft: 20,
  },
  ticketsContainer: {
    justifyContent: 'center',
    paddingVertical: 20,
    zIndex: 5,
  },
  ticketItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  ticketText: {
    color: '#FFF',
    fontSize: 16,
  },
});
