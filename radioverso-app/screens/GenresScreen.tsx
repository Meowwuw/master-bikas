import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Importa los tipos

const { width, height } = Dimensions.get('window');

const genres = [
  { name: 'Rock', image: require('../assets/images/Recurso1.png'), color: '#FF0000' },
  { name: 'Indie', image: require('../assets/images/Recurso2.png'), color: '#FFFF00' },
  { name: 'Romántico', image: require('../assets/images/Recurso3.png'), color: '#FF00FF' },
  { name: 'Pop', image: require('../assets/images/Recurso4.png'), color: '#800080' },
  { name: 'Salsa', image: require('../assets/images/Recurso5.png'), color: '#FFA500' },
  { name: 'Urbano', image: require('../assets/images/Recurso6.png'), color: '#0000FF' },
];

export default function GenresScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Usa los tipos

  const renderItem = ({ item }: { item: typeof genres[0] }) => (
    <TouchableOpacity style={styles.genreItem}>
      <Image source={item.image} style={styles.genreImage} />
      <Text style={[styles.genreText, { color: item.color }]}>{item.name}</Text>
    </TouchableOpacity>
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
        data={genres}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={3}
        contentContainerStyle={styles.genresContainer}
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
  genresContainer: {
    justifyContent: 'center',
    paddingVertical: 20,
    zIndex: 5,
  },
  genreItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 3,
    paddingVertical: 10,
    zIndex: 5, 
  },
  genreImage: {
    width: 80,
    height: 80,
  },
  genreText: {
    marginTop: 10,
    fontSize: 16,
  },
});
