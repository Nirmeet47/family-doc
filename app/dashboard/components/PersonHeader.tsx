"use client";

interface PersonHeaderProps {
  selectedPerson: any;
  onBack: () => void;
  onDeletePerson: (personId: string) => void;
}

export default function PersonHeader({ selectedPerson, onBack, onDeletePerson }: PersonHeaderProps) {
  return (
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
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-blue-50 text-blue-700 rounded-lg font-medium transition-colors border border-blue-300 hover:border-blue-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Family
          </button>
          <button
            onClick={() => onDeletePerson(selectedPerson.id)}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-red-50 text-red-600 rounded-lg font-medium transition-colors border border-red-300 hover:border-red-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remove Member
          </button>
        </div>
      </div>
    </div>
  );
}
