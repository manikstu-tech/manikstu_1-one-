import {
  BookOpen,
  ChevronRight,
  FileText,
  House,
  IndianRupee,
  Mail,
  MessageCircle,
  Phone,
  Play,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { ElementType } from "react";
import {
  Breadcrumb,
  Card,
  PageHeader,
  SearchInput,
} from "../_components";

const TOPICS: { icon: ElementType; tint: string; title: string; desc: string; count: string }[] = [
  { icon: Play, tint: "bg-success-bg text-brand-leaf", title: "Getting Started", desc: "Set up your account and learn the basics", count: "8 articles" },
  { icon: House, tint: "bg-blue-50 text-blue-600", title: "Managing Sheds", desc: "Register, track stages and update progress", count: "12 articles" },
  { icon: Users, tint: "bg-amber-50 text-brand-gold", title: "Beneficiaries", desc: "Intake, verification, consent and contribution", count: "7 articles" },
  { icon: IndianRupee, tint: "bg-success-bg text-brand-leaf", title: "Finance & Ledgers", desc: "Receipts, expenses and reconciliation", count: "9 articles" },
  { icon: FileText, tint: "bg-blue-50 text-blue-600", title: "Documents & Evidence", desc: "Upload, review and manage files", count: "6 articles" },
  { icon: ShieldCheck, tint: "bg-amber-50 text-brand-gold", title: "Roles & Permissions", desc: "Access control and user management", count: "5 articles" },
];

const FAQ: { q: string; a: string }[] = [
  { q: "How do I register a new shed?", a: "Go to Sites / Sheds → New Shed, or import from the government list. Each shed gets a permanent Shed ID." },
  { q: "How is beneficiary contribution verified?", a: "Finance verifies the bank transaction; a receipt stays 'Unverified' until Finance confirms it." },
  { q: "What is the difference between Model A and Model B?", a: "Model A: the fabricator supplies all materials. Model B: Manikstu supplies materials and the fabricator builds." },
  { q: "Who can approve a completion inspection?", a: "AVP Infrastructure reviews completion evidence and records accept / correction / reject. Fabricators cannot self-approve." },
  { q: "Can I work offline in the field?", a: "Field forms support offline capture with local drafts and later sync. Financial verification stays online-only." },
];

const CONTACT: { icon: ElementType; label: string; value: string; tint: string }[] = [
  { icon: MessageCircle, label: "WhatsApp Support", value: "+91 90000 12345", tint: "bg-[#25d366]/10 text-[#1da851]" },
  { icon: Mail, label: "Email", value: "support@manikstu.com", tint: "bg-blue-50 text-blue-600" },
  { icon: Phone, label: "Phone (9am–6pm)", value: "+91 771 400 1234", tint: "bg-amber-50 text-brand-gold" },
];

export default function HelpPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={["Help & Support"]} />
      <PageHeader
        title="Help & Support"
        subtitle="Guides, FAQs and ways to reach the Manikstu support team"
      />

      <Card>
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <span className="grid size-12 place-items-center rounded-xl bg-success-bg text-brand-leaf">
            <BookOpen className="size-6" strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="text-lg font-bold">How can we help you?</h2>
            <p className="text-sm text-muted">Search the help center or browse topics below</p>
          </div>
          <div className="w-full max-w-xl">
            <SearchInput placeholder="Search help articles..." />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {TOPICS.map((t) => (
          <a
            key={t.title}
            href="#"
            className="group rounded-xl border border-line bg-white p-5 shadow-sm transition hover:border-brand-green/40 hover:shadow"
          >
            <span className={`grid size-11 place-items-center rounded-lg ${t.tint}`}>
              <t.icon className="size-5" strokeWidth={1.75} />
            </span>
            <p className="mt-3 flex items-center gap-1 font-semibold">
              {t.title}
              <ChevronRight className="size-4 text-muted transition group-hover:translate-x-0.5" />
            </p>
            <p className="mt-1 text-sm text-muted">{t.desc}</p>
            <p className="mt-2 text-xs font-medium text-brand-green">{t.count}</p>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[62fr_38fr]">
        <Card title="Frequently Asked Questions">
          <ul className="divide-y divide-line/60">
            {FAQ.map((f) => (
              <li key={f.q} className="py-3.5">
                <p className="flex items-start gap-2 text-sm font-semibold">
                  <span className="text-brand-green">Q.</span>
                  {f.q}
                </p>
                <p className="mt-1 pl-5 text-sm text-muted">{f.a}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Contact Support">
          <ul className="space-y-3">
            {CONTACT.map((c) => (
              <li key={c.label} className="flex items-center gap-3 rounded-lg border border-line p-4">
                <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${c.tint}`}>
                  <c.icon className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs text-muted">{c.label}</p>
                  <p className="text-sm font-semibold">{c.value}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-brand-cream/60 p-3 text-xs text-muted">
            Support hours: Monday–Saturday, 9:00 AM – 6:00 PM IST. Average response time under 2 hours.
          </p>
        </Card>
      </div>
    </div>
  );
}
