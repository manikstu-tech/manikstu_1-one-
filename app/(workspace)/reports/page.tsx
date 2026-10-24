"use client";

import { useState } from "react";
import {
  Boxes,
  ChartColumn,
  CircleAlert,
  Clock,
  Download,
  FileText,
  House,
  IndianRupee,
  ListChecks,
  ShieldAlert,
  Users,
} from "lucide-react";
import type { ElementType } from "react";
import {
  Breadcrumb,
  Card,
  Chip,
  FilterBar,
  FilterSelect,
  GhostButton,
  PageHeader,
  TableWrap,
  Th,
} from "@/components/ui";
import { useToast } from "../_components";
import { ExportReportModal } from "@/components/modals";
import { exportTableToCsv, downloadSampleDocument } from "@/lib/file-utils";

const KPIS: {
  icon: ElementType;
  tint: string;
  label: string;
  value: string;
  note?: string;
  noteTone?: string;
  parts: { label: string; value: string; tone?: string }[];
}[] = [
  { icon: House, tint: "bg-success-bg text-brand-leaf", label: "Total Sheds", value: "142", note: "+12% vs last month", parts: [{ label: "Completed", value: "26" }, { label: "In Progress", value: "34" }, { label: "Pending", value: "82" }] },
  { icon: Clock, tint: "bg-amber-50 text-brand-gold", label: "Stale Sheds", value: "18", note: "↑ 3 vs last week", noteTone: "text-brand-red", parts: [{ label: "> 7 days", value: "8" }, { label: "> 14 days", value: "6" }, { label: "> 30 days", value: "4" }] },
  { icon: ListChecks, tint: "bg-red-50 text-brand-red", label: "Action Ageing", value: "26", note: "Pending actions", noteTone: "text-brand-red", parts: [{ label: "Overdue", value: "12", tone: "text-brand-red" }, { label: "Due ≤ 7d", value: "14" }, { label: "Due > 7d", value: "0" }] },
  { icon: Boxes, tint: "bg-success-bg text-brand-leaf", label: "Materials", value: "78%", note: "On-time delivery rate", parts: [{ label: "Dispatched", value: "245" }, { label: "Received", value: "198" }, { label: "Pending", value: "12" }] },
  { icon: ShieldAlert, tint: "bg-red-50 text-brand-red", label: "Defects / Issues", value: "11", note: "5 critical, 6 minor", noteTone: "text-brand-red", parts: [{ label: "Critical", value: "5", tone: "text-brand-red" }, { label: "Major", value: "4", tone: "text-brand-gold" }, { label: "Minor", value: "2" }] },
  { icon: Users, tint: "bg-success-bg text-brand-leaf", label: "Fabricators", value: "8", note: "Active", parts: [{ label: "On Track", value: "5" }, { label: "Delayed", value: "2", tone: "text-brand-gold" }, { label: "Review", value: "1" }] },
  { icon: IndianRupee, tint: "bg-amber-50 text-brand-gold", label: "Finance (₹)", value: "48,75,200", note: "Total Expenses", parts: [{ label: "Budget", value: "3.6 Cr" }, { label: "Balance", value: "2.17 Cr" }, { label: "Commit", value: "27.4 L" }] },
  { icon: FileText, tint: "bg-success-bg text-brand-leaf", label: "Missing Documents", value: "29", note: "Require attention", noteTone: "text-brand-red", parts: [{ label: "Photos", value: "12" }, { label: "AVP", value: "9" }, { label: "Receipts", value: "8" }] },
];

const LIFECYCLE = [
  { label: "Site Assessment", value: 18, color: "bg-brand-leaf" },
  { label: "Work Order", value: 34, color: "bg-brand-green" },
  { label: "Civil & Foundation", value: 26, color: "bg-brand-gold" },
  { label: "Structure & Roofing", value: 19, color: "bg-brand-gold" },
  { label: "Finishing", value: 16, color: "bg-gray-400" },
  { label: "Completed", value: 26, color: "bg-brand-leaf" },
];

const FABRICATORS = [
  { name: "Sharma Construction", total: 28, done: 10, prog: 12, pend: 6, rate: "86%", tone: "green" as const },
  { name: "Verma Infra", total: 24, done: 6, prog: 10, pend: 8, rate: "68%", tone: "amber" as const },
  { name: "Patel Structures", total: 18, done: 5, prog: 8, pend: 5, rate: "72%", tone: "green" as const },
  { name: "R.K. Fabricators", total: 16, done: 3, prog: 4, pend: 9, rate: "45%", tone: "red" as const },
  { name: "Chhattisgarh Rural Works", total: 14, done: 2, prog: 6, pend: 6, rate: "60%", tone: "amber" as const },
];

const DOCS = [
  { label: "Site Photos", done: 128, total: 142, color: "bg-brand-green" },
  { label: "AVP Reports", done: 96, total: 142, color: "bg-brand-gold" },
  { label: "Work Orders", done: 122, total: 142, color: "bg-brand-green" },
  { label: "Receipts / Bills", done: 113, total: 142, color: "bg-brand-gold" },
  { label: "KYC Documents", done: 105, total: 142, color: "bg-brand-gold" },
];

export default function ReportsPage() {
  const { showToast } = useToast();
  const [project, setProject] = useState("Project: AJAH");
  const [period, setPeriod] = useState("01 Mar – 20 Mar 2026");
  const [district, setDistrict] = useState("All Districts");
  const [showExportModal, setShowExportModal] = useState(false);

  function handleExport(format: string) {
    setShowExportModal(false);
    if (format.includes("Excel") || format.includes("Workbook") || format.includes("CSV")) {
      exportTableToCsv(`Manikstu_Operations_Report_${project}_${period.replace(/\s+/g, "_")}.csv`, [
        { header: "Report Section", key: "section" },
        { header: "Metric / Entity", key: "metric" },
        { header: "Value", key: "value" },
        { header: "Benchmark / Target", key: "target" },
        { header: "Status", key: "status" },
      ], [
        { section: "Executive Summary", metric: "Active Construction Sheds", value: "312", target: "350", status: "On Track" },
        { section: "Executive Summary", metric: "Completed Handover Sheds", value: "81", target: "80", status: "Target Exceeded" },
        { section: "Executive Summary", metric: "Aadhaar Verified Farmers", value: "412", target: "500", status: "82% Progress" },
        { section: "Financial Summary", metric: "Beneficiary Contributions Collected", value: "₹ 3,90,00,000", target: "₹ 4,37,50,000", status: "89% Realized" },
        { section: "Financial Summary", metric: "Total Scheme Expenditure", value: "₹ 7,82,40,000", target: "₹ 8,90,00,000", status: "Within Budget" },
        { section: "Quality & AVP", metric: "Total Stage Inspections Passed", value: "26", target: "30", status: "92% Pass Rate" },
        { section: "Materials & Supply", metric: "Total TMT Bars & GI Sheets Dispatched", value: "59 Sites", target: "60 Sites", status: "Dispatched" },
      ]);
      showToast(`Exported ${format} as CSV for ${project} (${period}).`, "success");
    } else {
      downloadSampleDocument(
        `Manikstu_Executive_Deck_${project}_${period.replace(/\s+/g, "_")}.pdf`,
        `MANIKSTU AGRO OPERATIONS EXECUTIVE REPORT\nProject: ${project}\nPeriod: ${period}\nTotal Sheds: 312\nGenerated: ${new Date().toLocaleDateString("en-IN")}`
      );
      showToast(`Generated PDF summary for ${project} (${period}).`, "success");
    }
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={["Reports"]} />
      <PageHeader
        title="Reports & Analytics"
        subtitle="Project performance, lifecycle progress, finance, materials, fabricator scorecards, and audit analytics"
        actions={
          <GhostButton onClick={() => setShowExportModal(true)}>
            <Download className="size-4" /> Export Report
          </GhostButton>
        }
      />

      <FilterBar>
        <FilterSelect
          label={project}
          value={project}
          options={["Project: AJAH", "Project: Sujalam Sufalam", "Project: FPC Development", "All Projects"]}
          onChange={(val) => {
            setProject(val);
            showToast(`Report filtered by: ${val}`, "info");
          }}
        />
        <FilterSelect
          label={period}
          value={period}
          options={["01 Mar – 20 Mar 2026", "Current Month (April 2026)", "Last Quarter (Q1 FY26)", "Full Year 2025-26"]}
          onChange={(val) => {
            setPeriod(val);
            showToast(`Report period set to: ${val}`, "info");
          }}
        />
        <FilterSelect
          label={district}
          value={district}
          options={["All Districts", "Raipur", "Dhamtari", "Jashpur", "Narayanpur"]}
          onChange={(val) => setDistrict(val)}
        />
      </FilterBar>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-xl border border-line bg-white p-5 shadow-xs transition hover:shadow-sm">
            <div className="flex items-center justify-between">
              <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${k.tint}`}>
                <k.icon className="size-5" strokeWidth={1.75} />
              </span>
              <span className="text-right">
                <span className="block text-[13px] font-medium text-muted">{k.label}</span>
                <span className="block text-[22px] font-bold leading-tight text-brand-charcoal">{k.value}</span>
              </span>
            </div>
            {k.note && <p className={`mt-2 text-xs font-semibold ${k.noteTone ?? "text-muted"}`}>{k.note}</p>}
            <div className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-3 text-center">
              {k.parts.map((p) => (
                <div key={p.label}>
                  <p className={`text-sm font-bold ${p.tone ?? "text-brand-charcoal"}`}>{p.value}</p>
                  <p className="text-[11px] text-muted">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[62fr_38fr]">
        <Card title="Project Lifecycle (Shed Stages)" action={<Chip tone="gray" icon={ChartColumn}>Sheds</Chip>}>
          <div className="overflow-x-auto">
            <div className="min-w-[560px]">
              <div className="flex h-48 items-end justify-around gap-3">
                {LIFECYCLE.map((b) => (
                  <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end">
                    <span className="mb-1 text-xs font-bold text-brand-charcoal">{b.value}</span>
                    <div className={`w-full max-w-10 rounded-t ${b.color}`} style={{ height: `${b.value * 4}px` }} />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-around gap-3">
                {LIFECYCLE.map((b) => (
                  <span key={b.label} className="flex-1 text-center text-[10px] leading-tight text-muted font-medium">
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card title="Shed Completion Rate">
          <div className="flex flex-col items-center gap-4">
            <div
              className="grid size-40 place-items-center rounded-full"
              style={{
                background:
                  "conic-gradient(var(--color-brand-green) 0 26%, var(--color-brand-gold) 26% 50%, #d1d5db 50% 100%)",
              }}
            >
              <div className="grid size-28 place-items-center rounded-full bg-white text-center">
                <div>
                  <p className="text-2xl font-bold text-brand-charcoal">26%</p>
                  <p className="text-xs text-muted">Completed</p>
                </div>
              </div>
            </div>
            <ul className="w-full space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium"><span className="size-2.5 rounded-full bg-brand-green" /> Completed</span>
                <span className="font-bold text-brand-charcoal">26 (26%)</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium"><span className="size-2.5 rounded-full bg-brand-gold" /> In Progress</span>
                <span className="font-bold text-brand-charcoal">34 (24%)</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium"><span className="size-2.5 rounded-full bg-gray-300" /> Pending</span>
                <span className="font-bold text-brand-charcoal">82 (58%)</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[62fr_38fr]">
        <Card title="Fabricator Scorecard & On-time Delivery" padded={false}>
          <TableWrap>
            <table className="w-full min-w-[520px] text-[13px]">
              <thead>
                <tr className="border-y border-line text-left text-xs font-semibold text-muted">
                  <th className="py-2.5 pl-5 pr-3">#</th>
                  <Th>Fabricator</Th>
                  <Th right>Total</Th>
                  <Th right>Completed</Th>
                  <Th right>In Progress</Th>
                  <Th right>Pending</Th>
                  <th className="py-2.5 pr-5 text-right font-semibold">On-time Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {FABRICATORS.map((f, i) => (
                  <tr key={f.name} className="hover:bg-brand-cream/40">
                    <td className="py-3 pl-5 pr-3 text-muted">{i + 1}</td>
                    <td className="py-3 pr-3 font-semibold text-brand-charcoal">{f.name}</td>
                    <td className="py-3 pr-3 text-right font-medium">{f.total}</td>
                    <td className="py-3 pr-3 text-right font-medium text-brand-leaf">{f.done}</td>
                    <td className="py-3 pr-3 text-right font-medium">{f.prog}</td>
                    <td className="py-3 pr-3 text-right font-medium">{f.pend}</td>
                    <td className="py-3 pr-5 text-right">
                      <Chip tone={f.tone}>{f.rate}</Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Card>

        <Card title="Mandatory Evidence Compliance">
          <ul className="space-y-3.5">
            {DOCS.map((d) => (
              <li key={d.label}>
                <div className="mb-1 flex justify-between text-[13px]">
                  <span className="font-semibold text-brand-charcoal">{d.label}</span>
                  <span className="text-muted text-xs font-medium">{d.done} / {d.total} verified</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-brand-cream">
                  <span className={`block h-full rounded-full ${d.color}`} style={{ width: `${(d.done / d.total) * 100}%` }} />
                </div>
              </li>
            ))}
            <li className="mt-1 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-brand-red font-medium">
              <CircleAlert className="size-4 shrink-0" />
              29 sheds have missing compliance photos requiring field executive follow-up.
            </li>
          </ul>
        </Card>
      </div>

      <ExportReportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        project={project}
        period={period}
        onExport={handleExport}
      />
    </div>
  );
}
