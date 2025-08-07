'use client';

import { motion } from 'framer-motion';
import { Cpu, Wifi, Bluetooth, Radio } from 'lucide-react';

export default function CircuitBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 10 10 L 90 10 L 90 90 L 10 90 Z" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1"/>
            <circle cx="10" cy="10" r="2" fill="rgba(6, 182, 212, 0.5)"/>
            <circle cx="90" cy="90" r="2" fill="rgba(6, 182, 212, 0.5)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)"/>
      </svg>

      {/* IoT Devices */}
      <motion.div
        className="absolute top-1/4 left-1/4"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="bg-cyan-500/20 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/30">
          <Radio className="w-8 h-8 text-cyan-400 mb-2" />
          <div className="text-xs text-cyan-300 font-mono">Smart Ear</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/6"
        animate={{ 
          y: [0, 10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="bg-cyan-500/20 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/30">
          <Cpu className="w-8 h-8 text-cyan-400 mb-2" />
          <div className="text-xs text-cyan-300 font-mono">Wheelchair</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/3"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 3, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="bg-cyan-500/20 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/30">
          <Wifi className="w-8 h-8 text-cyan-400 mb-2" />
          <div className="text-xs text-cyan-300 font-mono">Biogas Monitor</div>
        </div>
      </motion.div>

      {/* Connection Lines */}
      <motion.svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 1 }}
      >
        <motion.path
          d="M 250 250 Q 400 200 300 500 Q 200 600 350 750"
          fill="none"
          stroke="rgba(6, 182, 212, 0.6)"
          strokeWidth="2"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, -10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.svg>
    </div>
  );
}
