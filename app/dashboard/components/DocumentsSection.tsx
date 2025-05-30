"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";

interface DocumentsSectionProps {
  documents: any[];
  documentsLoading: boolean;
  onDeleteDocument: (documentId: string) => void;
}

export default function DocumentsSection({
  documents,
  documentsLoading,
  onDeleteDocument,
}: DocumentsSectionProps) {
  // State for search and sort order
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sortOptions = [
    { value: "desc", label: "Newest first", icon: "↓" },
    { value: "asc", label: "Oldest first", icon: "↑" }
  ];

  const currentOption = sortOptions.find(option => option.value === sortOrder);

  // Memoize filtered and sorted documents for performance
  const filteredDocuments = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    let filtered = documents;

    if (search) {
      filtered = filtered.filter((doc) =>
        doc.name?.toLowerCase().includes(search)
      );
    }

    filtered = filtered.slice().sort((a, b) => {
      const aDate =
        a.uploadedAt?.seconds ??
        (a.uploadedAt instanceof Date
          ? a.uploadedAt.getTime() / 1000
          : 0);
      const bDate =
        b.uploadedAt?.seconds ??
        (b.uploadedAt instanceof Date
          ? b.uploadedAt.getTime() / 1000
          : 0);

      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    });

    return filtered;
  }, [documents, searchTerm, sortOrder]);

  return (
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
        {/* Search and Sort Controls */}
        <div className="flex flex-col md:flex-row gap-3 mb-4 items-stretch md:items-center">
          <input
            type="text"
            placeholder="Search documents"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors bg-white"
            aria-label="Search documents"
          />
          
          {/* Custom Animated Dropdown */}
          <div className="relative md:w-48" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 bg-white flex items-center justify-between ${
                isDropdownOpen 
                  ? 'border-blue-400 ring-2 ring-blue-400 shadow-lg' 
                  : 'border-blue-300 hover:border-blue-400'
              }`}
              aria-label="Sort by date"
              aria-expanded={isDropdownOpen}
            >
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-medium">{currentOption?.icon}</span>
                <span className="text-gray-700">{currentOption?.label}</span>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 right-0 mt-1 bg-white border border-blue-300 rounded-lg shadow-xl z-50 overflow-hidden transition-all duration-200 origin-top ${
              isDropdownOpen 
                ? 'opacity-100 scale-y-100 translate-y-0' 
                : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
            }`}>
              {sortOptions.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortOrder(option.value as "asc" | "desc");
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 flex items-center gap-2 ${
                    sortOrder === option.value 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:text-blue-600'
                  } ${index === 0 ? 'border-b border-blue-100' : ''}`}
                  style={{
                    transitionDelay: isDropdownOpen ? `${index * 50}ms` : '0ms'
                  }}
                >
                  <span className={`font-medium ${
                    sortOrder === option.value ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {option.icon}
                  </span>
                  <span>{option.label}</span>
                  {sortOrder === option.value && (
                    <svg 
                      className="w-4 h-4 text-blue-600 ml-auto" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {documentsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-300 border-t-blue-600 mb-3"></div>
              <p className="text-blue-600 font-medium">Loading documents...</p>
            </div>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-blue-200 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h4 className="text-lg font-medium text-gray-600 mb-2">No documents found</h4>
            <p className="text-gray-500">Try a different search or upload your first PDF document using the form below</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="group bg-white rounded-xl p-4 border border-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
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
                          : doc.uploadedAt instanceof Date
                            ? doc.uploadedAt.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })
                            : ""}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteDocument(doc.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-red-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
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
  );
}