import { Skill, Experience, Project, Outcome, Certificate, SocialLink } from "./types";

export const PERSONAL_INFO = {
  name: "Habib Zaenal Mustofa",
  role: "Digital Marketing • Content Creator • Graphic Designer",
  tagline: "Creating Visual Content That Connects Brands With Audiences.",
  about: {
    intro: "Lulusan Teknik Industri dengan fokus pada bidang Digital Marketing, Content Creation, dan Graphic Design. Memiliki pengalaman dalam pembuatan konten visual kreatif, pengelolaan live streaming, serta desain materi promosi untuk mendukung campaign marketing dan meningkatkan engagement audience di berbagai platform digital.",
    domain: "Menguasai visual branding, layout design, typography, serta pengembangan konten berbasis tren dan kebutuhan pasar dengan pendekatan kreatif dan strategis. Terbiasa menggunakan berbagai tools desain dan editing untuk menghasilkan konten yang menarik, informatif, dan konsisten dengan identitas brand.",
    passion: "Memiliki kemampuan dalam melakukan riset tren, analisis performa konten, serta evaluasi strategi pemasaran digital guna meningkatkan efektivitas campaign dan memperluas jangkauan audiens.",
    careerGoal: "Melalui portofolio ini, saya berkomitmen kuat menyajikan pendekatan desain yang mengedepankan kejelasan pesan, keseimbangan komposisi estetis, serta signifikansi strategis pendorong peningkatan performa brand."
  }
};

export const SKILLS: Skill[] = [
  {
    name: "Photoshop",
    category: "Software & Utilities",
    level: 40,
    description: "Pengeditan foto dan pembuatan desain visual fundamental (Beginner)."
  },
  {
    name: "Canva",
    category: "Software & Utilities",
    level: 85,
    description: "Desain cepat, pembuatan presentasi, desain sosial media, dan aset visual lainnya (Advanced)."
  },
  {
    name: "CapCut",
    category: "Software & Utilities",
    level: 85,
    description: "Editing video mobile/desktop tingkat lanjut untuk short-form content dan vlog (Advanced)."
  }
];

export const WORK_EXPERIENCE: Experience[] = [
  {
    role: "Operator Live Streaming & Content Editor",
    company: "Novus Stream Lab",
    period: "2024 – 2026",
    description: [
      "Mendukung efektivitas promosi dan engagement audience melalui analisis performa live streaming berbasis data, dengan cara menyesuaikan strategi penawaran produk berdasarkan tren pasar dan perilaku pelanggan.",
      "Mendukung kebutuhan digital marketing dan visual branding perusahaan melalui pembuatan konten visual yang konsisten, dengan cara mendesain materi promosi sesuai identitas brand, target audiens, dan kebutuhan campaign marketing.",
      "Menjaga konsistensi desain pada berbagai materi promosi digital, dengan cara menerapkan prinsip layout, typography, dan visual identity dalam setiap desain konten.",
      "Membantu meningkatkan kualitas tampilan konten promosi untuk kebutuhan e-commerce dan live streaming, dengan cara melakukan revisi dan penyempurnaan desain berdasarkan feedback tim serta evaluasi performa konten.",
      "Berkolaborasi dengan tim marketing dalam pengembangan konsep konten dan desain promosi untuk mendukung kebutuhan campaign pemasaran digital."
    ]
  },
  {
    role: "Freelance Content Creator - Make-Up Artist Profesional",
    company: "Nada Gallery",
    period: "2025 – 2026",
    description: [
      "Mengonsep dan memproduksi video cinematic serta behind-the-scenes untuk menonjolkan detail dan kualitas hasil riasan dari profesional Make-Up Artist.",
      "Mengambil gambar dan merekam proses tata rias secara komprehensif, menciptakan portofolio visual yang memukau untuk meningkatkan daya tarik brand.",
      "Melakukan proses editing video tingkat lanjut menggunakan transisi dinamis dan color grading, guna memastikan konten yang dihasilkan memiliki nilai estetika tinggi dan relevan dengan tren media sosial terkini.",
      "Berkolaborasi langsung dengan Make-Up Artist dan klien untuk menyamakan visi kreatif serta mendokumentasikan setiap detail tata rias dengan optimal."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Social Media Design",
    category: "Design & Creative",
    description: "Eksplorasi desain komprehensif yang menampilkan portofolio materi promosi kreatif, mulai dari layout visual digital untuk feeds Instagram yang terstruktur, pembuatan poster komersial yang persuasif, hingga infografis interaktif. Fokus pada elemen desain yang relevan dengan identitas brand, peningkatan kualitas visual komunikasi, serta efektivitas desain dalam memaksimalkan reach dan nilai engagement audiens di platform media sosial.",
    image: "https://res.cloudinary.com/dopwo368m/image/upload/v1779692657/Social_Media_Design_gffqtd.png",
    images: [
      "https://res.cloudinary.com/dopwo368m/image/upload/v1779684722/Semoga_damai_Natal_menyertai_setiap_langkah_kita_dan_membawa_semangat_baru_untuk_bertumbuh_bers_u52wus.jpg",
      "https://res.cloudinary.com/dopwo368m/image/upload/v1779684722/Lamar_dan_Raih_Kesempatanmu_Pastikan_selalu_cek_latar_belakang_perusahaan_sebelum_mengambil_ke_tqsvfb.jpg",
      "https://res.cloudinary.com/dopwo368m/image/upload/v1779684721/DIBUTUHKAN_SEGERAPersyaratan_dan_ketentuan_lainnya_ada_pada_poster._Lamar_secepatnya_ketika_mel_jn0mgq.webp",
      "https://res.cloudinary.com/dopwo368m/image/upload/v1779684721/Selamat_Memperingati_Hari_Kenaikan_Isa_Al_Masih_Kiranya_kasih_damai_dan_pengharapan_senanti_og5vxp.jpg",
      "https://res.cloudinary.com/dopwo368m/image/upload/v1779684721/Selamat_Tahun_Baru_Imlek_semoga_keberuntungan_dan_kesuksesan_senantiasa_menghampiri_%EF%B8%8F_%EF%B8%8F_uedfww.jpg",
      "https://res.cloudinary.com/dopwo368m/image/upload/v1779684721/LOWONGAN_PEKERJAAN_DIBUTUHKAN_SEGERA_novusstreamlab.idNOVUS_Stream_Lab_membuka_kesemp_mwrjp8.webp",
      "https://res.cloudinary.com/dopwo368m/image/upload/v1779684721/SCOOTERIST_KEMAREN_SORE_mengucapkan_SELAMAT_IDUL_FITRI_1447_HIJRIAH._Minal_Aidzin_Wal_Faidzin_b5ondb.webp",
      "https://res.cloudinary.com/dopwo368m/image/upload/v1779688025/Salinan_NADA_ishaqp.png"
    ],
    tools: ["Canva", "Photoshop"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: "proj-2",
    title: "Live Streaming Promotion",
    category: "Digital Marketing",
    description: "Proyek yang mengkhususkan pada optimalisasi desain visual untuk menunjang aktivitas siaran langsung. Mencakup perancangan template promosi pra-live, pembuatan interaktif overlay yang menarik selama livestreaming, integrasi running text informatif, dan rancangan grafis call-to-action. Secara spesifik guna mempertahankan atensi penonton, memancing rasa penasaran, dan memicu konversi selama sesi siaran pemasaran.",
    image: "https://res.cloudinary.com/dopwo368m/image/upload/v1779692656/Live_Streaming_Promotion_wpmkew.png",
    images: [
      "https://res.cloudinary.com/dopwo368m/image/upload/v1779687776/Screenshot_2025-07-11_053406_hpeg5u.png",
      "https://res.cloudinary.com/dopwo368m/image/upload/v1779687764/Screenshot_2025-07-11_053546_mwi16q.png",
      "https://res.cloudinary.com/dopwo368m/image/upload/v1779687703/Screenshot_2025-07-10_232915_iprrjn.png",
      "https://res.cloudinary.com/dopwo368m/image/upload/v1779687681/Screenshot_2025-07-06_201102_diyzui.png"
    ],
    tools: ["Canva", "CapCut"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: "proj-3",
    title: "Content Creation Design",
    category: "Design & Creative",
    description: "Inisiatif kreatif terpadu dalam proses produksi konten digital, mulai dari konsep ideasi cerita melalui storyboarding yang representatif, perancangan gaya penyuntingan video yang dinamis untuk format short-form maupun vlog, serta perakitan aset visual penunjang. Bertujuan menghadirkan alur narasi konsisten, estetika presentasi modern, dan memastikan kualitas tayangan selaras dengan tren industri kreatif masa kini.",
    image: "https://res.cloudinary.com/dopwo368m/image/upload/v1779692656/Content_Creation_Design_ztlj6a.png",
    tools: ["CapCut", "Canva", "Photoshop"],
    demoUrl: "#",
    githubUrl: "#"
  }
];

export const TOOLS = [
  { name: "Photoshop", level: "Beginner", image: "https://res.cloudinary.com/dopwo368m/image/upload/v1779682761/photoshop_q2h1xj.png", icon: "photoshop", color: "text-[#31A8FF]" },
  { name: "Canva", level: "Advanced", image: "https://res.cloudinary.com/dopwo368m/image/upload/v1779682762/canva-seeklogo_jis12v.png", icon: "canva", color: "text-[#00C4CC]" },
  { name: "CapCut", level: "Advanced", image: "https://res.cloudinary.com/dopwo368m/image/upload/v1779682761/capcut_logo_c1psgo.png", icon: "capcut", color: "text-[#00F4FF]" }
];

export const OUTCOMES: Outcome[] = [
  {
    metric: "Premium",
    label: "Aesthetics",
    impact: "Visual Branding Impact",
    description: "Membantu meningkatkan visual branding pada konten promosi digital sehingga menguatkan citra profesional."
  },
  {
    metric: "Atraktif",
    label: "Professional",
    impact: "Content Appeal",
    description: "Membuat tampilan konten lebih menarik, profesional, rapi, komunikatif, dan dinamis memancing interaksi."
  },
  {
    metric: "Optimal",
    label: "Efficiency",
    impact: "Campaign Support",
    description: "Mendukung efektivitas campaign marketing digital untuk memotong hambatan komunikasi pesan produk ke audiens."
  },
  {
    metric: "3.5x",
    label: "Boost",
    impact: "Audience Engagement",
    description: "Membantu meningkatkan engagement audience secara signifikan pada sesi live streaming dan interaksi media sosial."
  },
  {
    metric: "100%",
    label: "Consistent",
    impact: "Brand Consistency",
    description: "Menjaga konsistensi identitas visual brand pada berbagai media platform digital modern secara harmonis."
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-1",
    title: "Digital Marketing Course Certification",
    issuer: "Certified Marketing Institute",
    year: "2024",
    credentialUrl: "https://linkedin.com",
    imageBg: "from-indigo-600/30 to-slate-900/60"
  },
  {
    id: "cert-2",
    title: "Graphic Design Professional Training",
    issuer: "Visual Design Academy",
    year: "2024",
    credentialUrl: "https://behance.net",
    imageBg: "from-purple-600/30 to-indigo-900/60"
  },
  {
    id: "cert-3",
    title: "Content Creation Workshop Specialist",
    issuer: "Social Media Hub Masterclass",
    year: "2023",
    credentialUrl: "https://github.com",
    imageBg: "from-teal-600/30 to-slate-900/60"
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "Instagram", username: "@habibzainal_", url: "https://instagram.com/habibzainal_", icon: "Instagram" },
  { platform: "WhatsApp", username: "0857-0651-4201", url: "https://wa.me/6285706514201", icon: "Phone" },
  { platform: "TikTok", username: "@habibzainal_", url: "https://www.tiktok.com", icon: "Video" }
];
