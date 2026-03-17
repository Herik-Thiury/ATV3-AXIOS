import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { api } from '../../services/api';

export default function DetalheContato() {
  const { id } = useLocalSearchParams(); // Pega o ID da URL
  const router = useRouter();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Carregar os dados atuais do contato ao abrir a tela
  useEffect(() => {
    const fetchContato = async () => {
      try {
        const response = await api.get(`/contatos/${id}`);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setTelefone(response.data.telefone);
      } catch (error) {
        Alert.alert('Erro', 'Contato não encontrado');
        router.back();
      } finally {
        setLoading(false);
      }
    };
    fetchContato();
  }, [id]);

  // 2. Função para Alterar (PUT)
  const handleAlterar = async () => {
    try {
      await api.put(`/contatos/${id}`, { nome, email, telefone });
      Alert.alert('Sucesso', 'Contato atualizado!');
      router.replace('/(tabs)'); // Volta para a lista atualizada
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível alterar.');
    }
  };

  // 3. Função para Excluir (DELETE)
  const handleExcluir = async () => {
    Alert.alert('Atenção', 'Deseja realmente excluir este contato?', [
      { text: 'Cancelar' },
      { 
        text: 'Excluir', 
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/contatos/${id}`);
            router.replace('/(tabs)');
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir.');
          }
        }
      }
    ]);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ALTERAÇÃO/EXCLUSÃO</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Telefone</Text>
      <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} />

      <TouchableOpacity style={[styles.button, styles.btnAlterar]} onPress={handleAlterar}>
        <Text style={styles.buttonText}>Alterar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.btnExcluir]} onPress={handleExcluir}>
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  label: { fontSize: 14, color: '#666' },
  input: { borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 20, padding: 5, fontSize: 16 },
  button: { padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  btnAlterar: { backgroundColor: '#2196F3' },
  btnExcluir: { backgroundColor: '#F44336' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});