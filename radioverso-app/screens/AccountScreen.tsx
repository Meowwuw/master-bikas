import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import AccountForm from '../components/AccountForm';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

const { width, height } = Dimensions.get('window');

export default function AccountScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Usa los tipos

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
      <View style={styles.formContainer}>
        <AccountForm />
      </View>
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
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
});
