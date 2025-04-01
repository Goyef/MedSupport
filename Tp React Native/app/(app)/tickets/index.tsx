import AddTicketForm from "@/components/tickets/TicketForm";
import TicketList from "@/components/tickets/TicketCard";
import { createTicket, getAllTickets, Ticket } from "@/services/ticket.service";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const Tickets = () => {
  const router = useRouter()
  const ticketsData: Ticket[] = [];
  const [yourTicketsData, setYourTicketsData] = useState<Ticket[]>(ticketsData);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const getTickets = async () => {
    const tickets = await getAllTickets();

    //getTicketsDB();
    setYourTicketsData(tickets);
  };
  useEffect(() => {
    
    getTickets();
  }, []);

  const handleTicketPress = (ticket: Ticket) => {
    console.log("Ticket pressed:", ticket);
    router.push(`/tickets/${ticket.idTicket?.toString()}?idTicket=${ticket.idTicket?.toString()}`)
  }

  const handleAddTicketList = () => {
    console.log("Add ticket button pressed");
    setIsModalVisible(true);
  };
  
  const handleAddTicket = async (ticket:Ticket) => {
    await createTicket({nameTicket : ticket.name, priorityTicket : ticket.priority, statusTicket : ticket.status})
    getTickets()
  };


  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <TicketList
        tickets={yourTicketsData} 
        onTicketPress={handleTicketPress}
        onAddTicket={handleAddTicketList}
      />
      <AddTicketForm
        visible={isModalVisible}
        onClose={onModalClose}
        onSave={handleAddTicket}
      />
    </>
  );
};

export default Tickets;