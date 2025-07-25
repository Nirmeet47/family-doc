import { db, storage } from "@/lib/firebase";
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

// --- DOCUMENT HELPERS ---

// Get documents for a person
export async function getDocumentsForPerson(uid: string, personId: string) {
  const snapshot = await getDocs(collection(db, 'users', uid, 'persons', personId, 'documents'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Add a document metadata (after uploading PDF to storage)
export async function addDocumentForPerson(uid: string, personId: string, data: { name: string, url: string }) {
  const ref = await addDoc(collection(db, 'users', uid, 'persons', personId, 'documents'), data);
  return ref.id;
}

// Delete a document metadata
export async function deleteDocumentForPerson(uid: string, personId: string, documentId: string) {
  await deleteDoc(doc(db, 'users', uid, 'persons', personId, 'documents', documentId));
}


export async function uploadDocumentForPerson(
  uid: string,
  personId: string,
  file: File,
  name: string
) {
  const storageRef = ref(storage, `users/${uid}/persons/${personId}/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  await addDoc(collection(db, "users", uid, "persons", personId, "documents"), {
    name,
    url,
    uploadedAt: new Date(),
  });
}