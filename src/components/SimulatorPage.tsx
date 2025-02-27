import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SimulatorPage = () => {
    return (
        <div className="min-h-screen bg-sky-950 p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Title */}
                <h1 className="text-4xl font-bold text-white text-center mb-12">
                    Simulator
                </h1>

                {/* Config Section */}
                <Card className="bg-sky-900 border-sky-800">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">
                            Config
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-sky-200 block mb-2">
                                    Algorithm
                                </label>
                                <select className="w-full max-w-xs bg-sky-800 border-sky-700 text-white rounded-md p-2 focus:ring-2 focus:ring-sky-400">
                                    <option>First Come First Serve</option>
                                    <option>Shortest Job First</option>
                                    <option>Round Robin</option>
                                    <option>Priority</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Processes Section */}
                <Card className="bg-sky-900 border-sky-800">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-2xl text-white">
                            Processes
                        </CardTitle>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                            Add Process
                        </button>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-sky-200 border-b border-sky-800">
                                        <th className="text-left p-4">Name</th>
                                        <th className="text-left p-4">
                                            Burst Time
                                        </th>
                                        <th className="text-left p-4">
                                            Arrival Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-white">
                                    <tr className="border-b border-sky-800">
                                        <td className="p-4">
                                            <input
                                                type="text"
                                                className="bg-sky-800 border-sky-700 rounded p-2 w-full text-white placeholder-sky-400"
                                                placeholder="P1"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <input
                                                type="number"
                                                className="bg-sky-800 border-sky-700 rounded p-2 w-full text-white placeholder-sky-400"
                                                placeholder="0"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <input
                                                type="number"
                                                className="bg-sky-800 border-sky-700 rounded p-2 w-full text-white placeholder-sky-400"
                                                placeholder="0"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Gantt Chart Section */}
                <Card className="bg-sky-900 border-sky-800">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">
                            Gantt Chart
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-32 bg-sky-800 rounded-lg"></div>
                    </CardContent>
                </Card>

                {/* Metrics Section */}
                <Card className="bg-sky-900 border-sky-800">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">
                            Metrics
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4 text-white">
                            <div>
                                <p className="text-sky-200">Waiting Time</p>
                                <p className="text-2xl">0ms</p>
                            </div>
                            <div>
                                <p className="text-sky-200">Turnaround</p>
                                <p className="text-2xl">0ms</p>
                            </div>
                            <div>
                                <p className="text-sky-200">CPU Utilization</p>
                                <p className="text-2xl">0%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Control Buttons */}
                <div className="flex justify-center gap-4">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-md text-lg transition-colors">
                        Run
                    </button>
                    <button className="bg-sky-700 hover:bg-sky-600 text-white px-8 py-3 rounded-md text-lg transition-colors">
                        Stop
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SimulatorPage;
