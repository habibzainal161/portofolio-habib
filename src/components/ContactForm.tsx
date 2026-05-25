import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, Inbox, Mail, User, BookOpen, MessageSquare, Trash2, ArrowRight, Instagram, MessageCircle, Music } from "lucide-react";

interface SavedMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [savedMessages, setSavedMessages] = useState<SavedMessage[]>([]);
  const [showInbox, setShowInbox] = useState(false);

  // Load existing draft messages on mount
  useEffect(() => {
    const data = localStorage.getItem("portfolio_messages");
    if (data) {
      try {
        setSavedMessages(JSON.parse(data));
      } catch (e) {
        console.error("Error decoding storage format", e);
      }
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setValidationError("Harap lengkapi semua isian bertanda bintang!");
      return;
    }

    setValidationError("");
    setSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      const newMessage: SavedMessage = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        subject: subject || "No Subject",
        message,
        timestamp: new Date().toLocaleString(),
      };

      const updated = [newMessage, ...savedMessages];
      setSavedMessages(updated);
      localStorage.setItem("portfolio_messages", JSON.stringify(updated));

      // Reset form fields
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      setSubmitting(false);
      setSuccess(true);

      // Reset success banner after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 1200);
  };

  const deleteMessage = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    const updated = savedMessages.filter((msg) => msg.id !== id);
    setSavedMessages(updated);
    localStorage.setItem("portfolio_messages", JSON.stringify(updated));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      {/* Contact Form input container (7 columns) */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 2.0, ease: "easeOut" }}
        className="lg:col-span-7 glass-panel rounded-2xl p-8 relative overflow-hidden space-y-6"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.03)_0%,transparent_50%)] pointer-events-none" />

        <div className="space-y-1.5">
          <h3 className="font-display font-medium text-xl text-slate-100">Kirim Pesan Langsung</h3>
          <p className="text-slate-400 text-xs font-sans">
            Ada proyek kerja sama, penawaran freelance, atau sekadar ingin menyapa? Hubungi saya kapan saja!
          </p>
        </div>

        {/* Success Alert Banner */}
        {success && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-3 animate-fadeIn">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-200">
              <span className="font-bold block text-emerald-400">Pesan Terkirim dengan Sukses!</span>
              Terima kasih atas pesan Anda. Data telah disimpan secara lokal dan dapat diperiksa pada panel Inbox Demo di bawah.
            </div>
          </div>
        )}

        {/* Validation Error Warning Banner */}
        {validationError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-3 animate-fadeIn">
            <div className="text-xs text-red-400">
              <span className="font-bold block">Kesalahan Validasi</span>
              {validationError}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-amber-500/80" /> Nama Lengkap <span className="text-amber-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Budi Santoso"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-4 py-3 placeholder-slate-500 text-slate-100 text-xs focus:outline-none focus:border-amber-500 focus:bg-slate-800/60 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-amber-500/80" /> Alamat Email <span className="text-amber-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="budi@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-4 py-3 placeholder-slate-500 text-slate-100 text-xs focus:outline-none focus:border-amber-500 focus:bg-slate-800/60 transition-colors"
              />
            </div>

            {/* Subject Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-amber-500/80" /> Subjek / Tujuan
              </label>
              <input
                type="text"
                placeholder="Penawaran Desain / Freelance"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-4 py-3 placeholder-slate-500 text-slate-100 text-xs focus:outline-none focus:border-amber-500 focus:bg-slate-800/60 transition-colors"
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-amber-500/80" /> Isi Pesan <span className="text-amber-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              placeholder="Tuliskan ide proyek Anda secara terperinci atau poin diskusi yang ingin dibahas..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-4 py-3 placeholder-slate-500 text-slate-100 text-xs focus:outline-none focus:border-amber-500 focus:bg-slate-800/60 transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4.5 rounded-xl bg-amber-500 disabled:opacity-55 hover:bg-amber-600 font-display font-semibold text-slate-950 text-xs uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                <span>MENGIRIM PESAN...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Kirim Pesan Sekarang</span>
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Local Inbox / Quick contact points (5 columns) */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 2.0, ease: "easeOut", delay: 0.2 }}
        className="lg:col-span-5 space-y-6 flex flex-col justify-between"
      >
        
        {/* Connection card instructions */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden space-y-4">
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-bold">CONTACT NOTICE</span>
          <h4 className="font-display font-medium text-base text-slate-100">Evaluasi & Pengiriman Asli</h4>
          <p className="text-slate-400 text-xs leading-relaxed font-sans">
            Formulir di samping terhubung langsung menggunakan basis state lokal. Semua draf pesan yang dikirim tidak akan hilang jika tab browser dimuat ulang, sehingga Anda dapat dengan mudah mengujinya.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setShowInbox(!showInbox)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700/70 text-slate-200 hover:text-white hover:border-amber-500/50 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer w-full justify-center orange-glow"
            >
              <Inbox className="h-4 w-4 text-amber-500" />
              <span>{showInbox ? "Sembunyikan" : "Periksa"} Kotak Keluar ({savedMessages.length})</span>
            </button>
          </div>
        </div>

        {/* Local sandbox message output box (Inbox display) */}
        {showInbox && (
          <div className="glass-panel rounded-2xl p-6 space-y-4 flex-1 max-h-[300px] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-amber-500 flex items-center gap-1.5 flex-1 select-none">
                <Inbox className="h-4 w-4" /> LOCAL DEOUT INBOX
              </span>
              {savedMessages.length > 0 && (
                <div className="flex items-center gap-2">
                  {showConfirmClear ? (
                    <div className="flex items-center gap-1.5 animate-fadeIn">
                      <span className="text-[10px] text-red-400">Hapus semua?</span>
                      <button
                        type="button"
                        onClick={() => {
                          setSavedMessages([]);
                          localStorage.removeItem("portfolio_messages");
                          setShowConfirmClear(false);
                        }}
                        className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-semibold hover:bg-red-500/30 cursor-pointer transition-colors"
                      >
                        Ya
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowConfirmClear(false)}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        Batal
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowConfirmClear(true)}
                      title="Dikosongkan"
                      className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3">
              {savedMessages.map((msg) => (
                <div key={msg.id} className="p-3 bg-slate-850/60 rounded-xl border border-slate-800 space-y-1.5 relative group">
                  <button
                    onClick={(e) => deleteMessage(msg.id, e)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-500 hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span className="font-bold text-slate-300">{msg.name}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-sans">
                    <strong>Email:</strong> {msg.email} &bull; <strong>Subjek:</strong> {msg.subject}
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1 whitespace-pre-line">{msg.message}</p>
                </div>
              ))}

              {savedMessages.length === 0 && (
                <div className="py-10 text-center text-slate-600 text-xs font-sans">
                  Belum ada pesan yang terekam. Silakan isi form di samping dan kirim!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick connect details list */}
        <div className="space-y-3">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-800/15 border border-slate-800/40 hover:border-slate-800 transition-colors">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=habibzainal161@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-lg bg-orange-500/5 border border-orange-500/15 flex items-center justify-center text-amber-500 hover:bg-amber-500/15 hover:border-amber-500/40 transition-colors cursor-pointer"
              title="Kirim Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block">EMAIL RESMI</span>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=habibzainal161@gmail.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:text-amber-400 text-slate-200 font-medium transition-colors"
              >
                habibzainal161@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-800/15 border border-slate-800/40 hover:border-slate-800 transition-colors">
            <a 
              href="https://wa.me/6285706514201" 
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-lg bg-orange-500/5 border border-orange-500/15 flex items-center justify-center text-amber-500 hover:bg-amber-500/15 hover:border-amber-500/40 transition-colors cursor-pointer"
              title="Chat WhatsApp"
            >
              <img src="https://res.cloudinary.com/dopwo368m/image/upload/v1779698662/whatsapp_ptyxrv.png" alt="WhatsApp" className="h-5 w-5 object-contain" style={{ filter: "brightness(0) saturate(100%) invert(69%) sepia(45%) saturate(3058%) hue-rotate(352deg) brightness(101%) contrast(93%)" }} />
            </a>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block">WHATSAPP CHAT</span>
              <a 
                href="https://wa.me/6285706514201" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:text-amber-400 text-slate-200 font-medium transition-colors"
              >
                0857-0651-4201
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-800/15 border border-slate-800/40 hover:border-slate-800 transition-colors">
            <a 
              href="https://instagram.com/habibzm_" 
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-lg bg-orange-500/5 border border-orange-500/15 flex items-center justify-center text-amber-500 hover:bg-amber-500/15 hover:border-amber-500/40 transition-colors cursor-pointer"
              title="Follow Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block">INSTAGRAM</span>
              <a 
                href="https://instagram.com/habibzm_" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:text-amber-400 text-slate-200 font-medium transition-colors"
              >
                @habibzm_
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#08061a]/40 border border-slate-800/40 hover:border-slate-800 transition-colors">
            <a 
              href="https://www.tiktok.com/@habibzm13" 
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-lg bg-orange-500/5 border border-orange-500/15 flex items-center justify-center text-amber-500 hover:bg-amber-500/15 hover:border-amber-500/40 transition-colors cursor-pointer"
              title="Kunjungi TikTok"
            >
              <img src="https://res.cloudinary.com/dopwo368m/image/upload/v1779698662/tik-tok_nxvfqu.png" alt="TikTok" className="h-5 w-5 object-contain" style={{ filter: "brightness(0) saturate(100%) invert(69%) sepia(45%) saturate(3058%) hue-rotate(352deg) brightness(101%) contrast(93%)" }} />
            </a>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block">TIKTOK CHANNEL</span>
              <a 
                href="https://www.tiktok.com/@habibzm13" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:text-amber-400 text-slate-200 font-medium transition-colors"
              >
                @habibzm13
              </a>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
