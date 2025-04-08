import AddTicketForm from "@/components/tickets/TicketForm";
import TicketList from "@/components/tickets/TicketCard";
import { createTicket, getAllTickets, Ticket } from "@/services/ticket.service";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Button, RefreshControl, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tickets = () => {
  const router = useRouter();
  const ticketsData: Ticket[] = [];
  const [yourTicketsData, setYourTicketsData] = useState<Ticket[]>(ticketsData);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const getTickets = async () => {
    const tickets = await getAllTickets();
    setYourTicketsData(tickets);
  };

  useEffect(() => {
    getTickets(); 
  }, []);

  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);
    await getTickets();
    setRefreshing(false);
  }, []);

  const handleTicketPress = async (ticket: Ticket) => {
    getTickets();  
    router.push(`/tickets/${ticket.idTicket?.toString()}`);
  };

  const handleAddTicketList = () => {
    setIsModalVisible(true);
  };

  const handleAddTicket = async (ticket: Ticket) => {
    await createTicket({ nameTicket: ticket.name, priorityTicket: ticket.priority, statusTicket: ticket.status });
    getTickets();
    setIsModalVisible(false)
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    
      <><TicketList
      tickets={yourTicketsData}
      onTicketRefresh={getTickets}
      onTicketPress={handleTicketPress}
      onAddTicket={handleAddTicketList} />
      <AddTicketForm
        visible={isModalVisible}
        onClose={onModalClose}
        onSave={handleAddTicket} /></>
    
  );
};


export default Tickets;
