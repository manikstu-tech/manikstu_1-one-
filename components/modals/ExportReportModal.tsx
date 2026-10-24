"use client";

import { Download } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: string;
  period?: string;
  onExport: (format: string) => void;
}

export function ExportReportModal({
  isOpen,
  onClose,
  project = "Project AJAH",
  period = "Current Period",
  onExport,
}: ExportReportModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Operational Report"
      subtitle={`Select format for ${project} (${period})`}
      maxWidth="max-w-md"
    >
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => onExport("PDF Executive Deck")}
          className="flex w-full items-center justify-between rounded-xl border border-line p-3.5 text-left transition hover:border-brand-green hover:bg-success-bg/30"
        >
          <div>
            <p className="font-bold text-sm text-brand-charcoal">PDF Executive Deck</p>
            <p className="text-xs text-muted">Formatted slide overview with KPIs and stage charts</p>
          </div>
          <Download className="size-4 text-brand-leaf" />
        </button>

        <button
          type="button"
          onClick={() => onExport("Excel Ledger Workbook")}
          className="flex w-full items-center justify-between rounded-xl border border-line p-3.5 text-left transition hover:border-brand-green hover:bg-success-bg/30"
        >
          <div>
            <p className="font-bold text-sm text-brand-charcoal">Excel Ledger Workbook (.xlsx)</p>
            <p className="text-xs text-muted">Complete tabular dump of sheds, materials and finance</p>
          </div>
          <Download className="size-4 text-brand-leaf" />
        </button>
      </div>
    </Modal>
  );
}

