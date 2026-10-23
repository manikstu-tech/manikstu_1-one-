import {
  AtSign,
  BadgeCheck,
  Bell,
  CheckCheck,
  FileText,
  MessageCircle,
  MoreVertical,
  Package,
  Plus,
  Send,
  TriangleAlert,
  UserPlus,
} from "lucide-react";
import type { ElementType } from "react";
import {
  Breadcrumb,
  Card,
  Chip,
  FilterSelect,
  GhostButton,
  PageHeader,
  PaginationNote,
  PrimaryButton,
  SearchInput,
  Tabs,
  TableWrap,
  Th,
  type Tone,
} from "../_components";

const NOTES: {
  icon: ElementType;
  tint: string;
  title: string;
  meta: string;
  sub?: string;
  time: string;
  unread?: boolean;
}[] = [
  { icon: Bell, tint: "bg-red-50 text-brand-red", title: "AVP inspection requires review", meta: "SH-000123 · Kumhari, Raipur", sub: "Submitted by Savitri Devi", time: "10 min ago", unread: true },
  { icon: AtSign, tint: "bg-blue-50 text-blue-600", title: "You were mentioned in a comment", meta: "SH-000118 · Arang", sub: 'Ramesh Kumar: "Please check the roof photos"', time: "32 min ago", unread: true },
  { icon: FileText, tint: "bg-success-bg text-brand-leaf", title: "New document uploaded", meta: "SH-000125 · Simga", sub: "3 photos uploaded · Roofing Stage", time: "1 hour ago" },
  { icon: BadgeCheck, tint: "bg-success-bg text-brand-leaf", title: "Inspection approved", meta: "SH-000107 · Kandagaon", sub: "Reviewed by Manoj Singh", time: "2 hours ago" },
  { icon: Package, tint: "bg-amber-50 text-brand-gold", title: "Material receipt pending", meta: "SH-000132 · Abhanpur", sub: "Expected today", time: "3 hours ago" },
  { icon: MessageCircle, tint: "bg-success-bg text-brand-leaf", title: "WhatsApp message delivered", meta: "SH-000121 · Raipur", sub: "Vaccination Reminder · Lakhmi Bai", time: "4 hours ago" },
  { icon: TriangleAlert, tint: "bg-red-50 text-brand-red", title: "Sync failed for 2 items", meta: "Check your internet connection", time: "5 hours ago" },
  { icon: FileText, tint: "bg-amber-50 text-brand-gold", title: "KYC document requires attention", meta: "SH-000109 · Tilda", sub: "Aadhaar not clear", time: "6 hours ago" },
];

const WA: {
  template: string;
  recipient: string;
  phone: string;
  shed: string;
  lang: string;
  sent: string;
  status: string;
  tone: Tone;
}[] = [
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
  return (
    <div className="space-y-5">
      <Breadcrumb items={["Communications", "Notifications & WhatsApp"]} />
      <PageHeader
        title="Notifications & WhatsApp"
        subtitle="Manage in-app notifications and track automated WhatsApp communications"
        actions={
          <>
            <GhostButton>
              <CheckCheck className="size-4" /> Mark all read
            </GhostButton>
            <PrimaryButton>
              <Send className="size-4" /> Send Message
            </PrimaryButton>
          </>
        }
      />

      <Tabs
        tabs={[
          { label: "Notifications Center", active: true },
          { label: "WhatsApp Log" },
          { label: "Templates" },
          { label: "Preferences" },
        ]}
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[42fr_58fr]">
        <Card
          title="In-App Notifications"
          action={
            <Tabs
              tabs={[
                { label: "All", count: 12, active: true },
                { label: "Unread", count: 5 },
              ]}
            />
          }
        >
          <ul className="-mt-2 divide-y divide-line/60">
            {NOTES.map((n, i) => (
              <li key={i} className="flex items-start gap-3 py-3">
                <span className={`grid size-9 shrink-0 place-items-center rounded-full ${n.tint}`}>
                  <n.icon className="size-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold">{n.title}</p>
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
        </Card>

        <Card title="WhatsApp Communication Log" padded={false}>
          <div className="flex flex-wrap items-center gap-3 px-5 pb-4">
            <SearchInput placeholder="Search by name, phone, shed ID..." />
            <FilterSelect label="All Templates" />
            <FilterSelect label="All Status" />
          </div>
          <TableWrap>
            <table className="w-full min-w-[640px] text-[13px]">
              <thead>
                <tr className="border-y border-line text-left text-xs text-muted">
                  <th className="py-2.5 pl-5 pr-3 font-medium">Template</th>
                  <Th>Recipient</Th>
                  <Th>Shed ID</Th>
                  <Th>Language</Th>
                  <Th>Sent</Th>
                  <Th>Status</Th>
                  <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {WA.map((w, i) => (
                  <tr key={i} className="hover:bg-brand-cream/40">
                    <td className="py-3 pl-5 pr-3 font-medium">{w.template}</td>
                    <td className="py-3 pr-3">
                      <p>{w.recipient}</p>
                      <p className="text-xs text-muted">{w.phone}</p>
                    </td>
                    <td className="py-3 pr-3 font-semibold text-brand-green">{w.shed}</td>
                    <td className="py-3 pr-3">{w.lang}</td>
                    <td className="py-3 pr-3 whitespace-nowrap text-muted">{w.sent}</td>
                    <td className="py-3 pr-3">
                      <Chip tone={w.tone}>{w.status}</Chip>
                    </td>
                    <td className="py-3 pr-5 text-right">
                      <button className="text-muted hover:text-brand-charcoal">
                        <MoreVertical className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
          <div className="px-5 pb-4">
            <PaginationNote>Showing 1 to 10 of 86 messages</PaginationNote>
          </div>
        </Card>
      </div>

      <Card title="Template Overview" action={<GhostButton><Plus className="size-4" /> Manage Templates</GhostButton>}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          {OVERVIEW.map((o) => (
            <div key={o.label} className="rounded-lg border border-line bg-brand-cream/40 p-4 text-center">
              <p className="text-2xl font-bold">{o.value}</p>
              <p className="text-xs text-muted">{o.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
