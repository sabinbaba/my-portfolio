'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cpu, Shield, Play, Terminal, Activity, Radio, Gamepad2, BarChart3, Bug, Globe, Award } from 'lucide-react';
import SmartEarDemo from './demos/SmartEarDemo';
import WheelchairDemo from './demos/WheelchairDemo';
import BiogasDemo from './demos/BiogasDemo';
import KeyloggerDemo from './demos/KeyloggerDemo';
import PhishingDemo from './demos/PhishingDemo';
import ExploitGallery from './demos/ExploitGallery';

interface ProjectShowcaseProps {
  theme: 'iot' | 'security';
}

export default function ProjectShowcase({ theme }: ProjectShowcaseProps) {
  const [activeTab, setActiveTab] = useState('iot');
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const iotProjects = [
    {
      id: 'smart-ear',
      title: 'Smart Ear Project',
      description: 'AI-powered assistive device for crosswalk detection using audio analysis',
      icon: <Radio className="w-6 h-6" />,
      tags: ['Arduino', 'C++', 'TensorFlow Lite', 'Audio Processing'],
      demo: <SmartEarDemo />,
      features: ['Real-time audio analysis', '3D device visualization', 'Alert simulation']
    },
    {
      id: 'smart-wheelchair',
      title: 'Smart Wheelchair',
      description: 'Autonomous navigation system with joystick control and obstacle avoidance',
      icon: <Gamepad2 className="w-6 h-6" />,
      tags: ['ROS Navigation', 'Python', 'LiDAR', 'Path Planning'],
      demo: <WheelchairDemo />,
      features: ['Interactive joystick demo', 'Real-time path planning', 'Obstacle detection']
    },
    {
      id: 'biogas-monitor',
      title: 'Biogas Monitoring',
      description: 'IoT system for monitoring biogas production with predictive maintenance',
      icon: <BarChart3 className="w-6 h-6" />,
      tags: ['MQTT', 'Grafana', 'Raspberry Pi', 'Predictive Analytics'],
      demo: <BiogasDemo />,
      features: ['Live dashboard', 'Gas flow animations', 'Maintenance alerts']
    }
  ];

  const securityProjects = [
    {
      id: 'keylogger-detection',
      title: 'Keylogger Detection',
      description: 'Advanced system for detecting and terminating malicious keyloggers',
      icon: <Bug className="w-6 h-6" />,
      tags: ['Python', 'Process Analysis', 'Behavioral Detection'],
      demo: <KeyloggerDemo />,
      features: ['Real-time scanning', 'Process termination', 'Defense methodology']
    },
    {
      id: 'phishing-detector',
      title: 'Phishing Detector',
      description: 'ML-powered URL analyzer for identifying phishing attempts',
      icon: <Globe className="w-6 h-6" />,
      tags: ['Node.js', 'Machine Learning', 'WHOIS API', 'URL Analysis'],
      demo: <PhishingDemo />,
      features: ['Real-time URL analysis', 'ML classification', 'Risk assessment']
    },
    {
      id: 'exploit-gallery',
      title: 'Exploitation Tests',
      description: 'Comprehensive security testing results and methodologies',
      icon: <Award className="w-6 h-6" />,
      tags: ['Metasploit', 'Burp Suite', 'Wireshark', 'MITM'],
      demo: <ExploitGallery />,
      features: ['Badge collection', 'Mitigation code', 'Test results']
    }
  ];

  const currentProjects = activeTab === 'iot' ? iotProjects : securityProjects;

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Project Showcase
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore my latest innovations in IoT development and cybersecurity research
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-12 bg-slate-800/50 backdrop-blur-sm">
            <TabsTrigger 
              value="iot" 
              className="flex items-center gap-2 data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              <Cpu className="w-4 h-4" />
              IoT Projects
            </TabsTrigger>
            <TabsTrigger 
              value="security"
              className="flex items-center gap-2 data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-400"
            >
              <Shield className="w-4 h-4" />
              Security Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="iot" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {iotProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-cyan-400/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                          {project.icon}
                        </div>
                        <CardTitle className="text-white">{project.title}</CardTitle>
                      </div>
                      <CardDescription className="text-slate-300">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-cyan-500/20 text-cyan-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <ul className="text-sm text-slate-400 space-y-1">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        onClick={() => setActiveDemo(activeDemo === project.id ? null : project.id)}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {activeDemo === project.id ? 'Hide Demo' : 'View Demo'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-rose-400/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400">
                          {project.icon}
                        </div>
                        <CardTitle className="text-white">{project.title}</CardTitle>
                      </div>
                      <CardDescription className="text-slate-300">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-rose-500/20 text-rose-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <ul className="text-sm text-slate-400 space-y-1">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-rose-400 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        onClick={() => setActiveDemo(activeDemo === project.id ? null : project.id)}
                        className="w-full bg-rose-500 hover:bg-rose-400 text-white"
                      >
                        <Terminal className="w-4 h-4 mr-2" />
                        {activeDemo === project.id ? 'Hide Demo' : 'View Demo'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Demo Modal */}
        <AnimatePresence>
          {activeDemo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setActiveDemo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 rounded-lg border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {currentProjects.find(p => p.id === activeDemo)?.demo}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
