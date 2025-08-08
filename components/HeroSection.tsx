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

  const getThemeBorder = () => {
    switch (theme) {
      case "iot":
        return "border-cyan-400";
      case "security":
        return "border-rose-500";
      case "ml":
        return "border-purple-400";
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
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Theme Toggle */}
        <motion.div
          className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm rounded-full p-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {getThemeIcon()}
          <button
            onClick={cycleTheme}
            className="p-2 rounded-full hover:bg-slate-700/50 transition-colors"
            aria-label="Change theme"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              key={theme}
            >
              <ToggleRight className={`w-6 h-6 ${getThemeColor()}`} />
            </motion.div>
          </button>
          <span className="text-xs text-slate-400 capitalize px-2">
            {theme}
          </span>
        </motion.div>

        {/* Main Content - Centered Block Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full pt-20 pb-12">
          {/* Profile and Content Block */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center w-full max-w-2xl lg:max-w-none lg:w-1/2"
          >
            {/* Profile Picture with Perfect Positioning */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="relative mb-8 group"
            >
              <div
                className={`absolute inset-0 rounded-full ${getThemeColor().replace(
                  "text",
                  "bg"
                )} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}
              ></div>

              <div
                className={`relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full border-4 ${getThemeBorder()} overflow-hidden bg-slate-800 shadow-2xl mx-auto transition-transform duration-300 group-hover:scale-[1.01]`}
              >
                <img
                  src="/sabin-profile.jpg"
                  alt="Sabin NTAKIRUTIMANA - Cyber Security & IoT Expert"
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: "50% 10%", // Perfect head positioning
                    transform: "scale(1.01)", // Minimal zoom
                  }}
                />
              </div>

              <motion.div
                className={`absolute inset-0 rounded-full border-2 ${getThemeBorder()}/50`}
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

              <div className="absolute bottom-6 right-6 w-8 h-8 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-center space-y-6 w-full px-4"
            >
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                  Sabin's
                </h1>
                <motion.h2
                  className={`text-3xl sm:text-4xl md:text-5xl font-bold ${getThemeColor()} mb-2`}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2.2 }}
                >
                  {theme === "iot"
                    ? "Personal Portfolio"
                    : theme === "security"
                    ? "Cyber Security Lab"
                    : "AI/ML Research Lab"}
                </motion.h2>
              </div>

              <motion.p
                className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.4 }}
              >
                {theme === "iot"
                  ? "Building intelligent IoT systems that bridge the physical and digital worlds with cutting-edge technology."
                  : theme === "security"
                  ? "Securing digital infrastructure through ethical hacking, penetration testing, and advanced cybersecurity research."
                  : "Developing intelligent systems using machine learning, computer vision, and AI to solve real-world problems."}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Terminal - Positioned to the right on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full max-w-md lg:max-w-lg lg:w-1/3 mt-8 lg:mt-0"
          >
            <div
              className={`bg-slate-900/90 backdrop-blur-sm rounded-lg border ${getThemeBorder()}/30 p-4 sm:p-6 font-mono text-left shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-${getThemeBorder()}/50`}
            >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
