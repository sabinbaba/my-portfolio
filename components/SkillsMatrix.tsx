"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Cpu,
  Shield,
  Database,
  Wifi,
  Terminal,
  Smartphone,
  Award,
  ChevronRight,
} from "lucide-react";

interface SkillsMatrixProps {
  theme: "iot" | "security";
}

export default function SkillsMatrix({ theme }: SkillsMatrixProps) {
  const [activeFace, setActiveFace] = useState("front");
  const cubeRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const skillFaces = {
    front: {
      title: "Frontend & Web",
      icon: <Code className="w-8 h-8" />,
      color: theme === "iot" ? "cyan" : "rose",
      skills: [
        {
          name: "React",
          level: 95,
          projects: ["Smart Ear Dashboard", "Biogas Monitor UI"],
        },
        {
          name: "Tailwind CSS",
          level: 90,
          projects: ["Portfolio Site", "Admin Panels"],
        },
        {
          name: "Node.js",
          level: 88,
          projects: ["Phishing Detector API", "IoT Backend"],
        },
        {
          name: "MongoDB",
          level: 85,
          projects: ["User Management", "Sensor Data Storage"],
        },
      ],
    },
    top: {
      title: "IoT & Embedded",
      icon: <Cpu className="w-8 h-8" />,
      color: theme === "iot" ? "cyan" : "rose",
      skills: [
        {
          name: "Arduino",
          level: 92,
          projects: ["Smart Ear Device", "Sensor Networks"],
        },
        {
          name: "C++",
          level: 88,
          projects: ["Embedded Systems", "Real-time Processing"],
        },
        {
          name: "ROS",
          level: 85,
          projects: ["Smart Wheelchair", "Robot Navigation"],
        },
        {
          name: "Raspberry Pi",
          level: 90,
          projects: ["Biogas Monitor", "Edge Computing"],
        },
      ],
    },
    right: {
      title: "Cybersecurity",
      icon: <Shield className="w-8 h-8" />,
      color: theme === "iot" ? "cyan" : "rose",
      skills: [
        {
          name: "Kali Linux",
          level: 94,
          projects: ["Penetration Testing", "Vulnerability Assessment"],
        },
        {
          name: "Metasploit",
          level: 87,
          projects: ["Mobile Exploitation", "Network Attacks"],
        },
        {
          name: "Burp Suite",
          level: 89,
          projects: ["Web App Testing", "API Security"],
        },
        {
          name: "Wireshark",
          level: 91,
          projects: ["Network Analysis", "MITM Attacks"],
        },
      ],
    },
    back: {
      title: "Certifications",
      icon: <Award className="w-8 h-8" />,
      color: theme === "iot" ? "cyan" : "rose",
      skills: [
        {
          name: "Cisco CCNA",
          level: 100,
          projects: ["Network Security", "Infrastructure"],
        },
        {
          name: "Huawei HCIA",
          level: 100,
          projects: ["Enterprise Networks", "Cloud Computing"],
        },
        {
          name: "Ethical Hacking",
          level: 95,
          projects: ["Penetration Testing", "Security Audits"],
        },
        {
          name: "IoT Security",
          level: 88,
          projects: ["Device Security", "Protocol Analysis"],
        },
      ],
    },
  };

  const faces = ["front", "top", "right", "back"];
  const currentFace = skillFaces[activeFace as keyof typeof skillFaces];

  const handleFaceChange = (face: string) => {
    setActiveFace(face);
    controls.start({
      rotateY:
        face === "right"
          ? -90
          : face === "back"
          ? 180
          : face === "top"
          ? -90
          : 0,
      rotateX: face === "top" ? -90 : 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    });
  };

  const getTransformStyle = (face: string) => {
    const distance = 132;
    switch (face) {
      case "front":
        return `translateZ(${distance}px)`;
      case "back":
        return `translateZ(-${distance}px) rotateY(180deg)`;
      case "right":
        return `translateX(${distance}px) rotateY(90deg)`;
      case "top":
        return `translateY(-${distance}px) rotateX(90deg)`;
      default:
        return "translateZ(0)";
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Skills Matrix
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Interactive 3D showcase of technical expertise across multiple
            domains
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Cube */}
          <div className="flex flex-col items-center space-y-8">
            <div className="perspective-1000 w-64 h-64">
              <motion.div
                ref={cubeRef}
                className="relative w-full h-full preserve-3d"
                animate={controls}
                initial={{ rotateY: 0 }}
              >
                {isClient &&
                  faces.map((face) => {
                    const faceData =
                      skillFaces[face as keyof typeof skillFaces];
                    const isActive = face === activeFace;
                    const activeColor = theme === "iot" ? "cyan" : "rose";

                    return (
                      <motion.div
                        key={face}
                        className={`absolute inset-0 w-full h-full border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                          isActive
                            ? `border-${activeColor}-400 bg-${activeColor}-500/20`
                            : "border-slate-600 bg-slate-800/50"
                        }`}
                        style={{
                          transform: getTransformStyle(face),
                          backfaceVisibility: "hidden",
                        }}
                        onClick={() => handleFaceChange(face)}
                        whileHover={{ scale: isActive ? 1 : 1.05 }}
                      >
                        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                          <div
                            className={`mb-4 ${
                              isActive
                                ? `text-${activeColor}-400`
                                : "text-slate-400"
                            }`}
                          >
                            {faceData.icon}
                          </div>
                          <h3
                            className={`text-lg font-bold mb-2 ${
                              isActive ? "text-white" : "text-slate-300"
                            }`}
                          >
                            {faceData.title}
                          </h3>
                          <div className="space-y-1">
                            {faceData.skills.slice(0, 2).map((skill) => (
                              <div
                                key={skill.name}
                                className="text-xs text-slate-400"
                              >
                                {skill.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </motion.div>
            </div>

            {/* Face Navigation */}
            <div className="flex gap-2">
              {faces.map((face) => {
                const activeColor = theme === "iot" ? "cyan" : "rose";
                return (
                  <button
                    key={face}
                    onClick={() => handleFaceChange(face)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      face === activeFace
                        ? `bg-${activeColor}-400`
                        : "bg-slate-600 hover:bg-slate-500"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Skills Details */}
          <motion.div
            key={activeFace}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 bg-${currentFace.color}-500/20 rounded-lg text-${currentFace.color}-400`}
                  >
                    {currentFace.icon}
                  </div>
                  <CardTitle className="text-white text-2xl">
                    {currentFace.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentFace.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-white">
                        {skill.name}
                      </h4>
                      <Badge
                        variant="secondary"
                        className={`bg-${currentFace.color}-500/20 text-${currentFace.color}-400`}
                      >
                        {skill.level}%
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className={`bg-${currentFace.color}-400 h-2 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>

                    {/* Project Applications */}
                    <div className="space-y-2">
                      <p className="text-sm text-slate-400">Applied in:</p>
                      <div className="flex flex-wrap gap-2">
                        {skill.projects.map((project) => (
                          <Badge
                            key={project}
                            variant="outline"
                            className="text-xs border-slate-600 text-slate-300"
                          >
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-slate-800/30 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Database
                  className={`w-6 h-6 ${
                    theme === "iot" ? "text-cyan-400" : "text-rose-400"
                  }`}
                />
                <h3 className="font-semibold text-white">Databases</h3>
              </div>
              <div className="space-y-2 text-sm text-slate-300">
                <div>MongoDB • PostgreSQL</div>
                <div>MySQL • Redis</div>
                <div>SQLite • Firebase</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Terminal
                  className={`w-6 h-6 ${
                    theme === "iot" ? "text-cyan-400" : "text-rose-400"
                  }`}
                />
                <h3 className="font-semibold text-white">DevOps</h3>
              </div>
              <div className="space-y-2 text-sm text-slate-300">
                <div>Docker • Kubernetes</div>
                <div>GitHub Actions • Jenkins</div>
                <div>AWS • Digital Ocean</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Wifi
                  className={`w-6 h-6 ${
                    theme === "iot" ? "text-cyan-400" : "text-rose-400"
                  }`}
                />
                <h3 className="font-semibold text-white">Protocols</h3>
              </div>
              <div className="space-y-2 text-sm text-slate-300">
                <div>MQTT • HTTP/HTTPS</div>
                <div>WebSocket • TCP/UDP</div>
                <div>LoRaWAN • Zigbee</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* CSS for 3D effects */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
}
