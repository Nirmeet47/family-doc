'use client';

import { useRef, useState } from 'react';
import { storage } from '@/lib/firebase'; // Make sure this is exported in your firebase.ts!
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDocumentForPerson } from '@/lib/firestoreHelpers';

export default function DocumentUpload({
  uid,
  personId,
  onUpload,
}: {
  uid: string,
  personId: string,
  onUpload: () => void,
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!fileRef.current?.files?.[0]) {
      setError('Please select a PDF file.');
      return;
    }

    const file = fileRef.current.files[0];

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }

    setUploading(true);

    try {
      // Construct a unique file path in storage
      const filePath = `users/${uid}/persons/${personId}/documents/${Date.now()}_${file.name}`;
      const fileStorageRef = storageRef(storage, filePath);

      // Upload the PDF
      await uploadBytes(fileStorageRef, file);

      // Get download URL
      const url = await getDownloadURL(fileStorageRef);

      // Save metadata in Firestore
      await addDocumentForPerson(uid, personId, {
        name: file.name,
        url,
      });

      // Clear file input & call callback
      if (fileRef.current) fileRef.current.value = '';
      setSuccess('PDF uploaded!');
      onUpload();
    } catch (err: any) {
      setError('Failed to upload PDF. Please try again.');
      console.error(err);
    }
    setUploading(false);
  }

  return (
    <form onSubmit={handleUpload} className="mt-6 flex gap-2 items-center">
      <input
        type="file"
        accept="application/pdf"
        ref={fileRef}
        required
        className="border rounded px-2 py-1"
      />
      <button
        type="submit"
        disabled={uploading}
        className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        {uploading ? 'Uploading...' : 'Upload PDF'}
      </button>
      {error && <span className="text-red-500 ml-3">{error}</span>}
      {success && <span className="text-green-600 ml-3">{success}</span>}
    </form>
  );
}