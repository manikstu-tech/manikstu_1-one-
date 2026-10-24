"use client";

import { useState, useMemo } from "react";
import {
  CircleCheck,
  Clock,
  Download,
  House,
  Plus,
  ReceiptIndianRupee,
  SlidersHorizontal,
  Users,
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
  useToast,
  type Tone,
} from "@/components/ui";
import {
  NewBeneficiaryModal,
  BeneficiaryDetailsModal,
  type NewBeneficiaryData,
  type BeneficiaryDisplayItem,
} from "@/components/modals";
import { exportTableToCsv } from "@/lib/file-utils";

const KPIS = [
  { icon: House, tint: "bg-success-bg text-brand-leaf", label: "Total Beneficiaries", value: "545", sub: "↑ 12% vs previous month" },
  { icon: CircleCheck, tint: "bg-success-bg text-brand-leaf", label: "Verified", value: "412", sub: "75.6%" },
  { icon: Users, tint: "bg-success-bg text-brand-leaf", label: "Consent Completed", value: "498", sub: "91.4%" },
  { icon: ReceiptIndianRupee, tint: "bg-amber-50 text-brand-gold", label: "Contribution Received", value: "312", sub: "57.2%" },
  { icon: Clock, tint: "bg-amber-50 text-brand-gold", label: "Pending Verification", value: "88", sub: "16.1%", subTone: "muted" as const },
];

export type V = { label: string; tone: Tone; note?: string };

export interface BeneficiaryItem {
  name: string;
  shed: string;
  village: string;
  ref: string;
  verification: V;
  consent: V;
  contribution: V;
}

const INITIAL_ROWS: BeneficiaryItem[] = [
  { name: "Savitri Bai Sahu", shed: "SH-000123", village: "Kundagaon, Raipur", ref: "APICOL-2026-0012", verification: { label: "Verified", tone: "green", note: "15-Mar-2026" }, consent: { label: "Consented", tone: "green", note: "12-Mar-2026" }, contribution: { label: "₹1,25,000", tone: "green", note: "Verified" } },
  { name: "Laxmi Soni", shed: "SH-000118", village: "Atari, Dhamtari", ref: "APICOL-2026-0045", verification: { label: "Verified", tone: "green", note: "10-Mar-2026" }, consent: { label: "Consented", tone: "green", note: "09-Mar-2026" }, contribution: { label: "₹1,25,000", tone: "amber", note: "Pending" } },
  { name: "Mangal Ram", shed: "SH-000110", village: "Dhamtari", ref: "APICOL-2026-0067", verification: { label: "Pending", tone: "amber", note: "—" }, consent: { label: "Consented", tone: "green", note: "11-Mar-2026" }, contribution: { label: "Not Received", tone: "red", note: "—" } },
  { name: "Rekha Patel", shed: "SH-000092", village: "Kumhari, Raipur", ref: "APICOL-2026-0098", verification: { label: "Verified", tone: "green", note: "08-Mar-2026" }, consent: { label: "Not Contacted", tone: "red", note: "—" }, contribution: { label: "₹1,25,000", tone: "amber", note: "Unverified" } },
  { name: "Suresh Verma", shed: "SH-000076", village: "Arang, Raipur", ref: "APICOL-2026-0112", verification: { label: "Pending", tone: "amber", note: "—" }, consent: { label: "Consented", tone: "green", note: "14-Mar-2026" }, contribution: { label: "Not Received", tone: "red", note: "—" } },
  { name: "Kamla Devi", shed: "SH-000064", village: "Tilda, Raipur", ref: "APICOL-2026-0133", verification: { label: "Verified", tone: "green", note: "12-Mar-2026" }, consent: { label: "Consented", tone: "green", note: "10-Mar-2026" }, contribution: { label: "₹1,25,000", tone: "green", note: "Verified" } },
  { name: "Ramesh Nishad", shed: "SH-000051", village: "Mandir Hasaud, Raipur", ref: "APICOL-2026-0147", verification: { label: "Verified", tone: "green", note: "09-Mar-2026" }, consent: { label: "Consented", tone: "green", note: "08-Mar-2026" }, contribution: { label: "₹1,00,000", tone: "amber", note: "Partial" } },
  { name: "Gita Sahu", shed: "SH-000049", village: "Simga, Baloda Bazar", ref: "APICOL-2026-0160", verification: { label: "Pending", tone: "amber", note: "—" }, consent: { label: "Not Contacted", tone: "red", note: "—" }, contribution: { label: "Not Received", tone: "red", note: "—" } },
  { name: "Devki Bai", shed: "SH-000045", village: "Siltara, Raipur", ref: "APICOL-2026-0178", verification: { label: "Verified", tone: "green", note: "06-Mar-2026" }, consent: { label: "Consented", tone: "green", note: "07-Mar-2026" }, contribution: { label: "₹1,25,000", tone: "green", note: "Verified" } },
  { name: "Bhujbal Singh", shed: "SH-000031", village: "Kharora, Raipur", ref: "APICOL-2026-0190", verification: { label: "Pending", tone: "amber", note: "—" }, consent: { label: "Consented", tone: "green", note: "05-Mar-2026" }, contribution: { label: "₹1,25,000", tone: "amber", note: "Pending" } },
];

const VERIFICATION_OPTIONS = ["All Verification", "Verified", "Pending"];
const VILLAGES = ["All Villages", "Raipur", "Dhamtari", "Baloda Bazar", "Kundagaon", "Atari", "Kumhari", "Arang"];
const CONSENT_OPTIONS = ["All Consent", "Consented", "Not Contacted"];

export default function BeneficiariesPage() {
  const { showToast } = useToast();
  const [rows, setRows] = useState<BeneficiaryItem[]>(INITIAL_ROWS);
  const [search, setSearch] = useState("");
  const [verifyFilter, setVerifyFilter] = useState("All Verification");
  const [villageFilter, setVillageFilter] = useState("All Villages");
  const [consentFilter, setConsentFilter] = useState("All Consent");

  const [selectedBene, setSelectedBene] = useState<BeneficiaryItem | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchSearch =
        search.trim() === "" ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.shed.toLowerCase().includes(search.toLowerCase()) ||
        r.village.toLowerCase().includes(search.toLowerCase()) ||
        r.ref.toLowerCase().includes(search.toLowerCase());

      const matchVerify =
        verifyFilter === "All Verification" ||
        r.verification.label === verifyFilter;

      const matchVillage =
        villageFilter === "All Villages" ||
        r.village.toLowerCase().includes(villageFilter.toLowerCase());

      const matchConsent =
        consentFilter === "All Consent" ||
        r.consent.label === consentFilter;

      return matchSearch && matchVerify && matchVillage && matchConsent;
    });
  }, [rows, search, verifyFilter, villageFilter, consentFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginatedRows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function resetFilters() {
    setSearch("");
    setVerifyFilter("All Verification");
    setVillageFilter("All Villages");
    setConsentFilter("All Consent");
    setCurrentPage(1);
    showToast("Filters reset to default view.", "info");
  }

  function handleCreateBeneficiary(data: NewBeneficiaryData) {
    const newShedId = `SH-000${rows.length + 125}`;
    const newEntry: BeneficiaryItem = {
      name: data.name,
      shed: newShedId,
      village: data.village,
      ref: data.ref || `APICOL-2026-0${rows.length + 200}`,
      verification: { label: "Pending", tone: "amber", note: "Under review" },
      consent: data.consent
        ? { label: "Consented", tone: "green", note: "Today" }
        : { label: "Not Contacted", tone: "red", note: "—" },
      contribution: { label: "₹1,25,000", tone: "amber", note: "Pending" },
    };

    setRows((prev) => [newEntry, ...prev]);
    showToast(`Beneficiary ${data.name} added and linked to ${newShedId}!`, "success");
  }

  function handleConfirmConsent(bene: BeneficiaryDisplayItem) {
    setRows((prev) =>
      prev.map((r) =>
        r.name === bene.name
          ? {
              ...r,
              consent: { label: "Consented", tone: "green", note: "Verified today" },
            }
          : r
      )
    );
    setSelectedBene(null);
    showToast(`Consent recorded for ${bene.name}.`, "success");
  }

  function handleExport() {
    exportTableToCsv("Manikstu_Beneficiaries_Roster.csv", [
      { header: "Beneficiary Name", key: "name" },
      { header: "Linked Shed ID", key: "shed" },
      { header: "Village & District", key: "village" },
      { header: "Govt Reference No.", key: "ref" },
      { header: "Aadhaar / KYC Status", key: (r) => r.verification.label },
      { header: "Consent Status", key: (r) => r.consent.label },
      { header: "Contribution Status", key: (r) => r.contribution.label },
    ], filtered);
    showToast(`Exported ${filtered.length} beneficiary records to CSV.`, "success");
  }

  const modalBeneData: BeneficiaryDisplayItem | null = selectedBene ? {
    id: selectedBene.ref,
    name: selectedBene.name,
    phone: "+91 98765 43210",
    village: selectedBene.village,
    shed: selectedBene.shed,
    verification: selectedBene.verification,
    consent: selectedBene.consent,
    contribution: selectedBene.contribution,
    assignedTo: "Ramesh Kumar (Supervisor)",
    date: selectedBene.verification.note || "15-Mar-2026",
    ref: selectedBene.ref,
  } : null;

  return (
    <div className="space-y-5">
      <Breadcrumb items={["Beneficiaries", "Intake Register"]} />
      <PageHeader
        title="Beneficiaries"
        subtitle="Manage and verify beneficiaries, consent, and contributions for Project AJAH"
        actions={
          <>
            <GhostButton onClick={handleExport}>
              <Download className="size-4" /> Export Roster
            </GhostButton>
            <PrimaryButton onClick={() => setShowNewModal(true)}>
              <Plus className="size-4" /> New Beneficiary
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
          placeholder="Search by beneficiary name, Shed ID, village or reference..."
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label="Verification"
          value={verifyFilter}
          options={VERIFICATION_OPTIONS}
          onChange={(val) => {
            setVerifyFilter(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label="Village"
          value={villageFilter}
          options={VILLAGES}
          onChange={(val) => {
            setVillageFilter(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label="Consent"
          value={consentFilter}
          options={CONSENT_OPTIONS}
          onChange={(val) => {
            setConsentFilter(val);
            setCurrentPage(1);
          }}
        />
        {(search || verifyFilter !== "All Verification" || villageFilter !== "All Villages" || consentFilter !== "All Consent") && (
          <GhostButton onClick={resetFilters} className="text-xs">
            Reset Filters
          </GhostButton>
        )}
      </FilterBar>

      <Card padded={false}>
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Displaying {filtered.length} of {rows.length} Beneficiaries
          </p>
          <GhostButton onClick={() => showToast("Custom columns configured.", "info")} className="h-8 px-2 text-xs">
            <SlidersHorizontal className="size-3.5" /> Columns
          </GhostButton>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No beneficiaries found"
            description="No beneficiary records match your search criteria. Try resetting your filters."
            onReset={resetFilters}
          />
        ) : (
          <>
            <TableWrap>
              <table className="w-full min-w-[960px] text-[13px]">
                <thead>
                  <tr className="border-b border-line text-left text-xs font-semibold text-muted">
                    <th className="py-2.5 pl-5 pr-3">#</th>
                    <Th>Beneficiary Name</Th>
                    <Th>Shed ID</Th>
                    <Th>Village</Th>
                    <Th>Govt Source Ref</Th>
                    <Th>Verification</Th>
                    <Th>Consent Call</Th>
                    <Th>₹1.25L Contribution</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {paginatedRows.map((r, i) => (
                    <tr
                      key={r.name}
                      onClick={() => setSelectedBene(r)}
                      className="cursor-pointer transition hover:bg-brand-cream/50"
                    >
                      <td className="py-3 pl-5 pr-3 text-muted">
                        {(currentPage - 1) * pageSize + i + 1}
                      </td>
                      <td className="py-3 pr-3 font-bold text-brand-charcoal hover:text-brand-green">
                        {r.name}
                      </td>
                      <td className="py-3 pr-3 font-semibold text-brand-green">{r.shed}</td>
                      <td className="py-3 pr-3 text-muted">{r.village}</td>
                      <td className="py-3 pr-3 font-mono text-xs text-muted">{r.ref}</td>
                      <td className="py-3 pr-3">
                        <Chip tone={r.verification.tone} dot>
                          {r.verification.label}
                        </Chip>
                      </td>
                      <td className="py-3 pr-3">
                        <Chip tone={r.consent.tone} dot>
                          {r.consent.label}
                        </Chip>
                      </td>
                      <td className="py-3 pr-3">
                        <Chip tone={r.contribution.tone}>
                          {r.contribution.label}
                        </Chip>
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

      <NewBeneficiaryModal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        onCreate={handleCreateBeneficiary}
      />

      <BeneficiaryDetailsModal
        beneficiary={modalBeneData}
        onClose={() => setSelectedBene(null)}
        onConfirmConsent={handleConfirmConsent}
      />
    </div>
  );
}
