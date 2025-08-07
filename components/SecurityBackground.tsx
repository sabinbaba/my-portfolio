'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, AlertTriangle, Eye } from 'lucide-react';

export default function SecurityBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Network Grid */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
        <defs>
          <pattern id="security-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(244, 63, 94, 0.2)" strokeWidth="1"/>
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#security-grid)"/>
      </svg>

      {/* Security Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="bg-rose-500/20 backdrop-blur-sm rounded-lg p-4 border border-rose-400/30">
          <Shield className="w-8 h-8 text-rose-400 mb-2" />
          <div className="text-xs text-rose-300 font-mono">Firewall</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-1/6"
        animate={{ 
          y: [0, -8, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="bg-rose-500/20 backdrop-blur-sm rounded-lg p-4 border border-rose-400/30">
          <AlertTriangle className="w-8 h-8 text-rose-400 mb-2" />
          <div className="text-xs text-rose-300 font-mono">Threat Detection</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/3"
        animate={{ 
          scale: [1, 0.9, 1],
          opacity: [1, 0.6, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <div className="bg-rose-500/20 backdrop-blur-sm rounded-lg p-4 border border-rose-400/30">
          <Eye className="w-8 h-8 text-rose-400 mb-2" />
          <div className="text-xs text-rose-300 font-mono">Monitoring</div>
        </div>
      </motion.div>

      {/* Attack Vectors */}
      <motion.svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.path
          d="M 800 200 L 600 400 L 700 600"
          fill="none"
          stroke="rgba(244, 63, 94, 0.8)"
          strokeWidth="3"
          strokeDasharray="10,5"
          animate={{ strokeDashoffset: [0, -15] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          filter="url(#glow)"
        />
        <motion.circle
          cx="800"
          cy="200"
          r="4"
          fill="rgba(244, 63, 94, 1)"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.svg>
    </div>
  );
}
