"use client";

import { useState, useMemo } from "react";
import {
  AtSign,
  BadgeCheck,
  Bell,
  CheckCheck,
  FileText,
  MessageCircle,
  Package,
  Send,
  TriangleAlert,
} from "lucide-react";
import type { ElementType } from "react";
import {
  Breadcrumb,
  Card,
  Chip,
  FilterSelect,
  GhostButton,
  Modal,
  PageHeader,
  PaginationNote,
  PrimaryButton,
  SearchInput,
  TableWrap,
  Th,
  useToast,
  type Tone,
} from "../_components";

export interface NoteItem {
  id?: string;
  icon: ElementType;
  tint: string;
  title: string;
  meta: string;
  sub?: string;
  time: string;
  unread?: boolean;
}

const INITIAL_NOTES: NoteItem[] = [
  { icon: Bell, tint: "bg-red-50 text-brand-red", title: "AVP inspection requires review", meta: "SH-000123 · Kumhari, Raipur", sub: "Submitted by Savitri Devi", time: "10 min ago", unread: true },
  { icon: AtSign, tint: "bg-blue-50 text-blue-600", title: "You were mentioned in a comment", meta: "SH-000118 · Arang", sub: 'Ramesh Kumar: "Please check the roof photos"', time: "32 min ago", unread: true },
  { icon: FileText, tint: "bg-success-bg text-brand-leaf", title: "New document uploaded", meta: "SH-000125 · Simga", sub: "3 photos uploaded · Roofing Stage", time: "1 hour ago", unread: true },
  { icon: BadgeCheck, tint: "bg-success-bg text-brand-leaf", title: "Inspection approved", meta: "SH-000107 · Kandagaon", sub: "Reviewed by Manoj Singh", time: "2 hours ago" },
  { icon: Package, tint: "bg-amber-50 text-brand-gold", title: "Material receipt pending", meta: "SH-000132 · Abhanpur", sub: "Expected today", time: "3 hours ago" },
  { icon: MessageCircle, tint: "bg-success-bg text-brand-leaf", title: "WhatsApp message delivered", meta: "SH-000121 · Raipur", sub: "Vaccination Reminder · Lakhmi Bai", time: "4 hours ago" },
  { icon: TriangleAlert, tint: "bg-red-50 text-brand-red", title: "Sync failed for 2 items", meta: "Check your internet connection", time: "5 hours ago" },
  { icon: FileText, tint: "bg-amber-50 text-brand-gold", title: "KYC document requires attention", meta: "SH-000109 · Tilda", sub: "Aadhaar not clear", time: "6 hours ago" },
];

export interface WaItem {
  template: string;
  recipient: string;
  phone: string;
  shed: string;
  lang: string;
  sent: string;
  status: string;
  tone: Tone;
}

const INITIAL_WA: WaItem[] = [
  { template: "Welcome Message", recipient: "Savitri Devi", phone: "+91 98765 43210", shed: "SH-000123", lang: "Hindi", sent: "20-Mar 10:12", status: "Delivered", tone: "green" },
  { template: "Vaccination Reminder", recipient: "Lakhmi Bai", phone: "+91 87654 32109", shed: "SH-000121", lang: "Odia", sent: "20-Mar 09:45", status: "Delivered", tone: "green" },
  { template: "Material Receipt", recipient: "Ramesh Kumar", phone: "+91 76543 21098", shed: "SH-000118", lang: "Hindi", sent: "20-Mar 09:10", status: "Delivered", tone: "green" },
  { template: "Inspection Update", recipient: "Kunti Sahu", phone: "+91 98760 11223", shed: "SH-000125", lang: "Chhattisgarhi", sent: "19-Mar 05:20", status: "Delivered", tone: "green" },
  { template: "KYC Reminder", recipient: "Manoj Singh", phone: "+91 99887 66554", shed: "SH-000132", lang: "Hindi", sent: "19-Mar 04:15", status: "Failed", tone: "red" },
  { template: "Payment Confirmation", recipient: "Jyoti Verma", phone: "+91 91234 56789", shed: "SH-000107", lang: "Hindi", sent: "19-Mar 03:50", status: "Delivered", tone: "green" },
  { template: "Training Invitation", recipient: "Aruna Patel", phone: "+91 92345 67890", shed: "SH-000109", lang: "Hindi", sent: "18-Mar 11:30", status: "Delivered", tone: "green" },
  { template: "Follow Up", recipient: "Ramdhan Yadav", phone: "+91 93456 78901", shed: "SH-000128", lang: "Odia", sent: "18-Mar 10:05", status: "Failed", tone: "red" },
  { template: "General Update", recipient: "Gita Sahu", phone: "+91 94567 89012", shed: "SH-000119", lang: "Hindi", sent: "17-Mar 02:40", status: "Delivered", tone: "green" },
  { template: "Custom Message", recipient: "Bharti Devi", phone: "+91 95678 90123", shed: "SH-000130", lang: "Hindi", sent: "17-Mar 12:10", status: "Opted Out", tone: "gray" },
];

const OVERVIEW = [
  { label: "Active Templates", value: "12" },
  { label: "Sent (30 days)", value: "1,248" },
  { label: "Delivered (96%)", value: "1,198" },
  { label: "Failed (2.6%)", value: "32" },
  { label: "Opted Out", value: "18" },
];

export default function NotificationsPage() {
  const { showToast } = useToast();
  const [notes, setNotes] = useState<NoteItem[]>(INITIAL_NOTES);
  const [waLogs, setWaLogs] = useState<WaItem[]>(INITIAL_WA);
  const [activeTab, setActiveTab] = useState("All");
  const [waSearch, setWaSearch] = useState("");
  const [waStatusFilter, setWaStatusFilter] = useState("All Status");

  // Send message modal
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendRecipient, setSendRecipient] = useState("");
  const [sendPhone, setSendPhone] = useState("");
  const [sendTemplate, setSendTemplate] = useState("Vaccination Reminder");
  const [sendLang, setSendLang] = useState("Hindi");

  const unreadCount = notes.filter((n) => n.unread).length;

  const filteredNotes = notes.filter((n) => {
    if (activeTab === "Unread") return n.unread;
    return true;
  });

  const filteredWa = useMemo(() => {
    return waLogs.filter((w) => {
      const matchSearch =
        waSearch.trim() === "" ||
        w.recipient.toLowerCase().includes(waSearch.toLowerCase()) ||
        w.phone.includes(waSearch) ||
        w.shed.toLowerCase().includes(waSearch.toLowerCase()) ||
        w.template.toLowerCase().includes(waSearch.toLowerCase());

      const matchStatus =
        waStatusFilter === "All Status" || w.status === waStatusFilter;

      return matchSearch && matchStatus;
    });
  }, [waLogs, waSearch, waStatusFilter]);

  function handleMarkAllRead() {
    setNotes((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast("All notifications marked as read.", "success");
  }

  function handleSendMessage() {
    if (!sendRecipient.trim() || !sendPhone.trim()) return;

    const newLog: WaItem = {
      template: sendTemplate,
      recipient: sendRecipient.trim(),
      phone: sendPhone.trim(),
      shed: "SH-000123",
      lang: sendLang,
      sent: "Just now",
      status: "Delivered",
      tone: "green",
    };

    setWaLogs((prev) => [newLog, ...prev]);
    setShowSendModal(false);
    setSendRecipient("");
    setSendPhone("");
    showToast(`WhatsApp message dispatched to ${newLog.recipient} (${newLog.phone})!`, "success");
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={["Communications", "Notifications & WhatsApp"]} />
      <PageHeader
        title="Notifications & WhatsApp"
        subtitle="Manage live operations alerts and track automated WhatsApp field communications"
        actions={
          <>
            <GhostButton onClick={handleMarkAllRead}>
              <CheckCheck className="size-4" /> Mark all read
            </GhostButton>
            <PrimaryButton onClick={() => setShowSendModal(true)}>
              <Send className="size-4" /> Send Message
            </PrimaryButton>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[42fr_58fr]">
        {/* In-app notifications */}
        <Card
          title="In-App Notifications"
          action={
            <div className="flex items-center gap-1 rounded-lg bg-brand-cream p-1">
              <button
                type="button"
                onClick={() => setActiveTab("All")}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  activeTab === "All"
                    ? "bg-white text-brand-charcoal shadow-xs"
                    : "text-muted hover:text-brand-charcoal"
                }`}
              >
                All ({notes.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("Unread")}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  activeTab === "Unread"
                    ? "bg-white text-brand-charcoal shadow-xs"
                    : "text-muted hover:text-brand-charcoal"
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>
          }
        >
          {filteredNotes.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted">
              No notifications to display.
            </div>
          ) : (
            <ul className="-mt-2 divide-y divide-line/60">
              {filteredNotes.map((n, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setNotes((prev) =>
                      prev.map((item, idx) =>
                        idx === i ? { ...item, unread: false } : item
                      )
                    );
                  }}
                  className={`flex cursor-pointer items-start gap-3 py-3 transition hover:bg-brand-cream/40 rounded-lg px-2 ${
                    n.unread ? "bg-success-bg/20" : ""
                  }`}
                >
                  <span className={`grid size-9 shrink-0 place-items-center rounded-full ${n.tint}`}>
                    <n.icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${n.unread ? "font-bold text-brand-charcoal" : "font-medium text-brand-charcoal/90"}`}>
                        {n.title}
                      </p>
                      <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted">
                        {n.time}
                        {n.unread && <span className="size-2 rounded-full bg-brand-red" />}
                      </span>
                    </div>
                    <p className="text-xs text-muted">{n.meta}</p>
                    {n.sub && <p className="mt-0.5 text-xs text-brand-charcoal/70">{n.sub}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* WhatsApp communication log */}
        <Card title="WhatsApp Communication Log" padded={false}>
          <div className="flex flex-wrap items-center gap-3 px-5 py-4">
            <SearchInput
              placeholder="Search by name, phone, shed ID..."
              value={waSearch}
              onChange={(v) => setWaSearch(v)}
            />
            <FilterSelect
              label={waStatusFilter}
              value={waStatusFilter}
              options={["All Status", "Delivered", "Failed", "Opted Out"]}
              onChange={(v) => setWaStatusFilter(v)}
            />
          </div>
          <TableWrap>
            <table className="w-full min-w-[640px] text-[13px]">
              <thead>
                <tr className="border-y border-line text-left text-xs font-semibold text-muted">
                  <th className="py-2.5 pl-5 pr-3">Template</th>
                  <Th>Recipient</Th>
                  <Th>Shed ID</Th>
                  <Th>Language</Th>
                  <Th>Sent</Th>
                  <Th>Status</Th>
                  <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {filteredWa.map((w, i) => (
                  <tr key={i} className="hover:bg-brand-cream/40">
                    <td className="py-3 pl-5 pr-3 font-semibold text-brand-charcoal">{w.template}</td>
                    <td className="py-3 pr-3">
                      <p className="font-medium text-brand-charcoal">{w.recipient}</p>
                      <p className="text-xs text-muted">{w.phone}</p>
                    </td>
                    <td className="py-3 pr-3 font-bold text-brand-green">{w.shed}</td>
                    <td className="py-3 pr-3 text-xs">{w.lang}</td>
                    <td className="py-3 pr-3 whitespace-nowrap text-muted text-xs">{w.sent}</td>
                    <td className="py-3 pr-3">
                      <Chip tone={w.tone}>{w.status}</Chip>
                    </td>
                    <td className="py-3 pr-5 text-right">
                      <button
                        type="button"
                        onClick={() => showToast(`Resent WhatsApp message to ${w.recipient}.`, "info")}
                        className="text-xs font-semibold text-brand-leaf hover:underline"
                      >
                        Resend
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
          <div className="px-5 pb-4">
            <PaginationNote>Showing {filteredWa.length} of {waLogs.length} messages</PaginationNote>
          </div>
        </Card>
      </div>

      <Card title="Automated Messaging Overview">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          {OVERVIEW.map((o) => (
            <div key={o.label} className="rounded-xl border border-line bg-brand-cream/40 p-4 text-center">
              <p className="text-2xl font-bold text-brand-charcoal">{o.value}</p>
              <p className="text-xs text-muted mt-0.5">{o.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Send Message Modal */}
      <Modal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
        title="Send WhatsApp Direct Message"
        subtitle="Dispatch automated alert or custom notification to field contact"
        maxWidth="max-w-md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setShowSendModal(false)}
              className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium hover:bg-brand-cream"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!sendRecipient.trim() || !sendPhone.trim()}
              onClick={handleSendMessage}
              className="rounded-lg bg-[#25d366] px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send WhatsApp Alert
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brand-charcoal">
              Recipient Name <span className="text-brand-red">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Shakuntala Devi"
              value={sendRecipient}
              onChange={(e) => setSendRecipient(e.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-charcoal">
              WhatsApp Mobile Number <span className="text-brand-red">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={sendPhone}
              onChange={(e) => setSendPhone(e.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-brand-charcoal">
                Template
              </label>
              <select
                value={sendTemplate}
                onChange={(e) => setSendTemplate(e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
              >
                <option value="Welcome Message">Welcome Message</option>
                <option value="Vaccination Reminder">Vaccination Reminder</option>
                <option value="Material Receipt">Material Receipt</option>
                <option value="Inspection Update">Inspection Update</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-charcoal">
                Language
              </label>
              <select
                value={sendLang}
                onChange={(e) => setSendLang(e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
              >
                <option value="Hindi">Hindi (हिन्दी)</option>
                <option value="Odia">Odia (ଓଡ଼ିଆ)</option>
                <option value="Chhattisgarhi">Chhattisgarhi</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
