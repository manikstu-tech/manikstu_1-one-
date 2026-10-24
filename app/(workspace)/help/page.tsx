"use client";

import { useState, useMemo } from "react";
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
  Search,
  ExternalLink,
  MessageSquarePlus,
  CheckCircle2,
  HelpCircle,
  Send,
} from "lucide-react";
import type { ElementType } from "react";
import {
  Breadcrumb,
  Card,
  Modal,
  PageHeader,
  useToast,
} from "../_components";

type Topic = {
  id: string;
  icon: ElementType;
  tint: string;
  title: string;
  desc: string;
  count: string;
  articles: { title: string; summary: string }[];
};

const TOPICS: Topic[] = [
  {
    id: "getting-started",
    icon: Play,
    tint: "bg-success-bg text-brand-leaf",
    title: "Getting Started",
    desc: "Set up your account and learn the workspace basics",
    count: "8 articles",
    articles: [
      { title: "Workspace Navigation & Global Search (Ctrl+K)", summary: "Use the command palette to quickly jump between projects, sheds, beneficiaries, and tasks." },
      { title: "Understanding Project Roles & Access Rights", summary: "Operations Managers, Field Coordinators, and AVP Approvers have distinct operational permissions." },
      { title: "Multi-Language Support (English, Hindi, Odia, Chhattisgarhi)", summary: "Switch the workspace dialect instantly using the Language Switcher in the top navigation." },
    ],
  },
  {
    id: "sheds",
    icon: House,
    tint: "bg-blue-50 text-blue-600",
    title: "Managing Sheds",
    desc: "Register, track stages and update site progress",
    count: "12 articles",
    articles: [
      { title: "Permanent Shed ID Schema", summary: "Sheds are assigned permanent IDs (e.g. SH-000101) immutable across stages and re-assignments." },
      { title: "Progression through 8 Construction Stages", summary: "Site Prep → Plinth → Framing → Roofing → Cladding → Internal Fitout → Quality Inspection → Handover." },
      { title: "Handling Geotagged Field Evidence", summary: "Each site milestone requires high-resolution photos with tamper-evident EXIF coordinates." },
    ],
  },
  {
    id: "beneficiaries",
    icon: Users,
    tint: "bg-amber-50 text-brand-gold",
    title: "Beneficiaries",
    desc: "Intake, verification, consent and contribution",
    count: "7 articles",
    articles: [
      { title: "The ₹1.25 Lakh AJAH Upfront Deposit Workflow", summary: "Beneficiary contribution must be verified by Finance before site procurement commences." },
      { title: "Aadhaar & Land Title KYC Verification", summary: "Upload and verify government identity documents and land ownership records." },
      { title: "Signed Agreement & Consent Forms", summary: "Digitally capture or scan physical consent forms signed by the head of the beneficiary household." },
    ],
  },
  {
    id: "finance",
    icon: IndianRupee,
    tint: "bg-success-bg text-brand-leaf",
    title: "Finance & Ledgers",
    desc: "Receipts, expenses and reconciliation",
    count: "9 articles",
    articles: [
      { title: "Reconciling UTR Bank Transfers", summary: "Bank transfer references must be matched against physical ledger slips before status turns Verified." },
      { title: "Fabricator Advance & Milestones", summary: "Mobilization advances (up to 30%) require verified WO approval and AVP milestone signoff." },
      { title: "Government Subsidy & CSR Tranches", summary: "Track district-level capital allocations from NABARD, District Mineral Foundation, and CSR." },
    ],
  },
  {
    id: "documents",
    icon: FileText,
    tint: "bg-blue-50 text-blue-600",
    title: "Documents & Evidence",
    desc: "Upload, review and manage files",
    count: "6 articles",
    articles: [
      { title: "Acceptable File Formats & Compression", summary: "Upload JPEG, PNG, or PDF up to 25MB. Files are automatically encrypted at rest." },
      { title: "Handling Flagged Corrections", summary: "When an approver flags an image as blurry or misaligned, re-upload is enabled immediately." },
    ],
  },
  {
    id: "roles",
    icon: ShieldCheck,
    tint: "bg-amber-50 text-brand-gold",
    title: "Roles & Permissions",
    desc: "Access control and user management",
    count: "5 articles",
    articles: [
      { title: "AVP Infrastructure Independent Audit Mandate", summary: "Structural completion audits cannot be self-approved by site fabricators or local vendors." },
      { title: "Adding New Field Staff", summary: "Admins can invite site supervisors with targeted district-level access controls." },
    ],
  },
];

const FAQ: { q: string; a: string; topicId: string }[] = [
  {
    q: "How do I register a new shed?",
    a: "Go to Sites / Sheds → 'New Shed' or import from the government list. Each shed gets an unalterable permanent Shed ID linked to its beneficiary.",
    topicId: "sheds",
  },
  {
    q: "How is beneficiary contribution verified?",
    a: "Beneficiary bank deposits (such as the ₹1.25L AJAH contribution) must be verified by Finance via UTR reconciliation; receipts stay 'Unverified' until confirmed.",
    topicId: "beneficiaries",
  },
  {
    q: "What is the difference between Model A and Model B work orders?",
    a: "Model A: the fabricator supplies both materials and labor. Model B: Manikstu supplies centralized materials and the fabricator executes civil and assembly labor.",
    topicId: "sheds",
  },
  {
    q: "Who can approve a structural completion inspection?",
    a: "AVP Infrastructure reviews structural evidence and issues accept / correction / reject decisions. Fabricators and site vendors cannot self-approve.",
    topicId: "roles",
  },
  {
    q: "Can I work offline in the field?",
    a: "Field checklists and photo forms support offline draft capture with indexed local cache. They sync automatically when connectivity resumes. Financial transfers remain online-only.",
    topicId: "getting-started",
  },
];

const CONTACT: { icon: ElementType; label: string; value: string; tint: string; action: string; actionText: string }[] = [
  {
    icon: MessageCircle,
    label: "WhatsApp Support",
    value: "+91 90000 12345",
    tint: "bg-[#25d366]/10 text-[#1da851]",
    action: "https://wa.me/919000012345?text=Hello%20Manikstu%20Support",
    actionText: "Chat on WhatsApp",
  },
  {
    icon: Mail,
    label: "Email Support",
    value: "support@manikstu.com",
    tint: "bg-blue-50 text-blue-600",
    action: "mailto:support@manikstu.com?subject=Manikstu%20Support%20Request",
    actionText: "Send Email",
  },
  {
    icon: Phone,
    label: "Helpline (9am–6pm)",
    value: "+91 771 400 1234",
    tint: "bg-amber-50 text-brand-gold",
    action: "tel:+917714001234",
    actionText: "Call Now",
  },
];

export default function HelpPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState("Technical");
  const [ticketMessage, setTicketMessage] = useState("");

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return FAQ;
    return FAQ.filter(
      (item) =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredTopics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return TOPICS;
    return TOPICS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.articles.some(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.summary.toLowerCase().includes(q)
        )
    );
  }, [searchQuery]);

  function handleContactClick(contact: (typeof CONTACT)[0]) {
    if (typeof window !== "undefined") {
      window.open(contact.action, "_blank", "noopener,noreferrer");
    }
    toast({
      type: "info",
      title: contact.label,
      message: `Connecting to ${contact.value}...`,
    });
  }

  function handleTicketSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      toast({
        type: "error",
        title: "Missing Fields",
        message: "Please enter both a subject and details for your ticket.",
      });
      return;
    }
    toast({
      type: "success",
      title: "Support Ticket Logged",
      message: `Ticket #${Math.floor(100000 + Math.random() * 900000)} has been submitted. Our team will contact you shortly.`,
    });
    setTicketModalOpen(false);
    setTicketSubject("");
    setTicketMessage("");
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={["Help & Support"]} />
      <PageHeader
        title="Help & Support"
        subtitle="Operational documentation, system FAQs and direct helpdesk escalation"
        actions={
          <button
            type="button"
            onClick={() => setTicketModalOpen(true)}
            className="flex h-10 items-center gap-2 rounded-lg bg-brand-green px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
          >
            <MessageSquarePlus className="size-4" /> Raise Support Ticket
          </button>
        }
      />

      <Card>
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <span className="grid size-12 place-items-center rounded-xl bg-success-bg text-brand-leaf">
            <BookOpen className="size-6" strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="text-lg font-bold">How can we help you?</h2>
            <p className="text-sm text-muted">
              Search knowledge base articles, standard operating procedures, or select a topic
            </p>
          </div>
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics, FAQ or keywords (e.g. Model B, UTR, Shed ID)..."
              className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-muted focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
            />
          </div>
        </div>
      </Card>

      {/* Knowledge Base Topics */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
          Browse Knowledge Base
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTopics.map((t) => (
            <button
              key={t.title}
              type="button"
              onClick={() => setActiveTopic(t)}
              className="group flex flex-col text-left rounded-xl border border-line bg-white p-5 shadow-sm transition hover:border-brand-green/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              <div className="flex items-center justify-between w-full">
                <span className={`grid size-11 place-items-center rounded-lg ${t.tint}`}>
                  <t.icon className="size-5" strokeWidth={1.75} />
                </span>
                <span className="text-xs font-semibold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full">
                  {t.count}
                </span>
              </div>
              <p className="mt-3 flex items-center justify-between font-semibold text-brand-charcoal group-hover:text-brand-green transition">
                {t.title}
                <ChevronRight className="size-4 text-muted transition group-hover:translate-x-1" />
              </p>
              <p className="mt-1 text-sm text-muted">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[62fr_38fr]">
        <Card title={`Frequently Asked Questions (${filteredFaqs.length})`}>
          {filteredFaqs.length === 0 ? (
            <div className="py-8 text-center text-muted">
              <HelpCircle className="mx-auto size-8 text-muted mb-2 opacity-60" />
              <p className="text-sm font-medium">No FAQ matching &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-xs mt-1">Try another search keyword or raise a support ticket.</p>
            </div>
          ) : (
            <ul className="divide-y divide-line/60">
              {filteredFaqs.map((f) => (
                <li key={f.q} className="py-3.5">
                  <p className="flex items-start gap-2 text-sm font-semibold text-brand-charcoal">
                    <span className="text-brand-green font-bold">Q.</span>
                    {f.q}
                  </p>
                  <p className="mt-1.5 pl-5 text-sm leading-relaxed text-muted">{f.a}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Contact Manikstu Helpdesk">
          <ul className="space-y-3">
            {CONTACT.map((c) => (
              <li
                key={c.label}
                className="flex items-center justify-between gap-3 rounded-lg border border-line p-3.5 transition hover:bg-brand-cream/30"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${c.tint}`}>
                    <c.icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted">{c.label}</p>
                    <p className="truncate text-sm font-semibold text-brand-charcoal">{c.value}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleContactClick(c)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-brand-charcoal shadow-sm transition hover:bg-brand-cream hover:border-brand-green/30"
                >
                  <ExternalLink className="size-3 text-muted" />
                  {c.actionText}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg bg-brand-cream/60 p-3.5 text-xs text-muted border border-brand-cream">
            <p className="font-semibold text-brand-charcoal">Operational Support Hours</p>
            <p className="mt-0.5">
              Monday–Saturday, 9:00 AM – 6:00 PM IST. Urgent field incidents can be flagged via WhatsApp with site shed ID.
            </p>
          </div>
        </Card>
      </div>

      {/* Topic Detail Modal */}
      {activeTopic && (
        <Modal
          isOpen={!!activeTopic}
          onClose={() => setActiveTopic(null)}
          title={activeTopic.title}
          subtitle={activeTopic.desc}
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-brand-leaf bg-success-bg p-2.5 rounded-lg">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>Standard Operating Procedures for {activeTopic.title}</span>
            </div>

            <div className="divide-y divide-line rounded-lg border border-line bg-white">
              {activeTopic.articles.map((art, idx) => (
                <div key={idx} className="p-4">
                  <p className="text-sm font-semibold text-brand-charcoal">{art.title}</p>
                  <p className="mt-1 text-xs text-muted leading-relaxed">{art.summary}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveTopic(null)}
                className="h-9 rounded-lg bg-brand-charcoal px-4 text-xs font-semibold text-white transition hover:bg-black"
              >
                Done Reading
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Raise Ticket Modal */}
      {ticketModalOpen && (
        <Modal
          isOpen={ticketModalOpen}
          onClose={() => setTicketModalOpen(false)}
          title="Raise a Support Ticket"
          subtitle="Our operations engineering team responds within 2 business hours"
          size="md"
        >
          <form onSubmit={handleTicketSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-charcoal">
                Ticket Category
              </label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
              >
                <option value="Technical">Technical Bug / Application Error</option>
                <option value="Shed Registration">Shed or Beneficiary Discrepancy</option>
                <option value="Finance & Ledger">Finance / UTR Reconciliation</option>
                <option value="Inspection Approval">AVP Inspection Escalation</option>
                <option value="Access Control">Account & Permission Request</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-charcoal">
                Subject
              </label>
              <input
                type="text"
                placeholder="Brief summary of the issue (e.g., Cannot upload plinth photo for SH-000104)"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                required
                className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-charcoal">
                Description / Context
              </label>
              <textarea
                rows={4}
                placeholder="Please include Shed ID, Beneficiary name, or transaction UTR if applicable..."
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-line bg-white p-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-line">
              <button
                type="button"
                onClick={() => setTicketModalOpen(false)}
                className="h-10 rounded-lg border border-line bg-white px-4 text-xs font-semibold text-brand-charcoal hover:bg-brand-cream"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-green px-5 text-xs font-semibold text-white hover:bg-brand-leaf shadow-sm"
              >
                <Send className="size-3.5" /> Submit Ticket
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
