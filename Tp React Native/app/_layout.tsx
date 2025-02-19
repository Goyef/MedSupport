import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
export default function RootLayout() {
  return (
    <>
  <Stack >
     <Stack.Screen name="(auth)" options={{ headerShown: false }} />
     <Stack.Screen name="(app)" options={{ headerShown: false }} />

     <Stack.Screen name="login" options={{title : 'Login'}}/>
     <Stack.Screen name="register" options={{title:'Register'}}/>
    <Stack.Screen name="index" options={{title : 'Home'}}/>
    <Stack.Screen name="dashboard" options={{title: "Dashboard"}}/>
    <Stack.Screen name="profile" options={{title: "Profile"}}/>
    <Stack.Screen name="create" options={{title: "Create Ticket"}}/>

  </Stack>
  <StatusBar style="light" />
  </>
  );
}
