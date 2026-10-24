"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  House,
  MapPin,
  MoreVertical,
  Package,
  Plus,
  ReceiptIndianRupee,
  TriangleAlert,
} from "lucide-react";
import type { ReactNode } from "react";
import { Avatar, useToast } from "@/components/ui";
import { QuickRecordModal, FinanceExceptionModal } from "@/components/modals";

const KPIS = [
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
    deltaClass: "text-brand-gold",
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

const LIFECYCLE_DATA: Record<string, { label: string; value: number; color: string }[]> = {
  "All Projects": [
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
  ],
  AJAH: [
    { label: "Approval Imported", value: 12, color: "bg-brand-leaf" },
    { label: "Verification", value: 18, color: "bg-brand-leaf" },
    { label: "Consent", value: 24, color: "bg-brand-green" },
    { label: "Contribution", value: 22, color: "bg-brand-green" },
    { label: "Site Assessment", value: 16, color: "bg-brand-green" },
    { label: "Work Order", value: 28, color: "bg-brand-green" },
    { label: "Materials", value: 12, color: "bg-amber-400" },
    { label: "In Progress", value: 34, color: "bg-brand-red" },
    { label: "Completion Verification", value: 8, color: "bg-gray-400" },
    { label: "Closed", value: 26, color: "bg-brand-leaf" },
  ],
  "Sujalam Sufalam": [
    { label: "Approval Imported", value: 18, color: "bg-brand-leaf" },
    { label: "Verification", value: 22, color: "bg-brand-leaf" },
    { label: "Consent", value: 20, color: "bg-brand-green" },
    { label: "Contribution", value: 16, color: "bg-brand-green" },
    { label: "Site Assessment", value: 14, color: "bg-brand-green" },
    { label: "Work Order", value: 24, color: "bg-brand-green" },
    { label: "Materials", value: 10, color: "bg-amber-400" },
    { label: "In Progress", value: 20, color: "bg-brand-red" },
    { label: "Completion Verification", value: 6, color: "bg-gray-400" },
    { label: "Closed", value: 12, color: "bg-brand-leaf" },
  ],
};

const INITIAL_EXCEPTIONS = [
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
    code: "AJAH",
    name: "AJAH",
    total: 142,
    inProgress: 34,
    completed: 26,
    overdue: 18,
    pct: 24,
    bar: "bg-brand-green",
  },
  {
    code: "SUSU",
    name: "Sujalam Sufalam",
    total: 200,
    inProgress: 20,
    completed: 12,
    overdue: 8,
    pct: 62,
    bar: "bg-brand-green",
  },
  {
    code: "FPC",
    name: "FPC Development",
    total: 30,
    inProgress: 12,
    completed: 6,
    overdue: 4,
    pct: 40,
    bar: "bg-brand-green",
  },
  {
    code: "LPS",
    name: "Livestock Procurement",
    total: 200,
    inProgress: 75,
    completed: 50,
    overdue: 28,
    pct: 75,
    bar: "bg-brand-green",
  },
  {
    code: "MANP",
    name: "Manure Processing",
    total: 25,
    inProgress: 8,
    completed: 4,
    overdue: 6,
    pct: 20,
    bar: "bg-amber-400",
  },
];

const INITIAL_ACTIONS = [
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
    myTask: true,
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
    myTask: false,
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
    myTask: false,
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
    myTask: true,
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
    myTask: true,
  },
];

const ACTIVITIES = [
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

const DISTRICTS = [
  { name: "Raipur District", sheds: 142, active: 34, completed: 26 },
  { name: "Dhamtari District", sheds: 98, active: 20, completed: 12 },
  { name: "Jashpur District", sheds: 42, active: 12, completed: 6 },
  { name: "Narayanpur District", sheds: 30, active: 8, completed: 4 },
];

function Card({
  title,
  action,
  children,
  span = "",
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  span?: string;
}) {
  return (
    <section
      className={`min-w-0 rounded-xl border border-line bg-white p-5 shadow-xs transition hover:shadow-sm ${span}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-brand-charcoal">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export default function DashboardPage() {
  const { showToast } = useToast();

  // Date range filter
  const [period, setPeriod] = useState("01 Apr 2026 – 30 Apr 2026");
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);

  // Quick New Record modal
  const [showNewRecordModal, setShowNewRecordModal] = useState(false);

  // Lifecycle project filter
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);

  // Action Queue tab filter
  const [actionTab, setActionTab] = useState<"all" | "my" | "overdue">("all");

  // Finance exceptions state
  const [exceptions, setExceptions] = useState(INITIAL_EXCEPTIONS);
  const [selectedException, setSelectedException] = useState<typeof INITIAL_EXCEPTIONS[0] | null>(null);

  // Actions list
  const [actions, setActions] = useState(INITIAL_ACTIONS);

  const lifecycleBars =
    LIFECYCLE_DATA[selectedProject] || LIFECYCLE_DATA["All Projects"];

  const filteredActions = actions.filter((a) => {
    if (actionTab === "my") return a.myTask;
    if (actionTab === "overdue") return a.status === "Overdue";
    return true;
  });

  function handleResolveException(id: string) {
    setExceptions((prev) => prev.filter((e) => e.id !== id));
    setSelectedException(null);
    showToast(`Exception for ${id} resolved and recorded in audit history.`, "success");
  }

  function handleCompleteAction(id: string) {
    setActions((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "Completed", statusChip: "bg-green-50 text-green-700" }
          : a
      )
    );
    showToast(`Task for ${id} marked as completed.`, "success");
  }

  return (
    <div className="space-y-5">
      {/* Title row */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold leading-tight tracking-tight text-brand-charcoal">
            Dashboard
          </h1>
          <p className="mt-0.5 text-sm text-muted">
            Overview of all projects, goat-shed construction progress, and exceptions
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Period selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPeriodMenu((v) => !v)}
              className="flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-sm font-medium text-brand-charcoal transition hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              <Calendar className="size-4 text-muted" />
              {period}
              <ChevronDown className="size-4 text-muted" />
            </button>
            {showPeriodMenu && (
              <div className="absolute right-0 top-full z-40 mt-1 w-56 rounded-xl border border-line bg-white p-1 shadow-lg animate-in fade-in zoom-in-95 duration-100">
                {[
                  "01 Apr 2026 – 30 Apr 2026",
                  "01 Jan 2026 – 31 Mar 2026",
                  "Current Quarter (Q1 FY26)",
                  "Entire Financial Year 2026",
                ].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPeriod(p);
                      setShowPeriodMenu(false);
                      showToast(`Dashboard date range set to: ${p}`, "info");
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                      period === p
                        ? "bg-brand-green text-white font-semibold"
                        : "text-brand-charcoal hover:bg-brand-cream"
                    }`}
                  >
                    <span>{p}</span>
                    {period === p && <Check className="size-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* New Record Modal Trigger */}
          <button
            type="button"
            onClick={() => setShowNewRecordModal(true)}
            className="flex h-10 items-center gap-2 rounded-lg bg-brand-green px-4 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
          >
            <Plus className="size-4" />
            New Record
          </button>
        </div>
      </div>

      {/* Row 1: 2x2 KPI Grid (Left 8 cols) + Side Action Card (Right 4 cols) matching reference */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Left: 2x2 Grid of 4 Operational KPIs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
          {KPIS.slice(0, 4).map((k) => (
            <div
              key={k.label}
              className="flex flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-xs transition hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-xl ${k.tint}`}
                  >
                    <k.icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <p className="text-[13px] font-semibold text-brand-charcoal">{k.label}</p>
                </div>
                <button
                  type="button"
                  aria-label={`Options for ${k.label}`}
                  className="rounded p-1 text-muted hover:bg-brand-cream hover:text-brand-charcoal"
                >
                  <MoreVertical className="size-4" />
                </button>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-[28px] font-bold leading-none tracking-tight text-brand-charcoal">
                  {k.value}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    k.deltaClass.includes("red")
                      ? "bg-red-50 text-brand-red"
                      : k.deltaClass.includes("gold")
                      ? "bg-amber-50 text-brand-gold"
                      : "bg-success-bg text-brand-leaf"
                  }`}
                >
                  {k.delta}
                </span>
              </div>

              <p className="mt-2 text-xs text-muted">{k.note}</p>
            </div>
          ))}
        </div>

        {/* Right: Side Action Card matching 'Quick send' in reference layout */}
        <div className="flex flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-xs lg:col-span-4">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-brand-charcoal">
                  {KPIS[4].label}
                </h2>
                <p className="mt-0.5 text-xs text-muted">
                  {KPIS[4].note}
                </p>
              </div>
              <button
                type="button"
                aria-label="Options"
                className="rounded p-1 text-muted hover:bg-brand-cream hover:text-brand-charcoal"
              >
                <MoreVertical className="size-4" />
              </button>
            </div>

            {/* Active Supervisors Row */}
            <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3">
              <span className="text-xs font-medium text-muted">Field Supervisors</span>
              <div className="flex -space-x-2 overflow-hidden">
                {["Ramesh Kumar", "Kunti Sahu", "Manoj Singh", "Hemant Kumar", "Suresh Yadav"].map((name) => (
                  <div key={name} className="ring-2 ring-white rounded-full">
                    <Avatar name={name} size={7} />
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Box */}
            <div className="mt-4 rounded-xl border border-line bg-brand-cream/60 p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Pending Reconciliation Value
              </span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-brand-charcoal">
                  {KPIS[4].delta}
                </span>
                <span className="rounded-md bg-brand-leaf/10 px-2 py-0.5 text-xs font-bold text-brand-leaf">
                  {KPIS[4].value} Sheds
                </span>
              </div>
              <p className="mt-1 text-[11px] text-muted">
                Completion verification pending
              </p>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setShowNewRecordModal(true)}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-4 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              <Plus className="size-4" />
              New Record
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Lifecycle Bar Chart (Left 8 cols) + Stage Overview Donut Chart (Right 4 cols) matching reference */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Left: Shed Lifecycle Distribution */}
        <div className="lg:col-span-8">
          <Card
            title="Shed Lifecycle Distribution"
            action={
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowProjectDropdown((v) => !v)}
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 text-xs font-semibold text-brand-charcoal hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  >
                    <span>{selectedProject}</span>
                    <ChevronDown className="size-3.5 text-muted" />
                  </button>
                  {showProjectDropdown && (
                    <div className="absolute right-0 top-full z-40 mt-1 w-44 rounded-xl border border-line bg-white p-1 shadow-lg animate-in fade-in zoom-in-95 duration-100">
                      {["All Projects", "AJAH", "Sujalam Sufalam"].map((pr) => (
                        <button
                          key={pr}
                          type="button"
                          onClick={() => {
                            setSelectedProject(pr);
                            setShowProjectDropdown(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                            selectedProject === pr
                              ? "bg-brand-green text-white font-semibold"
                              : "text-brand-charcoal hover:bg-brand-cream"
                          }`}
                        >
                          {pr}
                          {selectedProject === pr && <Check className="size-3" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  aria-label="Lifecycle options"
                  className="rounded p-1 text-muted hover:bg-brand-cream hover:text-brand-charcoal"
                >
                  <MoreVertical className="size-4" />
                </button>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <div className="min-w-[560px]">
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
                        className="absolute inset-x-0 border-t border-line/80"
                        style={{ bottom: `${v}%` }}
                      />
                    ))}
                    <div className="flex h-full items-end justify-around gap-2">
                      {lifecycleBars.map((b) => (
                        <div
                          key={b.label}
                          className="group flex h-full flex-1 flex-col items-center justify-end"
                        >
                          <span className="mb-1 text-[11px] font-bold text-brand-charcoal transition group-hover:scale-110">
                            {b.value}
                          </span>
                          <div
                            className={`w-6 rounded-t transition-all group-hover:opacity-90 sm:w-8 ${b.color}`}
                            style={{ height: `${b.value * 1.6}px` }}
                            title={`${b.label}: ${b.value} sheds`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex gap-3">
                  <div className="w-6 shrink-0" />
                  <div className="flex flex-1 justify-around gap-2">
                    {lifecycleBars.map((b) => (
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
        </div>

        {/* Right: Shed Stage Overview (Donut Chart matching 'Earning Overview' in reference) */}
        <div className="lg:col-span-4">
          <Card
            title="Shed Stage Overview"
            action={
              <button
                type="button"
                aria-label="Overview options"
                className="rounded p-1 text-muted hover:bg-brand-cream hover:text-brand-charcoal"
              >
                <MoreVertical className="size-4" />
              </button>
            }
          >
            <div className="flex flex-col items-center justify-between py-1">
              <div className="relative flex items-center justify-center py-2">
                <svg className="size-40 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#dde4da"
                    strokeWidth="12"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#4a8c3f"
                    strokeWidth="12"
                    strokeDasharray="91 148"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#3a7030"
                    strokeWidth="12"
                    strokeDasharray="62 177"
                    strokeDashoffset="-91"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#c4952a"
                    strokeWidth="12"
                    strokeDasharray="45 194"
                    strokeDashoffset="-153"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#667064"
                    strokeWidth="12"
                    strokeDasharray="40 199"
                    strokeDashoffset="-198"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] font-medium text-muted">Total</span>
                  <span className="text-2xl font-bold tracking-tight text-brand-charcoal">312</span>
                  <span className="text-[10px] font-medium text-muted">Sheds</span>
                </div>
              </div>

              <div className="mt-4 grid w-full grid-cols-2 gap-2.5 border-t border-line/60 pt-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-brand-green" />
                  <span className="text-muted">In Progress</span>
                  <span className="ml-auto font-bold text-brand-charcoal">119</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-brand-leaf" />
                  <span className="text-muted">Completed</span>
                  <span className="ml-auto font-bold text-brand-charcoal">81</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-brand-gold" />
                  <span className="text-muted">Materials</span>
                  <span className="ml-auto font-bold text-brand-charcoal">59</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-muted" />
                  <span className="text-muted">Planning</span>
                  <span className="ml-auto font-bold text-brand-charcoal">53</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Row 3: Action Queue Table (Full width matching 'Recent Transaction' in reference) */}
      <Card
        title="Action Queue (My / Team Tasks)"
        action={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg bg-brand-cream p-1">
              <button
                type="button"
                onClick={() => setActionTab("all")}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  actionTab === "all"
                    ? "bg-white text-brand-charcoal shadow-xs"
                    : "text-muted hover:text-brand-charcoal"
                }`}
              >
                All (48)
              </button>
              <button
                type="button"
                onClick={() => setActionTab("my")}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  actionTab === "my"
                    ? "bg-white text-brand-charcoal shadow-xs"
                    : "text-muted hover:text-brand-charcoal"
                }`}
              >
                My Tasks (12)
              </button>
              <button
                type="button"
                onClick={() => setActionTab("overdue")}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  actionTab === "overdue"
                    ? "bg-white text-brand-charcoal shadow-xs"
                    : "text-muted hover:text-brand-charcoal"
                }`}
              >
                Overdue (18)
              </button>
            </div>

            <Link
              href="/tasks"
              className="hidden items-center gap-1 text-xs font-semibold text-brand-green hover:underline sm:flex"
            >
              View all <ChevronRight className="size-3.5" />
            </Link>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-xs">
            <thead>
              <tr className="border-b border-line text-left font-semibold text-muted">
                <th className="py-2.5 pr-2">Shed ID</th>
                <th className="py-2.5 pr-2">Task</th>
                <th className="py-2.5 pr-2">Project</th>
                <th className="py-2.5 pr-2">Owner</th>
                <th className="py-2.5 pr-2">Due Date</th>
                <th className="py-2.5 pr-2">Priority</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {filteredActions.map((a) => (
                <tr key={a.id} className="text-[13px] hover:bg-brand-cream/40">
                  <td className="py-2.5 pr-1 font-semibold text-brand-green">
                    <Link href="/sites" className="hover:underline">
                      {a.id}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-2">
                    <span className="block max-w-[200px] whitespace-normal font-medium text-brand-charcoal">
                      {a.task}
                    </span>
                  </td>
                  <td className="py-2.5 pr-2 text-muted">{a.project}</td>
                  <td className="py-2.5 pr-2">{a.owner}</td>
                  <td
                    className={`py-2.5 pr-2 ${
                      a.dueRed ? "font-semibold text-brand-red" : "text-muted"
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
                      className={`rounded-md px-1.5 py-0.5 text-xs font-medium ${a.statusChip}`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-right">
                    {a.status !== "Completed" ? (
                      <button
                        type="button"
                        onClick={() => handleCompleteAction(a.id)}
                        className="rounded-md border border-line bg-white px-2 py-0.5 text-xs font-medium text-brand-leaf hover:bg-brand-cream"
                      >
                        Resolve
                      </button>
                    ) : (
                      <span className="text-xs text-muted">Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Row 4: Project Overview + Finance Exceptions */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[55fr_45fr]">
        <Card
          title="Project Overview"
          action={
            <Link
              href="/projects"
              className="flex items-center gap-1 text-xs font-semibold text-brand-green hover:underline"
            >
              All projects <ChevronRight className="size-3.5" />
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs font-semibold text-muted">
                  <th className="py-2 pr-2">Project</th>
                  <th className="py-2 pr-2">Total Sheds</th>
                  <th className="py-2 pr-2">In Progress</th>
                  <th className="py-2 pr-2">Completed</th>
                  <th className="py-2 pr-2">Overdue</th>
                  <th className="py-2">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {PROJECTS.map((p) => (
                  <tr
                    key={p.code}
                    className="group transition hover:bg-brand-cream/40"
                  >
                    <td className="py-2.5 pr-2">
                      <Link
                        href={`/projects/${p.code}`}
                        className="flex items-center gap-2.5 font-semibold text-brand-charcoal group-hover:text-brand-green"
                      >
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
                      </Link>
                    </td>
                    <td className="py-2.5 pr-2 font-medium">{p.total}</td>
                    <td className="py-2.5 pr-2">{p.inProgress}</td>
                    <td className="py-2.5 pr-2 text-brand-leaf font-medium">
                      {p.completed}
                    </td>
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
                        <span className="text-xs font-semibold text-brand-charcoal">
                          {p.pct}%
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Finance Exceptions */}
        <Card
          title="Finance Exceptions"
          action={
            <Link
              href="/finance"
              className="flex items-center gap-1 text-xs font-semibold text-brand-green hover:underline"
            >
              View ledger <ChevronRight className="size-3.5" />
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap text-[13px]">
              <thead>
                <tr className="border-b border-line text-left text-xs font-semibold text-muted">
                  <th className="py-2 pr-2">Shed ID</th>
                  <th className="py-2 pr-2">Issue Type</th>
                  <th className="py-2 pr-2 text-right">Amount</th>
                  <th className="py-2 pr-2">Status</th>
                  <th className="py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {exceptions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-xs text-muted">
                      No outstanding finance exceptions!
                    </td>
                  </tr>
                ) : (
                  exceptions.map((e) => (
                    <tr key={e.id} className="text-brand-charcoal/90 hover:bg-brand-cream/40">
                      <td className="py-2.5 pr-2">
                        <Link
                          href="/sites"
                          className="font-bold text-brand-green hover:underline"
                        >
                          {e.id}
                        </Link>
                      </td>
                      <td className="py-2.5 pr-2">{e.issue}</td>
                      <td className="py-2.5 pr-2 text-right font-medium">
                        {e.amount}
                      </td>
                      <td className="py-2.5 pr-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${e.chip}`}
                        >
                          <e.Icon className={`size-3.5 ${e.iconClass}`} />
                          {e.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedException(e)}
                          className="rounded-md border border-line bg-white px-2 py-1 text-xs font-medium text-brand-charcoal transition hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Recent Activities + Map */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[54fr_46fr]">
        <Card
          title="Recent Activities"
          action={
            <Link
              href="/notifications"
              className="flex items-center gap-1 text-xs font-semibold text-brand-green hover:underline"
            >
              All notifications <ChevronRight className="size-3.5" />
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs font-semibold text-muted">
                  <th className="py-2 pr-2">Time</th>
                  <th className="py-2 pr-2">User</th>
                  <th className="py-2 pr-2">Action</th>
                  <th className="py-2">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ACTIVITIES.map((a) => (
                  <tr key={a.details} className="hover:bg-brand-cream/30">
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
                        <span className="font-semibold text-xs text-brand-charcoal">
                          {a.user}
                        </span>
                      </span>
                    </td>
                    <td className="py-2.5 pr-2 text-xs font-medium">{a.action}</td>
                    <td className="py-2.5 text-[13px] text-muted">{a.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* District & Location Overview */}
        <Card
          title="District & Field Operations"
          action={
            <span className="rounded-full bg-success-bg px-2.5 py-0.5 text-xs font-semibold text-brand-leaf">
              4 Active Districts
            </span>
          }
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {DISTRICTS.map((d) => (
                <div
                  key={d.name}
                  className="rounded-xl border border-line bg-brand-cream/40 p-3"
                >
                  <p className="flex items-center gap-1.5 text-xs font-bold text-brand-charcoal">
                    <MapPin className="size-3.5 text-brand-leaf" />
                    {d.name}
                  </p>
                  <div className="mt-2 flex items-baseline justify-between text-xs">
                    <span className="text-muted">Total Sheds</span>
                    <span className="text-base font-bold text-brand-charcoal">
                      {d.sheds}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-muted">
                    <span>In Progress: {d.active}</span>
                    <span>Completed: {d.completed}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-xl border border-line bg-white p-3 text-xs">
              <span className="text-muted">Interactive GIS Map Integration</span>
              <span className="font-semibold text-brand-green">
                Phase 2 GPS Baseline Active
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Modals extracted into dedicated components */}
      <FinanceExceptionModal
        exception={selectedException}
        onClose={() => setSelectedException(null)}
        onResolve={handleResolveException}
      />

      <QuickRecordModal
        isOpen={showNewRecordModal}
        onClose={() => setShowNewRecordModal(false)}
      />
    </div>
  );
}
