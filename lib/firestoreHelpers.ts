import { db } from './firebase';
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';

// Get all persons for a user
export async function getPersonsForUser(uid: string) {
  const snapshot = await getDocs(collection(db, 'users', uid, 'persons'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Add a person for a user
export async function addPersonForUser(uid: string, data: { name: string }) {
  const ref = await addDoc(collection(db, 'users', uid, 'persons'), data);
  return ref.id;
}

// Delete a person for a user
export async function deletePersonForUser(uid: string, personId: string) {
  await deleteDoc(doc(db, 'users', uid, 'persons', personId));
}