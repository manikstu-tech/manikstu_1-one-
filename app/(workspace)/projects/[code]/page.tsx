import {
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  FileText,
  House,
  Phone,
  ReceiptIndianRupee,
  Settings2,
  Store,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import type { ElementType } from "react";
import { Avatar, Breadcrumb, Chip, type Tone } from "../../_components";
import BackButton from "../../BackButton";
import { getProject, PROJECTS } from "../projects-data";
import type { ReactNode } from "react";

function Card({
  title,
  action,
  children,
  className = "",
  padded = true,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section
      className={`min-w-0 rounded-xl border border-line bg-white shadow-xs ${
        padded ? "p-5" : ""
      } ${className}`}
    >
      {(title || action) && (
        <div
          className={`flex items-center justify-between gap-3 ${
            padded ? "mb-4" : "border-b border-line px-5 py-3.5"
          }`}
        >
          {title && <h2 className="text-base font-bold text-brand-charcoal">{title}</h2>}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

// This route depends on the URL (project code), so opt out of the instant shell.
export const instant = false;

const TABS: { label: string; href?: string }[] = [
  { label: "Overview" },
  { label: "Sheds", href: "/sites" },
  { label: "Work Orders", href: "/work-orders" },
  { label: "Materials", href: "/materials" },
  { label: "Finance", href: "/finance" },
  { label: "Documents", href: "/documents" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

const LIFECYCLE = [
  { label: "Approval Imported", value: 12, color: "bg-brand-leaf" },
  { label: "Verification", value: 18, color: "bg-brand-green" },
  { label: "Consent", value: 24, color: "bg-brand-green" },
  { label: "Contribution", value: 22, color: "bg-brand-green" },
  { label: "Site Assessment", value: 16, color: "bg-brand-green" },
  { label: "Site Review", value: 14, color: "bg-brand-green" },
  { label: "Ready Allocation", value: 10, color: "bg-amber-400" },
  { label: "Work Order Pending", value: 8, color: "bg-amber-400" },
  { label: "Materials", value: 12, color: "bg-amber-400" },
  { label: "In Progress", value: 34, color: "bg-brand-green" },
  { label: "Completion Verification", value: 8, color: "bg-gray-400" },
  { label: "Financial Reconciliation", value: 6, color: "bg-gray-400" },
  { label: "Closed", value: 26, color: "bg-brand-leaf" },
];

const DONUT = [
  { label: "In Progress", value: 34, pct: "24%", dot: "bg-brand-green" },
  { label: "Completed", value: 26, pct: "18%", dot: "bg-brand-leaf" },
  { label: "In Earlier Stages", value: 64, pct: "45%", dot: "bg-[#bfe0b8]" },
  { label: "On Hold", value: 8, pct: "6%", dot: "bg-brand-gold" },
  { label: "Overdue", value: 18, pct: "13%", dot: "bg-brand-red" },
];

const RECENT: { shed: string; beneficiary: string; village: string; stage: string; tone: Tone; updated: string }[] = [
  { shed: "SH-000123", beneficiary: "Savita Bai Sahu", village: "Kundagaon", stage: "In Progress", tone: "green", updated: "20-Mar-2026" },
  { shed: "SH-000118", beneficiary: "Laxmi Soni", village: "Atari", stage: "Materials", tone: "amber", updated: "19-Mar-2026" },
  { shed: "SH-000110", beneficiary: "Mangal Ram", village: "Dhamtari", stage: "Overdue", tone: "red", updated: "18-Mar-2026" },
  { shed: "SH-000092", beneficiary: "Rekha Patel", village: "Kumhari", stage: "Site Review", tone: "blue", updated: "18-Mar-2026" },
  { shed: "SH-000076", beneficiary: "Suresh Verma", village: "Arang", stage: "Contribution", tone: "amber", updated: "17-Mar-2026" },
];

const OVERDUE = [
  { shed: "SH-000123", task: "Upload latest progress evidence", owner: "Ramesh Kumar", due: "22-Mar-2026", days: 4 },
  { shed: "SH-000110", task: "Material receipt verification", owner: "Manoj Singh", due: "21-Mar-2026", days: 5 },
  { shed: "SH-000087", task: "Site assessment visit", owner: "Kunti Devi", due: "20-Mar-2026", days: 6 },
  { shed: "SH-000064", task: "Resolve defect", owner: "Shri Ram", due: "18-Mar-2026", days: 8 },
  { shed: "SH-000051", task: "Financial documents", owner: "Finance Team", due: "17-Mar-2026", days: 9 },
];

const TEAM = [
  { name: "Ramesh Kumar", role: "Project Manager", contact: "98765 43210" },
  { name: "Manoj Singh", role: "Operations Lead", contact: "87654 32109" },
  { name: "Kunti Devi", role: "Field Coordinator", contact: "76543 21098" },
  { name: "Shri Ram", role: "AVP Infrastructure", contact: "91234 56789" },
  { name: "Aftab Khan", role: "Finance Manager", contact: "99887 66554" },
];

function viewAll(href: string) {
  return (
    <Link href={href} className="flex items-center gap-1 text-sm font-medium text-brand-green">
      View all <ChevronRight className="size-4" />
    </Link>
  );
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ code: p.code }));
}

export default async function ProjectWorkspace({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const project = getProject(code);

  if (!project) {
    return (
      <div className="space-y-4">
        <Breadcrumb items={["Projects", code]} />
        <Card>
          <p className="py-8 text-center text-sm text-muted">
            Project <span className="font-semibold">{code}</span> was not found.{" "}
            <Link href="/projects" className="font-medium text-brand-green">
              Back to Projects
            </Link>
          </p>
        </Card>
      </div>
    );
  }

  const KPIS: { icon: ElementType; tint: string; label: string; value: string; sub: string; tone?: "green" | "red" }[] = [
    { icon: House, tint: "bg-success-bg text-brand-leaf", label: "Total Sheds", value: String(project.sheds), sub: "↑ 18% vs previous month" },
    { icon: Settings2, tint: "bg-amber-50 text-brand-gold", label: "In Progress", value: "34", sub: "↑ 21% vs previous month" },
    { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", label: "Completed", value: "26", sub: "↑ 30% vs previous month" },
    { icon: CircleAlert, tint: "bg-red-50 text-brand-red", label: "Overdue", value: "18", sub: "Need immediate attention", tone: "red" },
    { icon: ReceiptIndianRupee, tint: "bg-success-bg text-brand-leaf", label: "Verified Receipts", value: "₹31,25,000", sub: "42 beneficiaries" },
    { icon: FileText, tint: "bg-amber-50 text-brand-gold", label: "Pending Reconciliation", value: "₹7,80,000", sub: "18 sheds" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <BackButton />
        <Breadcrumb items={["Projects", "Project Workspace"]} />
      </div>

      {/* Header + side cards */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Card>
          <div className="flex flex-wrap items-start gap-4">
            <div className="h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-brand-cream">
              {/* illustrative thumbnail */}
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-brand-green/20 to-brand-leaf/30 text-brand-leaf">
                <House className="size-8" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold">{project.name}</h1>
                <span className="flex items-center gap-1.5 rounded-full bg-success-bg px-2.5 py-1 text-xs font-semibold text-brand-leaf">
                  <CircleCheck className="size-3.5" /> {project.status}
                  <ChevronDown className="size-3.5" />
                </span>
              </div>
              <p className="mt-0.5 text-sm text-muted">{project.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                <Meta label="Code" value={project.code} />
                <Meta label="Start Date" value={project.start} />
                <Meta label="End Date" value={project.end} />
                <Meta label="Location" value={project.district} />
                <div>
                  <p className="text-[11px] text-muted">Project Manager</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                    <Avatar name={project.owner} size={7} />
                    <span>
                      <span className="block">{project.owner}</span>
                      <span className="block text-[11px] font-normal text-muted">{project.phone}</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-success-bg/40 p-5 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-white text-brand-leaf">
                <Wallet className="size-5" strokeWidth={1.75} />
              </span>
              <p className="text-[13px] font-semibold">Contribution Policy</p>
            </div>
            <p className="mt-3 text-2xl font-bold">{project.contribution}</p>
            <p className="text-xs text-muted">Per beneficiary (as per project config)</p>
            <Link href="/settings" className="mt-3 flex items-center gap-1 text-sm font-medium text-brand-green">
              View Configuration <ChevronRight className="size-4" />
            </Link>
          </div>

          <div className="rounded-xl border border-line bg-amber-50/50 p-5 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-white text-brand-gold">
                <Store className="size-5" strokeWidth={1.75} />
              </span>
              <p className="text-[13px] font-semibold">Supply Model</p>
            </div>
            <p className="mt-3 text-2xl font-bold">Model {project.supply}</p>
            <p className="text-xs text-muted">{project.supplyDesc}</p>
            <Link href="/work-orders" className="mt-3 flex items-center gap-1 text-sm font-medium text-brand-gold">
              View Details <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-line">
        {TABS.map((t) =>
          t.href ? (
            <Link
              key={t.label}
              href={t.href}
              className="border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-muted transition hover:text-brand-charcoal"
            >
              {t.label}
            </Link>
          ) : (
            <span
              key={t.label}
              className="border-b-2 border-brand-green px-4 py-2.5 text-sm font-semibold text-brand-green"
            >
              {t.label}
            </span>
          )
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-xl border border-line bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${k.tint}`}>
                <k.icon className="size-5" strokeWidth={1.75} />
              </span>
              <p className="text-[13px] text-muted">{k.label}</p>
            </div>
            <p className="mt-3 text-[24px] font-bold leading-none">{k.value}</p>
            <p className={`mt-2 text-xs font-medium ${k.tone === "red" ? "text-brand-red" : "text-brand-green"}`}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[58fr_42fr]">
        <Card
          title="Shed Lifecycle Distribution"
          action={
            <span className="inline-flex items-center gap-1 rounded-full border border-line bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-700">
              <ChevronDown className="size-3 text-muted" /> All Stages
            </span>
          }
        >
          <div className="overflow-x-auto">
            <div className="min-w-[680px]">
              <div className="flex h-48 items-end justify-around gap-2">
                {LIFECYCLE.map((b) => (
                  <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end">
                    <span className="mb-1 text-[11px] font-bold">{b.value}</span>
                    <div className={`w-full max-w-7 rounded-t ${b.color}`} style={{ height: `${b.value * 3.6}px` }} />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-around gap-2">
                {LIFECYCLE.map((b) => (
                  <span key={b.label} className="flex-1 text-center text-[9px] leading-tight text-muted">
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card title="Project Progress">
          <div className="flex flex-wrap items-center gap-6">
            <div
              className="grid size-44 shrink-0 place-items-center rounded-full"
              style={{
                background:
                  "conic-gradient(var(--color-brand-green) 0 24%, var(--color-brand-leaf) 24% 42%, #bfe0b8 42% 87%, var(--color-brand-gold) 87% 93%, var(--color-brand-red) 93% 100%)",
              }}
            >
              <div className="grid size-28 place-items-center rounded-full bg-white text-center">
                <div>
                  <p className="text-2xl font-bold">{project.sheds}</p>
                  <p className="text-xs text-muted">Total Sheds</p>
                </div>
              </div>
            </div>
            <ul className="min-w-[180px] flex-1 space-y-2.5 text-sm">
              {DONUT.map((d) => (
                <li key={d.label} className="flex items-center gap-2.5">
                  <span className={`size-2.5 rounded-full ${d.dot}`} />
                  <span className="flex-1">{d.label}</span>
                  <span className="font-bold">{d.value}</span>
                  <span className="w-10 text-right text-muted">{d.pct}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {/* Bottom tables */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card title="Recent Sheds" action={viewAll("/sites")} padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] text-[13px]">
              <thead>
                <tr className="border-y border-line text-left text-xs text-muted">
                  <th className="py-2.5 pl-5 pr-2 font-medium">Shed ID</th>
                  <th className="py-2.5 pr-2 font-medium">Beneficiary</th>
                  <th className="py-2.5 pr-2 font-medium">Village</th>
                  <th className="py-2.5 pr-2 font-medium">Stage</th>
                  <th className="py-2.5 pr-5 font-medium">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {RECENT.map((r) => (
                  <tr key={r.shed}>
                    <td className="py-2.5 pl-5 pr-2 font-semibold text-brand-green">{r.shed}</td>
                    <td className="py-2.5 pr-2">{r.beneficiary}</td>
                    <td className="py-2.5 pr-2 text-muted">{r.village}</td>
                    <td className="py-2.5 pr-2"><Chip tone={r.tone} dot>{r.stage}</Chip></td>
                    <td className="py-2.5 pr-5 whitespace-nowrap text-muted">{r.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Overdue Actions (18)" action={viewAll("/tasks")} padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] text-[13px]">
              <thead>
                <tr className="border-y border-line text-left text-xs text-muted">
                  <th className="py-2.5 pl-5 pr-2 font-medium">Shed ID</th>
                  <th className="py-2.5 pr-2 font-medium">Task</th>
                  <th className="py-2.5 pr-2 font-medium">Owner</th>
                  <th className="py-2.5 pr-2 font-medium">Due Date</th>
                  <th className="py-2.5 pr-5 text-right font-medium">Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {OVERDUE.map((r) => (
                  <tr key={r.shed}>
                    <td className="py-2.5 pl-5 pr-2 font-semibold text-brand-green">{r.shed}</td>
                    <td className="py-2.5 pr-2">{r.task}</td>
                    <td className="py-2.5 pr-2 text-muted">{r.owner}</td>
                    <td className="py-2.5 pr-2 whitespace-nowrap font-medium text-brand-red">{r.due}</td>
                    <td className="py-2.5 pr-5 text-right font-semibold text-brand-red">{r.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Project Team" action={viewAll("/users")} padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] text-[13px]">
              <thead>
                <tr className="border-y border-line text-left text-xs text-muted">
                  <th className="py-2.5 pl-5 pr-2 font-medium">Name</th>
                  <th className="py-2.5 pr-2 font-medium">Role</th>
                  <th className="py-2.5 pr-5 font-medium">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {TEAM.map((m) => (
                  <tr key={m.name}>
                    <td className="py-2.5 pl-5 pr-2">
                      <span className="flex items-center gap-2.5">
                        <Avatar name={m.name} size={7} />
                        <span className="font-medium">{m.name}</span>
                      </span>
                    </td>
                    <td className="py-2.5 pr-2 text-muted">{m.role}</td>
                    <td className="py-2.5 pr-5 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-muted">
                        <Phone className="size-3.5" /> {m.contact}
                      </span>
                    </td>
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

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-muted">{label}</p>
      <p className="mt-1 whitespace-nowrap text-sm font-semibold">{value}</p>
    </div>
  );
}
