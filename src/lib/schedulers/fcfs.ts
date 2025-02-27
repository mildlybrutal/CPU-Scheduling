import { Process, SchedulingResult } from "../types/types";
import { GanttBlock } from "../types/types";

export const fcfs = (processes: Process[]): SchedulingResult => {
    const sortedProcesses = [...processes].sort(
        (a, b) => a.arrivalTime - b.arrivalTime
    );
    const timeline: GanttBlock[] = [];
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    sortedProcesses.forEach((process) => {
        if (process.arrivalTime > currentTime) {
            currentTime = process.arrivalTime;
        }

        const waitingTime = currentTime - process.arrivalTime;
        const turnaroundTime = waitingTime + process.burstTime;

        timeline.push({
            processId: process.id,
            processName: process.name,
            startTime: currentTime,
            endTime: currentTime + process.burstTime,
            color: process.color,
        });

        totalWaitingTime += waitingTime;
        totalTurnaroundTime += turnaroundTime;
        currentTime += process.burstTime;
    });

    return {
        timeline,
        averageWaitingTime: totalWaitingTime / processes.length,
        averageTurnaroundTime: totalTurnaroundTime / processes.length,
        cpuUtilization:
            ((currentTime - timeline[0].startTime) / currentTime) * 100,
    };
};
