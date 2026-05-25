import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Briefcase } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "contact", label: "Contact" },
  ];

  const handleLinkClick = (id: string, label: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 84;
      let offsetTop = 0;
      let currentEl: HTMLElement | null = element;
      while (currentEl) {
        offsetTop += currentEl.offsetTop;
        currentEl = currentEl.offsetParent as HTMLElement | null;
      }
      
      const offsetPosition = offsetTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      document.title = `Habib Zaenal | ${label}`;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#080710]/90 backdrop-blur-md border-b border-indigo-950/40 py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => handleLinkClick("home", "Home")}
            className="flex items-center gap-2 group cursor-pointer"
          >
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id, link.label)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative cursor-pointer ${
                    isActive ? "text-indigo-400 font-semibold" : "text-slate-300 hover:text-slate-100"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-indigo-500 indigo-glow"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Call To Action button (Outline spotlight style) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleLinkClick("contact", "Contact")}
              className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase border border-indigo-500/40 hover:border-indigo-500 text-indigo-400 hover:text-white hover:bg-indigo-500/10 transition-all duration-300 indigo-glow cursor-pointer flex items-center gap-1.5"
            >
              <Briefcase className="h-3 w-3" /> Hire Me
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2 rounded-lg bg-slate-800/40 border border-slate-700/50 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-[#080710]/95 backdrop-blur-lg border-b border-indigo-950/50 px-6 py-6 md:hidden flex flex-col gap-4 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id, link.label)}
                    className={`w-full text-left py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500"
                        : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-100"
                    }`}
                  >
                    {link.label}
                    {isActive && <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 indigo-glow" />}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => handleLinkClick("contact", "Contact")}
              className="mt-2 w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 text-center flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Briefcase className="h-4 w-4" /> Hubungi Saya
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
