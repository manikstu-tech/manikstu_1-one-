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
  Breadcrumb,
  Card,
  FilterBar,
  FilterSelect,
  GhostButton,
  Kpi,
  PageHeader,
  PaginationNote,
  SearchInput,
  TableWrap,
  Th,
} from "../_components";
import ProjectRows from "./ProjectRows";

const KPIS = [
  { icon: Folder, tint: "bg-success-bg text-brand-leaf", label: "Total Projects", value: "5" },
  { icon: House, tint: "bg-success-bg text-brand-leaf", label: "Total Sheds", value: "545", sub: "↑ 12% vs previous period" },
  { icon: HardHat, tint: "bg-amber-50 text-brand-gold", label: "In Progress", value: "312", sub: "↑ 18% vs previous period" },
  { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", label: "Completed", value: "132", sub: "↑ 26% vs previous period" },
  { icon: Clock, tint: "bg-red-50 text-brand-red", label: "Overdue", value: "48", sub: "↑ 33% need attention", subTone: "red" as const },
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
            <ProjectRows />
          </table>
        </TableWrap>
        <div className="px-5 pb-4">
          <PaginationNote>Showing 1 to 5 of 5 projects</PaginationNote>
        </div>
      </Card>
    </div>
  );
}
