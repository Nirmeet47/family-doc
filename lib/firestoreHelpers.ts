import { db } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

// Get all documents from 'documents' collection
export async function getAllDocuments() {
  const snapshot = await getDocs(collection(db, 'documents'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Get a specific document by ID
export async function getDocumentById(id: string) {
  const ref = doc(db, 'documents', id);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

// Add a new document
export async function addDocument(data: any) {
  const ref = await addDoc(collection(db, 'documents'), data);
  return ref.id;
}

// Update a document by ID
export async function updateDocument(id: string, data: any) {
  const ref = doc(db, 'documents', id);
  await updateDoc(ref, data);
}

// Delete a document by ID
export async function deleteDocument(id: string) {
  const ref = doc(db, 'documents', id);
  await deleteDoc(ref);
}