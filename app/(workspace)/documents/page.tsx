"use client";

import { useState, useMemo } from "react";
import {
  Download,
  FileImage,
  FileText,
  SlidersHorizontal,
  Upload,
} from "lucide-react";
import {
  Breadcrumb,
  Card,
  Chip,
  EmptyState,
  FilterBar,
  FilterSelect,
  GhostButton,
  Modal,
  PageHeader,
  PaginationNote,
  PrimaryButton,
  SearchInput,
  Tabs,
  TableWrap,
  Th,
  useToast,
  type Tone,
} from "@/components/ui";
import { UploadDocumentModal } from "@/components/modals";
import type { DocumentRecord } from "@/types";
import { exportTableToCsv, downloadSampleDocument } from "@/lib/file-utils";

export interface DocItem {
  file: string;
  size: string;
  kind: "pdf" | "img";
  category: "Site Photos" | "Approvals" | "Receipts" | "Work Orders" | "KYC";
  shed: string;
  stage: string;
  stageTone: Tone;
  by: string;
  role: string;
  on: string;
  review: "Accepted" | "Pending" | "Correction Required";
  rTone: Tone;
}

const INITIAL_ROWS: DocItem[] = [
  { file: "plinth_completion_evidence.jpg", size: "3.2 MB · JPG", kind: "img", category: "Site Photos", shed: "SH-000123", stage: "Civil & Foundation", stageTone: "amber", by: "Manoj Singh", role: "AVP", on: "18-Mar-2026", review: "Accepted", rTone: "green" },
  { file: "structural_drawing_ref.pdf", size: "1.1 MB · PDF", kind: "pdf", category: "Work Orders", shed: "SH-000124", stage: "Structure & Roofing", stageTone: "blue", by: "Hemant Kumar", role: "Project Team", on: "17-Mar-2026", review: "Accepted", rTone: "green" },
  { file: "material_dispatch_photo.jpg", size: "2.7 MB · JPG", kind: "img", category: "Site Photos", shed: "SH-000124", stage: "Structure & Roofing", stageTone: "blue", by: "Kunti Sahu", role: "Site Supervisor", on: "17-Mar-2026", review: "Correction Required", rTone: "red" },
  { file: "work_order_approved.pdf", size: "845 KB · PDF", kind: "pdf", category: "Work Orders", shed: "SH-000117", stage: "Finishing", stageTone: "blue", by: "Aftab Khan", role: "Operations", on: "16-Mar-2026", review: "Accepted", rTone: "green" },
  { file: "site_front_view.jpg", size: "2.6 MB · JPG", kind: "img", category: "Site Photos", shed: "SH-000118", stage: "Site Assessment", stageTone: "green", by: "Jyoti Nirmal", role: "Field Executive", on: "16-Mar-2026", review: "Pending", rTone: "amber" },
  { file: "receipt_cement_invoice.jpg", size: "1.9 MB · JPG", kind: "img", category: "Receipts", shed: "SH-000118", stage: "Materials Received", stageTone: "amber", by: "Ramadhan Kurre", role: "Site Supervisor", on: "15-Mar-2026", review: "Accepted", rTone: "green" },
  { file: "quality_check_report.jpg", size: "2.1 MB · JPG", kind: "img", category: "Approvals", shed: "SH-000105", stage: "Finishing", stageTone: "blue", by: "Aruna Ekka", role: "Quality Team", on: "14-Mar-2026", review: "Pending", rTone: "amber" },
  { file: "kyc_bank_passbook.pdf", size: "1.4 MB · PDF", kind: "pdf", category: "KYC", shed: "SH-000109", stage: "Beneficiary KYC", stageTone: "blue", by: "Ramesh Kumar", role: "Site Supervisor", on: "13-Mar-2026", review: "Accepted", rTone: "green" },
  { file: "avp_handover_report.pdf", size: "2.3 MB · PDF", kind: "pdf", category: "Approvals", shed: "SH-000101", stage: "AVP Inspection", stageTone: "amber", by: "Manoj Singh", role: "AVP", on: "11-Mar-2026", review: "Correction Required", rTone: "red" },
];

const REVIEWS = ["All Review Status", "Accepted", "Pending", "Correction Required"];

export default function DocumentsPage() {
  const { showToast } = useToast();
  const [rows, setRows] = useState<DocItem[]>(INITIAL_ROWS);
  const [activeTab, setActiveTab] = useState("All Documents");
  const [search, setSearch] = useState("");
  const [reviewFilter, setReviewFilter] = useState("All Review Status");

  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchTab =
        activeTab === "All Documents" || r.category === activeTab;

      const matchSearch =
        search.trim() === "" ||
        r.file.toLowerCase().includes(search.toLowerCase()) ||
        r.shed.toLowerCase().includes(search.toLowerCase()) ||
        r.stage.toLowerCase().includes(search.toLowerCase()) ||
        r.by.toLowerCase().includes(search.toLowerCase());

      const matchReview =
        reviewFilter === "All Review Status" || r.review === reviewFilter;

      return matchTab && matchSearch && matchReview;
    });
  }, [rows, activeTab, search, reviewFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginatedRows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function resetFilters() {
    setSearch("");
    setActiveTab("All Documents");
    setReviewFilter("All Review Status");
    setCurrentPage(1);
    showToast("Document filters reset to default.", "info");
  }

  function handleUploadDoc(doc: DocumentRecord) {
    const isPdf = doc.name.toLowerCase().endsWith(".pdf");
    const categoryMap: Record<string, DocItem["category"]> = {
      "KYC & Identity": "KYC",
      "Consent Form": "Approvals",
      "Bank Deposit Slip": "Receipts",
      "Site Inspection Photo": "Site Photos",
      "Work Order Copy": "Work Orders",
      "Handover Certificate": "Approvals",
    };
    const mappedCategory = categoryMap[doc.category] || "Site Photos";

    const newEntry: DocItem = {
      file: doc.name,
      size: `${doc.size} · ${isPdf ? "PDF" : "JPG"}`,
      kind: isPdf ? "pdf" : "img",
      category: mappedCategory,
      shed: doc.shed,
      stage: "Civil & Foundation",
      stageTone: "amber",
      by: doc.uploadedBy || "Aftab Khan",
      role: "Operations Manager",
      on: doc.date || "Today",
      review: "Accepted",
      rTone: "green",
    };

    setRows((prev) => [newEntry, ...prev]);
    showToast(`Uploaded ${doc.name} successfully linked to ${doc.shed}!`, "success");
  }

  function handleExportIndex() {
    exportTableToCsv("Manikstu_Documents_Index.csv", [
      { header: "File Name", key: "file" },
      { header: "Category", key: "category" },
      { header: "Linked Shed ID", key: "shed" },
      { header: "Stage", key: "stage" },
      { header: "Uploaded By", key: "by" },
      { header: "Role", key: "role" },
      { header: "Upload Date", key: "on" },
      { header: "File Size", key: "size" },
      { header: "Review Status", key: "review" },
    ], filtered);
    showToast(`Exported ${filtered.length} document references to CSV.`, "success");
  }

  function handleReviewAction(doc: DocItem, reviewState: "Accepted" | "Correction Required") {
    const rTone: Tone = reviewState === "Accepted" ? "green" : "red";
    setRows((prev) =>
      prev.map((r) =>
        r.file === doc.file ? { ...r, review: reviewState, rTone } : r
      )
    );
    setSelectedDoc(null);
    showToast(
      reviewState === "Accepted"
        ? `Document ${doc.file} accepted.`
        : `Correction notice flagged for ${doc.file}.`,
      reviewState === "Accepted" ? "success" : "warning"
    );
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={["Documents", "Repository"]} />
      <PageHeader
        title="Documents & Evidence"
        subtitle="Manage KYC records, site photos, work orders and inspection reports for Project AJAH"
        actions={
          <>
            <GhostButton onClick={handleExportIndex}>
              <Download className="size-4" /> Export Index
            </GhostButton>
            <PrimaryButton onClick={() => setShowUploadModal(true)}>
              <Upload className="size-4" /> Upload Document
            </PrimaryButton>
          </>
        }
      />

      <Tabs
        tabs={[
          { label: "All Documents", count: rows.length },
          { label: "Site Photos", count: rows.filter((r) => r.category === "Site Photos").length },
          { label: "Approvals", count: rows.filter((r) => r.category === "Approvals").length },
          { label: "Receipts", count: rows.filter((r) => r.category === "Receipts").length },
          { label: "Work Orders", count: rows.filter((r) => r.category === "Work Orders").length },
          { label: "KYC", count: rows.filter((r) => r.category === "KYC").length },
        ]}
        activeTab={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          setCurrentPage(1);
        }}
      />

      <FilterBar>
        <SearchInput
          placeholder="Search by file name, Shed ID, stage or uploaded by..."
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label="Review Status"
          value={reviewFilter}
          options={REVIEWS}
          onChange={(val) => {
            setReviewFilter(val);
            setCurrentPage(1);
          }}
        />
        {(search || activeTab !== "All Documents" || reviewFilter !== "All Review Status") && (
          <GhostButton onClick={resetFilters} className="text-xs">
            Reset Filters
          </GhostButton>
        )}
      </FilterBar>

      <Card padded={false}>
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Displaying {filtered.length} of {rows.length} Files
          </p>
          <GhostButton onClick={() => showToast("Document view configured.", "info")} className="h-8 px-2 text-xs">
            <SlidersHorizontal className="size-3.5" /> Columns
          </GhostButton>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No documents found"
            description="No files match your current category and search query."
            onReset={resetFilters}
          />
        ) : (
          <>
            <TableWrap>
              <table className="w-full min-w-[960px] text-[13px]">
                <thead>
                  <tr className="border-b border-line text-left text-xs font-semibold text-muted">
                    <th className="py-2.5 pl-5 pr-3">File Name</th>
                    <Th>Category</Th>
                    <Th>Shed ID</Th>
                    <Th>Stage</Th>
                    <Th>Uploaded By</Th>
                    <Th>Date</Th>
                    <Th>Review Status</Th>
                    <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {paginatedRows.map((r, i) => (
                    <tr
                      key={i}
                      onClick={() => setSelectedDoc(r)}
                      className="cursor-pointer transition hover:bg-brand-cream/50"
                    >
                      <td className="py-3 pl-5 pr-3">
                        <div className="flex items-center gap-2.5">
                          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-cream text-muted">
                            {r.kind === "pdf" ? (
                              <FileText className="size-4 text-brand-leaf" />
                            ) : (
                              <FileImage className="size-4 text-brand-green" />
                            )}
                          </span>
                          <div>
                            <p className="font-semibold text-brand-charcoal hover:underline">{r.file}</p>
                            <p className="text-xs text-muted">{r.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-3 text-muted">{r.category}</td>
                      <td className="py-3 pr-3 font-semibold text-brand-green">{r.shed}</td>
                      <td className="py-3 pr-3">
                        <Chip tone={r.stageTone}>{r.stage}</Chip>
                      </td>
                      <td className="py-3 pr-3">
                        <p className="font-medium text-brand-charcoal">{r.by}</p>
                        <p className="text-xs text-muted">{r.role}</p>
                      </td>
                      <td className="py-3 pr-3 whitespace-nowrap text-muted">{r.on}</td>
                      <td className="py-3 pr-3">
                        <Chip tone={r.rTone} dot>{r.review}</Chip>
                      </td>
                      <td className="py-3 pr-5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDoc(r);
                          }}
                          className="rounded-md bg-brand-green/10 px-2.5 py-1 text-xs font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
                        >
                          Review
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

      {/* Review Dialog */}
      {selectedDoc && (
        <Modal
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
          title={`Document Review — ${selectedDoc.file}`}
          subtitle={`Evidence for ${selectedDoc.shed} (${selectedDoc.stage})`}
          maxWidth="max-w-md"
          footer={
            <div className="flex w-full items-center justify-between">
              <button
                type="button"
                onClick={() => handleReviewAction(selectedDoc, "Correction Required")}
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-brand-red hover:bg-red-100"
              >
                Flag for Correction
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => downloadSampleDocument(selectedDoc.file)}
                  className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-brand-charcoal hover:bg-brand-cream"
                >
                  <Download className="size-3.5" /> Download
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-medium hover:bg-brand-cream"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleReviewAction(selectedDoc, "Accepted")}
                  className="rounded-lg bg-brand-green px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-leaf shadow-xs"
                >
                  Accept Document
                </button>
              </div>
            </div>
          }
        >
          <div className="space-y-3">
            <div className="rounded-xl border border-line bg-brand-cream/60 p-4 text-center">
              <FileText className="mx-auto size-10 text-brand-leaf" />
              <p className="mt-2 text-sm font-bold text-brand-charcoal">{selectedDoc.file}</p>
              <p className="text-xs text-muted">{selectedDoc.size} · Uploaded by {selectedDoc.by}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg border border-line p-2.5">
                <p className="text-muted">Classification</p>
                <p className="font-semibold text-brand-charcoal mt-0.5">{selectedDoc.category}</p>
              </div>
              <div className="rounded-lg border border-line p-2.5">
                <p className="text-muted">Linked Shed ID</p>
                <p className="font-semibold text-brand-green mt-0.5">{selectedDoc.shed}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <UploadDocumentModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUploadDoc}
      />
    </div>
  );
}
