"use client";

import {
  ChartColumn,
  ChevronRight,
  CircleCheck,
  Clock,
  FileText,
  Folder,
  HardHat,
  House,
  MoreVertical,
  Package,
  Plus,
  Settings,
} from "lucide-react";
import Link from "next/link";
import type { ElementType } from "react";
import {
  Breadcrumb,
  Card,
  Chip,
  GhostButton,
  Kpi,
  PageHeader,
} from "../_components";
import ProjectsBrowser from "./ProjectsBrowser";

const KPIS = [
  { icon: Folder, tint: "bg-success-bg text-brand-leaf", label: "Total Projects", value: "5" },
  { icon: House, tint: "bg-success-bg text-brand-leaf", label: "Total Sheds", value: "545", sub: "↑ 12% vs previous period" },
  { icon: HardHat, tint: "bg-amber-50 text-brand-gold", label: "In Progress", value: "312", sub: "↑ 18% vs previous period" },
  { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", label: "Completed", value: "132", sub: "↑ 26% vs previous period" },
  { icon: Clock, tint: "bg-red-50 text-brand-red", label: "Overdue", value: "48", sub: "↑ 33% need attention", subTone: "red" as const },
];

const SUMMARY = [
  { label: "AJAH", value: 142 },
  { label: "Sujalam Sufalam", value: 200 },
  { label: "FPC Development", value: 30 },
  { label: "Livestock Procurement", value: 200 },
  { label: "Manure Processing", value: 25 },
];

const ACTIVITY: { date: string; project: string; action: string; by: string; icon: ElementType; tint: string }[] = [
  { date: "20-Mar-2026", project: "AJAH", action: "New shed added (SH-000123)", by: "Ramesh Kumar", icon: Plus, tint: "bg-success-bg text-brand-leaf" },
  { date: "19-Mar-2026", project: "Sujalam Sufalam", action: "Work order issued (WO-2026-008)", by: "Priya Verma", icon: FileText, tint: "bg-blue-50 text-blue-600" },
  { date: "18-Mar-2026", project: "Livestock Procurement", action: "Material received (GI wire mesh)", by: "Manoj Singh", icon: Package, tint: "bg-amber-50 text-brand-gold" },
  { date: "17-Mar-2026", project: "FPC Development", action: "Project configuration updated", by: "Aftab Khan", icon: Settings, tint: "bg-gray-100 text-gray-600" },
  { date: "16-Mar-2026", project: "AJAH", action: "Site assessment completed", by: "Kunti Devi", icon: CircleCheck, tint: "bg-success-bg text-brand-leaf" },
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

      <ProjectsBrowser />

      {/* Project Summary + Recent Activity */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[45fr_55fr]">
        <Card title="Project Summary" action={<Chip tone="gray" icon={ChartColumn}>Sheds by Project</Chip>}>
          <div className="overflow-x-auto">
            <div className="min-w-[460px]">
              <div className="flex h-48 items-end justify-around gap-4">
                {SUMMARY.map((b) => (
                  <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end">
                    <span className="mb-1 text-xs font-bold">{b.value}</span>
                    <div className="w-full max-w-14 rounded-t bg-brand-green" style={{ height: `${(b.value / 200) * 160}px` }} />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-around gap-4">
                {SUMMARY.map((b) => (
                  <span key={b.label} className="flex-1 text-center text-[11px] leading-tight text-muted">
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card
          title="Recent Project Activity"
          action={
            <Link href="/tasks" className="flex items-center gap-1 text-sm font-medium text-brand-green">
              View all <ChevronRight className="size-4" />
            </Link>
          }
          padded={false}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-[13px]">
              <thead>
                <tr className="border-y border-line text-left text-xs text-muted">
                  <th className="py-2.5 pl-5 pr-3 font-medium">Date</th>
                  <th className="py-2.5 pr-3 font-medium">Project</th>
                  <th className="py-2.5 pr-3 font-medium">Action</th>
                  <th className="py-2.5 pr-5 font-medium">By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ACTIVITY.map((a, i) => (
                  <tr key={i}>
                    <td className="py-3 pl-5 pr-3 whitespace-nowrap text-muted">{a.date}</td>
                    <td className="py-3 pr-3 font-medium">{a.project}</td>
                    <td className="py-3 pr-3">
                      <span className="flex items-center gap-2">
                        <span className={`grid size-7 shrink-0 place-items-center rounded-md ${a.tint}`}>
                          <a.icon className="size-4" strokeWidth={1.75} />
                        </span>
                        {a.action}
                      </span>
                    </td>
                    <td className="py-3 pr-5 whitespace-nowrap text-muted">{a.by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
