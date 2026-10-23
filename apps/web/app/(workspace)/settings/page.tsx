import {
  GripVertical,
  Info,
  Moon,
  Plus,
  RotateCcw,
  Save,
  Sun,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  Breadcrumb,
  Card,
  Chip,
  GhostButton,
  PageHeader,
  PrimaryButton,
  Tabs,
} from "../_components";

const STAGES = [
  "Foundation & Planning",
  "Shed Construction",
  "Smart Infrastructure",
  "Livestock Delivery",
  "Monitoring & Support",
];

const SYS = [
  ["Platform Version", "v2.8.0"],
  ["Frontend Stack", "Next.js 16 + Tailwind CSS"],
  ["Backend API", "Laravel 13"],
  ["Database", "PostgreSQL"],
  ["Deployment Region", "India (AWS)"],
  ["Last Updated", "20-Mar-2026, 04:30 PM"],
];

function Field({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium">{label}</span>
      <input
        defaultValue={value}
        readOnly
        className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
      />
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

function Toggle({ on, label }: { on: boolean; label: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm">{label}</span>
      <span
        className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${
          on ? "justify-end bg-brand-green" : "justify-start bg-gray-300"
        }`}
      >
        <span className="size-5 rounded-full bg-white shadow" />
      </span>
    </div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold">{title}</h3>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={["Settings"]} />
      <PageHeader
        title="Settings"
        subtitle="Configure project settings, system preferences and integrations"
        actions={
          <GhostButton>
            <RotateCcw className="size-4" /> Reset to Default
          </GhostButton>
        }
      />

      <Tabs
        tabs={[
          { label: "Project Configuration", active: true },
          { label: "WhatsApp Templates" },
          { label: "Appearance & Theme" },
          { label: "Language & Regional" },
          { label: "Notifications" },
          { label: "Integrations" },
        ]}
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Left: project configuration */}
        <Card title="Project Configuration">
          <div className="space-y-6">
            <Block title="Project Basics">
              <div className="space-y-4">
                <Field label="Project Name *" value="AJAH" />
                <Field label="Project Code" value="PROJ-AJAH" />
                <label className="block">
                  <span className="text-[13px] font-medium">Project Description</span>
                  <textarea
                    defaultValue="AJAH Women-Led Integrated Livestock Entrepreneurship Initiative"
                    readOnly
                    rows={2}
                    className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-green"
                  />
                </label>
              </div>
            </Block>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Block title="Contribution Policy">
                <Field label="Beneficiary Contribution (%)" value="15" hint="Default 15% as per project guidelines" />
              </Block>
              <Block title="Supply Modes">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 rounded-lg border border-brand-green bg-success-bg/50 p-3">
                    <span className="grid size-5 place-items-center rounded-full bg-brand-green text-white">✓</span>
                    <div>
                      <p className="text-sm font-semibold">A. Fabricator Supplies</p>
                      <p className="text-xs text-muted">Fabricator provides materials & labour</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-line p-3">
                    <span className="size-5 rounded-full border border-line" />
                    <div>
                      <p className="text-sm font-semibold">B. Manikstu Supplies</p>
                      <p className="text-xs text-muted">Manikstu provides materials, fabricator builds</p>
                    </div>
                  </div>
                </div>
              </Block>
            </div>

            <Block title="Other Project Settings">
              <div className="space-y-3 rounded-lg border border-line p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm">Default Shed Size</span>
                  <span className="rounded-lg border border-line px-3 py-1.5 text-sm">330 sq ft (Climate Smart)</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm">Monitoring Frequency</span>
                  <span className="rounded-lg border border-line px-3 py-1.5 text-sm">Monthly</span>
                </div>
                <Toggle on label="Enable multi-level approval" />
                <Toggle on label="This project is active" />
              </div>
            </Block>

            <div className="flex gap-3">
              <PrimaryButton>
                <Save className="size-4" /> Save Changes
              </PrimaryButton>
              <GhostButton>
                <RotateCcw className="size-4" /> Cancel
              </GhostButton>
            </div>
          </div>
        </Card>

        {/* Right column */}
        <div className="space-y-5">
          <Card title="Project Stages" action={<GhostButton><Plus className="size-4" /> Add Stage</GhostButton>}>
            <ol className="space-y-2">
              {STAGES.map((s, i) => (
                <li key={s} className="flex items-center gap-3 rounded-lg border border-line p-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-green text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium">Stage {i + 1}: {s}</span>
                  <GripVertical className="size-4 text-muted" />
                </li>
              ))}
            </ol>
          </Card>

          <Card title="Theme & Appearance">
            <p className="mb-3 text-[13px] text-muted">Choose your preferred theme and default language.</p>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 rounded-lg bg-brand-green py-2.5 text-sm font-semibold text-white">
                <Sun className="size-4" /> Light
              </button>
              <button type="button" className="flex items-center justify-center gap-2 rounded-lg border border-line py-2.5 text-sm font-medium">
                <Moon className="size-4" /> Dark
              </button>
            </div>
            <label className="mt-4 block">
              <span className="text-[13px] font-medium">Default Language</span>
              <span className="mt-1.5 flex h-10 items-center rounded-lg border border-line px-3 text-sm">English (EN)</span>
            </label>
          </Card>

          <Card title="System Information" action={<Chip tone="green" icon={Info}>Healthy</Chip>}>
            <dl className="divide-y divide-line/60 text-sm">
              {SYS.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </div>
    </div>
  );
}
