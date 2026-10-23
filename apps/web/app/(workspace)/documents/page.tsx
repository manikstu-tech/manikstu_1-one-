import {
  Download,
  FileImage,
  FileText,
  MoreVertical,
  SlidersHorizontal,
  Upload,
} from "lucide-react";
import {
  Breadcrumb,
  Card,
  Chip,
  FilterBar,
  FilterSelect,
  GhostButton,
  PageHeader,
  PaginationNote,
  PrimaryButton,
  SearchInput,
  Tabs,
  TableWrap,
  Th,
  type Tone,
} from "../_components";

const ROWS: {
  file: string;
  size: string;
  kind: "img" | "pdf";
  shed: string;
  stage: string;
  stageTone: Tone;
  by: string;
  role: string;
  on: string;
  review: string;
  rTone: Tone;
}[] = [
  { file: "foundation.jpg", size: "2.4 MB · JPG", kind: "img", shed: "SH-000123", stage: "Civil & Foundation", stageTone: "amber", by: "Ramesh Kumar", role: "Site Supervisor", on: "18-Mar-2026", review: "Pending", rTone: "amber" },
  { file: "kya_photo.jpg", size: "1.8 MB · JPG", kind: "img", shed: "SH-000123", stage: "Civil & Foundation", stageTone: "amber", by: "Manoj Singh", role: "AVP", on: "18-Mar-2026", review: "Accepted", rTone: "green" },
  { file: "drawing_ref.pdf", size: "1.1 MB · PDF", kind: "pdf", shed: "SH-000124", stage: "Structure & Roofing", stageTone: "blue", by: "Hemant Kumar", role: "Project Team", on: "17-Mar-2026", review: "Accepted", rTone: "green" },
  { file: "material_photo.jpg", size: "2.7 MB · JPG", kind: "img", shed: "SH-000124", stage: "Structure & Roofing", stageTone: "blue", by: "Kunti Sahu", role: "Site Supervisor", on: "17-Mar-2026", review: "Correction Required", rTone: "red" },
  { file: "work_order.pdf", size: "845 KB · PDF", kind: "pdf", shed: "SH-000117", stage: "Finishing", stageTone: "blue", by: "Aftab Khan", role: "Operations", on: "16-Mar-2026", review: "Accepted", rTone: "green" },
  { file: "site_front.jpg", size: "2.6 MB · JPG", kind: "img", shed: "SH-000118", stage: "Site Assessment", stageTone: "green", by: "Jyoti Nirmal", role: "Field Executive", on: "16-Mar-2026", review: "Pending", rTone: "amber" },
  { file: "receipt_cement.jpg", size: "1.9 MB · JPG", kind: "img", shed: "SH-000118", stage: "Materials Received", stageTone: "amber", by: "Ramadhan Kurre", role: "Site Supervisor", on: "15-Mar-2026", review: "Accepted", rTone: "green" },
  { file: "quality_check.jpg", size: "2.1 MB · JPG", kind: "img", shed: "SH-000105", stage: "Finishing", stageTone: "blue", by: "Aruna Ekka", role: "Quality Team", on: "14-Mar-2026", review: "Pending", rTone: "amber" },
  { file: "kyc_document.pdf", size: "1.4 MB · PDF", kind: "pdf", shed: "SH-000109", stage: "Beneficiary KYC", stageTone: "blue", by: "Ramesh Kumar", role: "Site Supervisor", on: "13-Mar-2026", review: "Accepted", rTone: "green" },
  { file: "avp_report.pdf", size: "2.3 MB · PDF", kind: "pdf", shed: "SH-000101", stage: "AVP Inspection", stageTone: "amber", by: "Manoj Singh", role: "AVP", on: "11-Mar-2026", review: "Correction Required", rTone: "red" },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={["Documents", "All Documents"]} />
      <PageHeader
        title="Documents & Evidence"
        subtitle="Manage site photos, documents and evidence with review status"
        actions={
          <>
            <PrimaryButton>
              <Upload className="size-4" /> Upload Document
            </PrimaryButton>
            <GhostButton>
              <SlidersHorizontal className="size-4" /> Filters
            </GhostButton>
            <GhostButton>
              <Download className="size-4" /> Export
            </GhostButton>
          </>
        }
      />

      <Tabs
        tabs={[
          { label: "All Documents", count: 128, active: true },
          { label: "Site Photos", count: 46 },
          { label: "Approvals", count: 18 },
          { label: "Receipts", count: 21 },
          { label: "Work Orders", count: 12 },
          { label: "KYC", count: 15 },
          { label: "Other", count: 16 },
        ]}
      />

      <FilterBar>
        <SearchInput placeholder="Search documents..." />
        <FilterSelect label="All Types" />
        <FilterSelect label="All Stages" />
        <FilterSelect label="All Review Status" />
      </FilterBar>

      <Card padded={false}>
        <TableWrap>
          <table className="w-full min-w-[920px] text-[13px]">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="py-2.5 pl-5 pr-3 font-medium">#</th>
                <Th>File Name</Th>
                <Th>Shed ID</Th>
                <Th>Stage</Th>
                <Th>Uploaded By</Th>
                <Th>Uploaded On</Th>
                <Th>Upload Status</Th>
                <Th>Review Status</Th>
                <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {ROWS.map((r, i) => (
                <tr key={i} className="hover:bg-brand-cream/40">
                  <td className="py-3 pl-5 pr-3 text-muted">{i + 1}</td>
                  <td className="py-3 pr-3">
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-lg ${
                          r.kind === "img" ? "bg-success-bg text-brand-leaf" : "bg-red-50 text-brand-red"
                        }`}
                      >
                        {r.kind === "img" ? (
                          <FileImage className="size-5" strokeWidth={1.75} />
                        ) : (
                          <FileText className="size-5" strokeWidth={1.75} />
                        )}
                      </span>
                      <span>
                        <span className="block font-medium">{r.file}</span>
                        <span className="block text-xs text-muted">{r.size}</span>
                      </span>
                    </span>
                  </td>
                  <td className="py-3 pr-3 font-semibold text-brand-green">{r.shed}</td>
                  <td className="py-3 pr-3">
                    <Chip tone={r.stageTone} dot>
                      {r.stage}
                    </Chip>
                  </td>
                  <td className="py-3 pr-3">
                    <p className="font-medium">{r.by}</p>
                    <p className="text-xs text-muted">{r.role}</p>
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap">{r.on}</td>
                  <td className="py-3 pr-3">
                    <Chip tone="green">Uploaded</Chip>
                  </td>
                  <td className="py-3 pr-3">
                    <Chip tone={r.rTone}>{r.review}</Chip>
                  </td>
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
          <PaginationNote>Showing 1 to 10 of 128 documents (illustrative data)</PaginationNote>
        </div>
      </Card>
    </div>
  );
}
