import { Tabs, useRouter } from 'expo-router'; // Certifique-se de importar o useRouter
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TabLayout() {
  const router = useRouter(); // Inicializa o hook de navegação

  return (
    <Tabs 
      screenOptions={{ 
        headerTitleAlign: 'center',
        headerTintColor: '#000',
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Contatos',
          headerTitle: 'LISTA DE CONTATOS',
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => {
                console.log("Botão sair pressionado");
                router.replace('/'); 
              }} 
              style={styles.logoutButton}
            >
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          ),
        }} 
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 15,
    padding: 5,
  },
  logoutText: {
    color: '#F44336',
    fontWeight: 'bold',
    fontSize: 16,
  },
});