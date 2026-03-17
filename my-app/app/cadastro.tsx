import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../services/api';

export default function CadastroUsuario() {
  const router = useRouter();
  
  // Estado para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSalvar = async () => {
    // Validação simples
    if (!nome || !cpf || !email || !senha) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    try {
      // Envio dos dados para a rota /usuarios do seu JSON Server
      await api.post('/usuarios', {
        nome,
        cpf,
        email,
        senha
      });

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      router.back(); // Volta para a tela de Login
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o usuário. Verifique o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CADASTRO DE USUÁRIOS</Text>

      <TextInput 
        placeholder="nome" 
        style={styles.input} 
        onChangeText={setNome}
        value={nome}
      />
      <TextInput 
        placeholder="cpf" 
        style={styles.input} 
        onChangeText={setCpf}
        value={cpf}
        keyboardType="numeric"
      />
      <TextInput 
        placeholder="email" 
        style={styles.input} 
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="senha" 
        style={styles.input} 
        onChangeText={setSenha}
        value={senha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 25, padding: 5, fontSize: 16 },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});