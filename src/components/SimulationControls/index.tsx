"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { useScheduling } from "@/context/SchedulingContext";
import { runScheduler } from "@/lib/schedulingController";

export default function SimulationControls() {
    const { processes, setSchedulingResult } = useScheduling();
    const [timeQuantum, setTimeQuantum] = React.useState<number>(2);
    const [preemptive, setPreemptive] = React.useState<boolean>(false);
    const [isSimulating, setIsSimulating] = React.useState<boolean>(false);
    const [currentStep, setCurrentStep] = React.useState<string>("");

    const runSimulation = async () => {
        if (processes.length === 0) {
            toast.error("Add some processes first!");
            return;
        }

        try {
            setIsSimulating(true);

            setCurrentStep("Sorting processes by arrival time...");
            await new Promise(resolve => setTimeout(resolve, 800));

            setCurrentStep("Calculating waiting times...");
            await new Promise(resolve => setTimeout(resolve, 800));

            setCurrentStep("Generating Gantt chart...");
            await new Promise(resolve => setTimeout(resolve, 800));

            const result = runScheduler(processes, {
                algorithm: "FCFS",
                timeQuantum,
                preemptive
            });

            setCurrentStep("Computing performance metrics...");
            await new Promise(resolve => setTimeout(resolve, 800));

            setSchedulingResult(result);
            toast.success("Simulation completed successfully!");
        } catch (error) {
            toast.error("Failed to run simulation: " + (error as Error).message);
        } finally {
            setIsSimulating(false);
            setCurrentStep("");
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 p-6">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors disabled:opacity-50"
                            onClick={runSimulation}
                            disabled={isSimulating}
                        >
                            <Play className="w-4 h-4" />
                            Run Simulation
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors"
                            onClick={() => {
                                setSchedulingResult(null);
                                setCurrentStep("");
                                setIsSimulating(false);
                                toast.info("Simulation reset");
                            }}
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset
                        </motion.button>
                    </div>
                    
                    {isSimulating && currentStep && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gray-300"
                        >
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></div>
                                {currentStep}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
}
