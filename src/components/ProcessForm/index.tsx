"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Trash2 } from "lucide-react";
import { useScheduling } from "@/context/SchedulingContext";
import { Process } from "@/lib/types/types";

import { SchedulerConfig, runScheduler } from "@/lib/schedulingController";

const ProcessForm = () => {
    const { processes, setProcesses, setSchedulingResult } = useScheduling();
    const [config, setConfig] = useState<SchedulerConfig>({
        algorithm: "FCFS",
        timeQuantum: 2,
        preemptive: false,
    });

    const handleSchedule = () => {
        try {
            const result = runScheduler(processes, config);
            setSchedulingResult(result);
        } catch (error) {
            console.error("Scheduling error:", error);
        }
    };

    const addProcess = () => {
        const newProcess: Process = {
            id: Date.now().toString(),
            name: `P${processes.length + 1}`,
            arrivalTime: 0,
            burstTime: 1,
            priority: 1,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`,
            remainingTime: 1,
            status: "ready",
        };
        setProcesses([...processes, newProcess]);
    };

    const removeProcess = (id: string) => {
        setProcesses(processes.filter((p) => p.id !== id));
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
            {/* Algorithm Selection */}
            <div className="bg-sky-900/50 backdrop-blur-sm rounded-lg shadow-lg border border-sky-800/50 p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">
                    Scheduler Configuration
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-sky-200">
                            Algorithm
                        </label>
                        <select
                            className="w-full bg-sky-800/50 border border-sky-700/50 rounded-md p-2 text-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                            value={config.algorithm}
                            onChange={(e) =>
                                setConfig({
                                    ...config,
                                    algorithm: e.target
                                        .value as SchedulerConfig["algorithm"],
                                })
                            }
                        >
                            <option value="FCFS">First Come First Serve</option>
                            <option value="SJF">Shortest Job First</option>
                            <option value="RR">Round Robin</option>
                            <option value="Priority">
                                Priority Scheduling
                            </option>
                        </select>
                    </div>

                    {config.algorithm === "RR" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full"
                        >
                            <label className="block text-sm font-medium mb-1">
                                Time Quantum
                            </label>
                            <input
                                type="number"
                                min="1"
                                className="w-full bg-sky-800/50 border border-sky-700/50 rounded-md p-2 text-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                value={config.timeQuantum}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        timeQuantum: parseInt(e.target.value),
                                    })
                                }
                            />
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Process List */}
            <div className="bg-sky-900/50 backdrop-blur-sm rounded-lg shadow-lg border border-sky-800/50 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-sky-50 font-semibold">Processes</h2>
                    <div className="flex gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-sky-500 text-sky-50 px-4 py-2 rounded-md hover:bg-sky-400 hover:text-sky-900 transition-colors"
                            onClick={addProcess}
                        >
                            <PlusCircle className="w-4 h-4" />
                            Add Process
                        </motion.button>
                    </div>
                </div>

                <div className="space-y-4">
                    {processes.map((process) => (
                        <motion.div
                            key={process.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-5 gap-4 items-center p-4 border border-sky-800/50 rounded-lg bg-sky-900/30"
                        >
                            <div>
                                <label className="block text-sm text-sky-50  font-medium mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-sky-800/50 border border-sky-700/50 rounded-md p-2 text-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                    value={process.name}
                                    onChange={(e) => {
                                        const updatedProcesses = processes.map(
                                            (p) =>
                                                p.id === process.id
                                                    ? {
                                                          ...p,
                                                          name: e.target.value,
                                                      }
                                                    : p
                                        );
                                        setProcesses(updatedProcesses);
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-sky-50 ">
                                    Arrival Time
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full bg-sky-800/50 border border-sky-700/50 rounded-md p-2 text-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                    value={process.arrivalTime}
                                    onChange={(e) => {
                                        const updatedProcesses = processes.map(
                                            (p) =>
                                                p.id === process.id
                                                    ? {
                                                          ...p,
                                                          arrivalTime: parseInt(
                                                              e.target.value
                                                          ),
                                                      }
                                                    : p
                                        );
                                        setProcesses(updatedProcesses);
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-sky-50 ">
                                    Burst Time
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    className="w-full bg-sky-800/50 border border-sky-700/50 rounded-md p-2 text-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                    value={process.burstTime}
                                    onChange={(e) => {
                                        const updatedProcesses = processes.map(
                                            (p) =>
                                                p.id === process.id
                                                    ? {
                                                          ...p,
                                                          burstTime: parseInt(
                                                              e.target.value
                                                          ),
                                                      }
                                                    : p
                                        );
                                        setProcesses(updatedProcesses);
                                    }}
                                />
                            </div>

                            {config.algorithm === "Priority" && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Priority
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full bg-sky-800/50 border border-sky-700/50 rounded-md p-2 text-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                        value={process.priority}
                                        onChange={(e) => {
                                            const updatedProcesses =
                                                processes.map((p) =>
                                                    p.id === process.id
                                                        ? {
                                                              ...p,
                                                              priority:
                                                                  parseInt(
                                                                      e.target
                                                                          .value
                                                                  ),
                                                          }
                                                        : p
                                                );
                                            setProcesses(updatedProcesses);
                                        }}
                                    />
                                </div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center gap-2 bg-red-500/50 hover:bg-red-400 text-sky-50 px-3 py-2 rounded-md transition-colors"
                                onClick={() => removeProcess(process.id)}
                            >
                                <Trash2 className="w-5 h-5" />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProcessForm;
