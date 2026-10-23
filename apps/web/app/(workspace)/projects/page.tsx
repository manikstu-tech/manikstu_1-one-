import {
  CircleCheck,
  Clock,
  Folder,
  HardHat,
  House,
  MoreVertical,
  Plus,
} from "lucide-react";
import Link from "next/link";
import {
  Avatar,
  Breadcrumb,
  Card,
  Chip,
  FilterBar,
  FilterSelect,
  GhostButton,
  Kpi,
  PageHeader,
  PaginationNote,
  Progress,
  SearchInput,
  TableWrap,
  Th,
  type Tone,
} from "../_components";

const KPIS = [
  { icon: Folder, tint: "bg-success-bg text-brand-leaf", label: "Total Projects", value: "5" },
  { icon: House, tint: "bg-success-bg text-brand-leaf", label: "Total Sheds", value: "545", sub: "↑ 12% vs previous period" },
  { icon: HardHat, tint: "bg-amber-50 text-brand-gold", label: "In Progress", value: "312", sub: "↑ 18% vs previous period" },
  { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", label: "Completed", value: "132", sub: "↑ 26% vs previous period" },
  { icon: Clock, tint: "bg-red-50 text-brand-red", label: "Overdue", value: "48", sub: "↑ 33% need attention", subTone: "red" as const },
];

const ROWS: {
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
  sheds: number;
  pct: number;
}[] = [
  { name: "Project: AJAH", tagline: "Women-led Livestock Initiative", code: "AJAH", status: "Active", tone: "green", district: "Raipur, Chhattisgarh", start: "01-Apr-2026", end: "31-Mar-2027", owner: "Ramesh Kumar", role: "Project Manager", sheds: 142, pct: 24 },
  { name: "Project Sujalam Sufalam", tagline: "Integrated Goat & Poultry", code: "SUSU", status: "Active", tone: "green", district: "Dhamtari, Chhattisgarh", start: "15-Feb-2026", end: "14-Feb-2027", owner: "Priya Verma", role: "Operations Lead", sheds: 200, pct: 62 },
  { name: "FPC Development", tagline: "Farmer Producer Company", code: "FPC", status: "Planning", tone: "amber", district: "Jashpur, Chhattisgarh", start: "10-Mar-2026", end: "09-Mar-2027", owner: "Aftab Khan", role: "Operations Manager", sheds: 30, pct: 40 },
  { name: "Livestock Procurement", tagline: "Goat Sourcing & Supply", code: "LPS", status: "Active", tone: "green", district: "Narayanpur, Chhattisgarh", start: "05-Jan-2026", end: "04-Jan-2027", owner: "Manoj Singh", role: "Procurement Lead", sheds: 200, pct: 75 },
  { name: "Manure Processing", tagline: "Value Addition", code: "MANP", status: "On Hold", tone: "red", district: "Rayagada, Odisha", start: "20-Dec-2025", end: "19-Dec-2026", owner: "Kunti Devi", role: "Project Coordinator", sheds: 25, pct: 20 },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={["Projects"]} />
      <PageHeader
        title="Projects"
        subtitle="Manage and track all projects across Manikstu Agro"
        actions={
          <>
            <Link
              href="/projects/new"
              className="flex h-10 items-center gap-2 rounded-lg bg-brand-green px-4 text-sm font-semibold text-white transition hover:bg-brand-leaf"
            >
              <Plus className="size-4" /> New Project
            </Link>
            <GhostButton>
              <MoreVertical className="size-4" />
            </GhostButton>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {KPIS.map((k) => (
          <Kpi key={k.label} {...k} />
        ))}
      </div>

      <FilterBar>
        <SearchInput placeholder="Search by project name, code, district..." />
        <FilterSelect label="All Status" />
        <FilterSelect label="All Districts" />
        <FilterSelect label="All Managers" />
      </FilterBar>

      <Card padded={false}>
        <TableWrap>
          <table className="w-full min-w-[920px] text-[13px]">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="py-2.5 pl-5 pr-3 font-medium">#</th>
                <Th>Project</Th>
                <Th>Code</Th>
                <Th>Status</Th>
                <Th>District / Location</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th>Owner / Manager</Th>
                <Th>Total Sheds</Th>
                <Th>Progress</Th>
                <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {ROWS.map((r, i) => (
                <tr key={r.code} className="hover:bg-brand-cream/40">
                  <td className="py-3 pl-5 pr-3 text-muted">{i + 1}</td>
                  <td className="py-3 pr-3">
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-xs text-muted">{r.tagline}</p>
                  </td>
                  <td className="py-3 pr-3 font-medium">{r.code}</td>
                  <td className="py-3 pr-3">
                    <Chip tone={r.tone} dot>
                      {r.status}
                    </Chip>
                  </td>
                  <td className="py-3 pr-3">{r.district}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">{r.start}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">{r.end}</td>
                  <td className="py-3 pr-3">
                    <span className="flex items-center gap-2.5">
                      <Avatar name={r.owner} />
                      <span>
                        <span className="block font-medium">{r.owner}</span>
                        <span className="block text-xs text-muted">{r.role}</span>
                      </span>
                    </span>
                  </td>
                  <td className="py-3 pr-3">{r.sheds}</td>
                  <td className="py-3 pr-3">
                    <Progress pct={r.pct} />
                  </td>
                  <td className="py-3 pr-5 text-right">
                    <button className="text-muted hover:text-brand-charcoal">
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
        <div className="px-5 pb-4">
          <PaginationNote>Showing 1 to 5 of 5 projects</PaginationNote>
        </div>
      </Card>
    </div>
  );
}
