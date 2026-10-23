import {
  Boxes,
  CircleCheck,
  MoreVertical,
  PackageCheck,
  Plus,
  Truck,
  TriangleAlert,
  Warehouse,
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
  SearchInput,
  TableWrap,
  Th,
  type Tone,
} from "../_components";

const KPIS = [
  { icon: Truck, tint: "bg-success-bg text-brand-leaf", label: "Total Dispatches", value: "214" },
  { icon: Boxes, tint: "bg-blue-50 text-blue-600", label: "In Transit", value: "12" },
  { icon: PackageCheck, tint: "bg-amber-50 text-brand-gold", label: "Partially Received", value: "9", sub: "Balance pending", subTone: "muted" as const },
  { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", label: "Fully Received", value: "181", sub: "84.6% delivery rate" },
  { icon: TriangleAlert, tint: "bg-red-50 text-brand-red", label: "Shortage / Pending", value: "12", sub: "Need follow-up", subTone: "red" as const },
];

const ROWS: {
  md: string;
  wo: string;
  shed: string;
  warehouse: string;
  items: number;
  dispatched: number;
  received: number;
  status: string;
  tone: Tone;
  date: string;
}[] = [
  { md: "MD-2026-0031", wo: "WO-2026-0147", shed: "SH-000123", warehouse: "Bhubaneswar Main", items: 6, dispatched: 131, received: 116, status: "Partially Received", tone: "amber", date: "18-Mar-2026" },
  { md: "MD-2026-0030", wo: "WO-2026-0146", shed: "SH-000118", warehouse: "Raipur Hub", items: 8, dispatched: 96, received: 96, status: "Received", tone: "green", date: "17-Mar-2026" },
  { md: "MD-2026-0029", wo: "WO-2026-0145", shed: "SH-000110", warehouse: "Bhubaneswar Main", items: 5, dispatched: 72, received: 0, status: "In Transit", tone: "blue", date: "19-Mar-2026" },
  { md: "MD-2026-0028", wo: "WO-2026-0142", shed: "SH-000092", warehouse: "Raipur Hub", items: 7, dispatched: 110, received: 110, status: "Received", tone: "green", date: "16-Mar-2026" },
  { md: "MD-2026-0027", wo: "WO-2026-0139", shed: "SH-000076", warehouse: "Dhamtari Store", items: 4, dispatched: 48, received: 20, status: "Partially Received", tone: "amber", date: "15-Mar-2026" },
  { md: "MD-2026-0026", wo: "WO-2026-0135", shed: "SH-000064", warehouse: "Bhubaneswar Main", items: 6, dispatched: 118, received: 118, status: "Received", tone: "green", date: "14-Mar-2026" },
  { md: "MD-2026-0025", wo: "WO-2026-0131", shed: "SH-000051", warehouse: "Raipur Hub", items: 5, dispatched: 64, received: 0, status: "Dispatched", tone: "blue", date: "18-Mar-2026" },
  { md: "MD-2026-0024", wo: "WO-2026-0128", shed: "SH-000049", warehouse: "Dhamtari Store", items: 9, dispatched: 140, received: 90, status: "Shortage Reported", tone: "red", date: "13-Mar-2026" },
  { md: "MD-2026-0023", wo: "WO-2026-0124", shed: "SH-000045", warehouse: "Bhubaneswar Main", items: 6, dispatched: 102, received: 102, status: "Received", tone: "green", date: "12-Mar-2026" },
  { md: "MD-2026-0022", wo: "WO-2026-0119", shed: "SH-000031", warehouse: "Raipur Hub", items: 7, dispatched: 126, received: 126, status: "Received", tone: "green", date: "12-Mar-2026" },
];

export default function MaterialsPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={["Materials", "Dispatches"]} />
      <PageHeader
        title="Materials & Dispatch"
        subtitle="Track material dispatch from warehouses and confirm receipt at sites"
        actions={
          <PrimaryButton>
            <Plus className="size-4" /> New Dispatch
          </PrimaryButton>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {KPIS.map((k) => (
          <Kpi key={k.label} {...k} />
        ))}
      </div>

      <FilterBar>
        <SearchInput placeholder="Search by dispatch #, WO, shed, material..." />
        <FilterSelect label="All Status" />
        <FilterSelect label="All Warehouses" />
        <FilterSelect label="Date: All" />
      </FilterBar>

      <Card padded={false}>
        <TableWrap>
          <table className="w-full min-w-[920px] text-[13px]">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="py-2.5 pl-5 pr-3 font-medium">Dispatch #</th>
                <Th>Work Order</Th>
                <Th>Shed ID</Th>
                <Th>Warehouse</Th>
                <Th right>Items</Th>
                <Th right>Dispatched</Th>
                <Th right>Received</Th>
                <Th>Status</Th>
                <Th>Dispatch Date</Th>
                <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {ROWS.map((r) => (
                <tr key={r.md} className="hover:bg-brand-cream/40">
                  <td className="py-3 pl-5 pr-3 font-semibold text-brand-green">{r.md}</td>
                  <td className="py-3 pr-3 font-medium">{r.wo}</td>
                  <td className="py-3 pr-3">{r.shed}</td>
                  <td className="py-3 pr-3">
                    <span className="flex items-center gap-1.5">
                      <Warehouse className="size-3.5 text-muted" />
                      {r.warehouse}
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-right">{r.items}</td>
                  <td className="py-3 pr-3 text-right">{r.dispatched}</td>
                  <td className="py-3 pr-3 text-right font-medium">{r.received}</td>
                  <td className="py-3 pr-3">
                    <Chip tone={r.tone} dot>
                      {r.status}
                    </Chip>
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap">{r.date}</td>
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
          <PaginationNote>Showing 1 to 10 of 214 dispatches</PaginationNote>
        </div>
      </Card>
    </div>
  );
}
