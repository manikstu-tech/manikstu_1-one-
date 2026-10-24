"use client";

import { useState, useMemo } from "react";
import {
  ArrowLeftRight,
  CalendarDays,
  Download,
  ReceiptText,
  Scale,
  Wallet,
  CheckCircle2,
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
  PageHeader,
  PaginationNote,
  SearchInput,
  Tabs,
  TableWrap,
  Th,
  useToast,
  type Tone,
} from "@/components/ui";
import { VerifyTransactionModal } from "@/components/modals";

const KPIS = [
  { icon: Wallet, label: "Total Budget", value: "₹ 3,60,00,000", sub: "Project AJAH (142 sheds)", tint: "bg-success-bg text-brand-leaf" },
  { icon: ReceiptText, label: "Receipts Collected", value: "₹ 1,32,06,000", sub: "142 beneficiary contributions", tint: "bg-success-bg text-brand-leaf" },
  { icon: ArrowLeftRight, label: "Expenses & Advances", value: "₹ 1,22,50,000", sub: "Materials, fabrication, labor", tint: "bg-amber-50 text-brand-gold" },
  { icon: Scale, label: "Net Available Balance", value: "₹ 9,56,000", sub: "Uncommitted liquidity", tint: "bg-blue-50 text-blue-600" },
];

export interface FinanceRow {
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
}

const INITIAL_ROWS: FinanceRow[] = [
  { date: "18-Mar-2026", type: "Receipt", typeTone: "green", ref: "RCPT-2026-031", party: "Savitri Bai Sahu", shed: "SH-000123", amount: "93,000", allocation: "Farmer Contribution", verify: "Pending", vTone: "amber" },
  { date: "16-Mar-2026", type: "Expense", typeTone: "red", ref: "EXP-2026-112", party: "Raipur Hardware", shed: "SH-000123", amount: "35,400", allocation: "Structural MS Pipe", verify: "Verified", vTone: "green" },
  { date: "15-Mar-2026", type: "Commitment", typeTone: "amber", ref: "WO-2026-0147", party: "Sharma Agro", shed: "SH-000124", amount: "1,20,000", allocation: "Work Order (Structure)", verify: "Approved", vTone: "green" },
  { date: "14-Mar-2026", type: "Expense", typeTone: "red", ref: "EXP-2026-109", party: "Transport Co.", shed: "SH-000124", amount: "8,500", allocation: "Transport", verify: "Verified", vTone: "green" },
  { date: "13-Mar-2026", type: "Receipt", typeTone: "green", ref: "RCPT-2026-028", party: "Kamla Dewangan", shed: "SH-000124", amount: "93,000", allocation: "Farmer Contribution", verify: "Pending", vTone: "amber" },
  { date: "12-Mar-2026", type: "Expense", typeTone: "red", ref: "EXP-2026-107", party: "Local Labour", shed: "SH-000123", amount: "12,000", allocation: "Labour", verify: "Verified", vTone: "green" },
  { date: "11-Mar-2026", type: "Advance", typeTone: "amber", ref: "ADV-2026-011", party: "Ramesh Kumar", shed: "SH-000125", amount: "25,000", allocation: "Site Preparation", verify: "Verified", vTone: "green" },
  { date: "10-Mar-2026", type: "Expense", typeTone: "red", ref: "EXP-2026-103", party: "Steel Supplier", shed: "SH-000118", amount: "28,200", allocation: "GI Wire Mesh", verify: "Pending", vTone: "amber" },
  { date: "10-Mar-2026", type: "Receipt", typeTone: "green", ref: "RCPT-2026-025", party: "Rekha Yadav", shed: "SH-000118", amount: "93,000", allocation: "Farmer Contribution", verify: "Verified", vTone: "green" },
];

export default function FinancePage() {
  const { showToast } = useToast();
  const [rows, setRows] = useState<FinanceRow[]>(INITIAL_ROWS);
  const [activeTab, setActiveTab] = useState("All Ledgers");
  const [search, setSearch] = useState("");
  const [verifyFilter, setVerifyFilter] = useState("All Status");

  const [selectedTx, setSelectedTx] = useState<FinanceRow | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchTab =
        activeTab === "All Ledgers" ||
        (activeTab === "Receipts" && r.type === "Receipt") ||
        (activeTab === "Expenses" && r.type === "Expense") ||
        (activeTab === "Payments" && r.type === "Payment") ||
        (activeTab === "Commitments" && r.type === "Commitment") ||
        (activeTab === "Advances" && r.type === "Advance");

      const matchSearch =
        search.trim() === "" ||
        r.ref.toLowerCase().includes(search.toLowerCase()) ||
        r.party.toLowerCase().includes(search.toLowerCase()) ||
        r.shed.toLowerCase().includes(search.toLowerCase()) ||
        r.allocation.toLowerCase().includes(search.toLowerCase());

      const matchVerify =
        verifyFilter === "All Status" || r.verify === verifyFilter;

      return matchTab && matchSearch && matchVerify;
    });
  }, [rows, activeTab, search, verifyFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginatedRows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function handleVerifyConfirm(tx: FinanceRow, utr: string) {
    setRows((prev) =>
      prev.map((r) =>
        r.ref === tx.ref
          ? {
              ...r,
              verify: "Verified",
              vTone: "green",
            }
          : r
      )
    );
    setSelectedTx(null);
    showToast(`Bank transaction ${utr} verified for ${tx.ref} (₹${tx.amount}).`, "success");
  }

  function handleExport() {
    showToast(`Finance report exported (${filtered.length} line items).`, "success");
  }

  function resetFilters() {
    setSearch("");
    setActiveTab("All Ledgers");
    setVerifyFilter("All Status");
    setCurrentPage(1);
    showToast("Finance filters reset to default view.", "info");
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={["Finance", "Ledgers"]} />
      <PageHeader
        title="Finance Ledgers"
        subtitle="Track budgets, receipts, expenses, commitments and bank reconciliation for Project AJAH"
        actions={
          <>
            <GhostButton onClick={handleExport}>
              <Download className="size-4" /> Export Report
            </GhostButton>
            <GhostButton onClick={() => showToast("FY 2025-26 active.", "info")}>
              <CalendarDays className="size-4" /> FY 2025-26
            </GhostButton>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-xl border border-line bg-white p-5 shadow-xs">
            <div className="flex items-center gap-3">
              <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${k.tint}`}>
                <k.icon className="size-5" strokeWidth={1.75} />
              </span>
              <p className="text-[13px] font-medium text-muted">{k.label}</p>
            </div>
            <p className="mt-3 text-[24px] font-bold tracking-tight text-brand-charcoal">{k.value}</p>
            <p className="mt-1 text-xs text-muted">{k.sub}</p>
          </div>
        ))}
      </div>

      <Tabs
        tabs={[
          { label: "All Ledgers", count: rows.length },
          { label: "Receipts", count: rows.filter((r) => r.type === "Receipt").length },
          { label: "Expenses", count: rows.filter((r) => r.type === "Expense").length },
          { label: "Commitments", count: rows.filter((r) => r.type === "Commitment").length },
          { label: "Advances", count: rows.filter((r) => r.type === "Advance").length },
        ]}
        activeTab={activeTab}
        onChange={(t) => {
          setActiveTab(t);
          setCurrentPage(1);
        }}
      />

      <FilterBar>
        <SearchInput
          placeholder="Search by reference, party, Shed ID or allocation..."
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label="Verification"
          value={verifyFilter}
          options={["All Status", "Verified", "Pending", "Approved"]}
          onChange={(val) => {
            setVerifyFilter(val);
            setCurrentPage(1);
          }}
        />
        {(search || activeTab !== "All Ledgers" || verifyFilter !== "All Status") && (
          <GhostButton onClick={resetFilters} className="text-xs">
            Reset Filters
          </GhostButton>
        )}
      </FilterBar>

      <Card padded={false}>
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Displaying {filtered.length} of {rows.length} Ledger Entries
          </p>
          <GhostButton onClick={() => showToast("Ledger view configured.", "info")} className="h-8 px-2 text-xs">
            <SlidersHorizontal className="size-3.5" /> Columns
          </GhostButton>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No ledger entries found"
            description="No financial transactions match your current search and filters."
            onReset={resetFilters}
          />
        ) : (
          <>
            <TableWrap>
              <table className="w-full min-w-[960px] text-[13px]">
                <thead>
                  <tr className="border-b border-line text-left text-xs font-semibold text-muted">
                    <th className="py-2.5 pl-5 pr-3">Date</th>
                    <Th>Type</Th>
                    <Th>Reference</Th>
                    <Th>Party / Vendor</Th>
                    <Th>Shed ID</Th>
                    <Th right>Amount (₹)</Th>
                    <Th>Allocation</Th>
                    <Th>Verification</Th>
                    <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {paginatedRows.map((r, i) => (
                    <tr key={i} className="transition hover:bg-brand-cream/50">
                      <td className="py-3 pl-5 pr-3 whitespace-nowrap text-muted">{r.date}</td>
                      <td className="py-3 pr-3">
                        <Chip tone={r.typeTone}>{r.type}</Chip>
                      </td>
                      <td className="py-3 pr-3 font-semibold text-brand-green">{r.ref}</td>
                      <td className="py-3 pr-3 font-medium text-brand-charcoal">{r.party}</td>
                      <td className="py-3 pr-3 text-muted">{r.shed}</td>
                      <td className="py-3 pr-3 text-right font-bold text-brand-charcoal">
                        {r.amount}
                      </td>
                      <td className="py-3 pr-3 text-muted">{r.allocation}</td>
                      <td className="py-3 pr-3">
                        <Chip tone={r.vTone} dot>{r.verify}</Chip>
                      </td>
                      <td className="py-3 pr-5 text-right">
                        {r.verify === "Pending" ? (
                          <button
                            type="button"
                            onClick={() => setSelectedTx(r)}
                            className="inline-flex items-center gap-1 rounded-md bg-brand-green/10 px-2.5 py-1 text-xs font-semibold text-brand-leaf hover:bg-brand-green hover:text-white transition"
                          >
                            <CheckCircle2 className="size-3.5" /> Verify UTR
                          </button>
                        ) : (
                          <span className="text-xs text-muted">Confirmed</span>
                        )}
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

      <VerifyTransactionModal
        receipt={selectedTx ? {
          id: selectedTx.ref,
          beneficiary: selectedTx.party,
          shed: selectedTx.shed,
          amount: `₹ ${selectedTx.amount}`,
          bankRef: "Pending",
          date: selectedTx.date,
          category: selectedTx.type as "Beneficiary Deposit",
          verified: false,
        } : null}
        onClose={() => setSelectedTx(null)}
        onConfirm={(rec, utr) => {
          if (selectedTx) handleVerifyConfirm(selectedTx, utr);
        }}
      />
    </div>
  );
}
