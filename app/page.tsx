"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import SkillsMatrix from "@/components/SkillsMatrix";
import SecurityDemo from "@/components/SecurityDemo";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import AboutSection from "@/components/AboutSection";

export default function Portfolio() {
  const [theme, setTheme] = useState<"iot" | "security" | "ml">("iot");

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen w-full overflow-hidden">
        <div
          className={`w-full min-h-screen transition-all duration-1000 ${
            theme === "iot"
              ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
              : theme === "security"
              ? "bg-gradient-to-br from-slate-900 via-red-900 to-slate-900"
              : "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          }`}
        >
          {/* Tight container with no side spacing */}
          <div className="mx-auto w-full">
            {/* Sections with no horizontal padding */}
            <section className="min-h-screen w-full">
              <HeroSection theme={theme} setTheme={setTheme} />
            </section>

            <section className="w-full">
              <AboutSection theme={theme} />
            </section>

            <section className="w-full">
              <ProjectShowcase theme={theme} />
            </section>

            <section className="w-full">
              <SkillsMatrix theme={theme} />
            </section>

            <section className="w-full">
              <SecurityDemo theme={theme} />
            </section>

            <footer className="w-full">
              <Footer theme={theme} />
            </footer>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}