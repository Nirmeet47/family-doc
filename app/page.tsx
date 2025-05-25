'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import { getPersonsForUser, addPersonForUser, deletePersonForUser } from '@/lib/firestoreHelpers';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [persons, setPersons] = useState<any[]>([]);
  const [personsLoading, setPersonsLoading] = useState(true);
  const [personName, setPersonName] = useState('');

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
  }

  if (authLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-16">
        <LoginForm />
        <SignupForm />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {user.email}!</h1>
        <button
          onClick={() => signOut(auth)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Logout
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-4">Your Family Members</h2>
      <form
        onSubmit={handleAddPerson}
        className="flex gap-3 mb-8"
      >
        <input
          value={personName}
          onChange={e => setPersonName(e.target.value)}
          placeholder="Add new person"
          required
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>
      {personsLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {persons.map(person => (
            <div
              key={person.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-3xl font-bold mb-4">
                {person.name?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div className="font-semibold text-lg mb-2">{person.name}</div>
              <button
                onClick={() => handleDeletePerson(person.id)}
                className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}