import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/context/ctx';

export default function AppLayout() {
    const { user, loading } = useAuth();
  
  if (!user)
    return <Redirect href="/login" />
  return (
    
    <Stack>
        <Stack.Screen name="index" />
    </Stack>
  )
}