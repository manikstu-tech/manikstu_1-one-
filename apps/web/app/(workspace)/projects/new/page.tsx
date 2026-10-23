"use client";

import {
  Building2,
  CalendarDays,
  CircleCheck,
  FileText,
  House,
  IndianRupee,
  Layers,
  MapPin,
  Save,
  Upload,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import {
  Breadcrumb,
  Card,
  Chip,
  PageHeader,
} from "../../_components";

const TYPES = [
  "Livestock / Goat Shed",
  "FPC Development",
  "Manure Processing",
  "Livestock Procurement",
  "Other",
];
const STATUSES = ["Planning", "Active", "On Hold"];
const PEOPLE = ["Ramesh Kumar", "Priya Verma", "Aftab Khan", "Manoj Singh", "Kunti Devi"];
const MONITORING = ["Weekly", "Monthly", "Quarterly"];
const SHED_SIZES = ["330 sq ft (Climate Smart)", "250 sq ft", "400 sq ft", "Custom"];

type Form = {
  name: string;
  code: string;
  type: string;
  tagline: string;
  status: string;
  state: string;
  district: string;
  block: string;
  start: string;
  end: string;
  sheds: string;
  shedSize: string;
  budget: string;
  contribution: string;
  owner: string;
  opsLead: string;
  reviewer: string;
  supplyModel: "A" | "B";
  monitoring: string;
  multiApproval: boolean;
};

const EMPTY: Form = {
  name: "",
  code: "",
  type: TYPES[0],
  tagline: "",
  status: "Planning",
  state: "Chhattisgarh",
  district: "",
  block: "",
  start: "",
  end: "",
  sheds: "",
  shedSize: SHED_SIZES[0],
  budget: "",
  contribution: "15",
  owner: "",
  opsLead: "",
  reviewer: "",
  supplyModel: "A",
  monitoring: "Monthly",
  multiApproval: true,
};

/* ---- small field helpers ---- */
function Group({ title, icon: Icon, children }: { title: string; icon: typeof House; children: ReactNode }) {
  return (
    <Card>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-lg bg-success-bg text-brand-leaf">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <h2 className="text-base font-bold">{title}</h2>
      </div>
      {children}
    </Card>
  );
}

function Label({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <span className="text-[13px] font-medium">
      {children}
      {required && <span className="text-brand-red"> *</span>}
    </span>
  );
}

const inputCls =
  "mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20";

function Text({ label, value, onChange, required, placeholder }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <Label required={required}>{label}</Label>
      <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputCls} />
    </label>
  );
}

function Num({ label, value, onChange, required, prefix }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; prefix?: string }) {
  return (
    <label className="block">
      <Label required={required}>{label}</Label>
      <div className="relative">
        {prefix && <span className="pointer-events-none absolute left-3 top-1/2 mt-[3px] -translate-y-1/2 text-sm text-muted">{prefix}</span>}
        <input type="number" value={value} onChange={(e) => onChange(e.target.value)} className={`${inputCls} ${prefix ? "pl-7" : ""}`} />
      </div>
    </label>
  );
}

function Select({ label, value, onChange, options, required }: { label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean }) {
  return (
    <label className="block">
      <Label required={required}>{label}</Label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        <option value="" disabled>Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function DateField({ label, value, onChange, required }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <label className="block">
      <Label required={required}>{label}</Label>
      <input type="date" value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5 text-sm">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium">{value || "—"}</span>
    </div>
  );
}

export default function NewProjectPage() {
  const [f, setF] = useState<Form>(EMPTY);
  const [created, setCreated] = useState(false);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));

  const canCreate = f.name.trim() !== "" && f.code.trim() !== "" && f.owner !== "";
  const location = [f.block, f.district, f.state].filter(Boolean).join(", ");

  if (created) {
    return (
      <div className="mx-auto max-w-xl space-y-5 py-10 text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-success-bg text-brand-leaf">
          <CircleCheck className="size-9" />
        </span>
        <div>
          <h1 className="text-2xl font-bold">Project created</h1>
          <p className="mt-1 text-sm text-muted">
            <span className="font-semibold text-brand-charcoal">{f.name}</span> ({f.code}) has been added to Manikstu Agro.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Link href="/projects" className="flex h-10 items-center gap-2 rounded-lg bg-brand-green px-4 text-sm font-semibold text-white hover:bg-brand-leaf">
            Go to Projects
          </Link>
          <button
            type="button"
            onClick={() => { setF(EMPTY); setCreated(false); }}
            className="flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-4 text-sm font-medium hover:bg-brand-cream"
          >
            Create another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={["Projects", "New Project"]} />
      <PageHeader
        title="Create Project"
        subtitle="Set up a new project and configure its scope, team and lifecycle"
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
        {/* Form */}
        <div className="space-y-5">
          <Group title="Project Basics" icon={Building2}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Text label="Project Name" required value={f.name} onChange={(v) => set("name", v)} placeholder="e.g. Sujalam Sufalam" />
              <Text label="Project Code" required value={f.code} onChange={(v) => set("code", v.toUpperCase())} placeholder="e.g. SUSU" />
              <Select label="Project Type" value={f.type} onChange={(v) => set("type", v)} options={TYPES} />
              <Select label="Status" value={f.status} onChange={(v) => set("status", v)} options={STATUSES} />
              <label className="block sm:col-span-2">
                <Label>Short Description / Tagline</Label>
                <textarea value={f.tagline} onChange={(e) => set("tagline", e.target.value)} rows={2} placeholder="e.g. Integrated Goat & Poultry" className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" />
              </label>
            </div>
          </Group>

          <Group title="Location & Timeline" icon={MapPin}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Text label="State" value={f.state} onChange={(v) => set("state", v)} />
              <Text label="District" value={f.district} onChange={(v) => set("district", v)} placeholder="e.g. Raipur" />
              <Text label="Block / Village" value={f.block} onChange={(v) => set("block", v)} placeholder="e.g. Arang" />
              <DateField label="Start Date" required value={f.start} onChange={(v) => set("start", v)} />
              <DateField label="End Date" required value={f.end} onChange={(v) => set("end", v)} />
            </div>
          </Group>

          <Group title="Scope & Budget" icon={IndianRupee}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Num label="Target Sheds" required value={f.sheds} onChange={(v) => set("sheds", v)} />
              <Select label="Default Shed Size" value={f.shedSize} onChange={(v) => set("shedSize", v)} options={SHED_SIZES} />
              <Num label="Approved Budget" prefix="₹" value={f.budget} onChange={(v) => set("budget", v)} />
              <Num label="Beneficiary Contribution (%)" value={f.contribution} onChange={(v) => set("contribution", v)} />
            </div>
          </Group>

          <Group title="Team & Ownership" icon={Users}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Select label="Project Owner / Manager" required value={f.owner} onChange={(v) => set("owner", v)} options={PEOPLE} />
              <Select label="Operations Lead" value={f.opsLead} onChange={(v) => set("opsLead", v)} options={PEOPLE} />
              <Select label="AVP / Reviewer" value={f.reviewer} onChange={(v) => set("reviewer", v)} options={PEOPLE} />
            </div>
          </Group>

          <Group title="Configuration" icon={Layers}>
            <div className="space-y-4">
              <div>
                <Label>Supply Model</Label>
                <div className="mt-1.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {([["A", "Fabricator Supplies", "Fabricator provides materials & labour"], ["B", "Manikstu Supplies", "Manikstu supplies materials, fabricator builds"]] as const).map(([val, title, desc]) => (
                    <button key={val} type="button" onClick={() => set("supplyModel", val)} className={`flex items-start gap-2.5 rounded-lg border p-3 text-left transition ${f.supplyModel === val ? "border-brand-green bg-success-bg/50" : "border-line hover:bg-brand-cream"}`}>
                      <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border ${f.supplyModel === val ? "border-brand-green bg-brand-green text-white" : "border-line"}`}>
                        {f.supplyModel === val && <CircleCheck className="size-4" />}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{val}. {title}</span>
                        <span className="block text-xs text-muted">{desc}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select label="Monitoring Frequency" value={f.monitoring} onChange={(v) => set("monitoring", v)} options={MONITORING} />
                <div className="flex items-end">
                  <button type="button" onClick={() => set("multiApproval", !f.multiApproval)} className="flex w-full items-center justify-between gap-3 rounded-lg border border-line px-3 py-2">
                    <span className="text-sm">Enable multi-level approval</span>
                    <span className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${f.multiApproval ? "justify-end bg-brand-green" : "justify-start bg-gray-300"}`}>
                      <span className="size-5 rounded-full bg-white shadow" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Group>

          <Group title="Documents (optional)" icon={FileText}>
            <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-line bg-brand-cream/40 p-6 text-center">
              <Upload className="size-6 text-muted" />
              <p className="text-sm font-medium">Upload sanction / approval document</p>
              <p className="text-xs text-muted">PDF, JPG, PNG (max 10 MB)</p>
              <button type="button" className="mt-1 rounded-lg border border-line bg-white px-3 py-1.5 text-sm font-medium">Choose File</button>
            </div>
          </Group>
        </div>

        {/* Live summary */}
        <aside className="xl:sticky xl:top-[84px] xl:self-start">
          <Card title="Project Summary" action={<Chip tone={f.status === "Active" ? "green" : f.status === "On Hold" ? "red" : "amber"} dot>{f.status}</Chip>}>
            <div className="divide-y divide-line/60">
              <SummaryRow label="Name" value={f.name} />
              <SummaryRow label="Code" value={f.code} />
              <SummaryRow label="Type" value={f.type} />
              <SummaryRow label="Location" value={location} />
              <SummaryRow label="Duration" value={f.start && f.end ? `${f.start} → ${f.end}` : ""} />
              <SummaryRow label="Target Sheds" value={f.sheds} />
              <SummaryRow label="Budget" value={f.budget ? `₹ ${Number(f.budget).toLocaleString("en-IN")}` : ""} />
              <SummaryRow label="Contribution" value={f.contribution ? `${f.contribution}%` : ""} />
              <SummaryRow label="Owner" value={f.owner} />
              <SummaryRow label="Supply Model" value={`Model ${f.supplyModel}`} />
            </div>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                disabled={!canCreate}
                onClick={() => setCreated(true)}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand-green text-sm font-semibold text-white transition enabled:hover:bg-brand-leaf disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CircleCheck className="size-4" /> Create Project
              </button>
              <button
                type="button"
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-line bg-white text-sm font-medium text-brand-charcoal/80 transition hover:bg-brand-cream"
              >
                <Save className="size-4" /> Save as Draft
              </button>
            </div>
            {!canCreate && (
              <p className="mt-2 text-center text-xs text-muted">Name, code and owner are required.</p>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}
