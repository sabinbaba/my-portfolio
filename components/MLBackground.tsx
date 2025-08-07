'use client';

import { motion } from 'framer-motion';
import { Brain, Cpu, Eye, BarChart3 } from 'lucide-react';

export default function MLBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Neural Network Grid */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
        <defs>
          <pattern id="neural-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="2" fill="rgba(147, 51, 234, 0.3)"/>
            <path d="M 40 40 L 80 40 M 40 40 L 40 80 M 40 40 L 80 80" stroke="rgba(147, 51, 234, 0.2)" strokeWidth="1"/>
          </pattern>
          <filter id="neural-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural-grid)"/>
      </svg>

      {/* ML Components */}
      <motion.div
        className="absolute top-1/4 left-1/4"
        animate={{ 
          y: [0, -15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="bg-purple-500/20 backdrop-blur-sm rounded-lg p-4 border border-purple-400/30">
          <Brain className="w-8 h-8 text-purple-400 mb-2" />
          <div className="text-xs text-purple-300 font-mono">Neural Network</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/6"
        animate={{ 
          y: [0, 12, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="bg-purple-500/20 backdrop-blur-sm rounded-lg p-4 border border-purple-400/30">
          <Eye className="w-8 h-8 text-purple-400 mb-2" />
          <div className="text-xs text-purple-300 font-mono">Computer Vision</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/3"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 2, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="bg-purple-500/20 backdrop-blur-sm rounded-lg p-4 border border-purple-400/30">
          <BarChart3 className="w-8 h-8 text-purple-400 mb-2" />
          <div className="text-xs text-purple-300 font-mono">Data Analytics</div>
        </div>
      </motion.div>

      {/* Neural Connections */}
      <motion.svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 1 }}
      >
        <motion.path
          d="M 250 250 Q 300 300 200 500 Q 150 600 350 750"
          fill="none"
          stroke="rgba(147, 51, 234, 0.6)"
          strokeWidth="2"
          strokeDasharray="3,3"
          animate={{ strokeDashoffset: [0, -6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          filter="url(#neural-glow)"
        />
        <motion.path
          d="M 150 400 Q 250 350 300 500 Q 350 550 250 700"
          fill="none"
          stroke="rgba(147, 51, 234, 0.4)"
          strokeWidth="1.5"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, -10] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
      </motion.svg>

      {/* Floating Data Points */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60"
          style={{
            left: `${20 + (i * 10)}%`,
            top: `${30 + (i * 8)}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2 + (i * 0.3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
