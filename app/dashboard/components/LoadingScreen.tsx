"use client";

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-300 border-t-blue-600 mb-4"></div>
        <p className="text-blue-700 font-medium">Loading your dashboard...</p>
      </div>
    </div>
  );
}