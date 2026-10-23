import {
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Clock,
  Download,
  House,
  Settings2,
  SlidersHorizontal,
  Upload,
  Wallet,
} from "lucide-react";
import {
  Avatar,
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
  Progress,
  SearchInput,
  TableWrap,
  Th,
  type Tone,
} from "../_components";

const KPIS = [
  { icon: House, tint: "bg-success-bg text-brand-leaf", label: "Total Sheds", value: "142", sub: "↑ 18% vs previous month" },
  { icon: Settings2, tint: "bg-amber-50 text-brand-gold", label: "In Progress", value: "34", sub: "↑ 21% vs previous month" },
  { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", label: "Completed", value: "26", sub: "↑ 30% vs previous month" },
  { icon: CircleAlert, tint: "bg-red-50 text-brand-red", label: "Overdue / Delayed", value: "18", sub: "↑ 13% need attention", subTone: "red" as const },
  { icon: Wallet, tint: "bg-success-bg text-brand-leaf", label: "Total Project Value", value: "₹4,12,50,000", sub: "Approved budget (AJAH)", subTone: "muted" as const },
];

const ROWS: {
  shed: string;
  beneficiary: string;
  village: string;
  stage: string;
  stageTone: Tone;
  delay: string;
  delayTone: Tone;
  owner: string;
  action: string;
  updated: string;
  date: string;
  amount: string;
  pct: number;
}[] = [
  { shed: "SH-000123", beneficiary: "Savitri Bai Sahu", village: "Kundagaon, Raipur", stage: "In Progress", stageTone: "green", delay: "Overdue 4 days", delayTone: "red", owner: "Ramesh Kumar", action: "Upload progress evidence", updated: "2h ago", date: "20-Mar-2026", amount: "₹1,25,000", pct: 80 },
  { shed: "SH-000118", beneficiary: "Laxmi Soni", village: "Atari, Dhamtari", stage: "Materials", stageTone: "amber", delay: "On Track", delayTone: "gray", owner: "Manoj Singh", action: "Confirm material receipt", updated: "5h ago", date: "20-Mar-2026", amount: "₹1,25,000", pct: 60 },
  { shed: "SH-000110", beneficiary: "Mangal Ram", village: "Dhamtari", stage: "Site Review", stageTone: "amber", delay: "Overdue 2 days", delayTone: "red", owner: "Kunti Devi", action: "Review site assessment", updated: "1d ago", date: "19-Mar-2026", amount: "₹1,00,000", pct: 40 },
  { shed: "SH-000092", beneficiary: "Rekha Patel", village: "Kumhari, Raipur", stage: "Work Order", stageTone: "green", delay: "On Track", delayTone: "gray", owner: "Shri Ram", action: "Start construction", updated: "1d ago", date: "20-Mar-2026", amount: "₹1,25,000", pct: 10 },
  { shed: "SH-000076", beneficiary: "Suresh Verma", village: "Arang, Raipur", stage: "Contribution", stageTone: "amber", delay: "Overdue 7 days", delayTone: "red", owner: "Aftab Khan", action: "Verify contribution", updated: "1d ago", date: "20-Mar-2026", amount: "₹1,25,000", pct: 0 },
  { shed: "SH-000064", beneficiary: "Kamla Devi", village: "Tilda, Raipur", stage: "Completed", stageTone: "green", delay: "On Track", delayTone: "gray", owner: "AVP Infra", action: "Completion verification", updated: "2d ago", date: "18-Mar-2026", amount: "₹1,25,000", pct: 100 },
  { shed: "SH-000051", beneficiary: "Ramesh Nishad", village: "Mandir Hasaud, Raipur", stage: "Verification", stageTone: "amber", delay: "On Track", delayTone: "gray", owner: "Priya Verma", action: "Complete verification", updated: "2d ago", date: "17-Mar-2026", amount: "₹1,25,000", pct: 20 },
  { shed: "SH-000049", beneficiary: "Gita Sahu", village: "Simga, Baloda Bazar", stage: "Delayed", stageTone: "red", delay: "Overdue 10 days", delayTone: "red", owner: "Manoj Singh", action: "Resolve defects", updated: "3d ago", date: "17-Mar-2026", amount: "₹1,10,000", pct: 55 },
  { shed: "SH-000045", beneficiary: "Devki Bai", village: "Siltara, Raipur", stage: "Awaiting Start", stageTone: "gray", delay: "On Track", delayTone: "gray", owner: "Jitu Kumar", action: "Dispatch materials", updated: "3d ago", date: "16-Mar-2026", amount: "₹1,25,000", pct: 0 },
  { shed: "SH-000031", beneficiary: "Bhujbal Singh", village: "Kharora, Raipur", stage: "Financial Reconciliation", stageTone: "green", delay: "On Track", delayTone: "gray", owner: "Finance Team", action: "Reconcile expenses", updated: "4d ago", date: "16-Mar-2026", amount: "₹1,25,000", pct: 90 },
];

export default function SitesPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={["Sites", "Shed Register"]} />
      <PageHeader
        title="Shed Register"
        subtitle="Track all sheds, stages, ownership, progress and financial status"
        actions={
          <>
            <GhostButton>
              <Upload className="size-4" /> Import from Govt List
            </GhostButton>
            <GhostButton>
              <Download className="size-4" /> Export
            </GhostButton>
            <PrimaryButton>
              <House className="size-4" /> New Shed
            </PrimaryButton>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {KPIS.map((k) => (
          <Kpi key={k.label} {...k} />
        ))}
      </div>

      <FilterBar>
        <SearchInput placeholder="Search by Shed ID, beneficiary, village..." />
        <FilterSelect label="All Stages" />
        <FilterSelect label="Delay: All" />
        <FilterSelect label="All Locations" />
        <FilterSelect label="All Owners" />
        <GhostButton>
          <SlidersHorizontal className="size-4" /> More Filters
        </GhostButton>
      </FilterBar>

      <Card padded={false}>
        <TableWrap>
          <table className="w-full min-w-[1040px] text-[13px]">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="py-2.5 pl-5 pr-3 font-medium">#</th>
                <Th>Shed ID</Th>
                <Th>Beneficiary</Th>
                <Th>Village / Block</Th>
                <Th>Stage</Th>
                <Th>Delay</Th>
                <Th>Owner / Next Action</Th>
                <Th>Last Updated</Th>
                <Th>Finance Summary</Th>
                <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {ROWS.map((r, i) => (
                <tr key={r.shed} className="hover:bg-brand-cream/40">
                  <td className="py-3 pl-5 pr-3 text-muted">{i + 1}</td>
                  <td className="py-3 pr-3 font-semibold text-brand-green">{r.shed}</td>
                  <td className="py-3 pr-3 font-medium">{r.beneficiary}</td>
                  <td className="py-3 pr-3 text-muted">{r.village}</td>
                  <td className="py-3 pr-3">
                    <Chip tone={r.stageTone} dot>
                      {r.stage}
                    </Chip>
                  </td>
                  <td className="py-3 pr-3">
                    <Chip tone={r.delayTone} icon={r.delayTone === "red" ? CircleAlert : Clock}>
                      {r.delay}
                    </Chip>
                  </td>
                  <td className="py-3 pr-3">
                    <span className="flex items-center gap-2.5">
                      <Avatar name={r.owner} />
                      <span>
                        <span className="block font-medium">{r.owner}</span>
                        <span className="block text-xs text-brand-green">{r.action}</span>
                      </span>
                    </span>
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" /> {r.updated}
                    </span>
                    <span className="text-xs">{r.date}</span>
                  </td>
                  <td className="py-3 pr-3">
                    <p className="font-medium">{r.amount}</p>
                    <Progress pct={r.pct} />
                  </td>
                  <td className="py-3 pr-5 text-right">
                    <button className="grid size-8 place-items-center rounded-lg border border-line text-muted hover:text-brand-charcoal">
                      <ChevronRight className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
        <div className="px-5 pb-4">
          <PaginationNote>Showing 1 to 10 of 142 sheds</PaginationNote>
        </div>
      </Card>
    </div>
  );
}
