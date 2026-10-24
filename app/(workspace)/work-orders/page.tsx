"use client";

import { useState, useMemo } from "react";
import {
  CircleCheck,
  Clock,
  FileText,
  MoreVertical,
  Plus,
  SlidersHorizontal,
  Wallet,
  Wrench,
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
  PrimaryButton,
  Progress,
  SearchInput,
  TableWrap,
  Th,
} from "@/components/ui";
import { useToast } from "../_components";
import {
  NewWorkOrderModal,
  WorkOrderDetailsModal,
  type WorkOrderItemView,
} from "@/components/modals";

const KPIS = [
  { icon: FileText, tint: "bg-success-bg text-brand-leaf", label: "Total Work Orders", value: "128" },
  { icon: Clock, tint: "bg-amber-50 text-brand-gold", label: "Pending Approval", value: "16", sub: "Awaiting sign-off", subTone: "muted" as const },
  { icon: Wrench, tint: "bg-blue-50 text-blue-600", label: "In Progress", value: "62" },
  { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", label: "Completed", value: "50", sub: "↑ 12% vs last month" },
  { icon: Wallet, tint: "bg-success-bg text-brand-leaf", label: "Total WO Value", value: "₹3.96 Cr", sub: "Across all work orders", subTone: "muted" as const },
];

const INITIAL_ROWS: WorkOrderItemView[] = [
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

const STATUSES = [
  "All Status",
  "In Progress",
  "Awaiting Start",
  "Pending Approval",
  "Completed",
  "On Hold",
  "Draft",
];

const FABRICATORS = [
  "All Fabricators",
  "Sharma Agro Constructions",
  "Verma Infra",
  "Patel Structures",
  "R.K. Fabricators",
  "Chhattisgarh Rural Works",
];

const MODELS = ["Supply Model: All", "Model A", "Model B"];

export default function WorkOrdersPage() {
  const { showToast } = useToast();
  const [rows, setRows] = useState<WorkOrderItemView[]>(INITIAL_ROWS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [fabricatorFilter, setFabricatorFilter] = useState("All Fabricators");
  const [modelFilter, setModelFilter] = useState("Supply Model: All");

  // Modals state
  const [selectedWo, setSelectedWo] = useState<WorkOrderItemView | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchSearch =
        search.trim() === "" ||
        r.wo.toLowerCase().includes(search.toLowerCase()) ||
        r.shed.toLowerCase().includes(search.toLowerCase()) ||
        r.beneficiary.toLowerCase().includes(search.toLowerCase()) ||
        r.fabricator.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All Status" || r.status === statusFilter;

      const matchFabricator =
        fabricatorFilter === "All Fabricators" || r.fabricator === fabricatorFilter;

      const matchModel =
        modelFilter === "Supply Model: All" || r.model === modelFilter;

      return matchSearch && matchStatus && matchFabricator && matchModel;
    });
  }, [rows, search, statusFilter, fabricatorFilter, modelFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginatedRows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function resetFilters() {
    setSearch("");
    setStatusFilter("All Status");
    setFabricatorFilter("All Fabricators");
    setModelFilter("Supply Model: All");
    setCurrentPage(1);
    showToast("Filters reset to default view.", "info");
  }

  function handleCreateWO(newEntry: WorkOrderItemView) {
    setRows((prev) => [newEntry, ...prev]);
    showToast(`Work Order ${newEntry.wo} generated for ${newEntry.fabricator}!`, "success");
  }

  function handleApproveWO(wo: WorkOrderItemView) {
    setRows((prev) =>
      prev.map((r) =>
        r.wo === wo.wo
          ? { ...r, status: "In Progress", tone: "blue", pct: 15 }
          : r
      )
    );
    setSelectedWo(null);
    showToast(`Work Order ${wo.wo} approved by AVP Infra. Advance released.`, "success");
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={["Work Orders"]} />
      <PageHeader
        title="Work Orders"
        subtitle="Create, allocate and track fabricator work orders and advances across sheds"
        actions={
          <PrimaryButton onClick={() => setShowNewModal(true)}>
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
        <SearchInput
          placeholder="Search by WO ID, shed, beneficiary, fabricator..."
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label={statusFilter}
          value={statusFilter}
          options={STATUSES}
          onChange={(val) => {
            setStatusFilter(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label={fabricatorFilter}
          value={fabricatorFilter}
          options={FABRICATORS}
          onChange={(val) => {
            setFabricatorFilter(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label={modelFilter}
          value={modelFilter}
          options={MODELS}
          onChange={(val) => {
            setModelFilter(val);
            setCurrentPage(1);
          }}
        />
        <GhostButton onClick={resetFilters}>
          <SlidersHorizontal className="size-4" /> Reset Filters
        </GhostButton>
      </FilterBar>

      <Card padded={false}>
        {filtered.length === 0 ? (
          <EmptyState
            title="No work orders found"
            description="No work orders match your search parameters. Try clearing your filters."
            onReset={resetFilters}
          />
        ) : (
          <>
            <TableWrap>
              <table className="w-full min-w-[960px] text-[13px]">
                <thead>
                  <tr className="border-b border-line text-left text-xs font-semibold text-muted">
                    <th className="py-2.5 pl-5 pr-3">Work Order</th>
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
                  {paginatedRows.map((r) => (
                    <tr
                      key={r.wo}
                      onClick={() => setSelectedWo(r)}
                      className="cursor-pointer transition hover:bg-brand-cream/50"
                    >
                      <td className="py-3 pl-5 pr-3 font-bold text-brand-green hover:underline">
                        {r.wo}
                      </td>
                      <td className="py-3 pr-3 font-semibold text-brand-charcoal">
                        {r.shed}
                      </td>
                      <td className="py-3 pr-3">{r.beneficiary}</td>
                      <td className="py-3 pr-3 font-medium text-brand-charcoal">
                        {r.fabricator}
                      </td>
                      <td className="py-3 pr-3">
                        <span className="rounded bg-brand-cream px-2 py-0.5 text-xs font-semibold text-muted">
                          {r.model}
                        </span>
                      </td>
                      <td className="py-3 pr-3 text-right font-semibold text-brand-charcoal">
                        {r.value}
                      </td>
                      <td className="py-3 pr-3 text-right text-muted">{r.advance}</td>
                      <td className="py-3 pr-3">
                        <Chip tone={r.tone} dot>
                          {r.status}
                        </Chip>
                      </td>
                      <td className="py-3 pr-3">
                        <Progress pct={r.pct} />
                      </td>
                      <td className="py-3 pr-5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedWo(r);
                          }}
                          aria-label={`View details for ${r.wo}`}
                          className="rounded p-1 text-muted hover:bg-brand-cream hover:text-brand-charcoal"
                        >
                          <MoreVertical className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>
            <div className="px-5 pb-4">
              <PaginationNote
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => setCurrentPage(p)}
              >
                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} work orders
              </PaginationNote>
            </div>
          </>
        )}
      </Card>

      <WorkOrderDetailsModal
        wo={selectedWo}
        isOpen={Boolean(selectedWo)}
        onClose={() => setSelectedWo(null)}
        onApprove={handleApproveWO}
      />

      <NewWorkOrderModal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        onCreate={handleCreateWO}
      />
    </div>
  );
}
