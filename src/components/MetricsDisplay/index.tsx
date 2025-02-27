"use client";

import React from "react";
import { useScheduling } from "@/context/SchedulingContext";
import { motion } from "framer-motion";

export default function MetricsDisplay() {
    const { schedulingResult } = useScheduling();

    if (!schedulingResult) {
        return (
            <div className="w-full max-w-4xl mx-auto p-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700 p-6">
                    <h2 className="text-xl font-semibold mb-4 text-slate-100">
                        Performance Metrics
                    </h2>
                    <p className="text-slate-300">
                        Run the simulation to see performance metrics
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700 p-6">
                <h2 className="text-xl font-semibold mb-6 text-slate-100">
                    Performance Metrics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-indigo-900/40 p-4 rounded-lg border border-indigo-700/50"
                    >
                        <p className="text-indigo-200 text-sm">Average Waiting Time</p>
                        <p className="text-2xl font-semibold text-indigo-100">
                            {schedulingResult.averageWaitingTime.toFixed(2)} ms
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-violet-900/40 p-4 rounded-lg border border-violet-700/50"
                    >
                        <p className="text-violet-200 text-sm">Average Turnaround Time</p>
                        <p className="text-2xl font-semibold text-violet-100">
                            {schedulingResult.averageTurnaroundTime.toFixed(2)} ms
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-fuchsia-900/40 p-4 rounded-lg border border-fuchsia-700/50"
                    >
                        <p className="text-fuchsia-200 text-sm">CPU Utilization</p>
                        <p className="text-2xl font-semibold text-fuchsia-100">
                            {schedulingResult.cpuUtilization.toFixed(2)}%
                        </p>
                    </motion.div>
                </div>

                {/* Process Details */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4 text-slate-100">Process Details</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-slate-600">
                                    <th className="pb-2 text-slate-300">Process</th>
                                    <th className="pb-2 text-slate-300">Waiting Time</th>
                                    <th className="pb-2 text-slate-300">Turnaround Time</th>
                                    <th className="pb-2 text-slate-300">Completion Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedulingResult.timeline.map((block: any) => (
                                    <tr key={block.processId} className="border-b border-slate-700/50">
                                        <td className="py-2 text-slate-100">{block.processName}</td>
                                        <td className="py-2 text-slate-300">{(block.endTime - block.startTime).toFixed(2)} ms</td>
                                        <td className="py-2 text-slate-300">{block.endTime.toFixed(2)} ms</td>
                                        <td className="py-2 text-slate-300">{block.endTime.toFixed(2)} ms</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
