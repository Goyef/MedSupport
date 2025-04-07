import AddTicketForm from "@/components/tickets/TicketForm";
import TicketList from "@/components/tickets/TicketCard";
import { createTicket, getAllTickets, Ticket } from "@/services/ticket.service";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const Tickets = () => {
  const router = useRouter();
  const ticketsData: Ticket[] = [];
  const [yourTicketsData, setYourTicketsData] = useState<Ticket[]>(ticketsData);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const getTickets = async () => {
    const tickets = await getAllTickets();
    setYourTicketsData(tickets);
  };

  useEffect(() => {
    getTickets(); 
  }, []);

  const handleTicketPress = async (ticket: Ticket) => {
    console.log("Ticket pressed:", ticket);
    getTickets();  

    router.push(`/tickets/${ticket.idTicket?.toString()}`);
    getTickets()
  };

  const handleAddTicketList = () => {
    getTickets()
    console.log("Add ticket button pressed");
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
