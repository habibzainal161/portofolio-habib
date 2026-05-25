import { useState } from "react";
import { motion } from "motion/react";
import { SKILLS } from "../data";
import { Code2, Star, Image as ImageIcon, Palette, Film, PenTool } from "lucide-react";

export default function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState<"Software & Utilities">("Software & Utilities");

  const categories = ["Software & Utilities"] as const;

  const filteredSkills = SKILLS.filter(skill => skill.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Grid listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50, rotateX: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
            className="glass-panel rounded-2xl p-6 glass-panel-hover flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                {/* Category Icon */}
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/30 text-slate-350">
                  {skill.name === "Photoshop" && <ImageIcon className="h-5 w-5 text-indigo-400" />}
                  {skill.name === "Canva" && <Palette className="h-5 w-5 text-indigo-400" />}
                  {skill.name === "CapCut" && <Film className="h-5 w-5 text-indigo-400" />}
                  {skill.category === "Software & Utilities" && !["Photoshop", "Canva", "CapCut"].includes(skill.name) && <Code2 className="h-5 w-5 text-indigo-400" />}
                </div>

                {/* Capability percentage bubble */}
                <div className="flex items-center gap-1 bg-indigo-500/5 px-2.5 py-1 rounded-full border border-indigo-500/10">
                  <Star className="h-3 w-3 text-indigo-400 fill-indigo-400/30" />
                  <span className="text-[10px] font-mono font-bold text-indigo-400">{skill.level}%</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display font-semibold text-base text-slate-100">
                  {skill.name}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  {skill.description}
                </p>
              </div>
            </div>

            {/* Glowing progress bar indicator */}
            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>KECAKAPAN</span>
                <span>
                  {skill.level >= 90 ? "PRO" : skill.level >= 75 ? "ADVANCED" : "BEGINNER"}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: false }}
                  transition={{ duration: 2.0, delay: 0.2 + index * 0.1 }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
