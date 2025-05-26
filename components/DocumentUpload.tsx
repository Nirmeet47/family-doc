"use client";
import { useState } from "react";
import { uploadDocumentForPerson } from "@/lib/firestoreHelpers";

export default function DocumentUpload({
  uid,
  personId,
  onUpload,
}: {
  uid: string;
  personId: string;
  onUpload: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [pdfName, setPdfName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }
    if (!pdfName.trim()) {
      setError("Please enter a document name.");
      return;
    }
    setUploading(true);
    try {
      await uploadDocumentForPerson(uid, personId, file, pdfName.trim());
      setFile(null);
      setPdfName("");
      onUpload();
    } catch (err: any) {
      setError("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 items-center mt-4"
    >
      <input
        type="text"
        placeholder="Document name"
        className="px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        value={pdfName}
        onChange={e => setPdfName(e.target.value)}
        required
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className="px-2 py-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-60"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>
      {error && <div className="text-red-500 text-sm ml-2">{error}</div>}
    </form>
  );
}