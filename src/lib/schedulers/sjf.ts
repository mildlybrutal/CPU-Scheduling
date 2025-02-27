import { Process, SchedulingResult, GanttBlock } from "../types/types";

export const sjf = (
    processes: Process[],
    preemptive: boolean
): SchedulingResult => {
    const remainingProcesses = processes.map((p) => ({
        ...p,
        remainingTime: p.burstTime,
    }));

    const timeline: GanttBlock[] = [];
    let currentTime = 0;
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

        const shortestJob = availableProcesses.reduce((prev, curr) => {
            if (preemptive) {
                return prev.remainingTime <= curr.remainingTime ? prev : curr;
            }
            return prev.burstTime <= curr.burstTime ? prev : curr;
        });

        if (prevProcess?.id !== shortestJob.id) {
            timeline.push({
                processId: shortestJob.id,
                processName: shortestJob.name,
                startTime: currentTime,
                endTime: currentTime + 1,
                color: shortestJob.color,
            });
        } else {
            timeline[timeline.length - 1].endTime = currentTime + 1;
        }

        shortestJob.remainingTime--;
        currentTime++;

        if (shortestJob.remainingTime === 0) {
            const process = processes.find((p) => p.id === shortestJob.id);
            if (process) {
                process.endTime = currentTime;
                process.startTime = timeline.find(
                    (t) => t.processId === process.id
                )?.startTime;
                process.waitingTime =
                    process.endTime - process.arrivalTime - process.burstTime;
                process.turnaroundTime = process.endTime - process.arrivalTime;
            }
            completed++;
        }

        prevProcess = shortestJob;
    }

    const averageWaitingTime =
        processes.reduce(
            (sum, process) => sum + (process.waitingTime || 0),
            0
        ) / processes.length;

    const averageTurnaroundTime =
        processes.reduce(
            (sum, process) => sum + (process.turnaroundTime || 0),
            0
        ) / processes.length;

    const totalTime = currentTime;
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
