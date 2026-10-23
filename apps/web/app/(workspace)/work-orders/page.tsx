import {
  CircleCheck,
  Clock,
  FileText,
  MoreVertical,
  Plus,
  TrendingUp,
  Wallet,
  Wrench,
} from "lucide-react";
import {
  Breadcrumb,
  Card,
  Chip,
  FilterBar,
  FilterSelect,
  Kpi,
  PageHeader,
  PaginationNote,
  PrimaryButton,
  Progress,
  SearchInput,
  TableWrap,
  Th,
  type Tone,
} from "../_components";

const KPIS = [
  { icon: FileText, tint: "bg-success-bg text-brand-leaf", label: "Total Work Orders", value: "128" },
  { icon: Clock, tint: "bg-amber-50 text-brand-gold", label: "Pending Approval", value: "16", sub: "Awaiting sign-off", subTone: "muted" as const },
  { icon: Wrench, tint: "bg-blue-50 text-blue-600", label: "In Progress", value: "62" },
  { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", label: "Completed", value: "50", sub: "↑ 12% vs last month" },
  { icon: Wallet, tint: "bg-success-bg text-brand-leaf", label: "Total WO Value", value: "₹3.96 Cr", sub: "Across all work orders", subTone: "muted" as const },
];

const ROWS: {
  wo: string;
  shed: string;
  beneficiary: string;
  fabricator: string;
  model: string;
  value: string;
  advance: string;
  status: string;
  tone: Tone;
  pct: number;
}[] = [
  { wo: "WO-2026-0147", shed: "SH-000123", beneficiary: "Savitri Bai Sahu", fabricator: "Sharma Agro Constructions", model: "Model A", value: "₹3,10,000", advance: "₹93,000", status: "In Progress", tone: "blue", pct: 45 },
  { wo: "WO-2026-0146", shed: "SH-000118", beneficiary: "Laxmi Soni", fabricator: "Verma Infra", model: "Model B", value: "₹2,95,000", advance: "₹88,500", status: "Awaiting Start", tone: "amber", pct: 0 },
  { wo: "WO-2026-0145", shed: "SH-000110", beneficiary: "Mangal Ram", fabricator: "Patel Structures", model: "Model A", value: "₹3,05,000", advance: "₹91,500", status: "Pending Approval", tone: "amber", pct: 0 },
  { wo: "WO-2026-0142", shed: "SH-000092", beneficiary: "Rekha Patel", fabricator: "Sharma Agro Constructions", model: "Model A", value: "₹3,10,000", advance: "₹93,000", status: "In Progress", tone: "blue", pct: 30 },
  { wo: "WO-2026-0139", shed: "SH-000076", beneficiary: "Suresh Verma", fabricator: "R.K. Fabricators", model: "Model B", value: "₹2,80,000", advance: "₹84,000", status: "Draft", tone: "gray", pct: 0 },
  { wo: "WO-2026-0135", shed: "SH-000064", beneficiary: "Kamla Devi", fabricator: "Verma Infra", model: "Model A", value: "₹3,00,000", advance: "₹90,000", status: "Completed", tone: "green", pct: 100 },
  { wo: "WO-2026-0131", shed: "SH-000051", beneficiary: "Ramesh Nishad", fabricator: "Chhattisgarh Rural Works", model: "Model B", value: "₹2,90,000", advance: "₹87,000", status: "In Progress", tone: "blue", pct: 65 },
  { wo: "WO-2026-0128", shed: "SH-000049", beneficiary: "Gita Sahu", fabricator: "Patel Structures", model: "Model A", value: "₹3,08,000", advance: "₹92,400", status: "On Hold", tone: "red", pct: 55 },
  { wo: "WO-2026-0124", shed: "SH-000045", beneficiary: "Devki Bai", fabricator: "Sharma Agro Constructions", model: "Model B", value: "₹2,98,000", advance: "₹89,400", status: "Awaiting Start", tone: "amber", pct: 0 },
  { wo: "WO-2026-0119", shed: "SH-000031", beneficiary: "Bhujbal Singh", fabricator: "R.K. Fabricators", model: "Model A", value: "₹3,12,000", advance: "₹93,600", status: "Completed", tone: "green", pct: 100 },
];

export default function WorkOrdersPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={["Work Orders"]} />
      <PageHeader
        title="Work Orders"
        subtitle="Create, allocate and track fabricator work orders across sheds"
        actions={
          <PrimaryButton>
            <Plus className="size-4" /> Create Work Order
          </PrimaryButton>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {KPIS.map((k) => (
          <Kpi key={k.label} {...k} />
        ))}
      </div>

      <FilterBar>
        <SearchInput placeholder="Search by WO ID, shed, fabricator..." />
        <FilterSelect label="All Status" />
        <FilterSelect label="All Fabricators" />
        <FilterSelect label="Supply Model: All" />
      </FilterBar>

      <Card padded={false}>
        <TableWrap>
          <table className="w-full min-w-[960px] text-[13px]">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="py-2.5 pl-5 pr-3 font-medium">Work Order</th>
                <Th>Shed ID</Th>
                <Th>Beneficiary</Th>
                <Th>Fabricator</Th>
                <Th>Supply Model</Th>
                <Th right>Value</Th>
                <Th right>Advance</Th>
                <Th>Status</Th>
                <Th>Progress</Th>
                <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {ROWS.map((r) => (
                <tr key={r.wo} className="hover:bg-brand-cream/40">
                  <td className="py-3 pl-5 pr-3 font-semibold text-brand-green">{r.wo}</td>
                  <td className="py-3 pr-3 font-medium">{r.shed}</td>
                  <td className="py-3 pr-3">{r.beneficiary}</td>
                  <td className="py-3 pr-3">{r.fabricator}</td>
                  <td className="py-3 pr-3">
                    <Chip tone="blue">{r.model}</Chip>
                  </td>
                  <td className="py-3 pr-3 text-right font-medium">{r.value}</td>
                  <td className="py-3 pr-3 text-right">{r.advance}</td>
                  <td className="py-3 pr-3">
                    <Chip tone={r.tone} dot>
                      {r.status}
                    </Chip>
                  </td>
                  <td className="py-3 pr-3">
                    <Progress pct={r.pct} tone={r.tone === "red" ? "red" : "green"} />
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
          <PaginationNote>Showing 1 to 10 of 128 work orders</PaginationNote>
        </div>
      </Card>

      <Card title="Supply Model Split" action={<Chip tone="gray" icon={TrendingUp}>This quarter</Chip>}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-brand-cream/40 p-4">
            <p className="text-sm font-semibold">Model A — Fabricator Supplies</p>
            <p className="mt-1 text-2xl font-bold">74</p>
            <p className="text-xs text-muted">Fabricator arranges all materials & labour</p>
            <div className="mt-3">
              <Progress pct={58} />
            </div>
          </div>
          <div className="rounded-lg border border-line bg-brand-cream/40 p-4">
            <p className="text-sm font-semibold">Model B — Manikstu Supplies</p>
            <p className="mt-1 text-2xl font-bold">54</p>
            <p className="text-xs text-muted">Manikstu supplies materials, fabricator builds</p>
            <div className="mt-3">
              <Progress pct={42} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
