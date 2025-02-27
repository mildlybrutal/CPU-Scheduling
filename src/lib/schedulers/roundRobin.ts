import { Process, GanttBlock, SchedulingResult } from "../types/types";

export const roundRobin = (
    processes: Process[],
    timeQuantum: number
): SchedulingResult => {
    // Create a deep copy of processes to avoid modifying the original array
    const remainingProcesses = processes.map((p) => ({
        ...p,
        remainingTime: p.burstTime,
    }));

    const timeline: GanttBlock[] = [];
    let currentTime = 0;
    let completed = 0;
    let queue: typeof remainingProcesses = [];
    let prevProcess: (typeof remainingProcesses)[0] | null = null;

    // Find minimum arrival time
    const minArrivalTime = Math.min(...processes.map((p) => p.arrivalTime));
    currentTime = minArrivalTime;

    while (completed < processes.length) {
        // Add newly arrived processes to queue
        const newArrivals = remainingProcesses.filter(
            (p) =>
                p.arrivalTime <= currentTime &&
                p.remainingTime > 0 &&
                !queue.some((qp) => qp.id === p.id)
        );
        queue = [...queue, ...newArrivals];

        if (queue.length === 0) {
            currentTime++;
            continue;
        }

        // Get the next process from queue
        const currentProcess = queue.shift()!;
        const executeTime = Math.min(timeQuantum, currentProcess.remainingTime);

        // Update timeline
        if (prevProcess?.id !== currentProcess.id) {
            timeline.push({
                processId: currentProcess.id,
                processName: currentProcess.name,
                startTime: currentTime,
                endTime: currentTime + executeTime,
                color: currentProcess.color,
            });
        } else {
            // Merge with previous block if it's the same process
            const lastBlock = timeline[timeline.length - 1];
            lastBlock.endTime = currentTime + executeTime;
        }

        currentTime += executeTime;
        const processIndex = remainingProcesses.findIndex(
            (p) => p.id === currentProcess.id
        );
        remainingProcesses[processIndex].remainingTime -= executeTime;

        // If process is not finished, add it back to queue
        if (remainingProcesses[processIndex].remainingTime > 0) {
            // Check for any processes that arrived during execution
            const arrivedDuringExecution = remainingProcesses.filter(
                (p) =>
                    p.arrivalTime > currentTime - executeTime &&
                    p.arrivalTime <= currentTime &&
                    p.remainingTime > 0 &&
                    !queue.some((qp) => qp.id === p.id) &&
                    p.id !== currentProcess.id
            );
            queue = [
                ...queue,
                ...arrivedDuringExecution,
                remainingProcesses[processIndex],
            ];
        } else {
            // Process is completed
            const process = processes.find((p) => p.id === currentProcess.id)!;
            process.endTime = currentTime;
            process.startTime =
                timeline.find((t) => t.processId === process.id)?.startTime ??
                0;
            process.waitingTime =
                currentTime - process.arrivalTime - process.burstTime;
            process.turnaroundTime = currentTime - process.arrivalTime;
            completed++;
        }

        prevProcess = remainingProcesses[processIndex];
    }

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
