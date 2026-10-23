import {
  BadgeCheck,
  CalendarDays,
  Camera,
  CircleCheck,
  FileText,
  Mail,
  MapPin,
  Package,
  Pencil,
  Phone,
  ShieldCheck,
} from "lucide-react";
import type { ElementType } from "react";
import {
  Breadcrumb,
  Card,
  Chip,
  GhostButton,
  PageHeader,
  PrimaryButton,
  Progress,
} from "../_components";

const CONTACT: { icon: ElementType; label: string; value: string }[] = [
  { icon: Mail, label: "Email", value: "aftab.khan@manikstu.com" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: MapPin, label: "Location", value: "Raipur, Chhattisgarh" },
  { icon: CalendarDays, label: "Member since", value: "05 Jan 2025" },
];

const PROJECTS = [
  { name: "AJAH", role: "Operations Manager", sheds: 142, pct: 24 },
  { name: "FPC Development", role: "Operations Manager", sheds: 30, pct: 40 },
  { name: "Sujalam Sufalam", role: "Reviewer", sheds: 200, pct: 62 },
];

const ACTIVITY: { icon: ElementType; tint: string; text: string; time: string }[] = [
  { icon: BadgeCheck, tint: "bg-success-bg text-brand-leaf", text: "Approved inspection for SH-000107", time: "2 hours ago" },
  { icon: FileText, tint: "bg-blue-50 text-blue-600", text: "Created work order WO-2026-0147", time: "5 hours ago" },
  { icon: Package, tint: "bg-amber-50 text-brand-gold", text: "Verified material receipt for SH-000118", time: "1 day ago" },
  { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", text: "Closed task TSK-2026-041", time: "2 days ago" },
];

const STATS = [
  { label: "Sheds Managed", value: "372" },
  { label: "Tasks Completed", value: "248" },
  { label: "Approvals", value: "96" },
  { label: "Open Items", value: "12" },
];

export default function ProfilePage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={["My Profile"]} />
      <PageHeader
        title="My Profile"
        subtitle="Your account details, assigned projects and recent activity"
        actions={
          <>
            <GhostButton>
              <Camera className="size-4" /> Change Photo
            </GhostButton>
            <PrimaryButton>
              <Pencil className="size-4" /> Edit Profile
            </PrimaryButton>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[38fr_62fr]">
        {/* Identity card */}
        <Card>
          <div className="flex flex-col items-center text-center">
            <span className="grid size-24 place-items-center rounded-full bg-brand-green text-3xl font-bold text-white">
              AK
            </span>
            <h2 className="mt-4 text-xl font-bold">Aftab Khan</h2>
            <p className="text-sm text-muted">Operations Manager</p>
            <div className="mt-2 flex items-center gap-2">
              <Chip tone="green" icon={ShieldCheck}>Verified</Chip>
              <Chip tone="blue">Admin Access</Chip>
            </div>
          </div>

          <dl className="mt-6 space-y-3 border-t border-line pt-5">
            {CONTACT.map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-cream text-muted">
                  <c.icon className="size-[18px]" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs text-muted">{c.label}</dt>
                  <dd className="truncate text-sm font-medium">{c.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Card>

        <div className="space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-line bg-white p-5 text-center shadow-sm">
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Assigned projects */}
          <Card title="Assigned Projects">
            <ul className="space-y-3">
              {PROJECTS.map((p) => (
                <li key={p.name} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line p-4">
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs text-muted">{p.role} · {p.sheds} sheds</p>
                  </div>
                  <Progress pct={p.pct} />
                </li>
              ))}
            </ul>
          </Card>

          {/* Recent activity */}
          <Card title="Recent Activity">
            <ul className="space-y-4">
              {ACTIVITY.map((a, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className={`grid size-9 shrink-0 place-items-center rounded-full ${a.tint}`}>
                    <a.icon className="size-[18px]" strokeWidth={1.75} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm">{a.text}</p>
                  </div>
                  <span className="text-xs text-muted">{a.time}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
