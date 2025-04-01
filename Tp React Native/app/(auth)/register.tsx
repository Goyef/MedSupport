// import { Text, View, StyleSheet, Alert } from 'react-native';
//  import { Link, router } from 'expo-router'; 
// import { useState } from 'react';
// import { useAuth } from '@/context/ctx';
// import { auth } from "@/config/firebase";
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// export default function Register() {

//   const [email,setEmail] = useState(null);
//   const [password,setPassword] = useState(null)
//   const [loading, setLoading] = useState(false);

//     const handleRegister = async () => {
//       if (!email || !password) {
//         Alert.alert("Erreur", "Veuillez remplir tous les champs.");
//         return;
//       }
  
//       setLoading(true);
//       try {
//         await createUserWithEmailAndPassword(auth, email, password);
//         Alert.alert("Succès", "Inscription réussie !");
//         router.replace("/login")
//         // Redirection ou mise à jour de l'état après inscription
//       } catch (error) {
//         Alert.alert("Erreur", (error as Error).message);
//       }
//       setLoading(false);
//     };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Register Screen</Text>
//       <Link href="/login" style={styles.button}>
//         Already have an account. Go to Login Screen
//       </Link>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#25292e',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     color: '#000000',
//   },
//   button: {
//     fontSize: 20,
//     textDecorationLine: 'underline',
//     color: '#fff',
//   },
// });
import { Text, View, StyleSheet, Alert, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Succès", "Inscription réussie !");
      router.replace("/dashboard"); 
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>S'inscrire</Text>}
      </TouchableOpacity>

      <Link href="/login" style={styles.link}>
        Déjà un compte ? Connectez-vous
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1DB954',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    color: '#1DB954',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
