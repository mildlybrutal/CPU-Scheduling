"use client";

import Link from 'next/link';

export function SimulatorButton({ algorithm }: { algorithm: string }) {
  return (
    <div className="my-8">
      <Link 
        href={`/simulator/`}
        className="inline-flex items-center px-5 py-2.5 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium gap-2"
      >
        Try {algorithm.toUpperCase()} Simulator →
      </Link>
    </div>
  );
} 