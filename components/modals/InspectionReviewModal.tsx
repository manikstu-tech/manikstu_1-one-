"use client";

import { Modal } from "@/components/ui/Modal";
import { Chip } from "@/components/ui/Chip";
import { Camera, Check, CircleX } from "lucide-react";
import type { InspectionRecord } from "@/types";
import { INSPECTION_CHECKLIST } from "@/lib/mock-data/inspections";

export interface InspectionReviewModalProps {
  inspection: InspectionRecord | null;
  onClose: () => void;
  onApprove: (item: InspectionRecord) => void;
  onRequestCorrection: (item: InspectionRecord) => void;
}

export function InspectionReviewModal({
  inspection,
  onClose,
  onApprove,
  onRequestCorrection,
}: InspectionReviewModalProps) {
  if (!inspection) return null;

  return (
    <Modal
      isOpen={!!inspection}
      onClose={onClose}
      title={`AVP Inspection Audit — ${inspection.id}`}
      subtitle={`Reviewing structural evidence for ${inspection.shed} (${inspection.beneficiary})`}
      maxWidth="max-w-2xl"
      footer={
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            onClick={() => onRequestCorrection(inspection)}
            className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-brand-red hover:bg-red-100"
          >
            <CircleX className="size-3.5" /> Request Defect Correction
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-semibold hover:bg-brand-cream"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onApprove(inspection)}
              className="flex items-center gap-1.5 rounded-lg bg-brand-green px-4 py-2 text-xs font-semibold text-white hover:bg-brand-leaf shadow-xs"
            >
              <Check className="size-3.5" /> Approve Inspection
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-line bg-brand-cream/50 p-3.5">
          <div>
            <p className="text-xs text-muted">Inspection Stage</p>
            <p className="text-base font-bold text-brand-charcoal">{inspection.stage}</p>
          </div>
          <div className="text-right">
            <Chip tone={inspection.tone} dot>{inspection.status}</Chip>
            <p className="mt-1 text-[11px] text-muted">Inspector: {inspection.inspector}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
            Submitted Field Photo Evidence (3 Geotagged captures)
          </p>
          <div className="grid grid-cols-3 gap-3">
            {["Foundation Column Plinth", "GI Welded Mesh Joint", "Roof Angle Slope"].map((caption) => (
              <div key={caption} className="rounded-xl border border-line bg-brand-cream/60 p-2 text-center">
                <div className="grid h-24 place-items-center rounded-lg bg-brand-deep/5 text-brand-leaf">
                  <Camera className="size-8" />
                </div>
                <p className="mt-1.5 text-[11px] font-semibold text-brand-charcoal truncate">
                  {caption}
                </p>
                <p className="text-[10px] text-muted">EXIF Geotag: 21.25°N, 81.62°E</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-line p-3.5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
            AVP Technical Compliance Checklist
          </p>
          <ul className="space-y-2 text-xs text-brand-charcoal">
            {INSPECTION_CHECKLIST.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="grid size-4 shrink-0 place-items-center rounded bg-brand-green/20 text-brand-leaf mt-0.5">
                  <Check className="size-3" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}

