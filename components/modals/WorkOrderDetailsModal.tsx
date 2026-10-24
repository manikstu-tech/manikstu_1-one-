"use client";

import { Modal } from "@/components/ui/Modal";
import { Chip } from "@/components/ui/Chip";
import { Progress } from "@/components/ui/Progress";
import type { Tone } from "@/types";

export interface WorkOrderItemView {
  wo: string;
  shed: string;
  beneficiary: string;
  fabricator: string;
  model: string;
  value: string;
  advance: string;
  status: string;
  tone: Tone;
  pct: number;
}

export interface WorkOrderDetailsModalProps {
  wo: WorkOrderItemView | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: (wo: WorkOrderItemView) => void;
}

export function WorkOrderDetailsModal({
  wo,
  isOpen,
  onClose,
  onApprove,
}: WorkOrderDetailsModalProps) {
  if (!wo) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Work Order: ${wo.wo}`}
      subtitle={`Allocated to ${wo.fabricator} · Linked Shed: ${wo.shed}`}
      maxWidth="max-w-xl"
      footer={
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-muted">Supply Policy: {wo.model}</span>
          <div className="flex gap-2">
            {wo.status === "Pending Approval" && onApprove && (
              <button
                type="button"
                onClick={() => onApprove(wo)}
                className="rounded-lg bg-brand-green px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-leaf"
              >
                Approve Work Order & Release Advance
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-medium hover:bg-brand-cream"
            >
              Close
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4 text-sm">
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-line bg-brand-cream/50 p-4">
          <div>
            <p className="text-xs text-muted">Contractor / Fabricator</p>
            <p className="font-bold text-base text-brand-charcoal mt-0.5">
              {wo.fabricator}
            </p>
            <p className="text-xs text-muted mt-1">Beneficiary: {wo.beneficiary}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Status & Progress</p>
            <div className="mt-1 flex items-center gap-2">
              <Chip tone={wo.tone} dot>
                {wo.status}
              </Chip>
            </div>
            <div className="mt-2">
              <Progress pct={wo.pct} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-line pt-3 text-center">
          <div className="rounded-lg border border-line p-3">
            <p className="text-xs text-muted">Total Contract Value</p>
            <p className="font-bold text-base text-brand-charcoal mt-1">
              {wo.value}
            </p>
          </div>
          <div className="rounded-lg border border-line p-3">
            <p className="text-xs text-muted">Advance (30%)</p>
            <p className="font-bold text-base text-brand-leaf mt-1">
              {wo.advance}
            </p>
          </div>
          <div className="rounded-lg border border-line p-3">
            <p className="text-xs text-muted">Supply Model</p>
            <p className="font-bold text-base text-brand-charcoal mt-1">
              {wo.model}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

