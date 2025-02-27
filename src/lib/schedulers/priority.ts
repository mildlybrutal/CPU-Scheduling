import { Process, SchedulingResult, GanttBlock } from "../types/types";

export const priorityScheduling = (
    processes: Process[],
    preemptive: boolean
): SchedulingResult => {
    // Create a deep copy of processes
    const remainingProcesses = processes.map((p) => ({
        ...p,
        remainingTime: p.burstTime,
        priority: p.priority ?? 0, // Use null coalescing instead of OR
    }));

    const timeline: GanttBlock[] = [];
    // Start from minimum arrival time
    const minArrivalTime = Math.min(...processes.map(p => p.arrivalTime));
    let currentTime = minArrivalTime;
    let completed = 0;
    let prevProcess: Process | null = null;

    while (completed < processes.length) {
        const availableProcesses = remainingProcesses.filter(
            (p) => p.arrivalTime <= currentTime && p.remainingTime > 0
        );

        if (availableProcesses.length === 0) {
            currentTime++;
            continue;
        }

        const highestPriorityProcess = availableProcesses.reduce((prev, curr) => {
            if (prev.priority === curr.priority) {
                // If priorities are equal, choose the one that arrived first
                // If arrival times are equal, choose the one with shorter burst time
                return prev.arrivalTime === curr.arrivalTime
                    ? (prev.burstTime <= curr.burstTime ? prev : curr)
                    : (prev.arrivalTime <= curr.arrivalTime ? prev : curr);
            }
            return prev.priority > curr.priority ? prev : curr;
        });

        // Only switch process if preemptive or previous process finished
        if (!preemptive && prevProcess?.remainingTime > 0) {
            continue;
        }

        if (prevProcess?.id !== highestPriorityProcess.id) {
            timeline.push({
                processId: highestPriorityProcess.id,
                processName: highestPriorityProcess.name,
                startTime: currentTime,
                endTime: currentTime + 1,
                color: highestPriorityProcess.color,
            });
        } else {
            const lastBlock = timeline[timeline.length - 1];
            if (lastBlock) {
                lastBlock.endTime = currentTime + 1;
            }
        }

        const processIndex = remainingProcesses.findIndex(
            p => p.id === highestPriorityProcess.id
        );
        remainingProcesses[processIndex].remainingTime--;
        currentTime++;

        if (remainingProcesses[processIndex].remainingTime === 0) {
            const process = processes.find(
                (p) => p.id === highestPriorityProcess.id
            );
            if (process) {
                process.endTime = currentTime;
                process.startTime = timeline.find(
                    (t) => t.processId === process.id
                )?.startTime ?? currentTime;
                process.waitingTime =
                    currentTime - process.arrivalTime - process.burstTime;
                process.turnaroundTime = currentTime - process.arrivalTime;
                completed++;
            }
        }

        prevProcess = highestPriorityProcess;
    }

    // Calculate metrics
    const averageWaitingTime =
        processes.reduce(
            (sum, process) => sum + (process.waitingTime ?? 0),
            0
        ) / processes.length;

    const averageTurnaroundTime =
        processes.reduce(
            (sum, process) => sum + (process.turnaroundTime ?? 0),
            0
        ) / processes.length;

    const totalTime = currentTime - minArrivalTime;
    const busyTime = timeline.reduce(
        (sum, block) => sum + (block.endTime - block.startTime),
        0
    );
    const cpuUtilization = (busyTime / totalTime) * 100;

    return {
        timeline,
        averageWaitingTime,
        averageTurnaroundTime,
        cpuUtilization,
    };
};
