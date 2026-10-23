import {
  ArrowLeftRight,
  Banknote,
  CalendarDays,
  Download,
  FileText,
  MoreVertical,
  ReceiptText,
  Scale,
  Wallet,
} from "lucide-react";
import {
  Breadcrumb,
  Card,
  Chip,
  FilterBar,
  FilterSelect,
  GhostButton,
  PageHeader,
  PaginationNote,
  SearchInput,
  Tabs,
  TableWrap,
  Th,
  type Tone,
} from "../_components";

const LEDGERS: {
  icon: typeof FileText;
  tint: string;
  label: string;
  value: string;
  note: string;
  a: string;
  aLabel: string;
  b: string;
  bLabel: string;
  bar: number;
  barTone: string;
}[] = [
  { icon: FileText, tint: "bg-success-bg text-brand-leaf", label: "Approved Budget", value: "₹3,60,00,000", note: "260 sheds × ₹1,25,000", a: "₹1,42,80,000 (39.7%)", aLabel: "Utilised", b: "₹2,17,20,000", bLabel: "Balance", bar: 40, barTone: "bg-brand-green" },
  { icon: ReceiptText, tint: "bg-success-bg text-brand-leaf", label: "Verified Receipts", value: "₹61,20,000", note: "Farmer contributions & other", a: "₹61,20,000 (75.0%)", aLabel: "Received", b: "₹81,60,000", bLabel: "Expected", bar: 75, barTone: "bg-brand-green" },
  { icon: ArrowLeftRight, tint: "bg-red-50 text-brand-red", label: "Expenses", value: "₹48,75,200", note: "Materials, labour, transport", a: "₹48,75,200 (34.1%)", aLabel: "Spent", b: "₹1,42,80,000", bLabel: "Budgeted", bar: 34, barTone: "bg-brand-red" },
  { icon: Wallet, tint: "bg-amber-50 text-brand-gold", label: "Commitments", value: "₹27,40,000", note: "Approved WOs (not yet paid)", a: "₹27,40,000 (19.2%)", aLabel: "Committed", b: "₹1,15,40,000", bLabel: "Remaining", bar: 19, barTone: "bg-brand-gold" },
  { icon: Scale, tint: "bg-red-50 text-brand-red", label: "Reconciliation", value: "₹ -15,000", note: "Variance (Receipts − Expenses)", a: "₹61,20,000", aLabel: "Total Receipts", b: "₹61,35,000", bLabel: "Total Expenses", bar: 50, barTone: "bg-brand-gold" },
];

const ROWS: {
  date: string;
  type: string;
  typeTone: Tone;
  ref: string;
  party: string;
  shed: string;
  amount: string;
  allocation: string;
  verify: string;
  vTone: Tone;
}[] = [
  { date: "18-Mar-2026", type: "Receipt", typeTone: "green", ref: "RCPT-2026-031", party: "Savitri Bai Sahu", shed: "SH-000123", amount: "93,000", allocation: "Farmer Contribution", verify: "Verified", vTone: "green" },
  { date: "17-Mar-2026", type: "Expense", typeTone: "red", ref: "EXP-2026-112", party: "Sharma Agro", shed: "SH-000123", amount: "60,000", allocation: "Materials (Cement)", verify: "Verified", vTone: "green" },
  { date: "16-Mar-2026", type: "Payment", typeTone: "blue", ref: "PAY-2026-018", party: "Sharma Agro", shed: "SH-000123", amount: "45,000", allocation: "Advance Payment", verify: "Verified", vTone: "green" },
  { date: "15-Mar-2026", type: "Commitment", typeTone: "amber", ref: "WO-2026-0147", party: "Sharma Agro", shed: "SH-000124", amount: "1,20,000", allocation: "Work Order (Structure)", verify: "Approved", vTone: "green" },
  { date: "14-Mar-2026", type: "Expense", typeTone: "red", ref: "EXP-2026-109", party: "Transport Co.", shed: "SH-000124", amount: "8,500", allocation: "Transport", verify: "Verified", vTone: "green" },
  { date: "13-Mar-2026", type: "Receipt", typeTone: "green", ref: "RCPT-2026-028", party: "Kamla Dewangan", shed: "SH-000124", amount: "93,000", allocation: "Farmer Contribution", verify: "Pending", vTone: "amber" },
  { date: "12-Mar-2026", type: "Expense", typeTone: "red", ref: "EXP-2026-107", party: "Local Labour", shed: "SH-000123", amount: "12,000", allocation: "Labour", verify: "Verified", vTone: "green" },
  { date: "11-Mar-2026", type: "Advance", typeTone: "amber", ref: "ADV-2026-011", party: "Ramesh Kumar", shed: "SH-000125", amount: "25,000", allocation: "Site Preparation", verify: "Verified", vTone: "green" },
  { date: "10-Mar-2026", type: "Expense", typeTone: "red", ref: "EXP-2026-103", party: "Steel Supplier", shed: "SH-000118", amount: "28,200", allocation: "GI Wire Mesh", verify: "Pending", vTone: "amber" },
  { date: "10-Mar-2026", type: "Receipt", typeTone: "green", ref: "RCPT-2026-025", party: "Rekha Yadav", shed: "SH-000118", amount: "93,000", allocation: "Farmer Contribution", verify: "Verified", vTone: "green" },
];

export default function FinancePage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={["Finance", "Ledgers"]} />
      <PageHeader
        title="Finance Ledgers"
        subtitle="Track budgets, receipts, expenses, commitments and reconciliation for Project AJAH"
        actions={
          <>
            <GhostButton>
              <CalendarDays className="size-4" /> 01 Mar – 31 Mar 2026
            </GhostButton>
            <GhostButton>
              <Download className="size-4" /> Export
            </GhostButton>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {LEDGERS.map((l) => (
          <div key={l.label} className="rounded-xl border border-line bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${l.tint}`}>
                <l.icon className="size-5" strokeWidth={1.75} />
              </span>
              <p className="text-[13px] font-semibold">{l.label}</p>
            </div>
            <p className="mt-3 text-xl font-bold">{l.value}</p>
            <p className="text-[11px] text-muted">{l.note}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-brand-cream">
              <span className={`block h-full rounded-full ${l.barTone}`} style={{ width: `${l.bar}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-[11px]">
              <span className="text-muted">{l.aLabel}<br /><span className="font-medium text-brand-charcoal">{l.a}</span></span>
              <span className="text-right text-muted">{l.bLabel}<br /><span className="font-medium text-brand-charcoal">{l.b}</span></span>
            </div>
          </div>
        ))}
      </div>

      <Card padded={false}>
        <div className="px-5 pt-4">
          <Tabs
            tabs={[
              { label: "Receipts", active: true },
              { label: "Expenses" },
              { label: "Payments" },
              { label: "Commitments" },
              { label: "Advances" },
              { label: "Reconciliation" },
            ]}
          />
        </div>

        <div className="p-5">
          <FilterBar>
            <SearchInput placeholder="Search by reference, beneficiary, shed ID..." />
            <FilterSelect label="All Types" />
            <FilterSelect label="All Verification" />
          </FilterBar>
        </div>

        <TableWrap>
          <table className="w-full min-w-[860px] text-[13px]">
            <thead>
              <tr className="border-y border-line text-left text-xs text-muted">
                <th className="py-2.5 pl-5 pr-3 font-medium">Date</th>
                <Th>Type</Th>
                <Th>Reference No.</Th>
                <Th>Beneficiary / Vendor</Th>
                <Th>Shed ID</Th>
                <Th right>Amount (₹)</Th>
                <Th>Allocation</Th>
                <Th>Verification</Th>
                <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {ROWS.map((r, i) => (
                <tr key={i} className="hover:bg-brand-cream/40">
                  <td className="py-3 pl-5 pr-3 whitespace-nowrap">{r.date}</td>
                  <td className="py-3 pr-3">
                    <Chip tone={r.typeTone}>{r.type}</Chip>
                  </td>
                  <td className="py-3 pr-3 font-semibold text-brand-green">{r.ref}</td>
                  <td className="py-3 pr-3">{r.party}</td>
                  <td className="py-3 pr-3">{r.shed}</td>
                  <td className="py-3 pr-3 text-right font-medium">{r.amount}</td>
                  <td className="py-3 pr-3 text-muted">{r.allocation}</td>
                  <td className="py-3 pr-3">
                    <Chip tone={r.vTone}>{r.verify}</Chip>
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
          <PaginationNote>Showing 1 to 10 of 142 entries (illustrative data)</PaginationNote>
        </div>
      </Card>
    </div>
  );
}
