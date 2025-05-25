'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import {
  getPersonsForUser,
  addPersonForUser,
  deletePersonForUser,
  getDocumentsForPerson,
  deleteDocumentForPerson,
} from '@/lib/firestoreHelpers';
import DocumentUpload from '@/components/DocumentUpload';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [persons, setPersons] = useState<any[]>([]);
  const [personsLoading, setPersonsLoading] = useState(true);
  const [personName, setPersonName] = useState('');

  // For selected person and their documents
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [documentsLoading, setDocumentsLoading] = useState(false);

  // Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // Fetch family members when user changes
  useEffect(() => {
    if (user) {
      setPersonsLoading(true);
      getPersonsForUser(user.uid).then(docs => {
        setPersons(docs);
        setPersonsLoading(false);
      });
    } else {
      setPersons([]);
    }
  }, [user]);

  // Fetch documents for selected person
  async function handlePersonClick(person: any) {
    setSelectedPerson(person);
    setDocumentsLoading(true);
    const docs = await getDocumentsForPerson(user.uid, person.id);
    setDocuments(docs);
    setDocumentsLoading(false);
  }

  async function handleAddPerson(e: React.FormEvent) {
    e.preventDefault();
    if (!personName.trim()) return;
    await addPersonForUser(user.uid, { name: personName });
    setPersonName('');
    setPersonsLoading(true);
    const docs = await getPersonsForUser(user.uid);
    setPersons(docs);
    setPersonsLoading(false);
  }

  async function handleDeletePerson(personId: string) {
    await deletePersonForUser(user.uid, personId);
    setPersonsLoading(true);
    const docs = await getPersonsForUser(user.uid);
    setPersons(docs);
    setPersonsLoading(false);
    setSelectedPerson(null);
  }

  async function handleDeleteDocument(documentId: string) {
    if (!selectedPerson) return;
    await deleteDocumentForPerson(user.uid, selectedPerson.id, documentId);
    setDocumentsLoading(true);
    const docs = await getDocumentsForPerson(user.uid, selectedPerson.id);
    setDocuments(docs);
    setDocumentsLoading(false);
  }

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-16">
        <LoginForm />
        <SignupForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-10 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-blue-700">
              Welcome, <span className="text-blue-800">{user.email}</span>!
            </h1>
            <h2 className="text-lg text-blue-600 mt-1">Your Family Members</h2>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
          >
            Logout
          </button>
        </div>

        {/* If a person is selected, show their documents */}
        {selectedPerson ? (
          <div className="my-8">
            <button
              className="mb-4 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              onClick={() => setSelectedPerson(null)}
            >← Back to family members</button>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 text-xl font-bold">
                {selectedPerson.name?.[0]?.toUpperCase() ?? '?'}
              </div>
              <span className="font-bold text-xl">{selectedPerson.name}</span>
              <button
                className="ml-4 px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm"
                onClick={() => handleDeletePerson(selectedPerson.id)}
              >
                Delete Member
              </button>
            </div>
            <h3 className="text-lg font-bold mb-4">Documents</h3>
            {documentsLoading ? (
              <div>Loading documents...</div>
            ) : documents.length === 0 ? (
              <div className="text-gray-500 mb-4">No documents yet. Upload a PDF below!</div>
            ) : (
              <ul className="space-y-2 mb-4">
                {documents.map(doc => (
                  <li key={doc.id} className="flex items-center gap-4">
                    <a href={doc.url} target="_blank" rel="noopener" className="text-blue-700 underline">{doc.name}</a>
                    <button
                      className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                      onClick={() => handleDeleteDocument(doc.id)}
                    >Delete</button>
                  </li>
                ))}
              </ul>
            )}
            <DocumentUpload
              uid={user.uid}
              personId={selectedPerson.id}
              onUpload={async () => {
                setDocumentsLoading(true);
                setDocuments(await getDocumentsForPerson(user.uid, selectedPerson.id));
                setDocumentsLoading(false);
              }}
            />
          </div>
        ) : (
          <>
            <form
              onSubmit={handleAddPerson}
              className="flex gap-3 mb-8"
            >
              <input
                value={personName}
                onChange={e => setPersonName(e.target.value)}
                placeholder="Add new person"
                required
                className="flex-1 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
              >
                Add
              </button>
            </form>
            {personsLoading ? (
              <div className="text-center py-12 text-blue-600">Loading...</div>
            ) : persons.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No family members yet. Add your first!</div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {persons.map(person => (
                  <div
                    key={person.id}
                    className="bg-white rounded-xl shadow p-6 flex flex-col items-center cursor-pointer hover:ring-2 hover:ring-blue-300 transition"
                    onClick={() => handlePersonClick(person)}
                  >
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-3xl font-bold mb-4">
                      {person.name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div className="font-semibold text-lg mb-2">{person.name}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}