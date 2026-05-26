import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Award,
  ArrowRight,
  Code2,
  Palette,
  Users,
  Compass,
  Briefcase,
  Layers,
  Flame,
  Star,
  ShieldAlert,
  HelpCircle,
  Activity,
  Workflow,
  MousePointer2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Instagram,
  Music
} from "lucide-react";

// Portrait Image
const profilePortrait = "https://res.cloudinary.com/dopwo368m/image/upload/v1779590968/c0f5455c-d12b-49d6-9bd8-72f24785a02b_removalai_preview_bk33th.png";

// Sub-components
import Navbar from "./components/Navbar";
import SpotlightCursor from "./components/SpotlightCursor";
import ProjectShowcase from "./components/ProjectShowcase";
import SkillsGrid from "./components/SkillsGrid";
import ContactForm from "./components/ContactForm";
import CertificatesSection from "./components/CertificatesSection";

// Mock datasets
import {
  PERSONAL_INFO,
  WORK_EXPERIENCE,
  TOOLS,
  SOCIAL_LINKS
} from "./data";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);

  // Monitor window resize for mobile check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Save and Restore Scroll Position (handling mobile exit to home screen)
  useEffect(() => {
    // Attempt to restore scroll immediately if saved
    const savedPos = sessionStorage.getItem("scrollPosition");
    if (savedPos) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedPos, 10), behavior: "instant" as ScrollBehavior });
      }, 50); // slight delay to allow rendering
    }

    const saveScrollPosition = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    // Save when app goes to background / visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        saveScrollPosition();
      }
    };
    window.addEventListener("visibilitychange", handleVisibilityChange);

    // Save on before unload
    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, []);

  // Scroll Spy implementation to track which panel is viewed
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "skills", "experience", "projects", "certificates", "contact"];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = 84;
      let offsetTop = 0;
      let currentEl: HTMLElement | null = el;
      while (currentEl) {
        offsetTop += currentEl.offsetTop;
        currentEl = currentEl.offsetParent as HTMLElement | null;
      }
      
      const offsetPosition = offsetTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#05040d] text-slate-100 selection:bg-indigo-500 selection:text-white overflow-x-hidden font-sans relative antialiased">
      {/* Dynamic spot cursor background tracking */}
      <SpotlightCursor />

      {/* Floating Header */}
      <Navbar activeSection={activeSection} />

      {/* Background Ambience Lines & Blobs */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-b from-indigo-600/12 via-violet-600/2 to-transparent blur-[160px]" />
        <div className="absolute top-[400px] right-[-100px] w-[500px] h-[500px] rounded-full bg-indigo-500/8 blur-[120px]" />
        <div className="absolute top-[200px] left-[-150px] w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[120px]" />
        {/* Fine grid screen line pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 sm:space-y-36 pt-24 pb-20">
        
        {/* ==============================================
             1. HERO SECTION (Cover browser layout)
           ============================================== */}
        <section 
          id="home" 
          className="pt-6 pb-2 relative flex flex-col justify-center"
        >
          
          <div className="max-w-5xl mx-auto w-full">
            {/* The high-precision Glassmorphic Browser Mockup replicating the laptop screen exactly */}
            <div className="w-full relative">
              


              {/* Main inner browser canvas */}
              <div className="p-6 md:p-8 lg:p-12 relative flex flex-col justify-between min-h-[580px]">

                
                {/* Intense royal blue spotlight strictly centered under the portrait silhouette */}
                <div className="absolute top-[60%] left-[22%] -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-blue-600/30 blur-[110px] pointer-events-none" />
                <div className="absolute top-[55%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-indigo-600/20 blur-[80px] pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 relative z-10 items-start">
                  
                  {/* Left Column (5 cols on lg): Name highlights and Portrait overlay */}
                  <motion.div 
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
                    className="lg:col-span-5 flex flex-col justify-between h-full space-y-6"
                  >
                    <div className="text-center lg:text-left">
                      <span className="text-sm font-sans font-light text-slate-300 block mb-1">
                        Hello, I am
                      </span>
                      <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-4.5xl text-white tracking-tight leading-none mb-6">
                        {PERSONAL_INFO.name}
                      </h1>
                    </div>

                    {/* Highly polished transparent portrait photo directly in front of the radial blue glow with no frame */}
                    <div className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto lg:mx-0 mt-4 sm:mt-0 lg:-mt-16 transition-transform duration-500 hover:scale-[1.02]">
                      <img 
                        src={profilePortrait} 
                        alt="Profile Portrait" 
                        className="w-full h-auto select-none object-top filter contrast-105"
                        style={{
                          maskImage: "linear-gradient(to bottom, black 75%, transparent 95%)",
                          WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 95%)"
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </motion.div>

                  {/* Right Column (7 cols on lg): About Me, Study, Work split, Skills grid, and dual-border Social Row */}
                  <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="lg:col-span-7 flex flex-col justify-between space-y-7"
                  >
                    
                    {/* About Me block */}
                    <div className="space-y-2.5 text-center lg:text-left">
                      <h2 className="text-xl font-display font-bold text-white tracking-tight">
                        About Me
                      </h2>
                      <p className="text-slate-300 text-xs leading-relaxed text-justify font-sans">
                        {PERSONAL_INFO.about.intro}
                      </p>
                      <p className="text-slate-400 text-xs text-justify font-sans leading-relaxed">
                        {PERSONAL_INFO.about.domain}
                      </p>
                    </div>

                    {/* Side by side: Education and Work Experience columns mimicking the reference layout layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1 text-center sm:text-left">
                      
                      {/* Education Column */}
                      <div className="space-y-2 flex flex-col items-center sm:items-start">
                        <h3 className="text-base font-display font-bold text-white tracking-tight">
                          Education
                        </h3>
                        <div className="space-y-1 sm:pl-1 flex flex-col items-center sm:items-start">
                          <div className="text-[10px] font-mono text-slate-450 uppercase tracking-widest font-bold">
                            2020 - 2024
                          </div>
                          <div className="text-xs font-semibold text-slate-200 leading-tight">
                            Universitas PGRI Madiun
                          </div>
                          <p className="text-[10px] text-slate-400">
                            S1 Teknik Industri · Lulus 2024
                          </p>
                        </div>
                      </div>

                      {/* Work Experience Column */}
                      <div className="space-y-2 flex flex-col items-center sm:items-start">
                        <h3 className="text-base font-display font-bold text-white tracking-tight">
                          Work Experience
                        </h3>
                        <div className="space-y-1.5 sm:pl-1 font-sans flex flex-col items-center sm:items-start">
                          {/* List style representing the experience bullets inside the screenshot */}
                          <div className="flex items-start gap-1 pb-1 text-left sm:text-left flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                            <span className="text-indigo-400 mt-0.5 text-xs hidden sm:block">•</span>
                            <div className="flex flex-col items-center sm:items-start">
                              <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                                2024 - 2026
                              </div>
                              <div className="text-xs font-semibold text-slate-200 leading-none">
                                Novus Stream Lab
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                Operator Live Streaming & Content Editor
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Visual Tool Suite & Skills tag blocks mirroring the exact buttons shown in reference */}
                    <div className="space-y-2 pt-1 flex flex-col items-center lg:items-start">
                      <h3 className="text-base font-display font-bold text-white tracking-tight">
                        Skills
                      </h3>
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                        {TOOLS.map((tool, idx) => (
                          <div 
                            key={idx}
                            className={`w-11 h-11 rounded-xl bg-slate-800/60 border border-slate-700/30 hover:border-indigo-500/50 transition-all flex flex-col items-center justify-center shadow-inner font-bold font-mono text-sm group overflow-hidden ${tool.color}`} 
                            title={tool.name}
                          >
                            {tool.image ? (
                              <img src={tool.image} alt={tool.name} className="w-full h-full p-1.5 object-contain group-hover:scale-110 transition-transform" />
                            ) : (
                              <span className="group-hover:scale-110 transition-transform">
                                {tool.name === "Figma" ? "Fg" : tool.name === "Photoshop" ? "Ps" : tool.name === "Canva" ? "Cv" : tool.name === "CapCut" ? "Cc" : tool.name.substring(0, 2)}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Minimalist social media icons without bounding boxes or extra mark indicators */}
                    <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 border-t border-indigo-950/30">
                      
                      {/* WhatsApp */}
                      <a
                        href="https://wa.me/6285706514201"
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-indigo-400 transition-all hover:scale-110 active:scale-95 duration-200"
                        title="WhatsApp"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://instagram.com/habibzm_"
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-indigo-400 transition-all hover:scale-110 active:scale-95 duration-200"
                        title="Instagram"
                      >
                        <Instagram className="h-6 w-6" />
                      </a>

                      {/* TikTok */}
                      <a
                        href="https://www.tiktok.com/@habibzm13"
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-indigo-400 transition-all hover:scale-110 active:scale-95 duration-200"
                        title="TikTok"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6"
                        >
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.81-.74-3.94-1.69-.22-.19-.42-.38-.62-.59v6.52c-.02 2.57-.96 5.15-2.91 6.84-2.06 1.83-4.99 2.45-7.61 1.67-2.61-.75-4.8-2.94-5.28-5.63-.56-2.86.36-6.02 2.52-7.88 1.9-1.68 4.6-2.19 6.97-1.38v4.06c-1.31-.53-2.89-.31-3.99.62-1.12.95-1.57 2.64-1.07 4.02.48 1.39 1.95 2.34 3.42 2.18 1.52-.1 2.77-1.34 2.87-2.86.03-2.4 0-4.8 0-7.2 0-3.11 0-6.22 0-9.33-.01-.1-.01-.2 0-.3z" />
                        </svg>
                      </a>

                      {/* email */}
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=habibzainal161@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-indigo-400 transition-all hover:scale-110 active:scale-95 duration-200"
                        title="Mail"
                      >
                        <Mail className="h-6 w-6" />
                      </a>

                    </div>

                  </motion.div>

                </div>

                {/* Simulated laptop browser footer bar strictly replicating reference screenshot margins */}
                <div className="border-t border-slate-900/80 pt-4 mt-8 flex flex-col gap-5 relative z-10">
                  <div className="flex items-center justify-between text-[8px] font-sans text-slate-550 select-none">
                    <div className="flex items-center gap-3">
                      <span className="hover:text-slate-400 cursor-pointer">Terms & Support</span>
                      <span className="h-1 w-1 rounded-full bg-slate-700" />
                      <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
                    </div>
                    <div>
                    </div>
                  </div>

                  {/* Quick interactive action buttons placed elegantly between Privacy Policy and Designed with Cosmos below them */}
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={() => handleScrollTo("projects")}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-display font-semibold text-[10px] uppercase tracking-wider transition-all hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Eksplorasi Portfolio Kami <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    
                    <button
                      onClick={() => handleScrollTo("contact")}
                      className="px-5 py-2.5 rounded-xl border border-indigo-950 hover:border-indigo-500 bg-[#0c0a21]/50 text-slate-300 hover:text-white font-display font-semibold text-[10px] uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                      Kirim Pesan
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ==============================================
             3. SKILLS SECTION (Keahlian)
           ============================================== */}
        <motion.section 
          id="skills" 
          className="space-y-12"
          initial={{ opacity: 0, x: -80, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
              KEAHLIAN UTAMA
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-slate-550 tracking-tight">
              Keahlian Yang Dikuasai
            </h2>
            <div className="h-1 w-12 bg-indigo-500 mx-auto rounded" />
          </div>

          <SkillsGrid />
        </motion.section>

        {/* ==============================================
             4. WORK EXPERIENCE TIMELINE
           ============================================== */}
        <motion.section 
          id="experience" 
          className="space-y-12"
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
              TIMELINE KARIR
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-slate-50 tracking-tight">
              Riwayat Pekerjaan & Aktivitas Freelance
            </h2>
            <div className="h-1 w-12 bg-indigo-500 mx-auto rounded" />
          </div>

          <div className="max-w-3xl mx-auto relative pt-4">
            
            {/* Fine vertical timeline vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[2px] sm:w-[1px] bg-gradient-to-b from-indigo-500/50 via-slate-800 to-transparent -translate-x-1/2 rounded-full" />

            {/* Timeline items list */}
            <div className="space-y-10 sm:space-y-12 relative">
              {WORK_EXPERIENCE.map((exp, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <div
                     key={index}
                     className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-12 relative ${
                       isEven ? "sm:flex-row-reverse" : ""
                     }`}
                  >
                    
                    {/* Glowing timeline dot node element */}
                    <div className="absolute left-6 sm:left-1/2 h-5 w-5 rounded-full bg-[#05040d] sm:bg-slate-950 border-2 border-indigo-500 -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                      <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                    </div>

                    {/* Timeline card container */}
                    <motion.div 
                      initial={{ 
                        opacity: 0, 
                        x: isMobile ? -50 : (isEven ? 80 : -80), 
                        rotateX: -10 
                      }}
                      whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.15 }}
                      className="w-full sm:w-[45%] pl-16 sm:pl-0"
                    >
                      <div className="glass-panel p-5 sm:p-6 rounded-2xl space-y-4 hover:border-indigo-500/30 transition-all duration-300">
                        {/* Title group */}
                        <div className="space-y-1.5">
                          <span className="inline-block text-[10px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md font-bold mb-1 sm:mb-0">
                            {exp.period}
                          </span>
                          <h3 className="font-display font-semibold text-base sm:text-lg text-slate-50 tracking-tight leading-snug">
                            {exp.role}
                          </h3>
                          <p className="text-slate-400 text-[11px] sm:text-xs font-mono font-medium flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 inline-block"/>
                            {exp.company}
                          </p>
                        </div>

                        {/* Description points */}
                        <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed font-sans pl-1">
                           {exp.description.map((point, idx) => (
                             <li key={idx} className="flex items-start gap-2">
                               <span className="text-indigo-400/70 mt-0.5 text-[10px]">▹</span>
                               <span>{point}</span>
                             </li>
                           ))}
                         </ul>
                      </div>
                    </motion.div>

                    {/* Empty placeholder to structure layout on desktop side */}
                    <div className="hidden sm:block sm:w-[45%]" />

                  </div>
                );
              })}
            </div>

          </div>
        </motion.section>

        {/* ==============================================
             5. PROJECTS SHOWCASE SECTION
           ============================================== */}
        <motion.section 
          id="projects" 
          className="space-y-12"
          initial={{ opacity: 0, y: 100, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
              HASIL KARYA / PROJECTS
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-slate-50 tracking-tight">
              Gallery Project
            </h2>
            <div className="h-1 w-12 bg-indigo-500 mx-auto rounded" />
          </div>

          {/* Core filterable project grid and interactive playground model */}
          <ProjectShowcase />
        </motion.section>

        {/* ==============================================
             6. TOOLS DESIGN STACK LOGO GRID
           ============================================== */}
        <motion.section 
          className="space-y-12"
          initial={{ opacity: 0, y: -60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
              SOFTWARE & UTILITIES
            </span>
            <h2 className="font-display font-medium text-2xl sm:text-3xl text-slate-50 tracking-tight">
              Alat Kerja Pemula Tangguh
            </h2>
            <div className="h-1 w-12 bg-indigo-500 mx-auto rounded" />
          </div>

          {/* Simple minimalist grid cards with mono icon references details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {TOOLS.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.1 }}
                className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 group cursor-pointer transition-all duration-300 hover:border-indigo-500/30"
              >
                {/* Tech logo icons simulated styling */}
                <div className={`h-11 w-11 rounded-lg bg-slate-800/60 border border-slate-700/30 flex items-center justify-center text-sm font-bold shadow-inner ${tool.color} group-hover:scale-105 transition-transform duration-300 overflow-hidden`}>
                  {tool.image ? (
                    <img src={tool.image} alt={tool.name} className="w-full h-full p-1.5 object-contain" />
                  ) : (
                    <>
                      {tool.name === "Figma" && "Fg"}
                      {tool.name === "Photoshop" && "Ps"}
                      {tool.name === "Canva" && "Cv"}
                      {tool.name === "CapCut" && "Cc"}
                      {tool.name === "VS Code" && "VSC"}
                      {tool.name === "Pixellab" && "PL"}
                      {tool.name === "Photopea" && "Pp"}
                      {tool.name === "GitHub" && "GH"}
                    </>
                  )}
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-200 block">
                    {tool.name}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
                    {tool.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ==============================================
             9. CERTIFICATES & DIPLOMA SHOWCASE
           ============================================== */}
        <motion.section 
          id="certificates" 
          className="space-y-12"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
              KREDENSIAL & SERTIFIKAT
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-slate-50 tracking-tight">
              Ijazah & Sertifikasi
            </h2>
            <div className="h-1 w-12 bg-indigo-500 mx-auto rounded" />
          </div>

          <CertificatesSection />
        </motion.section>

        {/* ==============================================
             10. CONTACT SECTION & CONNECTIONS
           ============================================== */}
        <motion.section 
          id="contact" 
          className="space-y-12"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        >
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
              KONTAK & DISKUSI
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-slate-50 tracking-tight">
              Mulai Kolaborasi Proyek Anda
            </h2>
            <div className="h-1 w-12 bg-indigo-500 mx-auto rounded" />
          </div>

          {/* Contact form and admin local logs */}
          <ContactForm />


        </motion.section>

      </main>

      {/* ==============================================
           11. FOOTER SIGNATURE
         ============================================== */}
      <footer className="relative z-10 bg-[#070514]/45 py-12 text-center text-sm font-sans mt-0">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <div className="flex items-center justify-center gap-2">
            <div className="h-7 w-7 bg-[#0b072a] border border-indigo-500/25 rounded flex items-center justify-center">
              <span className="font-display font-bold text-indigo-400 text-xs">HZ</span>
            </div>
            <span className="font-display font-semibold text-slate-200 font-bold">Habib Zaenal Mustofa Portfolio</span>
          </div>

          <p className="text-slate-500 text-xs max-w-sm mx-auto italic">
            &ldquo;Designing experiences with simplicity and purpose.&rdquo;
          </p>

          <div className="text-[11px] font-mono text-slate-600 space-y-1">
            <span>&copy; {new Date().getFullYear()} Habib Zaenal Mustofa. Hak Cipta Dilindungi Undang-Undang.</span>
            <span className="block text-[10px] text-slate-700 font-sans mt-1">
              Dibuat dengan React, Tailwind CSS, & Framer Motion.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
