'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalTypingProps {
  theme: 'iot' | 'security' | 'ml';
}

export default function TerminalTyping({ theme }: TerminalTypingProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayText, setDisplayText] = useState<string[]>(['']);

  const getLines = () => {
    const baseLines = [
      "> Welcome to Sabin NTAKIRUTIMANA's portfolio",
      "> Initializing secure environment...",
    ];

    const themeLines = {
      iot: [
        "> Specializing in: [Smart IoT Systems] [Embedded Development] [Edge Computing]",
        "> Active Projects: Smart Ear | Wheelchair Navigation | Biogas Monitoring"
      ],
      security: [
        "> Specializing in: [Ethical Hacking] [Penetration Testing] [Vulnerability Assessment]",
        "> Security Tools: Kali Linux | Metasploit | Burp Suite | Wireshark"
      ],
      ml: [
        "> Specializing in: [Machine Learning] [Computer Vision] [Predictive Analytics]",
        "> ML Projects: Smart Attendance | Overload Detection | Neural Networks"
      ]
    };

    return [...baseLines, ...themeLines[theme], ""];
  };

  const lines = getLines();

  useEffect(() => {
    // Reset when theme changes
    setCurrentLine(0);
    setCurrentChar(0);
    setDisplayText(['']);
  }, [theme]);

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        if (currentChar < lines[currentLine].length) {
          setDisplayText(prev => {
            const newText = [...prev];
            newText[currentLine] = lines[currentLine].substring(0, currentChar + 1);
            return newText;
          });
          setCurrentChar(prev => prev + 1);
        } else {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
          setDisplayText(prev => [...prev, '']);
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, lines]);

  const getThemeColor = () => {
    switch (theme) {
      case 'iot': return 'text-cyan-400';
      case 'security': return 'text-rose-500';
      case 'ml': return 'text-purple-400';
    }
  };

  return (
    <div className="space-y-2">
      {displayText.map((line, index) => (
        <div key={index} className="flex items-center">
          <span className={getThemeColor()}>
            {line}
          </span>
          {index === currentLine && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className={`ml-1 ${getThemeColor()}`}
            >
              █
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
}
