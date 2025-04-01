import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { getDetailTicket, Ticket } from "@/services/ticket.service";


const TicketDetails = () => {
    
    const router = useRouter()
  const params = useLocalSearchParams();
  console.log(params)

  const { id, idTicket } = params;
  
  const goToTicketsIndex= () => {
    router.replace("/tickets");
  }
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (idTicket) {
      getDetailTicket(idTicket as string).then((data) => {
        if (data) {
          setTicket(data as Ticket);
        }
      });
    }
  }, [idTicket]);

  if (!ticket) return <Text>Veuillez sélectionner un ticket dans la liste</Text>;

  return (
    <><Stack.Screen options={{ headerShown: false }} />
    <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{ticket.name}</Text>
          <Text>Status: {ticket.status}</Text>
          <Text>Priorité: {ticket.priority}</Text>
          <Button label="Retour à la liste de ticket" onPress={goToTicketsIndex}  />
      </View></>
  );
};

export default TicketDetails;
