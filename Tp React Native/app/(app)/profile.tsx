import { Text, View, StyleSheet, Pressable } from 'react-native';
 import { Link, Redirect, useRootNavigationState, useRouter } from 'expo-router'; 
import { useAuth } from '@/context/ctx';
import { getAuth } from 'firebase/auth';
import Button from '@/components/ui/Button';

export default function Profile() {
  const router = useRouter();
  const goToDashboard = () => {
    router.replace("/dashboard");
  }

  const goToTicketsIndex= () => {
    router.replace("/tickets");
  }

  
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <Button theme="secondary" label="Dashboard" onPress={goToDashboard} />
      <Button label="Liste de tickets" onPress={goToTicketsIndex} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
