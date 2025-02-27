import { Process, SchedulingResult } from "../types/types";

interface SchedulerState {
    processes: Process[];
    timeline: SchedulingResult["timeline"];
    currentTime: number;
}

export function calculateMetrics(schedulerState: SchedulerState) {
    const { processes, timeline, currentTime } = schedulerState;

    // Calculate busy time (time CPU was processing)
    const busyTime = timeline.reduce(
        (sum, block) => sum + (block.endTime - block.startTime),
        0
    );

    // Calculate CPU utilization
    const cpuUtilization = (busyTime / currentTime) * 100;

    // Calculate waiting times and turnaround times
    const metrics = processes.map((process) => {
        const processTimes = timeline.filter(
            (block) => block.processId === process.id
        );
        const startTime = processTimes[0]?.startTime ?? 0;
        const endTime =
            processTimes[processTimes.length - 1]?.endTime ?? currentTime;

        const waitingTime = endTime - process.arrivalTime - process.burstTime;
        const turnaroundTime = endTime - process.arrivalTime;
        const responseTime = startTime - process.arrivalTime;

        return {
            processId: process.id,
            waitingTime: Math.max(0, waitingTime),
            turnaroundTime: Math.max(0, turnaroundTime),
            responseTime: Math.max(0, responseTime),
        };
    });

    // Calculate averages
    const averageWaitingTime =
        metrics.reduce((sum, m) => sum + m.waitingTime, 0) / processes.length;

    const averageTurnaroundTime =
        metrics.reduce((sum, m) => sum + m.turnaroundTime, 0) /
        processes.length;

    const averageResponseTime =
        metrics.reduce((sum, m) => sum + m.responseTime, 0) / processes.length;

    // Calculate throughput (processes completed per unit time)
    const throughput = processes.length / currentTime;

    // Count context switches (number of timeline blocks minus 1)
    const contextSwitches = Math.max(0, timeline.length - 1);

    return {
        processMetrics: metrics,
        averageWaitingTime,
        averageTurnaroundTime,
        averageResponseTime,
        cpuUtilization,
        throughput,
        contextSwitches,
        totalTime: currentTime,
        busyTime,
    };
}
