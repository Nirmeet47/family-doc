"use client";

import { useState } from "react";

interface AddPersonFormProps {
  onAddPerson: (name: string) => void;
}

export default function AddPersonForm({ onAddPerson }: AddPersonFormProps) {
  const [personName, setPersonName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!personName.trim()) return;
    await onAddPerson(personName);
    setPersonName("");
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-blue-300 hover:border-blue-400 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Add Family Member</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-3">
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
  );
}