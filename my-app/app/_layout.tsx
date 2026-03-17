import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: 'center' }}>
      {/* index é a tela de Login (Página 1) */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      
      {/* Cadastro de Usuário (Página 3) */}
      <Stack.Screen name="cadastro" options={{ title: 'CADASTRO DE USUÁRIOS' }} />
      
      {/* Oculta o header das abas para usar o da própria aba */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* Telas de Contato (Páginas 4 e 5) */}
      <Stack.Screen name="contato/novo" options={{ title: 'CADASTRO DE CONTATO' }} />
      <Stack.Screen name="contato/[id]" options={{ title: 'ALTERAÇÃO/EXCLUSÃO' }} />
    </Stack>
  );
}