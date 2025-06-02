import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/context/ctx';
import { Stack } from 'expo-router';


//Configuration nécessaire pour les notifications / non conservé dans cette version
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });
 
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
     </Stack>
      <StatusBar style="light" />
    </AuthProvider>
  );
}