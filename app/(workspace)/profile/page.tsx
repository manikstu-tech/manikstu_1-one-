"use client";

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
  Save,
  ShieldCheck,
  X,
  Copy,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ElementType } from "react";
import {
  Breadcrumb,
  Card,
  Chip,
  PageHeader,
  Progress,
  useToast,
} from "../_components";

type Profile = {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  since: string;
  color: string;
  avatarUrl?: string;
};

const DEFAULT: Profile = {
  name: "Aftab Khan",
  role: "Operations Manager",
  email: "aftab.khan@manikstu.com",
  phone: "+91 98765 43210",
  location: "Raipur, Chhattisgarh",
  since: "05 Jan 2025",
  color: "bg-brand-green",
};

const COLORS = [
  "bg-brand-green",
  "bg-brand-leaf",
  "bg-brand-gold",
  "bg-blue-500",
  "bg-rose-500",
  "bg-teal-600",
];

const STORAGE_KEY = "manikstu_profile";

function initials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

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

function Field({
  icon: Icon,
  label,
  value,
  onCopy,
}: {
  icon: ElementType;
  label: string;
  value: string;
  onCopy?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 group">
      <div className="flex items-center gap-3 min-w-0">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-cream text-muted">
          <Icon className="size-[18px]" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="text-xs text-muted">{label}</p>
          <p className="truncate text-sm font-medium">{value}</p>
        </div>
      </div>
      {onCopy && (
        <button
          type="button"
          onClick={onCopy}
          className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1.5 rounded-lg border border-line hover:bg-brand-cream text-muted hover:text-brand-charcoal transition"
          title={`Copy ${label}`}
        >
          <Copy className="size-3.5" />
        </button>
      )}
    </div>
  );
}

function EditField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
      />
    </label>
  );
}

export default function ProfilePage() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>(DEFAULT);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Profile>(DEFAULT);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load any saved profile for this viewer asynchronously to satisfy React 19 render cycle
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULT, ...JSON.parse(raw) } as Profile;
        queueMicrotask(() => {
          setProfile(parsed);
          setDraft(parsed);
        });
      }
    } catch {
      /* ignore unavailable storage */
    }
  }, []);

  function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        type: "error",
        title: "Invalid file type",
        message: "Please select an image file (PNG, JPG, WebP, SVG).",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        type: "error",
        title: "File too large",
        message: "Avatar image must be smaller than 5 MB.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (editing) {
        setDraft((prev) => ({ ...prev, avatarUrl: dataUrl }));
      } else {
        const updated = { ...profile, avatarUrl: dataUrl };
        setProfile(updated);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          /* ignore */
        }
      }
      toast({
        type: "success",
        title: "Avatar Updated",
        message: "Profile image has been saved successfully.",
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function startEdit() {
    setDraft(profile);
    setEditing(true);
    setSaved(false);
  }

  function cancel() {
    setDraft(profile);
    setEditing(false);
  }

  function save() {
    setProfile(draft);
    setEditing(false);
    setSaved(true);
    toast({
      type: "success",
      title: "Profile Updated",
      message: "Your profile details have been successfully saved.",
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      /* ignore unavailable storage */
    }
  }

  function cyclePhoto() {
    const base = editing ? draft : profile;
    const next = COLORS[(COLORS.indexOf(base.color) + 1) % COLORS.length];
    if (editing) {
      setDraft({ ...draft, color: next });
    } else {
      const updated = { ...profile, color: next };
      setProfile(updated);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        /* ignore */
      }
    }
    toast({
      type: "info",
      title: "Avatar Theme Updated",
      message: "Color palette theme updated.",
    });
  }

  function copyText(label: string, text: string) {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      toast({
        type: "success",
        title: "Copied to Clipboard",
        message: `${label} copied to clipboard.`,
      });
    }
  }

  const shown = editing ? draft : profile;

  return (
    <div className="space-y-5">
      <Breadcrumb items={["My Profile"]} />
      <PageHeader
        title="My Profile"
        subtitle="Your account details, assigned projects and recent activity"
        actions={
          editing ? (
            <>
              <button
                type="button"
                onClick={cancel}
                className="flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-sm font-medium text-brand-charcoal/80 transition hover:bg-brand-cream"
              >
                <X className="size-4" /> Cancel
              </button>
              <button
                type="button"
                onClick={save}
                className="flex h-10 items-center gap-2 rounded-lg bg-brand-green px-4 text-sm font-semibold text-white transition hover:bg-brand-leaf"
              >
                <Save className="size-4" /> Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-sm font-medium text-brand-charcoal/80 transition hover:bg-brand-cream"
              >
                <Camera className="size-4" /> Change Avatar
              </button>
              <button
                type="button"
                onClick={startEdit}
                className="flex h-10 items-center gap-2 rounded-lg bg-brand-green px-4 text-sm font-semibold text-white transition hover:bg-brand-leaf"
              >
                <Pencil className="size-4" /> Edit Profile
              </button>
            </>
          )
        }
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="sr-only"
        onChange={handleAvatarUpload}
      />

      {saved && !editing && (
        <div className="flex items-center gap-2 rounded-lg bg-success-bg px-4 py-2.5 text-sm font-medium text-brand-leaf">
          <CircleCheck className="size-4" /> Profile updated successfully.
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[38fr_62fr]">
        {/* Identity card */}
        <Card>
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              {shown.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={shown.avatarUrl}
                  alt={shown.name}
                  className="size-24 rounded-full object-cover border-2 border-white shadow ring-2 ring-brand-green/20"
                />
              ) : (
                <span
                  className={`grid size-24 place-items-center rounded-full text-3xl font-bold text-white transition-colors ${shown.color}`}
                >
                  {initials(shown.name)}
                </span>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload photo"
                title="Upload avatar photo"
                className="absolute bottom-0 right-0 grid size-8 place-items-center rounded-full border-2 border-white bg-brand-green text-white shadow hover:bg-brand-leaf transition cursor-pointer"
              >
                <Camera className="size-4" />
              </button>
            </div>
            {shown.avatarUrl ? (
              <button
                type="button"
                onClick={() => {
                  if (editing) {
                    setDraft((prev) => ({ ...prev, avatarUrl: undefined }));
                  } else {
                    const updated = { ...profile, avatarUrl: undefined };
                    setProfile(updated);
                    try {
                      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                    } catch {
                      /* ignore */
                    }
                  }
                  toast({
                    type: "info",
                    title: "Avatar Reset",
                    message: "Profile photo reset to initials avatar.",
                  });
                }}
                className="mt-2 text-xs text-muted hover:text-brand-crimson underline transition"
              >
                Remove photo
              </button>
            ) : (
              <button
                type="button"
                onClick={cyclePhoto}
                className="mt-2 text-xs text-muted hover:text-brand-green underline transition"
              >
                Change avatar color
              </button>
            )}

            {editing ? (
              <div className="mt-4 w-full space-y-3 text-left">
                <EditField label="Full Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
                <EditField label="Role / Designation" value={draft.role} onChange={(v) => setDraft({ ...draft, role: v })} />
              </div>
            ) : (
              <>
                <h2 className="mt-4 text-xl font-bold">{shown.name}</h2>
                <p className="text-sm text-muted">{shown.role}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Chip tone="green" icon={ShieldCheck}>Verified</Chip>
                  <Chip tone="blue">Admin Access</Chip>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 border-t border-line pt-5">
            {editing ? (
              <div className="space-y-3">
                <EditField label="Email" type="email" value={draft.email} onChange={(v) => setDraft({ ...draft, email: v })} />
                <EditField label="Phone" value={draft.phone} onChange={(v) => setDraft({ ...draft, phone: v })} />
                <EditField label="Location" value={draft.location} onChange={(v) => setDraft({ ...draft, location: v })} />
              </div>
            ) : (
              <dl className="space-y-3">
                <Field icon={Mail} label="Email" value={shown.email} onCopy={() => copyText("Email", shown.email)} />
                <Field icon={Phone} label="Phone" value={shown.phone} onCopy={() => copyText("Phone", shown.phone)} />
                <Field icon={MapPin} label="Location" value={shown.location} />
                <Field icon={CalendarDays} label="Member since" value={shown.since} />
              </dl>
            )}
          </div>
        </Card>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-line bg-white p-5 text-center shadow-sm">
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>

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
