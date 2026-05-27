import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { COLLECTIONS } from '@/constants/collections';

export interface TicketPayload {
  eventId: string;
  eventTitle: string;
  attendeeName: string;
  attendeeEmail: string;
  ticketType: string;
  ticketName?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export async function createTicket(payload: TicketPayload) {
  const ticketId = `T-${Date.now().toString(36)}-${Math.floor(Math.random()*9000)+1000}`;

  const docRef = await addDoc(collection(db, COLLECTIONS.TICKETS), {
    ticketId,
    ...payload,
    createdAt: Timestamp.now(),
  });

  return { id: docRef.id, ticketId };
}
