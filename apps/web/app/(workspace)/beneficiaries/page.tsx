import {
  CircleCheck,
  Clock,
  House,
  MoreVertical,
  Plus,
  ReceiptIndianRupee,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import {
  Breadcrumb,
  Card,
  Chip,
  FilterBar,
  FilterSelect,
  GhostButton,
  Kpi,
  PageHeader,
  PaginationNote,
  PrimaryButton,
  SearchInput,
  TableWrap,
  Th,
  type Tone,
} from "../_components";

const KPIS = [
  { icon: House, tint: "bg-success-bg text-brand-leaf", label: "Total Beneficiaries", value: "545", sub: "↑ 12% vs previous month" },
  { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", label: "Verified", value: "412", sub: "75.6%" },
  { icon: Users, tint: "bg-success-bg text-brand-leaf", label: "Consent Completed", value: "498", sub: "91.4%" },
  { icon: ReceiptIndianRupee, tint: "bg-amber-50 text-brand-gold", label: "Contribution Received", value: "312", sub: "57.2%" },
  { icon: Clock, tint: "bg-amber-50 text-brand-gold", label: "Pending Verification", value: "88", sub: "16.1%", subTone: "muted" as const },
];

type V = { label: string; tone: Tone; note?: string };
const ROWS: {
  name: string;
  shed: string;
  village: string;
  ref: string;
  verification: V;
  consent: V;
  contribution: V;
}[] = [
  { name: "Savitri Bai Sahu", shed: "SH-000123", village: "Kundagaon, Raipur", ref: "APICOL-2026-0012", verification: { label: "Verified", tone: "green", note: "15-Mar-2026" }, consent: { label: "Consented", tone: "green", note: "12-Mar-2026" }, contribution: { label: "₹1,25,000", tone: "green", note: "Verified" } },
  { name: "Laxmi Soni", shed: "SH-000118", village: "Atari, Dhamtari", ref: "APICOL-2026-0045", verification: { label: "Verified", tone: "green", note: "10-Mar-2026" }, consent: { label: "Consented", tone: "green", note: "09-Mar-2026" }, contribution: { label: "₹1,25,000", tone: "amber", note: "Pending" } },
  { name: "Mangal Ram", shed: "SH-000110", village: "Dhamtari", ref: "APICOL-2026-0067", verification: { label: "Pending", tone: "amber", note: "—" }, consent: { label: "Consented", tone: "green", note: "11-Mar-2026" }, contribution: { label: "Not Received", tone: "red", note: "—" } },
  { name: "Rekha Patel", shed: "SH-000092", village: "Kumhari, Raipur", ref: "APICOL-2026-0098", verification: { label: "Verified", tone: "green", note: "08-Mar-2026" }, consent: { label: "Not Contacted", tone: "red", note: "—" }, contribution: { label: "₹1,25,000", tone: "amber", note: "Unverified" } },
  { name: "Suresh Verma", shed: "SH-000076", village: "Arang, Raipur", ref: "APICOL-2026-0112", verification: { label: "Pending", tone: "amber", note: "—" }, consent: { label: "Consented", tone: "green", note: "14-Mar-2026" }, contribution: { label: "Not Received", tone: "red", note: "—" } },
  { name: "Kamla Devi", shed: "SH-000064", village: "Tilda, Raipur", ref: "APICOL-2026-0133", verification: { label: "Verified", tone: "green", note: "12-Mar-2026" }, consent: { label: "Consented", tone: "green", note: "10-Mar-2026" }, contribution: { label: "₹1,25,000", tone: "green", note: "Verified" } },
  { name: "Ramesh Nishad", shed: "SH-000051", village: "Mandir Hasaud, Raipur", ref: "APICOL-2026-0147", verification: { label: "Verified", tone: "green", note: "09-Mar-2026" }, consent: { label: "Consented", tone: "green", note: "08-Mar-2026" }, contribution: { label: "₹1,00,000", tone: "amber", note: "Partial" } },
  { name: "Gita Sahu", shed: "SH-000049", village: "Simga, Baloda Bazar", ref: "APICOL-2026-0160", verification: { label: "Pending", tone: "amber", note: "—" }, consent: { label: "Not Contacted", tone: "red", note: "—" }, contribution: { label: "Not Received", tone: "red", note: "—" } },
  { name: "Devki Bai", shed: "SH-000045", village: "Siltara, Raipur", ref: "APICOL-2026-0178", verification: { label: "Verified", tone: "green", note: "06-Mar-2026" }, consent: { label: "Consented", tone: "green", note: "07-Mar-2026" }, contribution: { label: "₹1,25,000", tone: "green", note: "Verified" } },
  { name: "Bhujbal Singh", shed: "SH-000031", village: "Kharora, Raipur", ref: "APICOL-2026-0190", verification: { label: "Pending", tone: "amber", note: "—" }, consent: { label: "Consented", tone: "green", note: "05-Mar-2026" }, contribution: { label: "₹1,25,000", tone: "amber", note: "Pending" } },
];

function Cell({ v }: { v: V }) {
  return (
    <td className="py-3 pr-3">
      <Chip tone={v.tone}>{v.label}</Chip>
      {v.note && <p className="mt-1 text-xs text-muted">{v.note}</p>}
    </td>
  );
}

export default function BeneficiariesPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={["Beneficiaries"]} />
      <PageHeader
        title="Beneficiaries"
        subtitle="Manage approved beneficiaries and track verification, consent and contribution status"
        actions={
          <PrimaryButton>
            <Plus className="size-4" /> New Beneficiary
          </PrimaryButton>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {KPIS.map((k) => (
          <Kpi key={k.label} {...k} />
        ))}
      </div>

      <FilterBar>
        <SearchInput placeholder="Search by name, reference, village..." />
        <FilterSelect label="All Status" />
        <FilterSelect label="All Villages" />
        <FilterSelect label="Verification: All" />
        <GhostButton>
          <SlidersHorizontal className="size-4" /> More Filters
        </GhostButton>
      </FilterBar>

      <Card padded={false}>
        <TableWrap>
          <table className="w-full min-w-[900px] text-[13px]">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="py-2.5 pl-5 pr-3 font-medium">#</th>
                <Th>Beneficiary Name</Th>
                <Th>Shed ID</Th>
                <Th>Village / Block</Th>
                <Th>Source Reference</Th>
                <Th>Verification</Th>
                <Th>Consent</Th>
                <Th>Contribution</Th>
                <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {ROWS.map((r, i) => (
                <tr key={r.shed} className="hover:bg-brand-cream/40">
                  <td className="py-3 pl-5 pr-3 text-muted">{i + 1}</td>
                  <td className="py-3 pr-3 font-medium">{r.name}</td>
                  <td className="py-3 pr-3 font-semibold text-brand-green">{r.shed}</td>
                  <td className="py-3 pr-3">{r.village}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">{r.ref}</td>
                  <Cell v={r.verification} />
                  <Cell v={r.consent} />
                  <Cell v={r.contribution} />
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
          <PaginationNote>Showing 1 to 10 of 545 beneficiaries</PaginationNote>
        </div>
      </Card>
    </div>
  );
}
