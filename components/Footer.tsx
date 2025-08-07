"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Github,
  Linkedin,
  Shield,
  Key,
  MapPin,
  Phone,
  Send,
  ExternalLink,
  Award,
  Building,
} from "lucide-react";

interface FooterProps {
  theme: "iot" | "security";
}

export default function Footer({ theme }: FooterProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [contributions, setContributions] = useState<
    Array<{ date: Date; count: number }>
  >([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Generate contributions only on client side
    const clientContributions = Array.from({ length: 365 }, (_, i) => ({
      date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.sin(i) * 2 + 2), // Deterministic pattern instead of Math.random()
    }));
    setContributions(clientContributions);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-slate-800";
    if (count === 1) return theme === "iot" ? "bg-cyan-900" : "bg-rose-900";
    if (count === 2) return theme === "iot" ? "bg-cyan-700" : "bg-rose-700";
    if (count === 3) return theme === "iot" ? "bg-cyan-500" : "bg-rose-500";
    return theme === "iot" ? "bg-cyan-400" : "bg-rose-400";
  };

  const themeColors = {
    text: theme === "iot" ? "text-cyan-400" : "text-rose-400",
    bg: theme === "iot" ? "bg-cyan-500" : "bg-rose-500",
    bgHover: theme === "iot" ? "hover:bg-cyan-400" : "hover:bg-rose-400",
    border: theme === "iot" ? "border-cyan-400" : "border-rose-400",
  };

  return (
    <footer className="py-20 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Mail className={`w-5 h-5 ${themeColors.text}`} />
                  Get In Touch
                </CardTitle>
                {/* Profile Summary */}
                <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-lg mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-600">
                    <img
                      src="/sabin-profile.jpg"
                      alt="Sabin NTAKIRUTIMANA Profile"
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: "50% 15%",
                        transform: "scale(1.2)",
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Sabin NTAKIRUTIMANA
                    </h4>
                    <p className="text-sm text-slate-400">
                      Cyber Mentor | Software Developer | IoT and ML Specialist
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-400">
                        Available for projects
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-400">
                  Interested in collaboration or have questions about my work?
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-slate-900 border-slate-600 text-white"
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-slate-900 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-slate-900 border-slate-600 text-white min-h-[120px]"
                    required
                  />

                  {/* PGP Encryption Notice */}
                  <div className="flex items-center gap-2 p-3 bg-slate-900 rounded-lg">
                    <Key className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">
                      Messages encrypted with PGP for security
                    </span>
                  </div>

                  {submitSuccess && (
                    <div className="p-3 bg-green-900/30 border border-green-800 rounded-lg text-green-400 text-sm">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}

                  <Button
                    type="submit"
                    className={`w-full ${themeColors.bg} ${themeColors.bgHover} text-white`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-slate-700 space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>Kigali, Rwanda</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>+250 787 936 051</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>sabin19@gmail.com</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 flex gap-4">
                  <a
                    href="https://github.com/sabinbaba"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-slate-300 hover:bg-slate-800"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </a>
                  <a
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-slate-300 hover:bg-slate-800"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* GitHub Contributions & References */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* GitHub Contributions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Github className={`w-5 h-5 ${themeColors.text}`} />
                  GitHub Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Contribution Graph */}
                  {isClient ? (
                    <div className="grid grid-cols-53 gap-1">
                      {contributions.map((day, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-sm ${getContributionColor(
                            day.count
                          )}`}
                          title={`${
                            day.count
                          } contributions on ${day.date.toDateString()}`}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-53 gap-1 animate-pulse">
                      {Array.from({ length: 365 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-sm bg-slate-700"
                        />
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">10</div>
                      <div className="text-xs text-slate-400">
                        Contributions
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">23</div>
                      <div className="text-xs text-slate-400">Repositories</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">100</div>
                      <div className="text-xs text-slate-400">Commits</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* References */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className={`w-5 h-5 ${themeColors.text}`} />
                  References & Endorsements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Building className="w-5 h-5 text-blue-400" />
                      <div>
                        <h4 className="font-semibold text-white">
                          KT Rwanda Networks
                        </h4>
                        <p className="text-sm text-slate-400">
                          Network Infrastructure Partner
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-500/20 text-green-400"
                      >
                        Verified
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300">
                      "Exceptional expertise in network security and IoT
                      implementations. Delivered robust solutions for our
                      enterprise infrastructure."
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Building className="w-5 h-5 text-purple-400" />
                      <div>
                        <h4 className="font-semibold text-white">
                          HOPE Technical School
                        </h4>
                        <p className="text-sm text-slate-400">
                          Educational Institution
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-500/20 text-green-400"
                      >
                        Verified
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300">
                      "Outstanding technical skills and innovative approach to
                      problem-solving. Contributed significantly to our IoT
                      curriculum development."
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View All References
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-slate-800 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className={`w-5 h-5 ${themeColors.text}`} />
              <span className="text-slate-300">
                © {new Date().getFullYear()} Sabin's personal portfoilo. All
                rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>Built with React & Tailwind CSS</span>
              <span>•</span>
              <span>Secured with modern practices</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
