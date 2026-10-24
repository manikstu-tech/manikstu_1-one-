"use client";

import { useState, useMemo } from "react";
import {
  Boxes,
  CircleCheck,
  MoreVertical,
  PackageCheck,
  Plus,
  Truck,
  TriangleAlert,
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
  PrimaryButton,
  SearchInput,
  TableWrap,
  Th,
} from "@/components/ui";
import { useToast } from "../_components";
import {
  DispatchDetailsModal,
  NewDispatchModal,
  type DispatchItemView,
} from "@/components/modals";

const KPIS = [
  { icon: Truck, tint: "bg-success-bg text-brand-leaf", label: "Total Dispatches", value: "214" },
  { icon: Boxes, tint: "bg-blue-50 text-blue-600", label: "In Transit", value: "12" },
  { icon: PackageCheck, tint: "bg-amber-50 text-brand-gold", label: "Partially Received", value: "9", sub: "Balance pending", subTone: "muted" as const },
  { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", label: "Fully Received", value: "181", sub: "84.6% delivery rate" },
  { icon: TriangleAlert, tint: "bg-red-50 text-brand-red", label: "Shortage / Pending", value: "12", sub: "Need follow-up", subTone: "red" as const },
];

const INITIAL_ROWS: DispatchItemView[] = [
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

const STATUSES = [
  "All Status",
  "Received",
  "Partially Received",
  "In Transit",
  "Dispatched",
  "Shortage Reported",
];

const WAREHOUSES = [
  "All Warehouses",
  "Bhubaneswar Main",
  "Raipur Hub",
  "Dhamtari Store",
];

export default function MaterialsPage() {
  const { showToast } = useToast();
  const [rows, setRows] = useState<DispatchItemView[]>(INITIAL_ROWS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [warehouseFilter, setWarehouseFilter] = useState("All Warehouses");

  // Detail Modal & New Modal state
  const [selectedDispatch, setSelectedDispatch] = useState<DispatchItemView | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchSearch =
        search.trim() === "" ||
        r.md.toLowerCase().includes(search.toLowerCase()) ||
        r.wo.toLowerCase().includes(search.toLowerCase()) ||
        r.shed.toLowerCase().includes(search.toLowerCase()) ||
        r.warehouse.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All Status" || r.status === statusFilter;

      const matchWarehouse =
        warehouseFilter === "All Warehouses" || r.warehouse === warehouseFilter;

      return matchSearch && matchStatus && matchWarehouse;
    });
  }, [rows, search, statusFilter, warehouseFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginatedRows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function resetFilters() {
    setSearch("");
    setStatusFilter("All Status");
    setWarehouseFilter("All Warehouses");
    setCurrentPage(1);
    showToast("Filters reset to default view.", "info");
  }

  function handleCreateDispatch(newEntry: DispatchItemView) {
    setRows((prev) => [newEntry, ...prev]);
    showToast(`Material Dispatch ${newEntry.md} created from ${newEntry.warehouse}!`, "success");
  }

  function handleConfirmReceipt(dispatch: DispatchItemView) {
    setRows((prev) =>
      prev.map((r) =>
        r.md === dispatch.md
          ? {
              ...r,
              received: r.dispatched,
              status: "Received",
              tone: "green",
            }
          : r
      )
    );
    setSelectedDispatch(null);
    showToast(`Full receipt confirmed at ${dispatch.shed} for ${dispatch.md}.`, "success");
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={["Materials", "Dispatches"]} />
      <PageHeader
        title="Materials & Dispatch"
        subtitle="Track material dispatch from warehouses and confirm receipt at construction sites"
        actions={
          <PrimaryButton onClick={() => setShowNewModal(true)}>
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
        <SearchInput
          placeholder="Search by dispatch #, WO, shed, warehouse..."
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
          label={warehouseFilter}
          value={warehouseFilter}
          options={WAREHOUSES}
          onChange={(val) => {
            setWarehouseFilter(val);
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
            title="No dispatches found"
            description="No material dispatch records match your search criteria. Try relaxing your filters."
            onReset={resetFilters}
          />
        ) : (
          <>
            <TableWrap>
              <table className="w-full min-w-[920px] text-[13px]">
                <thead>
                  <tr className="border-b border-line text-left text-xs font-semibold text-muted">
                    <th className="py-2.5 pl-5 pr-3">Dispatch #</th>
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
                  {paginatedRows.map((r) => (
                    <tr
                      key={r.md}
                      onClick={() => setSelectedDispatch(r)}
                      className="cursor-pointer transition hover:bg-brand-cream/50"
                    >
                      <td className="py-3 pl-5 pr-3 font-bold text-brand-green hover:underline">
                        {r.md}
                      </td>
                      <td className="py-3 pr-3 font-semibold text-brand-charcoal">
                        {r.wo}
                      </td>
                      <td className="py-3 pr-3 font-medium text-brand-green">{r.shed}</td>
                      <td className="py-3 pr-3 text-muted">{r.warehouse}</td>
                      <td className="py-3 pr-3 text-right">{r.items}</td>
                      <td className="py-3 pr-3 text-right font-semibold text-brand-charcoal">
                        {r.dispatched}
                      </td>
                      <td className="py-3 pr-3 text-right font-semibold text-brand-leaf">
                        {r.received}
                      </td>
                      <td className="py-3 pr-3">
                        <Chip tone={r.tone} dot>
                          {r.status}
                        </Chip>
                      </td>
                      <td className="py-3 pr-3 whitespace-nowrap text-muted">{r.date}</td>
                      <td className="py-3 pr-5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDispatch(r);
                          }}
                          aria-label={`View details for ${r.md}`}
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
                {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} dispatches
              </PaginationNote>
            </div>
          </>
        )}
      </Card>

      <DispatchDetailsModal
        dispatch={selectedDispatch}
        isOpen={Boolean(selectedDispatch)}
        onClose={() => setSelectedDispatch(null)}
        onConfirmReceipt={handleConfirmReceipt}
      />

      <NewDispatchModal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        onCreate={handleCreateDispatch}
      />
    </div>
  );
}
