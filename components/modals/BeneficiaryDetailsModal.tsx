"use client";

import { Modal } from "@/components/ui/Modal";
import { Chip } from "@/components/ui/Chip";
import type { Tone } from "@/types";

export interface BeneficiaryDisplayItem {
  id: string;
  name: string;
  phone: string;
  village: string;
  shed: string;
  verification: { label: string; tone: Tone; note?: string };
  consent: { label: string; tone: Tone; note?: string };
  contribution: { label: string; note?: string; tone?: Tone };
  assignedTo: string;
  date: string;
  ref: string;
}

export interface BeneficiaryDetailsModalProps {
  beneficiary: BeneficiaryDisplayItem | null;
  onClose: () => void;
  onConfirmConsent?: (bene: BeneficiaryDisplayItem) => void;
}

export function BeneficiaryDetailsModal({
  beneficiary,
  onClose,
  onConfirmConsent,
}: BeneficiaryDetailsModalProps) {
  if (!beneficiary) return null;

  return (
    <Modal
      isOpen={!!beneficiary}
      onClose={onClose}
      title={`Beneficiary Record: ${beneficiary.name}`}
      subtitle={`Source Reference: ${beneficiary.ref} · ${beneficiary.phone}`}
      maxWidth="max-w-md"
      footer={
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-muted">Assigned: {beneficiary.assignedTo}</span>
          <div className="flex gap-2">
            {beneficiary.consent.label === "Pending" && (
              <button
                type="button"
                onClick={() => onConfirmConsent?.(beneficiary)}
                className="rounded-lg bg-brand-green px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-leaf"
              >
                Confirm Consent Call
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
            <p className="text-xs text-muted">Permanent Shed ID</p>
            <p className="font-bold text-base text-brand-green mt-0.5">
              {beneficiary.shed}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted">Location</p>
            <p className="font-semibold text-sm text-brand-charcoal mt-0.5">
              {beneficiary.village}
            </p>
          </div>
        </div>

        <div className="space-y-2 border-t border-line pt-3">
          <div className="flex items-center justify-between py-1">
            <span className="text-xs text-muted">Verification Status</span>
            <Chip tone={beneficiary.verification.tone}>
              {beneficiary.verification.label}
            </Chip>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-xs text-muted">Consent Recording</span>
            <Chip tone={beneficiary.consent.tone}>
              {beneficiary.consent.label}
            </Chip>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-xs text-muted">Beneficiary Contribution</span>
            <span className="font-semibold text-brand-charcoal">
              {beneficiary.contribution.label} ({beneficiary.contribution.note})
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
