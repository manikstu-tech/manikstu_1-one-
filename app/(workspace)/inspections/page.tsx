"use client";

import { useState, useMemo } from "react";
import {
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
  EmptyState,
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
  useToast,
} from "@/components/ui";
import { InspectionReviewModal } from "@/components/modals";
import type { Tone, InspectionRecord } from "@/types";

export interface InspectionItem {
  shed: string;
  beneficiary: string;
  village: string;
  stage: string;
  stageTone: Tone;
  avpDate: string;
  submitted: string;
  by: string;
  status: "Pending Review" | "In Correction" | "Approved" | "Rejected";
  tone: Tone;
}

const KPIS = [
  { icon: Clock, tint: "bg-amber-50 text-brand-gold", label: "Pending Review", value: "8", sub: "Awaiting AVP decision", subTone: "muted" as const },
  { icon: RotateCcw, tint: "bg-amber-50 text-brand-gold", label: "In Correction", value: "4", sub: "Returned to fabricator", subTone: "muted" as const },
  { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", label: "Approved", value: "26", sub: "↑ 18% this month" },
  { icon: CircleX, tint: "bg-red-50 text-brand-red", label: "Rejected", value: "3", sub: "Major issues, re-inspection", subTone: "red" as const },
];

const INITIAL_ROWS: InspectionItem[] = [
  { shed: "SH-000123", beneficiary: "Savitri Bai Sahu", village: "Kundagaon, Raipur", stage: "Civil & Foundation", stageTone: "amber", avpDate: "18-Mar-2026", submitted: "18-Mar-2026", by: "Manoj Singh (AVP)", status: "Pending Review", tone: "amber" },
  { shed: "SH-000124", beneficiary: "Kamla Dewangan", village: "Arang, Raipur", stage: "Structure & Roofing", stageTone: "blue", avpDate: "17-Mar-2026", submitted: "17-Mar-2026", by: "Hemant Kumar", status: "Pending Review", tone: "amber" },
  { shed: "SH-000118", beneficiary: "Rekha Yadav", village: "Abhanpur, Raipur", stage: "Site Assessment", stageTone: "green", avpDate: "16-Mar-2026", submitted: "16-Mar-2026", by: "Kunti Sahu", status: "In Correction", tone: "amber" },
  { shed: "SH-000117", beneficiary: "Lata Verma", village: "Tilda, Raipur", stage: "Finishing", stageTone: "blue", avpDate: "15-Mar-2026", submitted: "15-Mar-2026", by: "Ramdhan Kurre", status: "Pending Review", tone: "amber" },
  { shed: "SH-000113", beneficiary: "Sunita Netam", village: "Simga, Raipur", stage: "Structure & Roofing", stageTone: "blue", avpDate: "14-Mar-2026", submitted: "14-Mar-2026", by: "Jyoti Nirmal", status: "Approved", tone: "green" },
  { shed: "SH-000109", beneficiary: "Mangi Bai", village: "Mandir Hasaud", stage: "Civil & Foundation", stageTone: "amber", avpDate: "13-Mar-2026", submitted: "13-Mar-2026", by: "Aruna Ekka", status: "Pending Review", tone: "amber" },
  { shed: "SH-000105", beneficiary: "Phoolmati", village: "Kharora, Raipur", stage: "Site Assessment", stageTone: "green", avpDate: "12-Mar-2026", submitted: "12-Mar-2026", by: "Jitu Sahu", status: "In Correction", tone: "amber" },
  { shed: "SH-000101", beneficiary: "Sukmati Bai", village: "Doma, Raipur", stage: "Finishing", stageTone: "blue", avpDate: "11-Mar-2026", submitted: "11-Mar-2026", by: "Hemant Kumar", status: "Rejected", tone: "red" },
];

const STAGES = [
  "All Stages",
  "Civil & Foundation",
  "Structure & Roofing",
  "Site Assessment",
  "Finishing",
];

export default function InspectionsPage() {
  const { showToast } = useToast();
  const [rows, setRows] = useState<InspectionItem[]>(INITIAL_ROWS);
  const [activeTab, setActiveTab] = useState("Pending Review");
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All Stages");

  const [selectedInspection, setSelectedInspection] = useState<InspectionItem | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchTab =
        activeTab === "All Inspections" ||
        (activeTab === "Pending Review" && r.status === "Pending Review") ||
        (activeTab === "In Correction" && r.status === "In Correction") ||
        (activeTab === "Approved" && r.status === "Approved") ||
        (activeTab === "Rejected" && r.status === "Rejected");

      const matchSearch =
        search.trim() === "" ||
        r.shed.toLowerCase().includes(search.toLowerCase()) ||
        r.beneficiary.toLowerCase().includes(search.toLowerCase()) ||
        r.village.toLowerCase().includes(search.toLowerCase()) ||
        r.by.toLowerCase().includes(search.toLowerCase());

      const matchStage =
        stageFilter === "All Stages" || r.stage === stageFilter;

      return matchTab && matchSearch && matchStage;
    });
  }, [rows, activeTab, search, stageFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginatedRows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function handleDecision(shedId: string, decision: "Approved" | "In Correction" | "Rejected") {
    const tone: Tone =
      decision === "Approved" ? "green" : decision === "Rejected" ? "red" : "amber";

    setRows((prev) =>
      prev.map((r) => (r.shed === shedId ? { ...r, status: decision, tone } : r))
    );

    setSelectedInspection(null);

    if (decision === "Approved") {
      showToast(`Inspection approved for ${shedId}. Milestone advance unlocked.`, "success");
    } else if (decision === "In Correction") {
      showToast(`Correction notice issued to fabricator for ${shedId}.`, "warning");
    } else {
      showToast(`Inspection rejected for ${shedId}. Re-inspection scheduled.`, "error");
    }
  }

  const inspectionModalData: InspectionRecord | null = selectedInspection ? {
    id: `INS-2026-0${selectedInspection.shed.replace("SH-000", "")}`,
    shed: selectedInspection.shed,
    beneficiary: selectedInspection.beneficiary,
    stage: selectedInspection.stage,
    inspector: selectedInspection.by,
    submitted: selectedInspection.submitted,
    status: selectedInspection.status,
    tone: selectedInspection.tone,
  } : null;

  return (
    <div className="space-y-5">
      <Breadcrumb items={["Inspections", "Quality Review"]} />
      <PageHeader
        title="Quality Inspections"
        subtitle="Independent AVP Infrastructure quality sign-off and milestone verification"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((k) => (
          <Kpi key={k.label} {...k} />
        ))}
      </div>

      <Tabs
        tabs={[
          { label: "Pending Review", count: rows.filter((r) => r.status === "Pending Review").length },
          { label: "In Correction", count: rows.filter((r) => r.status === "In Correction").length },
          { label: "Approved", count: rows.filter((r) => r.status === "Approved").length },
          { label: "Rejected", count: rows.filter((r) => r.status === "Rejected").length },
          { label: "All Inspections", count: rows.length },
        ]}
        activeTab={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          setCurrentPage(1);
        }}
      />

      <FilterBar>
        <SearchInput
          placeholder="Search by Shed ID, beneficiary, village or inspector..."
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label="Stage"
          value={stageFilter}
          options={STAGES}
          onChange={(val) => {
            setStageFilter(val);
            setCurrentPage(1);
          }}
        />
      </FilterBar>

      <Card padded={false}>
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {activeTab} ({filtered.length} Records)
          </p>
          <GhostButton onClick={() => showToast("Columns configured.", "info")} className="h-8 px-2 text-xs">
            <SlidersHorizontal className="size-3.5" /> Columns
          </GhostButton>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No inspections found"
            description="No inspection records match the selected tab and search filters."
            onReset={() => {
              setActiveTab("All Inspections");
              setSearch("");
              setStageFilter("All Stages");
            }}
          />
        ) : (
          <>
            <TableWrap>
              <table className="w-full min-w-[960px] text-[13px]">
                <thead>
                  <tr className="border-b border-line text-left text-xs font-semibold text-muted">
                    <th className="py-2.5 pl-5 pr-3">#</th>
                    <Th>Shed ID</Th>
                    <Th>Beneficiary</Th>
                    <Th>Village</Th>
                    <Th>Stage</Th>
                    <Th>Submitted</Th>
                    <Th>Inspector</Th>
                    <Th>Status</Th>
                    <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {paginatedRows.map((r, i) => (
                    <tr
                      key={r.shed}
                      onClick={() => setSelectedInspection(r)}
                      className="cursor-pointer transition hover:bg-brand-cream/50"
                    >
                      <td className="py-3 pl-5 pr-3 text-muted">
                        {(currentPage - 1) * pageSize + i + 1}
                      </td>
                      <td className="py-3 pr-3 font-bold text-brand-green hover:underline">
                        {r.shed}
                      </td>
                      <td className="py-3 pr-3 font-semibold text-brand-charcoal">
                        {r.beneficiary}
                      </td>
                      <td className="py-3 pr-3 text-muted">{r.village}</td>
                      <td className="py-3 pr-3">
                        <Chip tone={r.stageTone}>{r.stage}</Chip>
                      </td>
                      <td className="py-3 pr-3 text-muted">{r.submitted}</td>
                      <td className="py-3 pr-3 text-muted">{r.by}</td>
                      <td className="py-3 pr-3">
                        <Chip tone={r.tone} dot>{r.status}</Chip>
                      </td>
                      <td className="py-3 pr-5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInspection(r);
                          }}
                          className="rounded-md bg-brand-green/10 px-2.5 py-1 text-xs font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
                        >
                          Review Evidence
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>

            <div className="border-t border-line px-5 py-3">
              <PaginationNote
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => setCurrentPage(p)}
              >
                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} entries
              </PaginationNote>
            </div>
          </>
        )}
      </Card>

      <InspectionReviewModal
        inspection={inspectionModalData}
        onClose={() => setSelectedInspection(null)}
        onApprove={(item) => handleDecision(item.shed, "Approved")}
        onRequestCorrection={(item) => handleDecision(item.shed, "In Correction")}
      />
    </div>
  );
}
