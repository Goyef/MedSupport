import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, IconButton,Button as Bt } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Link, useRouter } from "expo-router";

const  RegisterScreen = () => {
   const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
 const [secureText, setSecureText] = useState(true);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Succès", "Inscription réussie !");
      router.replace("/(app)"); 
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    }
    setLoading(false);
  };

  return (
    
    <View style={styles.container}>
      <Link href="/login" style={styles.link}>
        Déjà un compte ? Connectez-vous
      </Link>
      <TextInput
        label="Adresse e-mail"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry={secureText}
          autoCapitalize="none"
          style={styles.passwordInput}
        />
        <IconButton
          icon={secureText ? "eye-off" : "eye"}
          onPress={() => setSecureText(!secureText)}
        />
      </View>

      <Bt
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        S'inscrire
      </Bt>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  input: {
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0b03fc",
  },
  link : {
    color : "#303bc0"
  }
});

export default RegisterScreen