// components/AIAgent.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Brain } from "lucide-react";

// Your CV data
const cvData = {
  personal_information: {
    full_name: "NTAKIRUTIMANA Sabin",
    email: "sabintox19@gmail.com",
    phone: "+(250)787936051",
    address: "GASABO DISTRICT, KIGALI CITY",
  },
  about_me:
    "I am an IT professional currently pursuing an Advanced Diploma in Information Technology at IPRC Ngoma. I possess a strong foundation in Networking, with a particular focus on Ethical Hacking, Cybersecurity, Network Security, Machine learning and IoT as well as Windows and Linux Server Administration.",
  education: [
    {
      degree: "Advanced Diploma in Information Technology",
      status: "In Progress",
      institution: "IPRC Ngoma",
      graduation_date: "May 2025",
    },
    {
      degree: "A2 Certificate in Networking",
      institution: "APPEGA Gahengeri TVET School",
      duration: "2018-2021",
    },
  ],
  skills: {
    programming_languages: ["Python", "C/C++", "PHP", "HTML/CSS"],
    tools: ["Git", "GitHub", "Linux", "Cisco packet tracer"],
    soft_skills: [
      "Strong problem-solving and analytical skills",
      "Excellent communication and teamwork abilities",
    ],
  },
  work_experience: [
    {
      position: "Network and System Administrator",
      company: "TYAZA Limited",
      roles: ["Co-Founder", "Board Member", "General Secretary"],
      start_date: "February 2024",
      responsibilities: [
        "Contribute to networking issues",
        "Project management",
        "Oversee general operations",
      ],
    },
    {
      position: "Networking Intern",
      company: "KT RWANDA NETWORKS",
      duration: "August 2023 – December 2023",
      responsibilities: [
        "Gained hands-on experience in Networking",
        "Enhanced problem-solving abilities",
        "Improved teamwork skills",
      ],
    },
    {
      position: "IT Service Provider",
      company: "GIHUNDWE HOSPITAL",
      supervisor: "UWAYEZU Diane, Rusizi kamembe",
      duration: "2018 and 2019",
      responsibilities: ["Delivered efficient and effective IT services"],
    },
    {
      position: "Network and Internet Technology Trainer",
      company: "HOPE Technical Secondary School",
      status: "Current",
      subjects: [
        "Cybersecurity",
        "Machine Learning",
        "Cloud Computing",
        "Linux Server Administration",
      ],
      description:
        "Skilled in delivering practical and theoretical knowledge to prepare students for tech careers.",
    },
  ],
  trainings: [
    {
      name: "HUAWEI Training",
      description:
        "Training of 30 students chosen as best performers in RP/UR universities to train them about AI, Cloud computing, 5G and Digital power in 2023. Worked on real projects to solve current problems and received a certificate.",
    },
  ],
  languages: [
    {
      language: "Kinyarwanda",
      proficiency: "Excellent",
      skills: ["Writing", "Speaking", "Reading", "Listening"],
    },
    {
      language: "English",
      proficiency: "Very Good",
      skills: ["Writing", "Speaking", "Reading", "Listening"],
    },
  ],
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface AIAgentProps {
  theme: "iot" | "security" | "ml";
}

// Define intent type
interface Intent {
  patterns: string[];
  response: string | (() => string);
}

// Predefined intents with multiple ways to ask
const INTENTS: Record<string, Intent> = {
  NAME: {
    patterns: [
      "name",
      "who are you",
      "what's your name",
      "your name",
      "introduce yourself",
    ],
    response: `My name is ${cvData.personal_information.full_name}. I'm an IT professional specializing in cybersecurity, networking, and IoT. How can I help you today?`,
  },
  CONTACT: {
    patterns: [
      "contact",
      "email",
      "phone",
      "address",
      "how to reach",
      "get in touch",
      "where are you",
    ],
    response: `You can reach me at ${cvData.personal_information.email} or call me at ${cvData.personal_information.phone}. I'm located in ${cvData.personal_information.address}. Feel free to connect with me for collaborations or inquiries.`,
  },
  SKILLS: {
    patterns: [
      "skill",
      "what can you do",
      "expertise",
      "what are you good at",
      "technologies",
      "languages you know",
    ],
    response: `I have expertise in various technologies including ${[
      ...cvData.skills.programming_languages,
      ...cvData.skills.tools,
    ].join(
      ", "
    )}. I'm particularly skilled in cybersecurity, network administration, IoT development, and machine learning. I also have ${cvData.skills.soft_skills.join(
      " and "
    )}.`,
  },
  EXPERIENCE: {
    patterns: [
      "experience",
      "work",
      "job",
      "career",
      "where have you worked",
      "employment",
    ],
    response: () => {
      let expResponse = "I have work experience in: ";
      cvData.work_experience.forEach((job, index) => {
        expResponse += `${job.position} at ${job.company}`;
        if (index < cvData.work_experience.length - 1) expResponse += ", ";
      });
      return expResponse;
    },
  },
  EDUCATION: {
    patterns: [
      "education",
      "study",
      "degree",
      "school",
      "university",
      "college",
      "qualification",
    ],
    response: () => {
      let eduResponse = "My education includes: ";
      cvData.education.forEach((edu, index) => {
        eduResponse += `${edu.degree} from ${edu.institution}`;
        if (index < cvData.education.length - 1) eduResponse += ", ";
      });
      return eduResponse;
    },
  },
  LANGUAGES: {
    patterns: ["language", "speak", "english", "kinyarwanda", "bilingual"],
    response: () => {
      let langResponse = "I'm proficient in: ";
      cvData.languages.forEach((lang, index) => {
        langResponse += `${lang.language} (${lang.proficiency})`;
        if (index < cvData.languages.length - 1) langResponse += ", ";
      });
      return langResponse;
    },
  },
  TRAINING: {
    patterns: [
      "training",
      "certification",
      "certificate",
      "huawei",
      "workshop",
    ],
    response: () => {
      let trainingResponse = "I've completed specialized training including: ";
      cvData.trainings.forEach((training, index) => {
        trainingResponse += training.name;
        if (index < cvData.trainings.length - 1) trainingResponse += ", ";
      });
      return trainingResponse;
    },
  },
  ABOUT: {
    patterns: ["about", "tell me about yourself", "background", "who is sabin"],
    response: cvData.about_me,
  },
  GREETING: {
    patterns: ["hello", "hi", "hey", "greetings", "howdy", "what's up"],
    response:
      "Hello! I'm Sabin's AI assistant. I can tell you about his skills, experience, education, and projects. What would you like to know?",
  },
  HELP: {
    patterns: ["help", "what can I ask", "options", "what do you know"],
    response:
      "I can help you learn about Sabin's professional background. Try asking about:\n- His skills and expertise\n- Work experience\n- Education\n- Contact information\n- Languages he speaks\n- Training and certifications\n- Or just say 'about' to learn more about him",
  },
};

// Simple text similarity function (cosine similarity approximation)
const textSimilarity = (text1: string, text2: string): number => {
  const words1 = text1.toLowerCase().split(/\s+/).filter(Boolean);
  const words2 = text2.toLowerCase().split(/\s+/).filter(Boolean);

  if (words1.length === 0 || words2.length === 0) return 0;

  // Count common words (this is the dot product for binary vectors)
  const commonWords = words1.filter((word) => words2.includes(word));
  const dotProduct = commonWords.length;

  // For binary vectors, magnitude is sqrt of word count
  const magnitude1 = Math.sqrt(words1.length);
  const magnitude2 = Math.sqrt(words2.length);

  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  return dotProduct / (magnitude1 * magnitude2);
};

export default function AIAgent({ theme }: AIAgentProps) {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getThemeColor = () => {
    switch (theme) {
      case "iot":
        return "text-cyan-400";
      case "security":
        return "text-rose-500";
      case "ml":
        return "text-purple-400";
      default:
        return "text-cyan-400";
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
      default:
        return "border-cyan-400";
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate API call to AI service
    setTimeout(() => {
      const response = generateAIResponse(input);
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const detectIntent = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    // Calculate similarity scores for each intent
    const intentScores: { intent: string; score: number }[] = [];

    Object.entries(INTENTS).forEach(([intentKey, intentData]) => {
      let maxScore = 0;

      // Check against all patterns for this intent
      intentData.patterns.forEach((pattern) => {
        const score = textSimilarity(lowerInput, pattern);
        if (score > maxScore) maxScore = score;
      });

      // Direct word matching as fallback
      if (maxScore < 0.3) {
        const words = lowerInput.split(/\s+/).filter(Boolean);
        const patternWords = intentData.patterns
          .join(" ")
          .split(/\s+/)
          .filter(Boolean);

        const matchingWords = words.filter((word) =>
          patternWords.some(
            (patternWord) => textSimilarity(word, patternWord) > 0.7
          )
        );

        if (matchingWords.length > 0) {
          maxScore = Math.max(maxScore, 0.4 + matchingWords.length * 0.1);
        }
      }

      intentScores.push({ intent: intentKey, score: maxScore });
    });

    // Sort by score descending
    intentScores.sort((a, b) => b.score - a.score);

    // Return the highest scoring intent if above threshold
    if (intentScores[0] && intentScores[0].score > 0.3) {
      return intentScores[0].intent;
    }

    // Default to help if no intent detected
    return "HELP";
  };

  const generateAIResponse = (userInput: string): string => {
    const detectedIntent = detectIntent(userInput);
    const intent = INTENTS[detectedIntent];

    if (!intent)
      return "I'm Sabin's AI assistant. I can help you learn more about his professional background, skills, and experience. Try asking about his skills, work experience, education, or how to contact him. You can also type 'help' for more options.";

    if (typeof intent.response === "function") {
      return intent.response();
    }

    return intent.response;
  };

  return (
    <>
      {/* AI Chat Bot Button */}
      <motion.button
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full ${
          showChat ? "bg-rose-600" : "bg-slate-800/90"
        } backdrop-blur-sm border ${getThemeBorder()} shadow-lg hover:scale-110 transition-transform`}
        onClick={() => setShowChat(!showChat)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open AI Assistant"
      >
        {showChat ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Brain className={`w-6 h-6 ${getThemeColor()}`} />
        )}
      </motion.button>

      {/* AI Chat Bot Interface */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-6 z-40 w-80 h-96 bg-slate-900/95 backdrop-blur-md rounded-lg border border-slate-700/50 shadow-xl flex flex-col"
          >
            <div
              className={`p-4 border-b ${getThemeBorder()}/30 bg-slate-800/50 rounded-t-lg flex items-center justify-between`}
            >
              <div>
                <h3 className="font-semibold text-white flex items-center gap-2">
                  
                  <Brain className="w-4 h-4" /> Sabin's AI Assistant
                </h3>
                <p className="text-xs text-slate-400">
                  Powered by ML intent recognition
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                <span className="text-xs text-slate-400">Online</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-slate-400 text-sm my-8">
                  <p>Hello! I'm Sabin's AI assistant with ML capabilities.</p>
                  <p>
                    I can understand your questions even if they're not
                    perfectly phrased.
                  </p>
                  <p className="mt-2 text-xs">
                    Try: "what u good at?" or "tell me about schooling"
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-2xl ${
                        message.role === "user"
                          ? "bg-cyan-600 text-white"
                          : "bg-slate-700 text-slate-200"
                      }`}
                    >
                      {message.content.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))
              )}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 text-slate-200 p-3 rounded-2xl max-w-xs">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">Analyzing intent</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-slate-700/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask anything about Sabin..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className={`p-2 rounded-lg ${
                    input.trim()
                      ? "bg-cyan-600 hover:bg-cyan-700"
                      : "bg-slate-700 cursor-not-allowed"
                  } transition-colors`}
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                I understand even poorly phrased questions
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
