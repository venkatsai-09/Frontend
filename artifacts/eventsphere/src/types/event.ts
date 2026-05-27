import { Timestamp } from 'firebase/firestore';

export interface Event {
  id: string;
  organizerId?: string;
  title: string;
  description?: string;
  category?: string;
  venue?: string;
  date?: string;
  time?: string;
  price?: number;
  image?: string;
  createdAt?: string | Date | Timestamp;
  city?: string;
  location?: string;
  organizerName?: string;
  organizer?: string;
  capacity?: number;
  tickets?: Array<{
    id: string;
    name: string;
    price: number;
    desc?: string;
  }>;
  speakers?: Array<{ name: string; role?: string; company?: string; initials?: string; color?: string }>;
  agenda?: Array<{ time?: string; title?: string; description?: string; type?: string }>;
  faqs?: Array<{ q: string; a: string }>;
  reviews?: Array<{ name: string; date?: string; rating?: number; comment?: string }>;
}
