import { Text, View, StyleSheet, Pressable } from 'react-native';
 import { Link, Redirect, useRootNavigationState, useRouter } from 'expo-router'; 
import { useAuth } from '@/context/ctx';
import { getAuth } from 'firebase/auth';
import Button from '@/components/ui/Button';

export default function Dashboard() {
  const router = useRouter();
  const goToIndex = () => {
    router.replace("/(app)");
  }

  const goToTicketsIndex= () => {
    router.replace("/tickets");
  }

  const signOut = () => {
    const auth = getAuth();

    auth.signOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard Screen</Text>
      <Pressable onPress={signOut}>
        <Text style={{color:'#fff'}}>
          Se déconnecter
        </Text>
      </Pressable>
      <Button theme="secondary" label=" il est où l'index" onPress={goToIndex} />
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
