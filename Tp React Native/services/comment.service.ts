import { notifyLocalComment } from "@/components/notification/localNotification";
import { db } from "@/config/firebase";
import { comments } from "@/types/comments";
import { TicketFirst } from "@/types/ticket";
import { dateOnly } from "@/utils/dateFormatter";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { useState } from "react";

const addComment = async ({
    ticketId,
    userId,
    content,
    attachmentUrl,
  }: {
    ticketId: string;
    userId: string;
    content: string;
    attachmentUrl?: string;
  }) => {
    let ticket: TicketFirst | null = null;

    const commentsRef = collection(db, "Comments");
  
    const newComment = {
      ticketId: doc(db, "Tickets", ticketId),
      userId: doc(db, "Users", userId),
      content,
      attachmentUrl: attachmentUrl || null,
      createdAt: Timestamp.fromDate(new Date()),
    };
  
    const docSnap = await getDoc(newComment.ticketId);
    if (!docSnap.exists()) {
      console.log(`Aucun ticket trouvé pour l'ID : ${newComment.ticketId.id}`);
      return null;
    }
    const data = docSnap.data();
    if (data) {
      ticket = data as TicketFirst;
    }
  
    await addDoc(commentsRef, newComment);
  
    if (ticket !== null) {
      await notifyLocalComment(ticket.title);
    }
  };

   const listenToComments = (ticketId: string, setComments: (comments: comments[]) => void) => {
    if (!ticketId) {
      console.error("ID du ticket invalide");
      return () => {}; 
    }
    const ticketRef = doc(db, "Tickets", ticketId)
    const commentsCollection = collection(db, "Comments");
    const commentsQuery = query(commentsCollection, where("ticketId", "==", ticketRef));
  
    const unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
      const commentList = snapshot.docs.map((doc) => doc.data() as comments);
      setComments(commentList);
    });
  
    return unsubscribeComments;  
  };
  export {addComment,listenToComments}