import {
  BadgeCheck,
  Calendar,
  Camera,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  House,
  MapPin,
  Package,
  Plus,
  ReceiptIndianRupee,
  TriangleAlert,
} from "lucide-react";
import Image from "next/image";
import type { ElementType, ReactNode } from "react";

const KPIS: {
  icon: ElementType;
  tint: string;
  label: string;
  value: string;
  delta: string;
  deltaClass: string;
  note: string;
}[] = [
  {
    icon: House,
    tint: "bg-brand-green/10 text-brand-leaf",
    label: "Active Sheds",
    value: "312",
    delta: "↑ 12%",
    deltaClass: "text-brand-green",
    note: "vs previous month",
  },
  {
    icon: TriangleAlert,
    tint: "bg-brand-red/10 text-brand-red",
    label: "Overdue Actions",
    value: "48",
    delta: "↑ 33%",
    deltaClass: "text-brand-red",
    note: "Need immediate attention",
  },
  {
    icon: Clock,
    tint: "bg-brand-gold/15 text-brand-gold",
    label: "Stale Updates",
    value: "76",
    delta: "↑ 18%",
    deltaClass: "text-brand-green",
    note: "No update in 7+ days",
  },
  {
    icon: ReceiptIndianRupee,
    tint: "bg-brand-green/10 text-brand-leaf",
    label: "Unverified Receipts",
    value: "25",
    delta: "₹ 31,25,000",
    deltaClass: "text-brand-green",
    note: "Awaiting finance verification",
  },
  {
    icon: FileText,
    tint: "bg-brand-gold/15 text-brand-gold",
    label: "Pending Reconciliation",
    value: "38",
    delta: "₹ 57,80,000",
    deltaClass: "text-brand-green",
    note: "Completion verification pending",
  },
];

const LIFECYCLE: { label: string; value: number; color: string }[] = [
  { label: "Approval Imported", value: 36, color: "bg-brand-leaf" },
  { label: "Verification", value: 48, color: "bg-brand-leaf" },
  { label: "Consent", value: 52, color: "bg-brand-green" },
  { label: "Contribution", value: 42, color: "bg-brand-green" },
  { label: "Site Assessment", value: 38, color: "bg-brand-green" },
  { label: "Work Order", value: 60, color: "bg-brand-green" },
  { label: "Materials", value: 28, color: "bg-amber-400" },
  { label: "In Progress", value: 22, color: "bg-brand-red" },
  { label: "Completion Verification", value: 16, color: "bg-gray-400" },
  { label: "Closed", value: 10, color: "bg-gray-400" },
];

const EXCEPTIONS = [
  {
    id: "SH-000118",
    issue: "Receipt not verified",
    amount: "₹ 1,25,000",
    status: "Unverified",
    chip: "bg-amber-50 text-amber-700",
    Icon: TriangleAlert,
    iconClass: "text-amber-500",
    owner: "Finance Team",
  },
  {
    id: "SH-000092",
    issue: "Cost variance (high)",
    amount: "₹ 48,500",
    status: "Needs Review",
    chip: "bg-red-50 text-red-600",
    Icon: TriangleAlert,
    iconClass: "text-brand-red",
    owner: "Finance Team",
  },
  {
    id: "SH-000076",
    issue: "Advance not settled",
    amount: "₹ 75,000",
    status: "Pending",
    chip: "bg-amber-50 text-amber-700",
    Icon: Clock,
    iconClass: "text-amber-500",
    owner: "Operations",
  },
  {
    id: "SH-000064",
    issue: "Material cost overrun",
    amount: "₹ 92,300",
    status: "Needs Approval",
    chip: "bg-red-50 text-red-600",
    Icon: TriangleAlert,
    iconClass: "text-brand-red",
    owner: "AVP Infra",
  },
  {
    id: "SH-000051",
    issue: "Reconciliation pending",
    amount: "₹ 1,10,000",
    status: "Pending",
    chip: "bg-amber-50 text-amber-700",
    Icon: Clock,
    iconClass: "text-amber-500",
    owner: "Finance Team",
  },
];

const PROJECTS = [
  {
    name: "AJAH",
    total: 142,
    inProgress: 34,
    completed: 26,
    overdue: 18,
    pct: 24,
    bar: "bg-brand-green",
  },
  {
    name: "Sujalam Sufalam",
    total: 50,
    inProgress: 20,
    completed: 12,
    overdue: 8,
    pct: 62,
    bar: "bg-brand-green",
  },
  {
    name: "FPC Development",
    total: 30,
    inProgress: 12,
    completed: 6,
    overdue: 4,
    pct: 40,
    bar: "bg-brand-green",
  },
  {
    name: "Livestock Procurement",
    total: 200,
    inProgress: 75,
    completed: 50,
    overdue: 28,
    pct: 75,
    bar: "bg-brand-green",
  },
  {
    name: "Manure Processing",
    total: 25,
    inProgress: 8,
    completed: 4,
    overdue: 6,
    pct: 20,
    bar: "bg-amber-400",
  },
];

const ACTIONS = [
  {
    id: "SH-000123",
    task: "Upload progress evidence",
    project: "AJAH",
    owner: "Ramesh Kumar",
    due: "22-Mar-2026",
    dueRed: true,
    priority: "High",
    status: "Overdue",
    statusChip: "bg-red-50 text-red-600",
  },
  {
    id: "SH-000110",
    task: "Verify material receipt",
    project: "AJAH",
    owner: "Manoj Singh",
    due: "23-Mar-2026",
    dueRed: false,
    priority: "High",
    status: "Pending",
    statusChip: "bg-amber-50 text-amber-700",
  },
  {
    id: "SH-000098",
    task: "Site assessment visit",
    project: "Sujalam Sufalam",
    owner: "Kunti Devi",
    due: "24-Mar-2026",
    dueRed: false,
    priority: "Medium",
    status: "In Progress",
    statusChip: "bg-green-50 text-green-700",
  },
  {
    id: "SH-000087",
    task: "Resolve defect",
    project: "AJAH",
    owner: "Shri Ram",
    due: "25-Mar-2026",
    dueRed: false,
    priority: "Medium",
    status: "Pending",
    statusChip: "bg-amber-50 text-amber-700",
  },
  {
    id: "SH-000076",
    task: "Approval for work order",
    project: "FPC Development",
    owner: "Aftab Khan",
    due: "26-Mar-2026",
    dueRed: false,
    priority: "High",
    status: "Pending",
    statusChip: "bg-amber-50 text-amber-700",
  },
];

const ACTIVITIES: {
  time: string;
  user: string;
  icon: ElementType;
  tint: string;
  action: string;
  details: string;
}[] = [
  {
    time: "2 hours ago",
    user: "Ramesh Kumar",
    icon: Camera,
    tint: "bg-brand-green/10 text-brand-leaf",
    action: "Photo evidence submitted",
    details: "SH-000123 · Stage: In Progress",
  },
  {
    time: "4 hours ago",
    user: "Manoj Singh",
    icon: Package,
    tint: "bg-amber-50 text-amber-600",
    action: "Material received",
    details: "SH-000118 · GI wire mesh (18 pcs)",
  },
  {
    time: "6 hours ago",
    user: "Priya Verma",
    icon: FileText,
    tint: "bg-brand-green/10 text-brand-leaf",
    action: "Work order created",
    details: "SH-000092 · WO-2026-005",
  },
  {
    time: "1 day ago",
    user: "Finance Team",
    icon: BadgeCheck,
    tint: "bg-brand-green/10 text-brand-leaf",
    action: "Receipt verified",
    details: "SH-000064 · ₹ 1,25,000",
  },
  {
    time: "1 day ago",
    user: "Aftab Khan",
    icon: MapPin,
    tint: "bg-amber-50 text-amber-600",
    action: "Site assessment completed",
    details: "SH-000110 · Suitable",
  },
];

const MAP_LEGEND = [
  { label: "Completed", value: 132, dot: "text-brand-green" },
  { label: "In Progress", value: 98, dot: "text-amber-400" },
  { label: "Overdue", value: 42, dot: "text-brand-red" },
  { label: "Not Started", value: 24, dot: "text-gray-400" },
];

function Card({
  title,
  action,
  children,
  span,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  span: string;
}) {
  return (
    <section
      className={`min-w-0 rounded-xl border border-line bg-white p-5 shadow-sm ${span}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

const viewAll = (
  <a href="#" className="flex items-center gap-1 text-sm font-medium text-brand-green">
    View all <ChevronRight className="size-4" />
  </a>
);

function Pill({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="flex h-8 items-center gap-1.5 rounded-lg border border-line px-3 text-[13px] font-medium text-brand-charcoal/80"
    >
      {children}
      <ChevronDown className="size-3.5 text-muted" />
    </button>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      {/* Title row */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold leading-tight">Dashboard</h1>
          <p className="mt-0.5 text-sm text-muted">
            Overview of all projects and goat-shed construction progress
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-sm font-medium"
          >
            <Calendar className="size-4 text-muted" />
            01 Apr 2026 – 30 Apr 2026
            <ChevronDown className="size-4 text-muted" />
          </button>
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-lg bg-brand-green px-4 text-sm font-semibold text-white hover:bg-brand-leaf"
          >
            <Plus className="size-4" />
            New Record
            <ChevronDown className="size-4" />
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {KPIS.map((k) => (
          <div
            key={k.label}
            className="rounded-xl border border-line bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-lg ${k.tint}`}
              >
                <k.icon className="size-5" strokeWidth={1.75} />
              </span>
              <p className="text-[13px] text-muted">{k.label}</p>
            </div>
            <p className="mt-3 text-[26px] font-bold leading-none">
              {k.value}
            </p>
            <p className={`mt-2 text-sm font-semibold ${k.deltaClass}`}>
              {k.delta}
            </p>
            <p className="mt-1 text-xs text-muted">{k.note}</p>
          </div>
        ))}
      </div>

      {/* Lifecycle + Finance Exceptions */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[58fr_42fr]">
        <Card
          title="Shed Lifecycle Distribution"
          span=""
          action={<Pill>All Projects</Pill>}
        >
          <div className="overflow-x-auto">
          <div className="min-w-[600px]">
          <div className="flex gap-3">
            <div className="relative h-40 w-6 text-[11px] text-muted">
              {[0, 20, 40, 60, 80, 100].map((v) => (
                <span
                  key={v}
                  className="absolute -translate-y-1/2"
                  style={{ bottom: `${v}%` }}
                >
                  {v}
                </span>
              ))}
            </div>
            <div className="relative h-40 flex-1">
              {[0, 20, 40, 60, 80, 100].map((v) => (
                <div
                  key={v}
                  className="absolute inset-x-0 border-t border-line"
                  style={{ bottom: `${v}%` }}
                />
              ))}
              <div className="flex h-full items-end justify-around gap-2">
                {LIFECYCLE.map((b) => (
                  <div
                    key={b.label}
                    className="flex h-full flex-1 flex-col items-center justify-end"
                  >
                    <span className="mb-1 text-[11px] font-bold">
                      {b.value}
                    </span>
                    <div
                      className={`w-6 rounded-t sm:w-8 ${b.color}`}
                      style={{ height: `${b.value * 1.6}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-2 flex gap-3">
            <div className="w-6 shrink-0" />
            <div className="flex flex-1 justify-around gap-2">
              {LIFECYCLE.map((b) => (
                <span
                  key={b.label}
                  className="flex-1 text-center text-[10px] leading-tight text-muted"
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>
          </div>
          </div>
        </Card>

        <Card
          title="Finance Exceptions"
          span=""
          action={viewAll}
        >
          <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-[13px]">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="py-2 pr-2 font-medium">Shed ID</th>
                <th className="py-2 pr-2 font-medium">Issue Type</th>
                <th className="py-2 pr-2 text-right font-medium">Amount</th>
                <th className="py-2 pr-2 font-medium">Status</th>
                <th className="py-2 font-medium">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {EXCEPTIONS.map((e) => (
                <tr key={e.id} className="text-brand-charcoal/90">
                  <td className="py-2.5 pr-2 font-semibold text-brand-green">
                    {e.id}
                  </td>
                  <td className="py-2.5 pr-2">{e.issue}</td>
                  <td className="py-2.5 pr-2 text-right font-medium">
                    {e.amount}
                  </td>
                  <td className="py-2.5 pr-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${e.chip}`}
                    >
                      <e.Icon className={`size-3.5 ${e.iconClass}`} />
                      {e.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-[13px]">{e.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Card>
      </div>

      {/* Project Overview + Action Queue */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[45fr_55fr]">
        <Card title="Project Overview" span="" action={viewAll}>
          <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="py-2 pr-2 font-medium">Project</th>
                <th className="py-2 pr-2 font-medium">Total Sheds</th>
                <th className="py-2 pr-2 font-medium">In Progress</th>
                <th className="py-2 pr-2 font-medium">Completed</th>
                <th className="py-2 pr-2 font-medium">Overdue</th>
                <th className="py-2 font-medium">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {PROJECTS.map((p) => (
                <tr key={p.name}>
                  <td className="py-2.5 pr-2">
                    <span className="flex items-center gap-2.5 font-semibold">
                      <Image
                        src="/auth/shelter-scene.png"
                        alt=""
                        width={28}
                        height={28}
                        className="size-7 shrink-0 rounded object-cover"
                      />
                      <span className="min-w-0 whitespace-normal">
                        {p.name}
                      </span>
                    </span>
                  </td>
                  <td className="py-2.5 pr-2">{p.total}</td>
                  <td className="py-2.5 pr-2">{p.inProgress}</td>
                  <td className="py-2.5 pr-2">{p.completed}</td>
                  <td className="py-2.5 pr-2 font-medium text-brand-red">
                    {p.overdue}
                  </td>
                  <td className="py-2.5">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-20 overflow-hidden rounded-full bg-brand-cream">
                        <span
                          className={`block h-full rounded-full ${p.bar}`}
                          style={{ width: `${p.pct}%` }}
                        />
                      </span>
                      <span className="text-xs font-medium">{p.pct}%</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Card>

        <Card
          title="Action Queue (My/Team Tasks)"
          span=""
          action={
            <div className="flex items-center gap-1 rounded-lg bg-brand-cream p-1">
              <span className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold shadow-sm">
                All (48)
              </span>
              <span className="px-2.5 py-1 text-xs text-muted">
                My Tasks (12)
              </span>
              <span className="px-2.5 py-1 text-xs text-muted">
                Overdue (18)
              </span>
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap text-xs">
            <thead>
              <tr className="border-b border-line text-left text-muted">
                <th className="py-2 pr-2 font-semibold">Shed ID</th>
                <th className="py-2 pr-2 font-semibold">Task</th>
                <th className="py-2 pr-2 font-semibold">Project</th>
                <th className="py-2 pr-2 font-semibold">Owner</th>
                <th className="py-2 pr-2 font-semibold">Due Date</th>
                <th className="py-2 pr-2 font-semibold">Priority</th>
                <th className="py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {ACTIONS.map((a) => (
                <tr key={a.id} className="text-[13px]">
                  <td className="py-2.5 pr-1 font-semibold text-brand-green">
                    {a.id}
                  </td>
                  <td className="py-2.5 pr-2">
                    <span className="block max-w-[150px] whitespace-normal">
                      {a.task}
                    </span>
                  </td>
                  <td className="py-2.5 pr-2">{a.project}</td>
                  <td className="py-2.5 pr-2">{a.owner}</td>
                  <td
                    className={`py-2.5 pr-2 ${
                      a.dueRed ? "font-medium text-brand-red" : ""
                    }`}
                  >
                    {a.due}
                  </td>
                  <td className="py-2.5 pr-2">
                    <span
                      className={`flex items-center gap-1.5 font-medium ${
                        a.priority === "High"
                          ? "text-brand-red"
                          : "text-brand-gold"
                      }`}
                    >
                      <span
                        className={`size-2 rounded-full ${
                          a.priority === "High"
                            ? "bg-brand-red"
                            : "bg-amber-400"
                        }`}
                      />
                      {a.priority}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span
                      className={`rounded-md px-1 py-0.5 text-xs font-medium ${a.statusChip}`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Card>
      </div>

      {/* Recent Activities + Map */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[54fr_46fr]">
        <Card title="Recent Activities" span="" action={viewAll}>
          <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="py-2 pr-2 font-medium">Time</th>
                <th className="py-2 pr-2 font-medium">User</th>
                <th className="py-2 pr-2 font-medium">Action</th>
                <th className="py-2 font-medium">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {ACTIVITIES.map((a) => (
                <tr key={a.details}>
                  <td className="py-2.5 pr-2 text-[13px] text-muted">
                    {a.time}
                  </td>
                  <td className="py-2.5 pr-2">
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-lg ${a.tint}`}
                      >
                        <a.icon className="size-4" strokeWidth={1.75} />
                      </span>
                      <span className="font-medium">{a.user}</span>
                    </span>
                  </td>
                  <td className="py-2.5 pr-2">{a.action}</td>
                  <td className="py-2.5 text-[13px] text-muted">{a.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Card>

        <Card
          title="Map & Site Status"
          span=""
          action={<Pill>All Projects</Pill>}
        >
          <div className="flex gap-5">
            <ul className="w-40 shrink-0 space-y-3">
              {MAP_LEGEND.map((m) => (
                <li
                  key={m.label}
                  className="flex items-center gap-2.5 text-sm text-muted"
                >
                  <MapPin
                    className={`size-5 shrink-0 fill-current ${m.dot}`}
                    strokeWidth={1}
                  />
                  {m.label}
                  <span className="ml-auto font-bold text-brand-charcoal">
                    {m.value}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex min-h-40 flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-brand-cream/60 p-6 text-center">
              <MapPin className="size-8 text-muted" strokeWidth={1.5} />
              <p className="text-sm font-semibold">Map — coming soon</p>
              <p className="text-xs text-muted">Location view arrives later</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
