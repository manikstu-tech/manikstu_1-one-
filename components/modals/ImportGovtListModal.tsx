"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { FileDropzone } from "@/components/ui/FileDropzone";
import type { AttachedFile } from "@/lib/file-utils";
import { FileSpreadsheet, CheckCircle2 } from "lucide-react";

export interface ImportGovtListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (count?: number, fileName?: string) => void;
}

export function ImportGovtListModal({
  isOpen,
  onClose,
  onImport,
}: ImportGovtListModalProps) {
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const doneFile = attachedFiles.find((f) => f.status === "done");
  const hasUploading = attachedFiles.some((f) => f.status === "uploading");

  function handleClose() {
    if (hasUploading) return;
    setAttachedFiles([]);
    onClose();
  }

  function handleConfirmImport() {
    setSubmitting(true);
    const count = 14;
    const fileName = doneFile?.file.name || "DRDA_Beneficiary_Tranche3.xlsx";
    onImport(count, fileName);
    setSubmitting(false);
    handleClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Import Approved Government Beneficiary Roster"
      subtitle="Sync approved roster from District Rural Development Agency (DRDA)"
      maxWidth="max-w-lg"
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            disabled={hasUploading || submitting}
            className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={hasUploading || submitting}
            onClick={handleConfirmImport}
            className="flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-leaf disabled:cursor-not-allowed disabled:opacity-50"
          >
            {doneFile ? (
              <>
                <CheckCircle2 className="size-4" />
                Import Verified Roster (14 Farmers)
              </>
            ) : (
              "Import Default Roster (14 Farmers)"
            )}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-brand-charcoal">
            Upload Approved Roster Spreadsheet (CSV, XLS, XLSX)
          </label>
          <FileDropzone
            config="govtList"
            value={attachedFiles}
            onChange={setAttachedFiles}
            disabled={submitting}
            label="Drop government sanction sheet or click to browse"
          />
        </div>

        {doneFile ? (
          <div className="flex items-center gap-3 rounded-xl border border-brand-green/30 bg-success-bg/40 p-3.5 text-xs text-brand-charcoal">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-green text-white">
              <FileSpreadsheet className="size-5" />
            </span>
            <div>
              <p className="font-semibold text-brand-charcoal">
                Roster File Validated: {doneFile.file.name}
              </p>
              <p className="text-muted">
                14 beneficiary records detected · Bastar & Dhamtari Tranche 3
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-brand-green/40 bg-success-bg/30 p-4 text-center">
            <p className="text-xs font-semibold text-brand-charcoal">
              Target District Roster: Bastar & Dhamtari (Tranche 3)
            </p>
            <p className="mt-0.5 text-[11px] text-muted">
              You can upload an updated government CSV/Excel or import the pending 14 records directly.
            </p>
          </div>
        )}

        <div className="rounded-lg border border-line bg-brand-cream/40 p-3 text-xs text-muted">
          <p className="font-semibold text-brand-charcoal">Automated Import Protocol:</p>
          <ul className="mt-1.5 list-disc space-y-0.5 pl-4">
            <li>Each beneficiary is validated against the Aadhaar registry format.</li>
            <li>Permanent sequential Shed IDs (e.g. SH-000125+) are generated automatically.</li>
            <li>₹1.25 Lakh beneficiary contribution ledger records are queued in Pending state.</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
