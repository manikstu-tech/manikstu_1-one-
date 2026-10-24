"use client";

import { useCallback, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { FileDropzone } from "@/components/ui/FileDropzone";
import type { DocumentRecord } from "@/types";
import type { AttachedFile } from "@/lib/file-utils";
import { formatBytes } from "@/lib/file-utils";
import { DOCUMENT_CATEGORIES } from "@/lib/mock-data/documents";

export interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (doc: DocumentRecord) => void;
}

export function UploadDocumentModal({
  isOpen,
  onClose,
  onUpload,
}: UploadDocumentModalProps) {
  const [docCategory, setDocCategory] = useState<DocumentRecord["category"]>(
    "KYC & Identity"
  );
  const [docShed, setDocShed] = useState("SH-000123");
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const doneFiles = attachedFiles.filter((f) => f.status === "done");
  const hasUploading = attachedFiles.some((f) => f.status === "uploading");
  const canSubmit = doneFiles.length > 0 && !hasUploading && !submitting;

  const handleClose = useCallback(() => {
    if (hasUploading) return; // prevent close mid-upload
    setAttachedFiles([]);
    setDocCategory("KYC & Identity");
    setDocShed("SH-000123");
    onClose();
  }, [hasUploading, onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);

    // Emit one DocumentRecord per uploaded file
    for (const af of doneFiles) {
      const name = af.file.name;

      onUpload({
        id: `DOC-${String(Math.floor(100 + Math.random() * 900)).padStart(4, "0")}`,
        name,
        category: docCategory,
        shed: docShed.trim() || "SH-000123",
        uploadedBy: "Aftab Khan",
        date: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        size: formatBytes(af.file.size),
        status: "Pending",
      });
    }

    setSubmitting(false);
    handleClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Upload Document / Evidence"
      subtitle="Attach field photos, signed agreements, KYC files, or deposit slips"
      maxWidth="max-w-lg"
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            disabled={hasUploading}
            className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="upload-doc-form"
            disabled={!canSubmit}
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-leaf disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Saving…"
              : doneFiles.length > 1
              ? `Attach ${doneFiles.length} Files`
              : "Attach File"}
          </button>
        </>
      }
    >
      <form
        id="upload-doc-form"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* File Dropzone */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-brand-charcoal">
            Select Files <span className="text-brand-red">*</span>
          </label>
          <FileDropzone
            config="document"
            onChange={setAttachedFiles}
            value={attachedFiles}
            disabled={submitting}
          />
        </div>

        {/* Classification */}
        <div>
          <label
            htmlFor="doc-category"
            className="block text-xs font-semibold text-brand-charcoal"
          >
            Document Classification
          </label>
          <select
            id="doc-category"
            value={docCategory}
            onChange={(e) =>
              setDocCategory(e.target.value as DocumentRecord["category"])
            }
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          >
            {DOCUMENT_CATEGORIES.filter((c) => c !== "All Documents").map(
              (c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              )
            )}
          </select>
        </div>

        {/* Linked Shed */}
        <div>
          <label
            htmlFor="doc-shed"
            className="block text-xs font-semibold text-brand-charcoal"
          >
            Linked Permanent Shed ID
          </label>
          <input
            id="doc-shed"
            type="text"
            value={docShed}
            placeholder="e.g. SH-000123"
            onChange={(e) => setDocShed(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          />
        </div>

        {/* Status hint */}
        {hasUploading && (
          <p className="rounded-lg bg-success-bg/60 px-3 py-2 text-xs text-brand-leaf">
            Files are uploading — please wait before submitting.
          </p>
        )}
      </form>
    </Modal>
  );
}
