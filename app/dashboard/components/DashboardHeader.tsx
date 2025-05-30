"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface DashboardHeaderProps {
  user: any;
  selectedPerson: any;
}

export default function DashboardHeader({ user, selectedPerson }: DashboardHeaderProps) {
  return (
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
          className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-blue-50 text-blue-700 rounded-lg font-medium transition-colors border border-blue-300 hover:border-blue-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
}