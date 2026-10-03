import projectsData from "./projects.json";
import servicesData from "./services.json";
import teamData from "./team.json";
import testimonialsData from "./testimonials.json";
import siteData from "./site.json";
import jobsData from "./jobs.json";

export const projects = projectsData as Project[];
export const services = servicesData as Service[];
export const team = teamData as TeamMember[];
export const testimonials = testimonialsData as Testimonial[];
export const site = siteData as Site;
export const jobs = jobsData as Job[];

export type LocalizedString = {
  en: string;
  th: string;
};

export interface Project {
  id: number;
  slug: string;
  tag: LocalizedString;
  year: string;
  title: LocalizedString;
  description: LocalizedString;
  longDescription: LocalizedString;
  challenge: LocalizedString;
  solution: LocalizedString;
  results?: LocalizedString;
  tech: string[];
  metrics: { label: LocalizedString; value: LocalizedString }[];
  color: string;
  featured: boolean;
  duration: LocalizedString;
  team: LocalizedString;
  deliverables: LocalizedString[];
  coverImage: string;
  images: string[];
  testimonial?: {
    quote: LocalizedString;
    author: string;
    role: LocalizedString;
  };
}

export interface Service {
  id: string;
  tag: string;
  icon: string;
  title: LocalizedString;
  tagline?: LocalizedString;
  description: LocalizedString;
  longDescription: LocalizedString;
  features: LocalizedString[];
  tech: string[];
  deliverables: LocalizedString[];
  timeline: LocalizedString;
  href: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: LocalizedString;
  bio: LocalizedString;
  image: string;
  linkedin: string;
  email?: string;
  initial: string;
  featured: boolean;
  skills?: string[];
  yearsExp?: string;
  quote?: LocalizedString;
}



export interface Testimonial {
  id: number;
  quote: LocalizedString;
  author: string;
  role: LocalizedString;
  company: string;
  initial: string;
  avatar?: string;
  rating?: number;
  projectSlug?: string;
}

export type Site = typeof siteData;

export interface Job {
  id: number;
  slug: string;
  type: "internship" | "full-time" | "part-time";
  isOpen: boolean;
  title: LocalizedString;
  department: LocalizedString;
  duration: LocalizedString;
  description?: LocalizedString;
  requirements?: LocalizedString[];
  responsibilities?: LocalizedString[];
}



