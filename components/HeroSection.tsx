"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cpu, Terminal, Brain, ToggleRight } from "lucide-react";
import CircuitBackground from "./CircuitBackground";
import SecurityBackground from "./SecurityBackground";
import MLBackground from "./MLBackground";
import TerminalTyping from "./TerminalTyping";

interface HeroSectionProps {
  theme: "iot" | "security" | "ml";
  setTheme: (theme: "iot" | "security" | "ml") => void;
}

export default function HeroSection({ theme, setTheme }: HeroSectionProps) {
  const cycleTheme = () => {
    const themes: ("iot" | "security" | "ml")[] = ["iot", "security", "ml"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "iot":
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case "security":
        return <Shield className="w-5 h-5 text-rose-500" />;
      case "ml":
        return <Brain className="w-5 h-5 text-purple-400" />;
    }
  };

  const getThemeColor = () => {
    switch (theme) {
      case "iot":
        return "text-cyan-400";
      case "security":
        return "text-rose-500";
      case "ml":
        return "text-purple-400";
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {theme === "iot" ? (
            <motion.div
              key="iot-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <CircuitBackground />
            </motion.div>
          ) : theme === "security" ? (
            <motion.div
              key="security-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <SecurityBackground />
            </motion.div>
          ) : (
            <motion.div
              key="ml-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <MLBackground />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Enhanced Theme Toggle - More Visible */}
        <motion.div
          className="absolute top-6 right-6 flex items-center gap-3 bg-slate-800/90 backdrop-blur-md rounded-full p-3 shadow-lg border border-slate-700/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {getThemeIcon()}
          <button
            onClick={cycleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${
              theme === "iot"
                ? "bg-cyan-500/20 hover:bg-cyan-500/30"
                : theme === "security"
                ? "bg-rose-500/20 hover:bg-rose-500/30"
                : "bg-purple-500/20 hover:bg-purple-500/30"
            }`}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              key={theme}
              className="flex items-center justify-center"
            >
              <ToggleRight className={`w-6 h-6 ${getThemeColor()}`} />
            </motion.div>
          </button>
          <span className={`text-sm font-medium px-2 ${getThemeColor()}`}>
            {theme.toUpperCase()}
          </span>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8 w-full"
        >
          {/* Terminal */}
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg border border-slate-700 p-4 sm:p-6 font-mono text-left max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <Terminal className="w-4 h-4 text-slate-400 ml-2" />
              <span className="text-slate-400 text-sm">Sabin</span>
            </div>
            <TerminalTyping theme={theme} />
          </div>

          {/* Profile Picture - Extra Large Size */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div
                className={`w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full border-4 ${
                  theme === "iot"
                    ? "border-cyan-400"
                    : theme === "security"
                    ? "border-rose-500"
                    : "border-purple-400"
                } overflow-hidden bg-slate-800 shadow-2xl`}
              >
                <img
                  src="/sabin-profile.jpg"
                  alt="Sabin NTAKIRUTIMANA - Cyber Security & IoT Expert"
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: "50% 15%",
                    transform: "scale(1.2)",
                  }}
                />
              </div>

              {/* Animated ring */}
              <motion.div
                className={`absolute inset-0 rounded-full border-2 ${
                  theme === "iot"
                    ? "border-cyan-400/50"
                    : theme === "security"
                    ? "border-rose-500/50"
                    : "border-purple-400/50"
                }`}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Status indicator */}
              <div className="absolute bottom-6 right-6 w-8 h-8 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              Sabin's
              <span className={`block ${getThemeColor()}`}>
                {theme === "iot"
                  ? "Personal Portfolio"
                  : theme === "security"
                  ? "Cyber Security Lab"
                  : "AI/ML Research Lab"}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4">
              {theme === "iot"
                ? "Building intelligent IoT systems that bridge the physical and digital worlds with cutting-edge technology."
                : theme === "security"
                ? "Securing digital infrastructure through ethical hacking, penetration testing, and advanced cybersecurity research."
                : "Developing intelligent systems using machine learning, computer vision, and AI to solve real-world problems."}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
