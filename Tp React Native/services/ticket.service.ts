import { db } from "@/config/firebase";
import { TicketFirst, TicketTrue } from "@/types/ticket";
import { collection, getDocs, addDoc, updateDoc, doc,getDoc, deleteDoc, Timestamp } from "firebase/firestore";


const getAllTickets = async (): Promise<TicketFirst[]> => {
  const ticketsCollection = collection(db, "Tickets");
  const snapshot = await getDocs(ticketsCollection);

  console.log("Raw snapshot:", snapshot.docs.map(doc => doc.data()));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as TicketFirst),
  }));
};


async function getTicketsDB() {
  console.log("Getting tickets from DB");

  const querySnapshot = await getDocs(collection(db, "Tickets"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}


const getDetailTicket = async (idTicket: string) => {
  try {
    if (!idTicket || typeof idTicket !== "string") {
      throw new Error("ID du ticket invalide.");
    }

    const ticketRef = doc(db, "Tickets", idTicket);
    const docSnap = await getDoc(ticketRef);

    if (!docSnap.exists()) {
      console.log(`Aucun ticket trouvé pour l'ID : ${idTicket}`);
      return null;
    }

    return docSnap.data();
  } catch (error) {
    console.log("Erreur lors de la récupération du ticket :", error);
    return null;
  }
};

//Création de tickets
const createTicket = async (ticket: TicketFirst): Promise<TicketTrue | null> => {
  try {
  const ticketsCollection = collection(db, "Tickets");
  if (!ticket.createdBy || typeof ticket.createdBy !== 'string') {
    throw new Error("une erreur sur l'utilisateur");
  }
  const userRef = doc(db, "Users", ticket.createdBy);
   await addDoc(ticketsCollection, {
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
    category: ticket.category,
    createdBy: userRef,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  });
  return {
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
    category: ticket.category,
    createdBy: userRef,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  };}
  catch (error) {
    console.error("Error creating ticket:", error);
    return null; 
  }
};



const deleteTicket = async (idTicket:string) : Promise<boolean> => {
  try {
    console.log(idTicket)

    await deleteDoc(doc(db, "Tickets", idTicket));
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return false;
  }
};

 const updateTicket = async ({
  idTicket,
  nameTicket,
  statusTicket,
  priorityTicket,
}: {
  idTicket: string;
  nameTicket: string;
  statusTicket: string;
  priorityTicket: string;
}) => {
  const ticketRef = doc(db, "Tickets", idTicket);

  await updateDoc(ticketRef, {
    name: nameTicket,  
    status: statusTicket, 
    priority: priorityTicket,
  });
};


export { getAllTickets, getTicketsDB, createTicket, getDetailTicket,deleteTicket,updateTicket };

