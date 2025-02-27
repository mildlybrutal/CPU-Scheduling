export interface Process {
    id: string;
    name: string;
    arrivalTime: number;
    burstTime: number;
    priority?: number;
    remainingTime?: number;
    color: string;
    startTime?: number;
    endTime?: number;
    waitingTime?: number;
    turnaroundTime?: number;
    responseTime?: number;
    status?: "ready" | "running" | "completed";
}

export interface SchedulingResult {
    timeline: GanttBlock[];
    averageWaitingTime: number;
    averageTurnaroundTime: number;
    cpuUtilization: number;
    averageResponseTime?: number;
    contextSwitches?: number;
    throughput?: number;
}

export interface GanttBlock {
    processId: string;
    processName: string;
    startTime: number;
    endTime: number;
    color: string;
    quantum?: number;
}
