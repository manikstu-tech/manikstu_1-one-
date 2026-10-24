"use client";

import { useState } from "react";
import {
  RotateCcw,
  Save,
  MessageCircle,
  Check,
} from "lucide-react";
import {
  Breadcrumb,
  Card,
  Chip,
  GhostButton,
  PageHeader,
  PrimaryButton,
  Tabs,
  useToast,
} from "../_components";

const STAGES = [
  "Foundation & Planning",
  "Shed Construction",
  "Smart Infrastructure",
  "Livestock Delivery",
  "Monitoring & Support",
];

const SYS = [
  ["Platform Version", "v2.8.0 Production"],
  ["Frontend Framework", "Next.js 16 + React 19"],
  ["CSS Engine", "Tailwind CSS v4"],
  ["Backend API", "Laravel 13 REST Services"],
  ["Database", "PostgreSQL (Encrypted)"],
  ["Hosting Region", "AWS Asia Pacific (Mumbai)"],
  ["Last Security Audit", "24-Oct-2026, 05:00 AM"],
];

const INITIAL_TEMPLATES = [
  { id: "WA-1", name: "Welcome & Consent", trigger: "Beneficiary imported", active: true, lang: "Hindi & Odia" },
  { id: "WA-2", name: "Vaccination Schedule Reminder", trigger: "Every 30 days post-handover", active: true, lang: "Hindi" },
  { id: "WA-3", name: "Material Dispatch Alert", trigger: "Warehouse gate pass created", active: true, lang: "All Languages" },
  { id: "WA-4", name: "AVP Inspection Scheduled", trigger: "Stage progress submitted", active: false, lang: "Hindi" },
];

export default function SettingsPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("Project Configuration");

  // Project Configuration state
  const [projectName, setProjectName] = useState("AJAH");
  const [projectCode, setProjectCode] = useState("PROJ-AJAH");
  const [contributionPct, setContributionPct] = useState("15");
  const [supplyModel, setSupplyModel] = useState<"A" | "B">("B");
  const [multiApproval, setMultiApproval] = useState(true);
  const [isActive, setIsActive] = useState(true);

  // Appearance state
  const [themeMode, setThemeMode] = useState<"light" | "cream" | "forest">("cream");

  // WhatsApp Templates
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);

  // Notification channels
  const [inAppNotif, setInAppNotif] = useState(true);
  const [waNotif, setWaNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [emailDigest, setEmailDigest] = useState(true);

  function handleSaveProjectConfig() {
    showToast("Project AJAH configuration successfully saved to server.", "success");
  }

  function handleReset() {
    setProjectName("AJAH");
    setProjectCode("PROJ-AJAH");
    setContributionPct("15");
    setSupplyModel("B");
    setMultiApproval(true);
    setIsActive(true);
    setThemeMode("cream");
    setTemplates(INITIAL_TEMPLATES);
    showToast("Settings reset to defaults.", "info");
  }

  function toggleTemplate(id: string) {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
    showToast("Template status updated.", "info");
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={["Settings"]} />
      <PageHeader
        title="Settings"
        subtitle="Configure project parameters, automated WhatsApp templates, UI theme, and notification channels"
        actions={
          <GhostButton onClick={handleReset}>
            <RotateCcw className="size-4" /> Reset to Default
          </GhostButton>
        }
      />

      <Tabs
        activeTab={activeTab}
        onChange={(tab) => setActiveTab(tab)}
        tabs={[
          { label: "Project Configuration" },
          { label: "WhatsApp Templates" },
          { label: "Appearance & Theme" },
          { label: "Language & Regional" },
          { label: "Notifications" },
          { label: "System Information" },
        ]}
      />

      {/* Tab 1: Project Configuration */}
      {activeTab === "Project Configuration" && (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <Card title="Project AJAH Configuration">
            <div className="space-y-5">
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">
                  Project Basics
                </h3>
                <div className="space-y-3.5">
                  <label className="block">
                    <span className="text-[13px] font-semibold text-brand-charcoal">
                      Project Name <span className="text-brand-red">*</span>
                    </span>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[13px] font-semibold text-brand-charcoal">
                      Project Code
                    </span>
                    <input
                      type="text"
                      value={projectCode}
                      onChange={(e) => setProjectCode(e.target.value)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 border-t border-line pt-4">
                <div>
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
                    Beneficiary Contribution
                  </h3>
                  <label className="block">
                    <span className="text-xs text-muted">Standard Contribution (%)</span>
                    <input
                      type="number"
                      value={contributionPct}
                      onChange={(e) => setContributionPct(e.target.value)}
                      className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm font-semibold outline-none focus:border-brand-green"
                    />
                    <span className="mt-1 block text-[11px] text-muted">
                      Default: ₹1,25,000 upfront deposit verified by Finance
                    </span>
                  </label>
                </div>

                <div>
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
                    Active Supply Model
                  </h3>
                  <div className="space-y-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setSupplyModel("A")}
                      className={`flex w-full items-center gap-2 rounded-lg border p-2.5 text-left transition ${
                        supplyModel === "A"
                          ? "border-brand-green bg-success-bg/60 font-semibold"
                          : "border-line bg-white hover:bg-brand-cream"
                      }`}
                    >
                      <span className={`size-4 rounded-full border ${supplyModel === "A" ? "border-brand-green bg-brand-green" : "border-line"}`} />
                      <span>Model A: Fabricator Supplies</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSupplyModel("B")}
                      className={`flex w-full items-center gap-2 rounded-lg border p-2.5 text-left transition ${
                        supplyModel === "B"
                          ? "border-brand-green bg-success-bg/60 font-semibold"
                          : "border-line bg-white hover:bg-brand-cream"
                      }`}
                    >
                      <span className={`size-4 rounded-full border ${supplyModel === "B" ? "border-brand-green bg-brand-green" : "border-line"}`} />
                      <span>Model B: Manikstu Supplies</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-line pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-brand-charcoal">Multi-level approval workflow</p>
                    <p className="text-xs text-muted">Requires AVP sign-off for milestone disbursements</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMultiApproval((v) => !v)}
                    className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${
                      multiApproval ? "justify-end bg-brand-green" : "justify-start bg-gray-300"
                    }`}
                  >
                    <span className="size-5 rounded-full bg-white shadow-xs" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-brand-charcoal">Project Operational Status</p>
                    <p className="text-xs text-muted">Currently accepting new site intakes</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsActive((v) => !v)}
                    className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${
                      isActive ? "justify-end bg-brand-green" : "justify-start bg-gray-300"
                    }`}
                  >
                    <span className="size-5 rounded-full bg-white shadow-xs" />
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <PrimaryButton onClick={handleSaveProjectConfig}>
                  <Save className="size-4" /> Save Configuration
                </PrimaryButton>
              </div>
            </div>
          </Card>

          <Card title="Project Stage Sequence">
            <ol className="space-y-2.5">
              {STAGES.map((s, i) => (
                <li
                  key={s}
                  className="flex items-center gap-3 rounded-xl border border-line bg-white p-3 shadow-xs"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-green text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-brand-charcoal">
                    Stage {i + 1}: {s}
                  </span>
                  <Chip tone="green">Active</Chip>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      )}

      {/* Tab 2: WhatsApp Templates */}
      {activeTab === "WhatsApp Templates" && (
        <Card title="Automated WhatsApp Messaging Templates" action={<Chip tone="green">Meta Cloud API</Chip>}>
          <div className="divide-y divide-line/60">
            {templates.map((tpl) => (
              <div key={tpl.id} className="flex items-center justify-between py-3.5">
                <div>
                  <p className="font-bold text-sm text-brand-charcoal flex items-center gap-2">
                    <MessageCircle className="size-4 text-[#25d366]" />
                    {tpl.name}
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    Trigger: <span className="font-medium text-brand-charcoal">{tpl.trigger}</span> · Languages: {tpl.lang}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Chip tone={tpl.active ? "green" : "gray"}>
                    {tpl.active ? "Delivering" : "Disabled"}
                  </Chip>
                  <button
                    type="button"
                    onClick={() => toggleTemplate(tpl.id)}
                    className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${
                      tpl.active ? "justify-end bg-[#25d366]" : "justify-start bg-gray-300"
                    }`}
                  >
                    <span className="size-5 rounded-full bg-white shadow-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 3: Appearance & Theme */}
      {activeTab === "Appearance & Theme" && (
        <Card title="Theme & Visual Palette">
          <p className="text-xs text-muted mb-4">
            Select your preferred interface surface and typography contrast profile
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { id: "cream", title: "Warm Rice / Brand Cream", desc: "Warm rural daylight palette (Original)", border: "border-brand-green bg-brand-cream/80" },
              { id: "light", title: "Pure White Daylight", desc: "Crisp modern clean operations studio", border: "border-line bg-white" },
              { id: "forest", title: "Forest Leaf Deep Accent", desc: "High contrast dark accents for bright sun", border: "border-line bg-emerald-50/50" },
            ].map((th) => (
              <button
                key={th.id}
                type="button"
                onClick={() => {
                  setThemeMode(th.id as "light" | "cream" | "forest");
                  showToast(`Visual theme set to ${th.title}`, "success");
                }}
                className={`rounded-xl border p-4 text-left transition ${
                  themeMode === th.id
                    ? "border-brand-green ring-2 ring-brand-green/20"
                    : "hover:border-brand-green/40"
                } ${th.border}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-brand-charcoal">{th.title}</span>
                  {themeMode === th.id && (
                    <span className="grid size-5 place-items-center rounded-full bg-brand-green text-white">
                      <Check className="size-3" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted mt-1">{th.desc}</p>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 4: Language & Regional */}
      {activeTab === "Language & Regional" && (
        <Card title="Regionalization & Locale Formatting">
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-semibold text-brand-charcoal">System Default Locale</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green">
                <option>English (India) · en-IN</option>
                <option>Hindi (Central) · hi-IN</option>
                <option>Odia (State) · or-IN</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-charcoal">Currency Formatting</label>
              <input
                type="text"
                readOnly
                value="Indian Rupee (INR ₹) · Lakhs & Crores (e.g. ₹ 3,60,00,000)"
                className="mt-1 h-10 w-full rounded-lg border border-line bg-brand-cream/40 px-3 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-charcoal">Standard Timezone</label>
              <input
                type="text"
                readOnly
                value="Indian Standard Time (IST) · Asia/Kolkata (UTC +05:30)"
                className="mt-1 h-10 w-full rounded-lg border border-line bg-brand-cream/40 px-3 text-sm outline-none"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Tab 5: Notifications */}
      {activeTab === "Notifications" && (
        <Card title="Notification Dispatch Channels">
          <div className="divide-y divide-line/60">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-bold text-sm text-brand-charcoal">In-app notifications</p>
                <p className="text-xs text-muted">Receive live notifications in top header bell</p>
              </div>
              <button
                type="button"
                onClick={() => setInAppNotif((v) => !v)}
                className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${
                  inAppNotif ? "justify-end bg-brand-green" : "justify-start bg-gray-300"
                }`}
              >
                <span className="size-5 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-bold text-sm text-brand-charcoal">WhatsApp alerts to farmers</p>
                <p className="text-xs text-muted">Automated vaccination and material arrival notices</p>
              </div>
              <button
                type="button"
                onClick={() => setWaNotif((v) => !v)}
                className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${
                  waNotif ? "justify-end bg-brand-green" : "justify-start bg-gray-300"
                }`}
              >
                <span className="size-5 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-bold text-sm text-brand-charcoal">SMS fallback alerts</p>
                <p className="text-xs text-muted">Emergency dispatch notifications via carrier SMS for low-connectivity sites</p>
              </div>
              <button
                type="button"
                onClick={() => setSmsNotif((v) => !v)}
                className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${
                  smsNotif ? "justify-end bg-brand-green" : "justify-start bg-gray-300"
                }`}
              >
                <span className="size-5 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-bold text-sm text-brand-charcoal">Daily email digest</p>
                <p className="text-xs text-muted">Summary of overdue actions and unverified finance receipts</p>
              </div>
              <button
                type="button"
                onClick={() => setEmailDigest((v) => !v)}
                className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${
                  emailDigest ? "justify-end bg-brand-green" : "justify-start bg-gray-300"
                }`}
              >
                <span className="size-5 rounded-full bg-white shadow-xs" />
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 6: System Information */}
      {activeTab === "System Information" && (
        <Card title="Platform Architecture & Deployment Status">
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
            {SYS.map(([k, v]) => (
              <div key={k} className="rounded-xl border border-line bg-brand-cream/40 p-3">
                <dt className="text-muted">{k}</dt>
                <dd className="mt-1 font-bold text-sm text-brand-charcoal">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      )}
    </div>
  );
}
