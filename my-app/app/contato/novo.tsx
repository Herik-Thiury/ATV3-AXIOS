import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../services/api';

export default function NovoContato() {
  const router = useRouter();
  
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSalvar = async () => {
    if (!nome || !telefone) {
      Alert.alert('Erro', 'Nome e Telefone são obrigatórios.');
      return;
    }

    try {
      // Envia os dados para a coleção de contatos
      await api.post('/contatos', {
        nome,
        email,
        telefone
      });

      Alert.alert('Sucesso', 'Contato adicionado!');
      router.back(); // Retorna para a Lista de Contatos
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o contato.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CADASTRO DE CONTATO</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput 
          style={styles.input} 
          value={nome} 
          onChangeText={setNome} 
        />

        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input} 
          value={email} 
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput 
          style={styles.input} 
          value={telefone} 
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  form: { marginTop: 10 },
  label: { fontSize: 16, color: '#333', marginBottom: 5 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 20, padding: 5, fontSize: 16 },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});