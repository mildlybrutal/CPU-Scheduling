"use client";

import React, { createContext, useContext, useState } from 'react';
import { Process } from '@/lib/types/types';

interface SchedulingContextType {
    processes: Process[];
    setProcesses: (processes: Process[]) => void;
    schedulingResult: any | null;
    setSchedulingResult: (result: any) => void;
    metrics: any | null;
}

const SchedulingContext = createContext<SchedulingContextType | undefined>(undefined);

export function SchedulingProvider({ children }: { children: React.ReactNode }) {
    const [processes, setProcesses] = useState<Process[]>([]);
    const [schedulingResult, setSchedulingResult] = useState<any | null>(null);
    const [metrics, setMetrics] = useState<any | null>(null);

    return (
        <SchedulingContext.Provider value={{
            processes,
            setProcesses,
            schedulingResult,
            setSchedulingResult,
            metrics,
        }}>
            {children}
        </SchedulingContext.Provider>
    );
}

export function useScheduling() {
    const context = useContext(SchedulingContext);
    if (context === undefined) {
        throw new Error('useScheduling must be used within a SchedulingProvider');
    }
    return context;
}
