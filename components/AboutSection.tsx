'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProfileCard from './ProfileCard';
import { GraduationCap, Briefcase, Award, Code, Shield, Brain } from 'lucide-react';

interface AboutSectionProps {
  theme: 'iot' | 'security' | 'ml';
}

export default function AboutSection({ theme }: AboutSectionProps) {
  const achievements = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Education",
      items: [
        "Information Technology",
        "Specialized in Cybersecurity & IoT",
        "Continuous Learning in AI/ML"
      ]
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Experience",
      items: [
        "5+ Years in Cybersecurity",
        "IoT Systems Development",
        "Full-Stack Web Development"
      ]
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certifications",
      items: [
        "Cisco CCNA Networking",
        "Huawei Cloud Computing",
        "Ethical Hacking Certified"
      ]
    }
  ];

  const expertise = [
    { area: "Cybersecurity", level: 95, icon: <Shield className="w-4 h-4" /> },
    { area: "IoT Development", level: 90, icon: <Code className="w-4 h-4" /> },
    { area: "Machine Learning", level: 85, icon: <Brain className="w-4 h-4" /> },
    { area: "Full-Stack Development", level: 88, icon: <Code className="w-4 h-4" /> }
  ];

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
            About Me
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Passionate technologist bridging cybersecurity, IoT innovation, Software development and machine learning 
            to create secure, intelligent systems for the digital future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <ProfileCard theme={theme} size="large" showDetails={true} />
          </motion.div>

          {/* Achievements & Expertise */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Achievements */}
            <div className="grid grid-cols-1 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        theme === 'iot' ? 'bg-cyan-500/20 text-cyan-400' :
                        theme === 'security' ? 'bg-rose-500/20 text-rose-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">{achievement.title}</h3>
                        <ul className="space-y-1">
                          {achievement.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-sm text-slate-300 flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                theme === 'iot' ? 'bg-cyan-400' :
                                theme === 'security' ? 'bg-rose-400' :
                                'bg-purple-400'
                              }`} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Expertise Levels */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Expertise Levels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {expertise.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`${
                          theme === 'iot' ? 'text-cyan-400' :
                          theme === 'security' ? 'text-rose-400' :
                          'text-purple-400'
                        }`}>
                          {skill.icon}
                        </div>
                        <span className="text-white font-medium">{skill.area}</span>
                      </div>
                      <Badge variant="secondary" className={`${
                        theme === 'iot' ? 'bg-cyan-500/20 text-cyan-400' :
                        theme === 'security' ? 'bg-rose-500/20 text-rose-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {skill.level}%
                      </Badge>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${
                          theme === 'iot' ? 'bg-cyan-400' :
                          theme === 'security' ? 'bg-rose-400' :
                          'bg-purple-400'
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
