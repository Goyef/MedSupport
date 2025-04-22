import { Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useAuth } from '@/context/ctx';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getAllTickets } from '@/services/ticket.service';
import { Button as Bt } from "react-native-paper";

export default function Index() {
  const { user, role } = useAuth();
  const router = useRouter();

  const [ticketCount, setTicketCount] = useState(0);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, [user, role]);

  const fetchTickets = async () => {
    if (user) {
      try {
        setLoadingTickets(true);
        const tickets = await getAllTickets();

        let userTickets = [];
        //filtrage selon le rôle
        if (role === "employee") {
          userTickets = tickets.filter(ticket =>
            ticket.createdBy?.id === user?.uid
          );
        } else if (role === "support") {
          userTickets = tickets.filter(ticket =>
            ticket.assignedTo?.id === user?.uid
          );
        } else {
          userTickets = tickets;
        }

        setTicketCount(userTickets.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des tickets:", error);
      } finally {
        setLoadingTickets(false);
        setRefreshing(false);
      }
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTickets();
  };

  if (!user) return <Redirect href="/login" />;

  const signOut = () => {
    const auth = getAuth();
    auth.signOut();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text>Bienvenue</Text>
      <Text style={styles.welcome}>{user?.email}</Text>
      <Text style={styles.roleText}>
        Vous êtes connecté en tant que {role === "employee" ? "employé" : role}
      </Text>

      {loadingTickets ? (
        <Text>Chargement des tickets...</Text>
      ) : (
        <Text style={styles.label}>
          {role === "admin" && `Vous avez ${ticketCount} ticket(s)`}
          {role === "support" && `Vous avez ${ticketCount} ticket(s) qui vous est assigné`}
          {role === "employee" && `Vous avez ${ticketCount} ticket(s)`}
        </Text>
      )}

      {role === "admin" && (
        <Bt
          mode="contained"
          onPress={() => router.push(`/profile/utilisateurs`)}
          style={styles.actionButton}
          icon="account-group"
        >
          Gérer les utilisateurs
        </Bt>
      )}

      <Bt mode="text" onPress={signOut} style={styles.logoutButton}>
        Se déconnecter
      </Bt>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  roleText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20
  },
  actionButton: {
    marginBottom: 12,
    width: '80%',
  },
  logoutButton: {
    width: '80%',
  }
});
