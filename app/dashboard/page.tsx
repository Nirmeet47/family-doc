// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  getPersonsForUser,
  addPersonForUser,
  deletePersonForUser,
  getDocumentsForPerson,
  deleteDocumentForPerson,
} from "@/lib/firestoreHelpers";

// Import components
import DashboardHeader from "@/app/dashboard/components/DashboardHeader";
import AddPersonForm from "@/app/dashboard/components/AddPersonForm";
import FamilyMembersGrid from "@/app/dashboard/components/FamilyMembersGrid";
import PersonHeader from "@/app/dashboard/components/PersonHeader";
import DocumentsSection from "@/app/dashboard/components/DocumentsSection";
import UploadSection from "@/app/dashboard/components/UploadSection";
import LoadingScreen from "@/app/dashboard/components/LoadingScreen";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [persons, setPersons] = useState<any[]>([]);
  const [personsLoading, setPersonsLoading] = useState(true);

  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [documentsLoading, setDocumentsLoading] = useState(false);

  const router = useRouter();

  // Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/");
    }
  }, [authLoading, user, router]);

  // Fetch family members
  useEffect(() => {
    if (user) {
      setPersonsLoading(true);
      getPersonsForUser(user.uid).then((docs) => {
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

  async function handleAddPerson(personName: string) {
    await addPersonForUser(user.uid, { name: personName });
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

  async function handleUpload() {
    if (!selectedPerson) return;
    setDocumentsLoading(true);
    const docs = await getDocumentsForPerson(user.uid, selectedPerson.id);
    setDocuments(docs);
    setDocumentsLoading(false);
  }

  if (authLoading || (!user && typeof window !== "undefined")) {
    return <LoadingScreen />;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-6 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <DashboardHeader user={user} selectedPerson={selectedPerson} />

        {/* Content */}
        {selectedPerson ? (
          /* Selected Person View */
          <div className="space-y-6">
            {/* Person Header */}
            <PersonHeader
              selectedPerson={selectedPerson}
              onBack={() => setSelectedPerson(null)}
              onDeletePerson={handleDeletePerson}
            />

            {/* Documents Section */}
            <DocumentsSection
              documents={documents}
              documentsLoading={documentsLoading}
              onDeleteDocument={handleDeleteDocument}
            />

            {/* Upload Section */}
            <UploadSection
              user={user}
              selectedPerson={selectedPerson}
              onUpload={handleUpload}
            />
          </div>
        ) : (
          /* Family Members Grid View */
          <div className="space-y-6">
            {/* Add Member Form */}
            <AddPersonForm onAddPerson={handleAddPerson} />

            {/* Family Members Grid */}
            <FamilyMembersGrid
              persons={persons}
              personsLoading={personsLoading}
              onPersonClick={handlePersonClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}