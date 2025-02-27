import { Process, SchedulingResult } from './types/types';
import { fcfs } from './schedulers/fcfs';
import { sjf } from './schedulers/sjf';
import { roundRobin } from './schedulers/roundRobin';
import { priorityScheduling } from './schedulers/priority';

export type SchedulerConfig = {
    algorithm: "FCFS" | "SJF" | "RR" | "Priority";
    timeQuantum?: number;
    preemptive?: boolean;
};

export const runScheduler = (processes: Process[], config: SchedulerConfig): SchedulingResult => {
    switch (config.algorithm) {
        case "FCFS":
            return fcfs(processes);
        case "SJF":
            return sjf(processes, config.preemptive || false);
        case "RR":
            if (!config.timeQuantum) {
                throw new Error("Time quantum is required for Round Robin scheduling");
            }
            return roundRobin(processes, config.timeQuantum);
        case "Priority":
            return priorityScheduling(processes, config.preemptive || false);
        default:
            throw new Error(`Unknown scheduling algorithm: ${config.algorithm}`);
    }
};
