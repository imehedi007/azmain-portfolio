export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  icon: string;
}

export interface CareerStat {
  label: string;
  value: string;
  description?: string;
}

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  heroBadge: string;
  portfolioYear: string;
  summary: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  location: string;
  avatarUrl: string;
  heroImageUrl: string;
  resumeUrl: string;
  socialLinks: SocialLink[];
  stats: CareerStat[];
}

export interface BrandItem {
  id: string;
  name: string;
  subtitle: string;
  logoText?: string;
  category: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  subRole?: string;
  period: string;
  location: string;
  badge: string;
  shortDescription: string;
  fullDescription: string[];
  responsibilities: string[];
  skills: string[];
  imageUrl: string;
  featured?: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  badge: string;
  description: string;
  highlights: string[];
  imageUrl: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  badge: string;
  tags: string[];
  description: string;
  imageUrl: string;
  credentialId?: string;
  issueDate?: string;
  pdfUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  period: string;
  tags: string[];
  shortDescription: string;
  fullDescription: string[];
  responsibilities?: string[];
  imageUrl: string;
  link?: string;
  isUpcoming?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface LanguageItem {
  language: string;
  proficiency: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  title: string;
  organization: string;
  email: string;
  relation: string;
  avatarUrl?: string;
}

export interface KeyAchievement {
  id: string;
  title: string;
  category: string;
  metric: string;
  description: string;
  tag?: string;
  icon?: string;
}

export interface PortfolioData {
  profile: Profile;
  keyAchievements?: KeyAchievement[];
  brands: BrandItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  featuredProjects: ProjectItem[];
  upcomingProjects: ProjectItem[];
  skills: SkillCategory[];
  languages: LanguageItem[];
  hobbies: string[];
  references: ReferenceItem[];
}
