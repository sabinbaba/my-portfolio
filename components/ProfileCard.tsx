"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Award, Users } from "lucide-react";

interface ProfileCardProps {
  theme: "iot" | "security" | "ml";
  size?: "small" | "medium" | "large";
  showDetails?: boolean;
}

export default function ProfileCard({
  theme,
  size = "medium",
  showDetails = false,
}: ProfileCardProps) {
  const getThemeColor = () => {
    switch (theme) {
      case "iot":
        return "border-cyan-400";
      case "security":
        return "border-rose-500";
      case "ml":
        return "border-purple-400";
    }
  };

  const getThemeRing = () => {
    switch (theme) {
      case "iot":
        return "border-cyan-400/50";
      case "security":
        return "border-rose-500/50";
      case "ml":
        return "border-purple-400/50";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-16 h-16";
      case "medium":
        return "w-32 h-32 md:w-40 md:h-40";
      case "large":
        return "w-48 h-48 md:w-56 md:h-56";
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Profile Picture */}
      <div className="relative">
        <div
          className={`${getSizeClasses()} rounded-full border-4 ${getThemeColor()} overflow-hidden bg-slate-800 shadow-2xl`}
        >
          <img
            src="/sabin-profile.jpg"
            alt="Sabin NTAKIRUTIMANA - Cybersecurity & IoT Expert"
            className="w-full h-full object-cover"
            style={{
              objectPosition: "50% 15%",
              transform: "scale(1.2)",
            }}
          />
        </div>

        {/* Animated ring */}
        <motion.div
          className={`absolute inset-0 rounded-full border-2 ${getThemeRing()}`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Status indicator */}
        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Profile Details */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center max-w-md"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Sabin NTAKIRUTIMANA
          </h2>
          <p className="text-slate-300 mb-4">
            Cybersecurity and Software Development
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="w-4 h-4" />
              <span>Kigali, Rwanda</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Calendar className="w-4 h-4" />
              <span>5+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Award className="w-4 h-4" />
              <span>10+ Certifications</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Users className="w-4 h-4" />
              <span>50+ Projects</span>
            </div>
          </div>

          {/* Specializations */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400">
              IoT Systems
            </Badge>
            <Badge variant="secondary" className="bg-rose-500/20 text-rose-400">
              Cybersecurity
            </Badge>
            <Badge
              variant="secondary"
              className="bg-purple-500/20 text-purple-400"
            >
              Machine Learning
            </Badge>
            <Badge
              variant="secondary"
              className="bg-green-500/20 text-green-400"
            >
              Full-Stack Dev
            </Badge>
          </div>
        </motion.div>
      )}
    </div>
  );
}
