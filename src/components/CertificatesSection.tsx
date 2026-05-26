import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, 
  FileText, 
  ExternalLink, 
  Download, 
  Eye, 
  CheckCircle2, 
  Link2, 
  Settings, 
  X,
  FileCheck,
  Calendar,
  Building2,
  Lock,
  Bookmark
} from "lucide-react";

interface DocumentItem {
  id: string;
  type: "diploma" | "certificate";
  title: string;
  issuer: string;
  year: string;
  fileSize: string;
  badge: string;
  description: string;
  mockCredentialNum: string;
  gradient: string;
  imageUrl?: string;
}

const DEFAULT_DOCUMENTS: DocumentItem[] = [
  {
    id: "document-ijasah",
    type: "diploma",
    title: "Ijazah Sarjana (S1) - Teknik Industri",
    issuer: "Universitas PGRI Madiun",
    year: "2024",
    fileSize: "2.4 MB",
    badge: "Ijazah Resmi S1",
    description: "Pertanggungjawaban resmi kelulusan Strata Satu (S1) Program Studi Teknik Industri dari Universitas PGRI Madiun (UNIPMA) dengan penguasaan matang di bidang analisis optimasi sistem terintegrasi, manajemen kualitas, logistik, pengoperasian manufaktur, serta kesehatan keselamatan kerja (K3).",
    mockCredentialNum: "2620122024000014",
    gradient: "from-blue-600/30 via-indigo-600/10 to-transparent",
    imageUrl: "https://res.cloudinary.com/dopwo368m/image/upload/v1779735928/IJASAH_S1_Habib__nichhk.jpg"
  },
  {
    id: "document-cert-seminar",
    type: "certificate",
    title: "Sertifikat Seminar Nasional Sebagai Pemakalah",
    issuer: "SENRIABDI (Universitas Sahid Surakarta)",
    year: "2023",
    fileSize: "1.4 MB",
    badge: "Sertifikat Pemakalah",
    description: "Sertifikat penghargaan dari Seminar Nasional Hasil Riset dan Pengabdian (SENRIABDI) 2023 dengan tema \"Tantangan dan Peluang Perguruan Tinggi dalam Menghadapi AI dan Data Science\" yang diselenggarakan oleh Universitas Sahid Surakarta, diberikan kepada pemakalah atas kontribusi pemaparan hasil artikel ilmiah.",
    mockCredentialNum: "14/059/Senriabdi/Usahid-Ska/XII/2023",
    gradient: "from-amber-600/30 via-orange-600/10 to-transparent",
    imageUrl: "https://res.cloudinary.com/dopwo368m/image/upload/v1779735932/SERTIFIKAT_SEMINAR_NASIONAL_SEBAGAI_PEMAKALAH__ezz2tn.jpg"
  }
];

export default function CertificatesSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [docLinks, setDocLinks] = useState<Record<string, string>>({
    "document-ijasah": "",
    "document-cert-seminar": ""
  });
  
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempLinks, setTempLinks] = useState<Record<string, string>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load saved document links on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_document_links");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDocLinks(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Error loading links", e);
      }
    }
  }, []);

  const handleOpenEdit = () => {
    setTempLinks({ ...docLinks });
    setIsEditMode(true);
  };

  const handleSaveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("portfolio_document_links", JSON.stringify(tempLinks));
    setDocLinks(tempLinks);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditMode(false);
    }, 1500);
  };

  const handleViewDocument = (doc: DocumentItem) => {
    const link = docLinks[doc.id];
    if (link && link.trim().startsWith("http")) {
      // If a real link is configured, open it directly in a new tab
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      // Otherwise, open our interactive beautiful modal preview
      setSelectedDoc(doc);
    }
  };

  return (
    <div className="space-y-12">
      {/* Main Grid containing the styled document tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {DEFAULT_DOCUMENTS.map((doc, idx) => {
          const hasCustomLink = docLinks[doc.id] && docLinks[doc.id].trim().startsWith("http");
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={doc.id}
              initial={{ 
                opacity: 0, 
                x: isMobile ? (isEven ? -60 : 60) : (isEven ? -150 : 150), 
                y: 0 
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut", 
                delay: idx * 0.15 
              }}
              className="glass-panel rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-colors duration-300 flex flex-col justify-between group h-full relative"
            >
              {/* Decorative radial overlay matching background color card gradients */}
              <div className={`absolute -top-10 -right-10 w-44 h-44 rounded-full bg-gradient-to-br ${doc.gradient} blur-[40px] opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none`} />

              <div>
                {/* Image Container on Top */}
                <div 
                  onClick={() => handleViewDocument(doc)}
                  className="h-56 w-full relative overflow-hidden bg-[#070514] border-b border-indigo-950/40 flex items-center justify-center p-3 cursor-pointer group/img"
                >
                  {doc.imageUrl ? (
                    <img 
                      src={doc.imageUrl} 
                      alt={doc.title} 
                      className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-500 w-full h-full border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
                      <Bookmark className="h-8 w-8 text-indigo-500/30 mb-2" />
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#7f88b5]">No Image Preview</span>
                    </div>
                  )}

                  {/* Hover Overlay Button to open the high-fidelity modal */}
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <span
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-205 flex items-center gap-1.5 border border-indigo-500/30"
                    >
                      <Eye className="h-3.5 w-3.5" /> Detail & Zoom
                    </span>
                  </div>
                </div>

                {/* Description & metadata Compartment below */}
                <div className="p-6 space-y-4 relative z-10 text-left">
                  {/* Badge & Year Row */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      {doc.badge}
                    </span>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-900/30 px-2 py-0.5 rounded">
                      {doc.year}
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <div className="space-y-1.5">
                    <h3 className="text-base font-display font-bold text-slate-100 group-hover:text-indigo-300 transition-colors leading-snug">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-slate-500" />
                      {doc.issuer}
                    </p>
                  </div>

                  {/* Description text */}
                  <p className="text-xs text-slate-400 leading-relaxed text-left line-clamp-3">
                    {doc.description}
                  </p>

                  {/* Attachment Credential box info */}
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-indigo-950/30 flex items-center justify-between text-[10px] font-mono">
                    <div className="flex items-center gap-2 text-slate-400">
                      {doc.type === "diploma" ? (
                        <Bookmark className="h-3.5 w-3.5 text-indigo-400" />
                      ) : (
                        <Award className="h-3.5 w-3.5 text-indigo-400" />
                      )}
                      <span className="truncate max-w-[200px]" title={doc.mockCredentialNum}>
                        No: {doc.mockCredentialNum}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* 2. MANAGE LINKS / UPLOADER PANEL MODAL */}
      <AnimatePresence>
        {isEditMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditMode(false)}
              className="absolute inset-0 bg-[#020108]/85 backdrop-blur-md"
            />

            {/* Content Container Card */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg rounded-2xl border border-indigo-950 bg-[#080712] p-6 shadow-2xl z-10 overflow-hidden"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-indigo-600/5 blur-[50px] pointer-events-none" />

              <div className="flex items-center justify-between pb-3 border-b border-indigo-950/40">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-indigo-400" />
                  <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                    Keloba Link Lampiran
                  </h4>
                </div>
                <button
                  onClick={() => setIsEditMode(false)}
                  className="rounded-lg p-1.5 hover:bg-slate-850 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Explanatory subtitle */}
              <div className="p-3 my-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-[11px] leading-relaxed text-slate-300 text-left">
                Gunakan panel ini untuk menaruh tautan unduh/lihat langsung dokumen asli Anda (seperti url Google Drive Shared PDF, Dropbox, atau Cloudinary link). Jika disimpan, tombol "Lihat" akan otomatis membuka berkas tersebut.
              </div>

              <form onSubmit={handleSaveLinks} className="space-y-4 text-left">
                {DEFAULT_DOCUMENTS.map((doc) => (
                  <div key={doc.id} className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      {doc.badge} ({doc.year})
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Link2 className="h-3.5 w-3.5 text-slate-500" />
                      </div>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/file/d/..."
                        value={tempLinks[doc.id] || ""}
                        onChange={(e) => setTempLinks({ ...tempLinks, [doc.id]: e.target.value })}
                        className="w-full text-xs py-2.5 pl-9 pr-4 rounded-xl border border-slate-800 bg-[#05040d] text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-indigo-950/40 mt-5">
                  <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saveSuccess}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:scale-[1.01] active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center min-w-[120px]"
                  >
                    {saveSuccess ? "Tersimpan!" : "Simpan Tautan"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. INTERACTIVE HIGH-FIDELITY PREVIEW LIGHTBOX */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoc(null)}
              className="absolute inset-0 bg-[#010105]/95 backdrop-blur-md"
            />

            {/* Credential Certificate Canvas UI */}
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#090815] border border-indigo-900/60 rounded-2xl p-6 sm:p-8 shadow-2xl z-20 text-center overflow-hidden"
            >
              {/* Ornate corners simulating classic security border on certificates */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-500/30" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-500/30" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-500/30" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-500/30" />

              <div className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />
              <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 rounded-full bg-amber-500/5 blur-[80px] pointer-events-none" />

              {/* Close Button UI */}
              <button
                onClick={() => setSelectedDoc(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-xl bg-slate-900/40 border border-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Certificate content - render actual uploaded image or simulated cert */}
              <div className="space-y-4">
                <div className="text-left mb-2">
                  <h4 className="text-base font-display font-medium text-white">
                    {selectedDoc.title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Diterbitkan oleh: <span className="text-indigo-400 font-medium">{selectedDoc.issuer}</span> ({selectedDoc.year})
                  </p>
                </div>

                {selectedDoc.imageUrl ? (
                  <div className="rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800 shadow-2xl p-1.5 max-h-[70vh] flex items-center justify-center">
                    <img 
                      src={selectedDoc.imageUrl} 
                      alt={selectedDoc.title} 
                      className="max-h-[62vh] w-auto object-contain rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="border border-amber-500/20 rounded-xl p-5 sm:p-8 space-y-6 bg-slate-950/40 relative">
                    {/* Visual Seal / Frame logo */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-600/3 border border-amber-500/40 flex items-center justify-center text-amber-500 relative">
                        <Award className="h-7 w-7" />
                        <div className="absolute inset-0.5 rounded-full border border-dashed border-amber-500/30 animate-spin-slow pointer-events-none" />
                      </div>
                      <span className="text-[10px] font-mono tracking-[0.2em] font-bold text-amber-500 uppercase mt-2">
                        Official Credential Preview
                      </span>
                    </div>

                    {/* Main certification declaration */}
                    <div className="space-y-1">
                      <span className="text-xs italic text-slate-400 font-serif">Kredensial Resmi Diberikan Kepada</span>
                      <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white tracking-wide mt-2">
                        Habib Zaenal Mustofa
                      </h3>
                      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto my-3" />
                    </div>

                    {/* Achievement statement */}
                    <div className="max-w-md mx-auto space-y-2">
                      <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                        Atas penyelesaian yang luar biasa dan pemenuhan seluruh persyaratan akademis di bidang:
                      </p>
                      <p className="text-sm font-display font-extrabold text-amber-400 tracking-tight leading-snug">
                        {selectedDoc.title}
                      </p>
                      <p className="text-[11px] text-slate-400 italic">
                        Diterbitkan oleh institusi terdaftar: <strong className="text-slate-300 not-italic font-bold">{selectedDoc.issuer}</strong> pada tahun {selectedDoc.year}.
                      </p>
                    </div>

                    {/* Seals, Signatures, Verification Details Row */}
                    <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-900 mt-6 text-center">
                      <div className="space-y-1">
                        <div className="h-10 flex items-end justify-center">
                          <span className="font-serif text-amber-500/30 italic text-xl select-none tracking-wider">
                            UNIPMA/NAST
                          </span>
                        </div>
                        <div className="h-[1px] w-20 bg-slate-800 mx-auto" />
                        <p className="text-[9px] font-mono uppercase tracking-wider text-slate-500">Tanda Tangan Authorized</p>
                      </div>

                      <div className="space-y-1">
                        <div className="h-10 flex items-end justify-center">
                          <div className="h-8 w-8 rounded-full border border-dashed border-amber-400/30 bg-[#151108] text-amber-500 flex items-center justify-center text-[10px] font-bold shadow-inner">
                            HZ
                          </div>
                        </div>
                        <div className="h-[1px] w-20 bg-slate-800 mx-auto" />
                        <p className="text-[9px] font-mono uppercase tracking-wider text-slate-500">Nomor Registrasi Kredensial</p>
                        <p className="text-[8px] font-mono text-amber-500/80">{selectedDoc.mockCredentialNum}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action notice at the bottom telling user how to customize */}
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-indigo-950/25">
                <p className="text-[10px] text-slate-500 text-left">
                  *Kredensial ini dimuat secara visual sebagai salinan digital resmi.
                </p>
                {selectedDoc.imageUrl && (
                  <a
                    href={selectedDoc.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Buka Gambar Penuh
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
