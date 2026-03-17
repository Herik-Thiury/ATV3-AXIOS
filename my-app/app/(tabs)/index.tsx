import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { api } from '../../services/api';

// Definição da estrutura do contacto baseada no seu projeto
interface Contato {
  id: string;
  nome: string;
  telefone: string;
}

export default function ListaContatos() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Função para buscar os dados no JSON Server usando Axios
  const loadContatos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/contatos');
      setContatos(response.data);
    } catch (error) {
      console.error("Erro ao carregar lista:", error);
    } finally {
      setLoading(false);
    }
  };

  // O useFocusEffect garante a atualização automática ao voltar para esta tela
  useFocusEffect(
    useCallback(() => {
      loadContatos();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.telefone}>{item.telefone}</Text>
            </View>
            
            {/* Botão para Editar (Página 5) */}
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => router.push(`/contato/${item.id}`)}
            >
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum contacto guardado.</Text>}
      />

      {/* Botão flutuante para Novo Contato (Página 4) */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/contato/novo')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  card: { 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee', 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between' 
  },
  info: { flex: 1 },
  nome: { fontSize: 16, fontWeight: 'bold' },
  telefone: { color: '#666', marginTop: 3 },
  editButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2196F3'
  },
  editText: { color: '#2196F3', fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' },
  fab: { 
    position: 'absolute', 
    right: 25, 
    bottom: 25, 
    backgroundColor: '#2196F3', 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: { color: '#fff', fontSize: 30, fontWeight: 'bold' }
});