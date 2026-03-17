import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs screenOptions={{ headerTitleAlign: 'center' }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Contatos',
          headerTitle: 'LISTA DE CONTATOS', // Título que aparece no topo 
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => router.replace('/')} // Redireciona para o Login [cite: 1]
              style={{ marginRight: 15 }}
            >
              <Text style={{ color: '#F44336', fontWeight: 'bold' }}>Sair</Text>
            </TouchableOpacity>
          ),
        }} 
      />
    </Tabs>
  );
}