import { db } from "@/config/firebase";
import { collection, getDocs, addDoc, updateDoc, doc,getDoc } from "firebase/firestore";

export interface Ticket {
  idTicket? : string;
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
   await addDoc(ticketsCollection, {
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

const editTicket = async ({
  idTicket,
  nameTicket,
  priorityTicket,
  statusTicket,
}: {
  idTicket : string;
  nameTicket: string;
  priorityTicket: string;
  statusTicket: string;
}): Promise<Ticket> => {
  const ticketRef = doc(db, "Tickets",idTicket);
await updateDoc(ticketRef, {
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

export { getAllTickets, getTicketsDB, createTicket, editTicket, getDetailTicket };

