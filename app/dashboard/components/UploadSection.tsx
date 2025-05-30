"use client";

import DocumentUpload from "@/components/DocumentUpload";

interface UploadSectionProps {
  user: any;
  selectedPerson: any;
  onUpload: () => void;
}

export default function UploadSection({ user, selectedPerson, onUpload }: UploadSectionProps) {
  return (
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
          <div className="bg-white rounded-lg p-4 border border-blue-300">
            <DocumentUpload
              uid={user.uid}
              personId={selectedPerson.id}
              onUpload={onUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}