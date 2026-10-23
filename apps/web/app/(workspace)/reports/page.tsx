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
} from "../_components";

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
  return (
    <div className="space-y-5">
      <Breadcrumb items={["Reports"]} />
      <PageHeader
        title="Reports"
        subtitle="Project performance, progress, finance, materials, quality and operational insights"
        actions={
          <GhostButton>
            <Download className="size-4" /> Export Report
          </GhostButton>
        }
      />

      <FilterBar>
        <FilterSelect label="Project: AJAH" />
        <FilterSelect label="01 Mar – 20 Mar 2026" />
        <FilterSelect label="All Districts" />
        <FilterSelect label="All Owners" />
        <FilterSelect label="All Fabricators" />
        <FilterSelect label="All Stages" />
      </FilterBar>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-xl border border-line bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${k.tint}`}>
                <k.icon className="size-5" strokeWidth={1.75} />
              </span>
              <span className="text-right">
                <span className="block text-[13px] text-muted">{k.label}</span>
                <span className="block text-[22px] font-bold leading-tight">{k.value}</span>
              </span>
            </div>
            {k.note && <p className={`mt-2 text-xs font-medium ${k.noteTone ?? "text-muted"}`}>{k.note}</p>}
            <div className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-3 text-center">
              {k.parts.map((p) => (
                <div key={p.label}>
                  <p className={`text-sm font-bold ${p.tone ?? ""}`}>{p.value}</p>
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
                    <span className="mb-1 text-xs font-bold">{b.value}</span>
                    <div className={`w-full max-w-10 rounded-t ${b.color}`} style={{ height: `${b.value * 4}px` }} />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-around gap-3">
                {LIFECYCLE.map((b) => (
                  <span key={b.label} className="flex-1 text-center text-[10px] leading-tight text-muted">
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
                  <p className="text-2xl font-bold">26%</p>
                  <p className="text-xs text-muted">Completed</p>
                </div>
              </div>
            </div>
            <ul className="w-full space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-brand-green" /> Completed</span>
                <span className="font-medium">26 (26%)</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-brand-gold" /> In Progress</span>
                <span className="font-medium">34 (24%)</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-gray-300" /> Pending</span>
                <span className="font-medium">82 (58%)</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[62fr_38fr]">
        <Card title="Top Fabricators by Progress" padded={false}>
          <TableWrap>
            <table className="w-full min-w-[520px] text-[13px]">
              <thead>
                <tr className="border-y border-line text-left text-xs text-muted">
                  <th className="py-2.5 pl-5 pr-3 font-medium">#</th>
                  <Th>Fabricator</Th>
                  <Th right>Total</Th>
                  <Th right>Completed</Th>
                  <Th right>In Progress</Th>
                  <Th right>Pending</Th>
                  <th className="py-2.5 pr-5 text-right font-medium">On-time Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {FABRICATORS.map((f, i) => (
                  <tr key={f.name} className="hover:bg-brand-cream/40">
                    <td className="py-3 pl-5 pr-3 text-muted">{i + 1}</td>
                    <td className="py-3 pr-3 font-medium">{f.name}</td>
                    <td className="py-3 pr-3 text-right">{f.total}</td>
                    <td className="py-3 pr-3 text-right">{f.done}</td>
                    <td className="py-3 pr-3 text-right">{f.prog}</td>
                    <td className="py-3 pr-3 text-right">{f.pend}</td>
                    <td className="py-3 pr-5 text-right">
                      <Chip tone={f.tone}>{f.rate}</Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Card>

        <Card title="Documents Status">
          <ul className="space-y-3.5">
            {DOCS.map((d) => (
              <li key={d.label}>
                <div className="mb-1 flex justify-between text-[13px]">
                  <span className="font-medium">{d.label}</span>
                  <span className="text-muted">{d.done} / {d.total}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-brand-cream">
                  <span className={`block h-full rounded-full ${d.color}`} style={{ width: `${(d.done / d.total) * 100}%` }} />
                </div>
              </li>
            ))}
            <li className="mt-1 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-brand-red">
              <CircleAlert className="size-4 shrink-0" />
              29 sheds are missing one or more mandatory documents.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
