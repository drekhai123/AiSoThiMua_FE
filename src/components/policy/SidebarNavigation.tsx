"use client";

import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";

interface Section {
  id: string;
  title: string;
  icon: string;
}

interface SidebarNavigationProps {
  sections: Section[];
}

export default function SidebarNavigation({ sections }: SidebarNavigationProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 sticky top-24">
      <h3 className="text-lg font-bold text-white mb-4">Mục lục</h3>
      <nav className="space-y-2">
        {sections.map((section) => {
          const Icon = (LucideIcons as any)[section.icon];
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                activeSection === section.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
              <span className="text-sm font-medium">{section.title}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
