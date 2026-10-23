import {
  BadgeCheck,
  ChevronRight,
  CircleCheck,
  CircleX,
  Clock,
  RotateCcw,
  SlidersHorizontal,
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
  SearchInput,
  Tabs,
  TableWrap,
  Th,
  type Tone,
} from "../_components";

const KPIS = [
  { icon: Clock, tint: "bg-amber-50 text-brand-gold", label: "Pending Review", value: "8", sub: "Awaiting AVP decision", subTone: "muted" as const },
  { icon: RotateCcw, tint: "bg-amber-50 text-brand-gold", label: "In Correction", value: "4", sub: "Returned to fabricator", subTone: "muted" as const },
  { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", label: "Approved", value: "26", sub: "↑ 18% this month" },
  { icon: CircleX, tint: "bg-red-50 text-brand-red", label: "Rejected", value: "3", sub: "Major issues, re-inspection", subTone: "red" as const },
];

const ROWS: {
  shed: string;
  beneficiary: string;
  village: string;
  stage: string;
  stageTone: Tone;
  avpDate: string;
  submitted: string;
  by: string;
  status: string;
  tone: Tone;
}[] = [
  { shed: "SH-000123", beneficiary: "Savitri Bai Sahu", village: "Kundagaon, Raipur", stage: "Civil & Foundation", stageTone: "amber", avpDate: "18-Mar-2026", submitted: "18-Mar-2026", by: "Manoj Singh (AVP)", status: "Pending Review", tone: "amber" },
  { shed: "SH-000124", beneficiary: "Kamla Dewangan", village: "Arang, Raipur", stage: "Structure & Roofing", stageTone: "blue", avpDate: "17-Mar-2026", submitted: "17-Mar-2026", by: "Hemant Kumar", status: "Pending Review", tone: "amber" },
  { shed: "SH-000118", beneficiary: "Rekha Yadav", village: "Abhanpur, Raipur", stage: "Site Assessment", stageTone: "green", avpDate: "16-Mar-2026", submitted: "16-Mar-2026", by: "Kunti Sahu", status: "In Correction", tone: "amber" },
  { shed: "SH-000117", beneficiary: "Lata Verma", village: "Tilda, Raipur", stage: "Finishing", stageTone: "blue", avpDate: "15-Mar-2026", submitted: "15-Mar-2026", by: "Ramdhan Kurre", status: "Pending Review", tone: "amber" },
  { shed: "SH-000113", beneficiary: "Sunita Netam", village: "Simga, Raipur", stage: "Structure & Roofing", stageTone: "blue", avpDate: "14-Mar-2026", submitted: "14-Mar-2026", by: "Jyoti Nirmal", status: "Approved", tone: "green" },
  { shed: "SH-000109", beneficiary: "Mangi Bai", village: "Mandir Hasaud", stage: "Civil & Foundation", stageTone: "amber", avpDate: "13-Mar-2026", submitted: "13-Mar-2026", by: "Aruna Ekka", status: "Pending Review", tone: "amber" },
  { shed: "SH-000105", beneficiary: "Phoolmati", village: "Kharora, Raipur", stage: "Site Assessment", stageTone: "green", avpDate: "12-Mar-2026", submitted: "12-Mar-2026", by: "Jitu Sahu", status: "In Correction", tone: "amber" },
  { shed: "SH-000101", beneficiary: "Sukmati Bai", village: "Doma, Raipur", stage: "Finishing", stageTone: "blue", avpDate: "11-Mar-2026", submitted: "11-Mar-2026", by: "Hemant Kumar", status: "Rejected", tone: "red" },
];

export default function InspectionsPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={["Inspections", "AVP Inspection Queue"]} />
      <PageHeader
        title="AVP Inspection Queue"
        subtitle="Review field inspections, verify evidence and approve or request corrections"
        actions={
          <GhostButton>
            <SlidersHorizontal className="size-4" /> Filters
          </GhostButton>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((k) => (
          <Kpi key={k.label} {...k} />
        ))}
      </div>

      <Tabs
        tabs={[
          { label: "Pending Review", count: 8, active: true },
          { label: "In Correction", count: 4 },
          { label: "Approved", count: 26 },
          { label: "Rejected", count: 3 },
        ]}
      />

      <FilterBar>
        <SearchInput placeholder="Search by Shed ID, beneficiary, village, AVP, reviewer..." />
        <FilterSelect label="All Stages" />
        <FilterSelect label="Status: Pending Review" />
      </FilterBar>

      <Card padded={false}>
        <TableWrap>
          <table className="w-full min-w-[840px] text-[13px]">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="py-2.5 pl-5 pr-3 font-medium">Shed ID / Beneficiary</th>
                <Th>Stage</Th>
                <Th>AVP Date</Th>
                <Th>Submitted On / By</Th>
                <Th>Status</Th>
                <th className="py-2.5 pr-5 text-right font-medium">Open</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {ROWS.map((r) => (
                <tr key={r.shed} className="hover:bg-brand-cream/40">
                  <td className="py-3 pl-5 pr-3">
                    <p className="font-semibold text-brand-green">{r.shed}</p>
                    <p className="font-medium">{r.beneficiary}</p>
                    <p className="text-xs text-muted">{r.village}</p>
                  </td>
                  <td className="py-3 pr-3">
                    <Chip tone={r.stageTone} dot>
                      {r.stage}
                    </Chip>
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap">{r.avpDate}</td>
                  <td className="py-3 pr-3">
                    <p>{r.submitted}</p>
                    <p className="text-xs text-muted">{r.by}</p>
                  </td>
                  <td className="py-3 pr-3">
                    <Chip
                      tone={r.tone}
                      icon={r.status === "Approved" ? BadgeCheck : r.status === "Rejected" ? CircleX : Clock}
                    >
                      {r.status}
                    </Chip>
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
          <PaginationNote>Showing 1 to 8 of 41 inspections</PaginationNote>
        </div>
      </Card>
    </div>
  );
}
