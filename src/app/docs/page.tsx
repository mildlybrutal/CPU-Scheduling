"use client";

import React from 'react';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <main className="min-h-screen p-4 bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="flex items-center mb-8">
          <Link 
            href="/"
            className="text-blue-400 hover:text-blue-300 mr-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white">Documentation</h1>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-gray-300">
            Documentation coming soon...
          </p>
        </div>
      </div>
    </main>
  );
} 