import type { Tone } from "../_components";

export type ProjectRow = {
  name: string;
  tagline: string;
  code: string;
  status: string;
  tone: Tone;
  district: string;
  start: string;
  end: string;
  owner: string;
  role: string;
  phone: string;
  sheds: number;
  pct: number;
  supply: "A" | "B";
  supplyDesc: string;
  contribution: string;
};

export const PROJECTS: ProjectRow[] = [
  {
    name: "Project: AJAH",
    tagline: "Women-led Integrated Livestock Initiative",
    code: "AJAH",
    status: "Active",
    tone: "green",
    district: "Raipur, Chhattisgarh",
    start: "01-Apr-2026",
    end: "31-Mar-2027",
    owner: "Ramesh Kumar",
    role: "Project Manager",
    phone: "98765 43210",
    sheds: 142,
    pct: 24,
    supply: "B",
    supplyDesc: "Manikstu supplies materials, fabricator builds",
    contribution: "₹1,25,000",
  },
  {
    name: "Project Sujalam Sufalam",
    tagline: "Integrated Goat & Poultry",
    code: "SUSU",
    status: "Active",
    tone: "green",
    district: "Dhamtari, Chhattisgarh",
    start: "15-Feb-2026",
    end: "14-Feb-2027",
    owner: "Priya Verma",
    role: "Operations Lead",
    phone: "87654 32109",
    sheds: 200,
    pct: 62,
    supply: "A",
    supplyDesc: "Fabricator supplies materials & labour",
    contribution: "₹1,25,000",
  },
  {
    name: "FPC Development",
    tagline: "Farmer Producer Company",
    code: "FPC",
    status: "Planning",
    tone: "amber",
    district: "Jashpur, Chhattisgarh",
    start: "10-Mar-2026",
    end: "09-Mar-2027",
    owner: "Aftab Khan",
    role: "Operations Manager",
    phone: "99887 66554",
    sheds: 30,
    pct: 40,
    supply: "B",
    supplyDesc: "Manikstu supplies materials, fabricator builds",
    contribution: "₹1,00,000",
  },
  {
    name: "Livestock Procurement",
    tagline: "Goat Sourcing & Supply",
    code: "LPS",
    status: "Active",
    tone: "green",
    district: "Narayanpur, Chhattisgarh",
    start: "05-Jan-2026",
    end: "04-Jan-2027",
    owner: "Manoj Singh",
    role: "Procurement Lead",
    phone: "76543 21098",
    sheds: 200,
    pct: 75,
    supply: "A",
    supplyDesc: "Fabricator supplies materials & labour",
    contribution: "₹1,25,000",
  },
  {
    name: "Manure Processing",
    tagline: "Value Addition",
    code: "MANP",
    status: "On Hold",
    tone: "red",
    district: "Rayagada, Odisha",
    start: "20-Dec-2025",
    end: "19-Dec-2026",
    owner: "Kunti Devi",
    role: "Project Coordinator",
    phone: "70123 45678",
    sheds: 25,
    pct: 20,
    supply: "B",
    supplyDesc: "Manikstu supplies materials, fabricator builds",
    contribution: "₹75,000",
  },
];

export function getProject(code: string): ProjectRow | undefined {
  return PROJECTS.find((p) => p.code.toLowerCase() === code.toLowerCase());
}
