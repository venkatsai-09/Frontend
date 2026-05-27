import { collection, getDocs, query, orderBy, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { COLLECTIONS } from '@/constants/collections';
import type { Event } from '@/types/event';
import { useEffect, useState } from 'react';

export async function fetchAllEvents(): Promise<Event[]> {
  const q = query(collection(db, COLLECTIONS.EVENTS), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Event[];
}

export async function fetchEventById(eventId: string): Promise<Event | null> {
  const d = await import('firebase/firestore').then(({ doc, getDoc }) => getDoc(doc(db, COLLECTIONS.EVENTS, eventId)));
  if (!d.exists()) return null;
  return { id: d.id, ...(d.data() as any) } as Event;
}

export function useEvent(eventId: string | null) {
  const [data, setData] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!eventId) {
      setData(null);
      setIsLoading(false);
      return;
    }

    (async () => {
      setIsLoading(true);
      try {
        const ev = await fetchEventById(eventId);
        if (mounted) setData(ev);
      } catch (err: any) {
        if (mounted) setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [eventId]);

  return { data, isLoading, error } as const;
}

export function useEvents() {
  const [data, setData] = useState<Event[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setIsLoading(true);
      try {
        const events = await fetchAllEvents();
        if (mounted) setData(events);
      } catch (err: any) {
        if (mounted) setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return { data, isLoading, error } as const;
}

export interface CreateEventPayload {
  title: string;
  description?: string;
  category?: string;
  venue?: {
    name?: string;
    address?: string;
    city?: string;
  };
  date?: string;
  startTime?: string;
  endTime?: string;
  price?: number;
  image?: string | null;
  organizerId: string;
  organizerRole?: string;
}

export async function createEvent(payload: CreateEventPayload) {
  const docRef = await addDoc(collection(db, COLLECTIONS.EVENTS), {
    ...payload,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return { id: docRef.id };
}
