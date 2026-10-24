"use client";

import { useState, useMemo } from "react";
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
  EmptyState,
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
  useToast,
} from "@/components/ui";
import {
  NewShedModal,
  ShedDrawerModal,
  ImportGovtListModal,
} from "@/components/modals";
import { exportTableToCsv } from "@/lib/file-utils";
import type { Tone } from "@/types";

interface ShedTableItem {
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
}

const KPIS = [
  { icon: House, tint: "bg-success-bg text-brand-leaf", label: "Total Sheds", value: "545" },
  { icon: Settings2, tint: "bg-amber-50 text-brand-gold", label: "In Construction", value: "312", sub: "↑ 18% vs last month" },
  { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", label: "Completed", value: "132", sub: "↑ 26% vs last month" },
  { icon: CircleAlert, tint: "bg-red-50 text-brand-red", label: "Overdue", value: "48", sub: "↑ 33% need attention", subTone: "red" as const },
  { icon: Wallet, tint: "bg-success-bg text-brand-leaf", label: "Receipts Collected", value: "₹4.12 Cr", sub: "88% target achieved" },
];

const INITIAL_ROWS: ShedTableItem[] = [
  {
    shed: "SH-000123",
    beneficiary: "Savita Bai Sahu",
    village: "Kundagaon",
    stage: "In Progress",
    stageTone: "green",
    delay: "Overdue (4d)",
    delayTone: "red",
    owner: "Ramesh Kumar",
    action: "Material dispatch follow-up",
    updated: "20-Mar-2026",
    date: "14-Feb-2026",
    amount: "₹1,25,000",
    pct: 68,
  },
  {
    shed: "SH-000118",
    beneficiary: "Laxmi Soni",
    village: "Atari",
    stage: "Materials",
    stageTone: "amber",
    delay: "On Track",
    delayTone: "gray",
    owner: "Manoj Singh",
    action: "Confirm site receipt",
    updated: "19-Mar-2026",
    date: "18-Feb-2026",
    amount: "₹1,25,000",
    pct: 42,
  },
  {
    shed: "SH-000110",
    beneficiary: "Mangal Ram",
    village: "Dhamtari",
    stage: "Delayed",
    stageTone: "red",
    delay: "Overdue (8d)",
    delayTone: "red",
    owner: "Kunti Devi",
    action: "Resolve defect & resubmit",
    updated: "18-Mar-2026",
    date: "22-Feb-2026",
    amount: "₹1,25,000",
    pct: 25,
  },
  {
    shed: "SH-000092",
    beneficiary: "Rekha Patel",
    village: "Kumhari",
    stage: "Completed",
    stageTone: "green",
    delay: "On Track",
    delayTone: "gray",
    owner: "Ramesh Kumar",
    action: "Final signoff verification",
    updated: "18-Mar-2026",
    date: "05-Jan-2026",
    amount: "₹1,25,000",
    pct: 100,
  },
  {
    shed: "SH-000076",
    beneficiary: "Suresh Verma",
    village: "Arang",
    stage: "Contribution",
    stageTone: "amber",
    delay: "On Track",
    delayTone: "gray",
    owner: "Aftab Khan",
    action: "Call for bank receipt",
    updated: "17-Mar-2026",
    date: "28-Feb-2026",
    amount: "₹1,25,000",
    pct: 15,
  },
  {
    shed: "SH-000054",
    beneficiary: "Dhaniram Netam",
    village: "Abhanpur",
    stage: "Site Review",
    stageTone: "blue",
    delay: "On Track",
    delayTone: "gray",
    owner: "Manoj Singh",
    action: "Schedule site assessment",
    updated: "15-Mar-2026",
    date: "02-Mar-2026",
    amount: "₹1,25,000",
    pct: 30,
  },
];

const STAGES = [
  "All Stages",
  "Site Assessment",
  "Site Review",
  "Contribution",
  "Work Order Pending",
  "Materials",
  "In Progress",
  "Completed",
  "Delayed",
  "Financial Reconciliation",
];

const DELAYS = ["Delay: All", "On Track", "Overdue"];
const LOCATIONS = ["All Locations", "Raipur", "Dhamtari", "Baloda Bazar", "Kundagaon", "Atari", "Kumhari", "Arang"];
const OWNERS = ["All Owners", "Ramesh Kumar", "Manoj Singh", "Kunti Devi", "Shri Ram", "Aftab Khan", "Priya Verma"];

export default function SitesPage() {
  const { showToast } = useToast();
  const [rows, setRows] = useState<ShedTableItem[]>(INITIAL_ROWS);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [delayFilter, setDelayFilter] = useState("Delay: All");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [ownerFilter, setOwnerFilter] = useState("All Owners");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [selectedShed, setSelectedShed] = useState<ShedTableItem | null>(null);
  const [showNewShedModal, setShowNewShedModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchSearch =
        search.trim() === "" ||
        r.shed.toLowerCase().includes(search.toLowerCase()) ||
        r.beneficiary.toLowerCase().includes(search.toLowerCase()) ||
        r.village.toLowerCase().includes(search.toLowerCase()) ||
        r.owner.toLowerCase().includes(search.toLowerCase()) ||
        r.action.toLowerCase().includes(search.toLowerCase());

      const matchStage =
        stageFilter === "All Stages" || r.stage === stageFilter;

      const matchDelay =
        delayFilter === "Delay: All" ||
        (delayFilter === "On Track" && r.delay.includes("On Track")) ||
        (delayFilter === "Overdue" && r.delay.includes("Overdue"));

      const matchLocation =
        locationFilter === "All Locations" ||
        r.village.toLowerCase().includes(locationFilter.toLowerCase());

      const matchOwner =
        ownerFilter === "All Owners" || r.owner === ownerFilter;

      return matchSearch && matchStage && matchDelay && matchLocation && matchOwner;
    });
  }, [rows, search, stageFilter, delayFilter, locationFilter, ownerFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginatedRows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function resetFilters() {
    setSearch("");
    setStageFilter("All Stages");
    setDelayFilter("Delay: All");
    setLocationFilter("All Locations");
    setOwnerFilter("All Owners");
    setCurrentPage(1);
    showToast("Filters reset to default view.", "info");
  }

  function handleCreateShed(entry: { beneficiary: string; village: string; owner: string; shed: string; model?: string }) {
    const newEntry: ShedTableItem = {
      shed: entry.shed,
      beneficiary: entry.beneficiary,
      village: entry.village,
      stage: "Site Prep",
      stageTone: "blue",
      delay: "On Track",
      delayTone: "gray",
      owner: entry.owner,
      action: "Initial site intake",
      updated: "Just now",
      date: "24-Oct-2026",
      amount: "₹1,25,000",
      pct: 10,
    };

    setRows((prev) => [newEntry, ...prev]);
    showToast(`Shed ${entry.shed} registered successfully for ${entry.beneficiary}!`, "success");
  }

  function handleExport() {
    exportTableToCsv("Manikstu_Shed_Register.csv", [
      { header: "Shed ID", key: "shed" },
      { header: "Beneficiary Name", key: "beneficiary" },
      { header: "Village", key: "village" },
      { header: "Current Stage", key: "stage" },
      { header: "Stage Progress (%)", key: "pct" },
      { header: "Delay Status", key: "delay" },
      { header: "Site Supervisor", key: "owner" },
      { header: "Contribution Amount", key: "amount" },
      { header: "Last Action", key: "action" },
      { header: "Last Updated", key: "updated" },
    ], filtered);
    showToast(`Exported ${filtered.length} shed records to CSV.`, "success");
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={["Sites", "Shed Register"]} />
      <PageHeader
        title="Shed Register"
        subtitle="Track all sheds, stages, ownership, progress, evidence, and financial status"
        actions={
          <>
            <GhostButton onClick={() => setShowImportModal(true)}>
              <Upload className="size-4" /> Import from Govt List
            </GhostButton>
            <GhostButton onClick={handleExport}>
              <Download className="size-4" /> Export
            </GhostButton>
            <PrimaryButton onClick={() => setShowNewShedModal(true)}>
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
        <SearchInput
          placeholder="Search by Shed ID, beneficiary, village or supervisor..."
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
        <FilterSelect
          label="Delay"
          value={delayFilter}
          options={DELAYS}
          onChange={(val) => {
            setDelayFilter(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label="Location"
          value={locationFilter}
          options={LOCATIONS}
          onChange={(val) => {
            setLocationFilter(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label="Supervisor"
          value={ownerFilter}
          options={OWNERS}
          onChange={(val) => {
            setOwnerFilter(val);
            setCurrentPage(1);
          }}
        />
        {(search || stageFilter !== "All Stages" || delayFilter !== "Delay: All" || locationFilter !== "All Locations" || ownerFilter !== "All Owners") && (
          <GhostButton onClick={resetFilters} className="text-xs">
            Reset Filters
          </GhostButton>
        )}
      </FilterBar>

      <Card padded={false}>
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Displaying {filtered.length} of {rows.length} Total Sheds
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">Page {currentPage} of {totalPages}</span>
            <GhostButton onClick={() => showToast("Custom columns configured.", "info")} className="h-8 px-2 text-xs">
              <SlidersHorizontal className="size-3.5" /> Columns
            </GhostButton>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No sheds found"
            description="No shed records match your current filters. Try resetting your search filters."
            onReset={resetFilters}
          />
        ) : (
          <>
            <TableWrap>
              <table className="w-full min-w-[1040px] text-[13px]">
                <thead>
                  <tr className="border-b border-line text-left text-xs font-semibold text-muted">
                    <th className="py-2.5 pl-5 pr-3">#</th>
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
                  {paginatedRows.map((r, i) => (
                    <tr
                      key={r.shed}
                      onClick={() => setSelectedShed(r)}
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
                        <Chip tone={r.stageTone} dot>
                          {r.stage}
                        </Chip>
                      </td>
                      <td className="py-3 pr-3">
                        <Chip
                          tone={r.delayTone}
                          icon={r.delayTone === "red" ? CircleAlert : Clock}
                        >
                          {r.delay}
                        </Chip>
                      </td>
                      <td className="py-3 pr-3">
                        <span className="flex items-center gap-2.5">
                          <Avatar name={r.owner} />
                          <span>
                            <span className="block font-medium text-brand-charcoal">
                              {r.owner}
                            </span>
                            <span className="block text-xs text-brand-green">
                              {r.action}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td className="py-3 pr-3 whitespace-nowrap text-muted">
                        <span className="flex items-center gap-1 font-medium text-brand-charcoal/80">
                          <Clock className="size-3.5 text-muted" /> {r.updated}
                        </span>
                        <span className="text-xs">{r.date}</span>
                      </td>
                      <td className="py-3 pr-3">
                        <p className="font-semibold text-brand-charcoal">{r.amount}</p>
                        <Progress pct={r.pct} />
                      </td>
                      <td className="py-3 pr-5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedShed(r);
                          }}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-brand-green hover:bg-brand-cream"
                        >
                          Details <ChevronRight className="size-3.5" />
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

      <NewShedModal
        isOpen={showNewShedModal}
        onClose={() => setShowNewShedModal(false)}
        onRegister={handleCreateShed}
      />

      <ImportGovtListModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={(count, fileName) =>
          showToast(
            `Successfully imported ${count || 14} approved beneficiaries from ${fileName || "Government list"}.`,
            "success"
          )
        }
      />

      <ShedDrawerModal
        shed={selectedShed ? {
          shed: selectedShed.shed,
          beneficiary: selectedShed.beneficiary,
          contact: "+91 98765 43210",
          village: selectedShed.village,
          location: `${selectedShed.village}, Bastar`,
          stage: selectedShed.stage,
          delayReason: selectedShed.delay,
          owner: selectedShed.owner,
          progress: selectedShed.pct,
          tone: selectedShed.stageTone,
          depositStatus: "Verified",
        } : null}
        onClose={() => setSelectedShed(null)}
        onAdvanceStage={(s) => {
          showToast(`Stage advanced for ${s.shed} with audit record.`, "success");
          setSelectedShed(null);
        }}
        onReportDefect={(s) => {
          showToast(`Logged defect review task for ${s.shed}`, "warning");
          setSelectedShed(null);
        }}
      />
    </div>
  );
}
