"use client";
import { useState, useRef } from "react";
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      if (fileInputRef.current) fileInputRef.current.value = "";
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
      className="w-full flex flex-col md:flex-row md:items-center gap-4 mt-4"
    >
      {/* Document name input */}
      <input
        type="text"
        placeholder="Document name"
        className="w-56 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 transition text-blue-700 bg-white hover:border-blue-400 font-medium text-sm"
        value={pdfName}
        onChange={e => setPdfName(e.target.value)}
        required
        disabled={uploading}
      />

      {/* File upload button and file name */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={`w-56 px-3 py-2 rounded-lg border border-blue-300 font-medium text-blue-500 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 hover:border-blue-400 transition flex items-center justify-center ${
            uploading ? "opacity-60 pointer-events-none" : ""
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="mr-2 flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </span>
          {file ? "Change PDF" : "Choose PDF"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="absolute opacity-0 w-0 h-0"
          onChange={e => setFile(e.target.files?.[0] || null)}
          tabIndex={-1}
          disabled={uploading}
        />
        <span className="text-xs px-2 py-1 bg-white border hover:border-blue-400 border-blue-300 rounded-lg font-medium text-blue-500 min-w-[90px] max-w-[160px] text-ellipsis overflow-hidden whitespace-nowrap">
          {file ? file.name : <span className="text-gray-400">No file chosen</span>}
        </span>
      </div>

      {/* Upload button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold shadow transition disabled:opacity-50 text-sm flex items-center"
        disabled={uploading}
        style={{ minWidth: "128px" }}
      >
        <span className="mr-2 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>
      {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
    </form>
  );
}