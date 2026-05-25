import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import { PROJECTS } from "../data";
import { ExternalLink, Github, Search, Eye, X, Sparkles, Check, ShoppingBag, Lightbulb, Play, Smartphone, Palette, Grid, Laptop, Tablet, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState<"all" | "design" | "dev">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);

  // Data Mockup Galeri
  const PROJECT_GALLERY = {
    "proj-1": [
      { type: "image", url: "https://res.cloudinary.com/dopwo368m/image/upload/v1779684722/Semoga_damai_Natal_menyertai_setiap_langkah_kita_dan_membawa_semangat_baru_untuk_bertumbuh_bers_u52wus.jpg", title: "Christmas Greeting" },
      { type: "image", url: "https://res.cloudinary.com/dopwo368m/image/upload/v1779684722/Lamar_dan_Raih_Kesempatanmu_Pastikan_selalu_cek_latar_belakang_perusahaan_sebelum_mengambil_ke_tqsvfb.jpg", title: "Job Vacancy Poster 1" },
      { type: "image", url: "https://res.cloudinary.com/dopwo368m/image/upload/v1779684721/DIBUTUHKAN_SEGERAPersyaratan_dan_ketentuan_lainnya_ada_pada_poster._Lamar_secepatnya_ketika_mel_jn0mgq.webp", title: "Job Vacancy Poster 2" },
      { type: "image", url: "https://res.cloudinary.com/dopwo368m/image/upload/v1779684721/Selamat_Memperingati_Hari_Kenaikan_Isa_Al_Masih_Kiranya_kasih_damai_dan_pengharapan_senanti_og5vxp.jpg", title: "Ascension Day Poster" },
      { type: "image", url: "https://res.cloudinary.com/dopwo368m/image/upload/v1779684721/Selamat_Tahun_Baru_Imlek_semoga_keberuntungan_dan_kesuksesan_senantiasa_menghampiri_%EF%B8%8F_%EF%B8%8F_uedfww.jpg", title: "Chinese New Year Poster" },
      { type: "image", url: "https://res.cloudinary.com/dopwo368m/image/upload/v1779684721/LOWONGAN_PEKERJAAN_DIBUTUHKAN_SEGERA_novusstreamlab.idNOVUS_Stream_Lab_membuka_kesemp_mwrjp8.webp", title: "Job Vacancy Poster 3" },
      { type: "image", url: "https://res.cloudinary.com/dopwo368m/image/upload/v1779684721/SCOOTERIST_KEMAREN_SORE_mengucapkan_SELAMAT_IDUL_FITRI_1447_HIJRIAH._Minal_Aidzin_Wal_Faidzin_b5ondb.webp", title: "Eid Mubarak Poster" },
      { type: "image", url: "https://res.cloudinary.com/dopwo368m/image/upload/v1779688025/Salinan_NADA_ishaqp.png", title: "Social Media Design 8" }
    ],
    "proj-2": [
      { type: "image", url: "https://res.cloudinary.com/dopwo368m/image/upload/v1779687776/Screenshot_2025-07-11_053406_hpeg5u.png", title: "Live Streaming Promo 1" },
      { type: "image", url: "https://res.cloudinary.com/dopwo368m/image/upload/v1779687764/Screenshot_2025-07-11_053546_mwi16q.png", title: "Live Streaming Promo 2" },
      { type: "image", url: "https://res.cloudinary.com/dopwo368m/image/upload/v1779687703/Screenshot_2025-07-10_232915_iprrjn.png", title: "Live Streaming Promo 3" },
      { type: "image", url: "https://res.cloudinary.com/dopwo368m/image/upload/v1779687681/Screenshot_2025-07-06_201102_diyzui.png", title: "Live Streaming Promo 4" },
    ],
    "proj-3": [
      { type: "video", url: "https://res.cloudinary.com/dopwo368m/video/upload/v1779683314/Talent_Show_Mutiara_Hati_2026_lhu4bo.mp4", title: "Talent Show" },
      { type: "video", url: "https://res.cloudinary.com/dopwo368m/video/upload/v1779683312/NGM_konten_3_byplxo.mp4", title: "NGM Content 3" },
      { type: "video", url: "https://res.cloudinary.com/dopwo368m/video/upload/v1779683312/NGM_konten_7_hwzls9.mp4", title: "NGM Content 7" },
      { type: "iframe", url: "https://drive.google.com/file/d/1oOnmHjoXFeDJke8X68uALUFcwdkI-FrY/preview", title: "Video Drive 1" },
      { type: "iframe", url: "https://drive.google.com/file/d/1hOQRaKSD30vrcseJ644M4KReuP28YlZz/preview", title: "Video Drive 2" },
      { type: "iframe", url: "https://drive.google.com/file/d/1lvD0vNxoII8G9RSB5H9uLI_6c27ojXuN/preview", title: "Video Drive 3" },
      { type: "iframe", url: "https://drive.google.com/file/d/1fy57F_sU8d83FKCQPP7Y2gDd1VkHaAle/preview", title: "Video Drive 4" }
    ]
  };

  const getFilteredProjects = () => {
    let filtered = PROJECTS;

    // Filter by Tab
    if (activeTab === "design") {
      filtered = PROJECTS.filter((p) =>
        p.category.toLowerCase().includes("branding") ||
        p.category.toLowerCase().includes("logo") ||
        p.category.toLowerCase().includes("social") ||
        p.category.toLowerCase().includes("ui")
      );
    } else if (activeTab === "dev") {
      filtered = PROJECTS.filter((p) =>
        p.category.toLowerCase().includes("development") ||
        p.tools.includes("React") ||
        p.tools.includes("Tailwind CSS")
      );
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tools.some((t) => t.toLowerCase().includes(q))
      );
    }

    return filtered;
  };

  const filteredProjects = getFilteredProjects();

  // Reset state when project changes
  useEffect(() => {
    setActiveMediaIndex(null);
  }, [selectedProject]);

  const currentGallery = selectedProject ? PROJECT_GALLERY[selectedProject.id as keyof typeof PROJECT_GALLERY] : [];
  const activeMedia = activeMediaIndex !== null && currentGallery ? currentGallery[activeMediaIndex] : null;

  const handlePrevMedia = (e: any) => {
    e.stopPropagation();
    if (activeMediaIndex !== null && currentGallery) {
      setActiveMediaIndex(activeMediaIndex > 0 ? activeMediaIndex - 1 : currentGallery.length - 1);
    }
  };

  const handleNextMedia = (e: any) => {
    e.stopPropagation();
    if (activeMediaIndex !== null && currentGallery) {
      setActiveMediaIndex(activeMediaIndex < currentGallery.length - 1 ? activeMediaIndex + 1 : 0);
    }
  };

  return (
    <div className="space-y-12">
      {/* Grid List */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.1 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              key={project.id}
              className="glass-panel rounded-2xl overflow-hidden glass-panel-hover group flex flex-col justify-between"
            >
              <div>
                {/* Thumb Visual Container */}
                <div className="h-52 w-full relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center p-6 border-b border-slate-800/60">
                  {/* Subtle decorative glow behind */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon illustrations for Placeholder or Project Image */}
                  {project.image && project.image !== "SOCIAL_MEDIA_DESIGN" && project.image !== "LIVE_STREAMING_PROMOTION" && project.image !== "CONTENT_CREATION_DESIGN" ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 rounded-xl" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-500 transform group-hover:scale-105 transition-transform duration-300 z-10 w-full h-full relative border border-dashed border-slate-700/50 rounded-xl bg-slate-900/30">
                      <div className="text-amber-500/40 mb-3">
                        {project.title === "Social Media Design" && <Grid className="h-10 w-10 mx-auto" />}
                        {project.title === "Live Streaming Promotion" && <Play className="h-10 w-10 mx-auto" />}
                        {project.title === "Content Creation Design" && <Smartphone className="h-10 w-10 mx-auto" />}
                      </div>
                      <span className="text-[10px] shadow-sm uppercase font-mono tracking-widest text-slate-400 mb-1">
                        [ Image Space ]
                      </span>
                      <span className="text-[8px] font-mono tracking-widest text-slate-600 px-6 text-center leading-relaxed">
                        Ruang untuk file
                      </span>
                    </div>
                  )}

                  {/* Overlay Action Button */}
                  <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-semibold cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5"
                    >
                      <Grid className="h-3.5 w-3.5" /> Buka Galeri
                    </button>
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-6 space-y-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-semibold bg-amber-500/5 px-2 py-1 rounded inline-block">
                    {project.category}
                  </span>
                  <h3 className="font-display font-bold text-lg text-slate-100 group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-500">
            <span className="block text-2xl mb-2">🔍</span>
            <p className="text-sm">Tidak menemukan hasil project dengan kata kunci tersebut.</p>
          </div>
        )}
      </motion.div>

      {/* Simulator Modal Box */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="absolute w-full max-w-4xl bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button top corner */}
              <div className="absolute top-4 right-4 z-40">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-slate-800/80 border border-slate-700/70 text-slate-300 hover:text-white cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Left Column: Information Area (5 cols) */}
              <div className="md:col-span-5 p-8 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 bg-amber-500/5 px-2 py-1 rounded">
                      {selectedProject.category}
                    </span>
                    <h2 className="font-display font-bold text-2xl text-slate-50 mt-3 leading-tight">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Deskripsi</h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">{selectedProject.description}</p>
                  </div>

                </div>
              </div>

              {/* Right Column: Asset Placeholder Area (7 cols) */}
              <div className="md:col-span-7 bg-slate-950 p-8 flex flex-col justify-between min-h-[400px]">
                {/* Header controls */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      GALLERY PREVIEW MODE
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-2" style={{ maxHeight: "400px" }}>
                    {PROJECT_GALLERY[selectedProject.id as keyof typeof PROJECT_GALLERY]?.map((media, idx) => (
                      <div 
                         key={idx} 
                         className="group relative rounded-xl overflow-hidden border border-slate-700/50 bg-slate-800/20 aspect-[4/3] cursor-pointer"
                         onClick={() => setActiveMediaIndex(idx)}
                      >
                        {media.type === "image" ? (
                           <img src={media.url} alt={media.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                           <div className="w-full h-full relative flex items-center justify-center bg-slate-900 border-none outline-none">
                             {media.type === "video" ? (
                               <video src={media.url} className="w-full h-full object-cover opacity-50 border-none outline-none" muted playsInline />
                             ) : (
                               <div className="w-full h-full object-cover opacity-20 bg-slate-800" />
                             )}
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-10 h-10 rounded-full bg-amber-500/80 flex items-center justify-center backdrop-blur shadow-lg">
                                  <Play className="w-4 h-4 ml-0.5 text-slate-950" />
                                </div>
                             </div>
                           </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <span className="text-[10px] font-semibold text-white truncate drop-shadow-md">{media.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer instructions */}
                <p className="text-[10px] text-slate-500 text-center font-sans tracking-wide pt-4 border-t border-slate-800 mt-6 block">
                  Anda bisa mengganti ilustrasi placeholder ini dengan aset gambar sesungguhnya apabila project siap dipublikasikan.
                </p>
              </div>

              {/* Fullscreen Media Viewer */}
              <AnimatePresence>
                {activeMedia && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-8"
                  >
                    <button
                      onClick={() => setActiveMediaIndex(null)}
                      className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 text-white hover:bg-amber-500 transition-colors z-[60] cursor-pointer"
                    >
                      <X className="w-6 h-6" />
                    </button>

                    {currentGallery && currentGallery.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevMedia}
                          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-800/80 text-white hover:bg-amber-500 transition-colors z-[60] cursor-pointer"
                        >
                          <ChevronLeft className="w-8 h-8" />
                        </button>
                        <button
                          onClick={handleNextMedia}
                          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-800/80 text-white hover:bg-amber-500 transition-colors z-[60] cursor-pointer"
                        >
                          <ChevronRight className="w-8 h-8" />
                        </button>
                      </>
                    )}

                    {activeMedia.type === "video" || activeMedia.url.endsWith(".mp4") ? (
                      <video src={activeMedia.url} controls autoPlay className="max-w-full max-h-full rounded-lg shadow-2xl outline-none" />
                    ) : activeMedia.type === "iframe" ? (
                      <iframe src={activeMedia.url} className="w-[80vw] h-[80vh] max-w-5xl rounded-lg shadow-2xl outline-none bg-slate-900" title={activeMedia.title || "Video Preview"} allow="autoplay; fullscreen" />
                    ) : (
                      <img src={activeMedia.url} alt={activeMedia.title || "Preview"} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
