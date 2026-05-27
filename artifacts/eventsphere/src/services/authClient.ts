import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { COLLECTIONS } from '@/constants/collections';

export type UserRole = 'attendee' | 'organizer';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export async function signup(email: string, password: string, name: string, role: UserRole): Promise<UserProfile> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const fu = cred.user;

  const profile: UserProfile = {
    uid: fu.uid,
    name,
    email: fu.email || email,
    role,
    createdAt: new Date().toISOString(),
  };

  await setDoc(doc(db, COLLECTIONS.USERS, fu.uid), profile);

  return profile;
}

export async function login(email: string, password: string): Promise<UserProfile> {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const fu = cred.user;

  const userDocRef = doc(db, COLLECTIONS.USERS, fu.uid);
  const snap = await getDoc(userDocRef);
  if (!snap.exists()) throw new Error('User profile not found');
  return snap.data() as UserProfile;
}

export async function logout(): Promise<void> {
  return signOut(auth);
}

export function onAuthChange(cb: (user: UserProfile | null) => void) {
  return onAuthStateChanged(auth, async (fu: FirebaseUser | null) => {
    if (!fu) return cb(null);
    const userDocRef = doc(db, COLLECTIONS.USERS, fu.uid);
    const snap = await getDoc(userDocRef);
    if (!snap.exists()) return cb(null);
    cb(snap.data() as UserProfile);
  });
}
