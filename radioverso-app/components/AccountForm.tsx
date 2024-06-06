import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function AccountForm() {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Correo" placeholderTextColor="#FFF" style={styles.input} />
      <TextInput placeholder="Contraseña" placeholderTextColor="#FFF" style={styles.input} secureTextEntry />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
      <Text style={styles.registerText}>Regístrate</Text>
      <Text style={styles.forgotPasswordText}>Recuperar mi contraseña</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  input: {
    width: width * 0.8,
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#FFF',
    borderRadius: 5,
    zIndex: 5,
  },
  button: {
    backgroundColor: '#D3F22A',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    zIndex: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    zIndex: 5,
  },
  registerText: {
    color: '#D3F22A',
    marginTop: 20,
    zIndex: 5,
  },
  forgotPasswordText: {
    color: '#D3F22A',
    marginTop: 10,
    zIndex: 5,
  },
});
