import { Text, View, StyleSheet, Pressable } from 'react-native';
 import { Link, Redirect, useRootNavigationState, useRouter } from 'expo-router'; 
import { useAuth } from '@/context/ctx';
import { getAuth } from 'firebase/auth';
import Button from '@/components/ui/Button';

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const goTodashboard = () => {
    router.replace("/dashboard");
  }
  console.log(user);

  if (!user)
    return <Redirect href="/login" />

  const signOut = () => {
    const auth = getAuth();

    auth.signOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>index Screen</Text>
      <Link href="/login" style={styles.button}>
       C'est mon index ouuuuuu
      </Link>
      <Pressable onPress={signOut}>
        <Text style={{color:'#fff'}}>
          Se déconnecter
        </Text>
      </Pressable>
        <Button label="go dashboard" onPress={goTodashboard}/>
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
