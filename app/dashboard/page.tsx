"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  getPersonsForUser,
  addPersonForUser,
  deletePersonForUser,
  getDocumentsForPerson,
  deleteDocumentForPerson,
} from "@/lib/firestoreHelpers";
import DocumentUpload from "@/components/DocumentUpload";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [persons, setPersons] = useState<any[]>([]);
  const [personsLoading, setPersonsLoading] = useState(true);
  const [personName, setPersonName] = useState("");

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
      router.replace("/signin");
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

  async function handleAddPerson(e: React.FormEvent) {
    e.preventDefault();
    if (!personName.trim()) return;
    await addPersonForUser(user.uid, { name: personName });
    setPersonName("");
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

  if (authLoading || (!user && typeof window !== "undefined")) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-300 border-t-blue-600 mb-4"></div>
          <p className="text-blue-700 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-6 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 mb-6 border border-blue-300 hover:border-blue-400 transition-colors">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  Family Document Manager
                </h1>
                <p className="text-blue-600 font-medium">
                  {selectedPerson ? `Managing documents for ${selectedPerson.name}` : `Welcome back, ${user.email?.split('@')[0]}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut(auth)}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-colors border border-blue-300 hover:border-blue-400"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        {selectedPerson ? (
          /* Selected Person View */
          <div className="space-y-6">
            {/* Person Header */}
            <div className="bg-white rounded-xl p-6 border border-blue-300 hover:border-blue-400 transition-colors">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    {selectedPerson.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedPerson.name}</h2>
                    <p className="text-blue-600 font-medium flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Family Member
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedPerson(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-colors border border-blue-300 hover:border-blue-400"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Family
                  </button>
                  <button
                    onClick={() => handleDeletePerson(selectedPerson.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors border border-red-300 hover:border-red-400"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove Member
                  </button>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-xl border border-blue-300 hover:border-blue-400 transition-colors">
              <div className="p-6 border-b border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Documents</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {documents.length}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {documentsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-300 border-t-blue-600 mb-3"></div>
                      <p className="text-blue-600 font-medium">Loading documents...</p>
                    </div>
                  </div>
                ) : documents.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-blue-200 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h4 className="text-lg font-medium text-gray-600 mb-2">No documents yet</h4>
                    <p className="text-gray-500">Upload your first PDF document using the form below</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {documents.map(doc => (
                      <div
                        key={doc.id}
                        className="group bg-blue-50 rounded-xl p-4 border border-blue-300 hover:border-blue-400 hover:bg-blue-100 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-gray-800 truncate" title={doc.name}>
                                {doc.name}
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">
                                {doc.uploadedAt?.seconds
                                  ? new Date(doc.uploadedAt.seconds * 1000).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
                                    })
                                  : ""}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200"
                            title="Delete document"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener"
                          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          View PDF
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Upload Section */}
            <div className="bg-white rounded-xl p-6 border border-blue-300 hover:border-blue-400 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Upload New Document</h3>
                  <p className="text-blue-600 mb-4">
                    Add a new PDF document for <span className="font-semibold">{selectedPerson.name}</span>
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-300">
                    <DocumentUpload
                      uid={user.uid}
                      personId={selectedPerson.id}
                      onUpload={async () => {
                        setDocumentsLoading(true);
                        setDocuments(
                          await getDocumentsForPerson(user.uid, selectedPerson.id)
                        );
                        setDocumentsLoading(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Family Members Grid View */
          <div className="space-y-6">
            {/* Add Member Form */}
            <div className="bg-white rounded-xl p-6 border border-blue-300 hover:border-blue-400 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Add Family Member</h3>
              </div>
              <form onSubmit={handleAddPerson} className="flex gap-3">
                <input
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder="Enter family member's name"
                  required
                  className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors bg-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Member
                </button>
              </form>
            </div>

            {/* Family Members Grid */}
            <div className="bg-white rounded-xl border border-blue-300 hover:border-blue-400 transition-colors">
              <div className="p-6 border-b border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Your Family</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {persons.length}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {personsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-300 border-t-blue-600 mb-3"></div>
                      <p className="text-blue-600 font-medium">Loading family members...</p>
                    </div>
                  </div>
                ) : persons.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-blue-200 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h4 className="text-lg font-medium text-gray-600 mb-2">No family members yet</h4>
                    <p className="text-gray-500">Add your first family member to get started</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {persons.map((person) => (
                      <div
                        key={person.id}
                        onClick={() => handlePersonClick(person)}
                        className="group bg-blue-50 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:bg-blue-100 border border-blue-300 hover:border-blue-400"
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 transition-all duration-200">
                            {person.name?.[0]?.toUpperCase() ?? "?"}
                          </div>
                          <h4 className="font-bold text-lg text-gray-800 mb-1">
                            {person.name}
                          </h4>
                          <p className="text-blue-600 font-medium text-sm flex items-center justify-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Family Member
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}