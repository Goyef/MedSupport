import { db } from "@/config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export interface Ticket {
  name: string;
  status: string;
  priority: string;
}

async function getTicketsDB() {
  console.log("Getting tickets from DB");

  const querySnapshot = await getDocs(collection(db, "Tickets"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}

const getAllTickets = async (): Promise<Ticket[]> => {
  const ticketsCollection = collection(db, "Tickets");
  const snapshot = await getDocs(ticketsCollection);

  console.log("Raw snapshot:", snapshot.docs.map(doc => doc.data()));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Ticket),
  }));
};
const createTicket = async ({
  nameTicket,
  priorityTicket,
  statusTicket,
}: {
  nameTicket: string;
  priorityTicket: string;
  statusTicket: string;
}): Promise<Ticket> => {
  const ticketsCollection = collection(db, "Tickets");
  const docRef = await addDoc(ticketsCollection, {
    name: nameTicket,
    priority: priorityTicket,
    status: statusTicket,
  });
  return {
    name: nameTicket,
    priority: priorityTicket,
    status: statusTicket,
  };
};

export { getAllTickets, getTicketsDB, createTicket };

