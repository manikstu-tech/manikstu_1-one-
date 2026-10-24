"use client";

import { Modal } from "@/components/ui/Modal";
import { Chip } from "@/components/ui/Chip";
import type { Tone } from "@/types";

export interface DispatchItemView {
  md: string;
  wo: string;
  shed: string;
  warehouse: string;
  items: number;
  dispatched: number;
  received: number;
  status: string;
  tone: Tone;
  date: string;
}

export interface DispatchDetailsModalProps {
  dispatch: DispatchItemView | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmReceipt?: (dispatch: DispatchItemView) => void;
}

export function DispatchDetailsModal({
  dispatch,
  isOpen,
  onClose,
  onConfirmReceipt,
}: DispatchDetailsModalProps) {
  if (!dispatch) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Material Dispatch: ${dispatch.md}`}
      subtitle={`Source: ${dispatch.warehouse} → Target: ${dispatch.shed}`}
      maxWidth="max-w-xl"
      footer={
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-muted">Linked WO: {dispatch.wo}</span>
          <div className="flex gap-2">
            {dispatch.status !== "Received" && onConfirmReceipt && (
              <button
                type="button"
                onClick={() => onConfirmReceipt(dispatch)}
                className="rounded-lg bg-brand-green px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-leaf"
              >
                Confirm Site Receipt
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
            <p className="text-xs text-muted">Target Site / Shed</p>
            <p className="font-bold text-base text-brand-charcoal mt-0.5">
              {dispatch.shed}
            </p>
            <p className="text-xs text-muted mt-1">Dispatched on: {dispatch.date}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Delivery Status</p>
            <div className="mt-1">
              <Chip tone={dispatch.tone} dot>
                {dispatch.status}
              </Chip>
            </div>
            <p className="text-xs text-muted mt-2">
              Received: <span className="font-bold text-brand-leaf">{dispatch.received}</span> / {dispatch.dispatched} units
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-line p-3">
          <p className="text-xs font-bold text-brand-charcoal mb-2">Itemized Materials Manifest</p>
          <div className="divide-y divide-line/60 text-xs">
            <div className="flex justify-between py-1.5">
              <span>GI Wire Mesh (3&apos;&apos; × 3&apos;&apos;, 10 gauge)</span>
              <span className="font-semibold">18 pcs</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span>Structural MS Hollow Pipes (40 × 40 mm)</span>
              <span className="font-semibold">24 pcs</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span>Cement (OPC 43 Grade)</span>
              <span className="font-semibold">30 bags</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span>Pre-painted GI Corrugated Roofing Sheets</span>
              <span className="font-semibold">12 sheets</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

