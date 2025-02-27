"use client";

import React, { useEffect, useRef } from 'react';
import { GanttBlock } from '@/lib/types/types';
import { motion } from 'framer-motion';

import { useScheduling } from '@/context/SchedulingContext';

export default function GanttChart() {
    const { schedulingResult } = useScheduling();
    const timeline = schedulingResult?.timeline || [];
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineEndTime = Math.max(...timeline.map(block => block.endTime));
    const timelineStartTime = Math.min(...timeline.map(block => block.startTime));
    const duration = timelineEndTime - timelineStartTime;

    const getBlockWidth = (block: GanttBlock) => {
        const blockDuration = block.endTime - block.startTime;
        return `${(blockDuration / duration) * 100}%`;
    };

    const getBlockOffset = (block: GanttBlock) => {
        return `${((block.startTime - timelineStartTime) / duration) * 100}%`;
    };

    const generateTimeMarkers = () => {
        const markers = [];
        const step = Math.ceil(duration / 10);
        for (let time = timelineStartTime; time <= timelineEndTime; time += step) {
            markers.push(
                <div
                    key={time}
                    className="absolute transform -translate-x-1/2"
                    style={{ left: `${((time - timelineStartTime) / duration) * 100}%` }}
                >
                    <div className="h-2 w-0.5 bg-gray-300" />
                    <div className="text-xs text-gray-500 mt-1">{time}</div>
                </div>
            );
        }
        return markers;
    };

    return (
        <div className="w-full p-4">
            <h2 className="text-lg font-semibold mb-4 text-sky-50 ">Gantt Chart</h2>
            <div className="relative" ref={containerRef}>
                {/* Time markers */}
                <div className="h-8 relative mb-2">
                    {generateTimeMarkers()}
                </div>

                {/* Gantt blocks */}
                <div className="relative h-12 bg-gray-100 rounded">
                    {timeline.map((block, index) => (
                        <motion.div
                            key={`${block.processId}-${block.startTime}`}
                            className="absolute h-full flex items-center justify-center text-white text-sm"
                            style={{
                                width: getBlockWidth(block),
                                left: getBlockOffset(block),
                                backgroundColor: block.color,
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="truncate px-2">
                                {block.processName}
                                {block.quantum && ` (Q${block.quantum})`}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Legend */}
                <div className="mt-4 flex flex-wrap gap-4">
                    {timeline
                        .filter((block, index, self) =>
                            index === self.findIndex(b => b.processId === block.processId)
                        )
                        .map(block => (
                            <div key={block.processId} className="flex items-center">
                                <div
                                    className="w-4 h-4 rounded"
                                    style={{ backgroundColor: block.color }}
                                />
                                <span className="ml-2 text-sm">{block.processName}</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}