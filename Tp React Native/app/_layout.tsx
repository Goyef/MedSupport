import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/context/ctx';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
0      </Stack>
      <StatusBar style="light" />
    </AuthProvider>
  );
}