"use client";

import { Modal } from "@/components/ui/Modal";
import { Chip } from "@/components/ui/Chip";
import { Progress } from "@/components/ui/Progress";
import { House, MapPin, Wallet } from "lucide-react";
import type { ShedRecord } from "@/types";

export interface ShedDrawerModalProps {
  shed: ShedRecord | null;
  onClose: () => void;
  onAdvanceStage?: (shed: ShedRecord) => void;
  onReportDefect?: (shed: ShedRecord) => void;
}

export function ShedDrawerModal({
  shed,
  onClose,
  onAdvanceStage,
  onReportDefect,
}: ShedDrawerModalProps) {
  if (!shed) return null;

  return (
    <Modal
      isOpen={!!shed}
      onClose={onClose}
      title={`Shed Overview — ${shed.shed}`}
      subtitle={`Permanent record for ${shed.beneficiary} (${shed.village})`}
      maxWidth="max-w-2xl"
      footer={
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            onClick={() => onReportDefect?.(shed)}
            className="rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-semibold text-brand-red hover:bg-red-50"
          >
            Report Defect / Delay
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-semibold hover:bg-brand-cream"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onAdvanceStage?.(shed)}
              className="rounded-lg bg-brand-green px-4 py-2 text-xs font-semibold text-white hover:bg-brand-leaf"
            >
              Advance Stage
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-line bg-brand-cream/60 p-4">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-xl bg-white text-brand-leaf shadow-xs">
              <House className="size-6" />
            </span>
            <div>
              <p className="text-base font-bold text-brand-charcoal">{shed.shed}</p>
              <p className="text-xs text-muted flex items-center gap-1">
                <MapPin className="size-3 text-muted" /> {shed.location}
              </p>
            </div>
          </div>
          <div className="text-right">
            <Chip tone={shed.tone} dot>{shed.stage}</Chip>
            <p className="mt-1 text-[11px] text-muted">Supervisor: {shed.owner}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-line p-3">
            <p className="text-xs text-muted">Beneficiary Contact</p>
            <p className="font-bold text-sm text-brand-charcoal mt-0.5">{shed.contact}</p>
            <p className="text-[11px] text-brand-leaf font-medium mt-1">KYC Verified</p>
          </div>
          <div className="rounded-xl border border-line p-3">
            <p className="text-xs text-muted">Contribution (₹1.25L)</p>
            <p className="font-bold text-sm text-brand-leaf mt-0.5 flex items-center gap-1">
              <Wallet className="size-3.5" /> {shed.depositStatus || "Verified"}
            </p>
            <p className="text-[11px] text-muted mt-1">Bank UTR Confirmed</p>
          </div>
          <div className="rounded-xl border border-line p-3">
            <p className="text-xs text-muted">Construction Progress</p>
            <div className="mt-1">
              <Progress pct={shed.progress} tone={shed.tone} />
            </div>
            <p className="text-[11px] text-muted mt-1">{shed.delayReason}</p>
          </div>
        </div>

        <div className="rounded-xl border border-line p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
            8-Stage Construction Lifecycle
          </p>
          <div className="grid grid-cols-4 gap-2 text-xs">
            {["Site Prep", "Plinth", "Framing", "Roofing", "Cladding", "Fitout", "AVP Audit", "Handover"].map((stg, i) => (
              <div
                key={stg}
                className={`rounded-lg border p-2 text-center ${
                  i < 4
                    ? "border-green-200 bg-success-bg/40 text-brand-leaf font-semibold"
                    : "border-line bg-gray-50 text-muted"
                }`}
              >
                <span className="block text-[10px] text-muted">Stage {i + 1}</span>
                {stg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

