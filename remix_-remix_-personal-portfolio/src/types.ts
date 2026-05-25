export interface Skill {
  name: string;
  category: "Design & Creative" | "Digital Marketing" | "Professional Skills" | "Software & Utilities";
  level: number; // 0-100%
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string; // or SVG mock up
  images?: string[];
  tools: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface Outcome {
  metric: string;
  label: string;
  impact: string;
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  imageBg: string; // gradient background choice for realistic certificate teaser
}

export interface SocialLink {
  platform: string;
  username: string;
  url: string;
  icon: string; // Lucide icon name
}
