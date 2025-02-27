"use client";

import React from 'react';
import ProcessForm from '@/components/ProcessForm';
import GanttChart from '@/components/GanttChart';
import MetricsDisplay from '@/components/MetricsDisplay';
import SimulationControls from '@/components/SimulationControls';

export default function SimulatorPage() {
  return (
    <main className="min-h-screen p-4 bg-gray-900">
      <div className="container mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-gray-100 mb-8">
          CPU Scheduling Simulator
        </h1>
        <div className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <h2 className="text-xl text-gray-200 mb-2">How it works:</h2>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>Add processes with their burst time and arrival time</li>
            <li>The simulator uses First Come First Serve (FCFS) algorithm</li>
            <li>Click "Run Simulation" to see the scheduling visualization</li>
            <li>The Gantt chart will show process execution order</li>
            <li>Performance metrics will display at the bottom</li>
          </ol>
        </div>
        <ProcessForm />
        <SimulationControls />
        <GanttChart />
        <MetricsDisplay />
      </div>
    </main>
  );
} 