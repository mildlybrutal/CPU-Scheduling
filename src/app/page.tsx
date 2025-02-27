"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="text-center space-y-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-white mb-4"
        >
          CPU Scheduler
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 mb-8"
        >
          Visualize and understand CPU scheduling algorithms
        </motion.p>
        
        <div className="flex gap-4 justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/simulator"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 inline-block"
            >
              Try Simulator
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/docs"
              className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 inline-block"
            >
              Documentation
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}