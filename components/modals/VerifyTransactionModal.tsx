"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { FinanceReceiptRecord } from "@/types";

export interface VerifyTransactionModalProps {
  receipt: FinanceReceiptRecord | null;
  onClose: () => void;
  onConfirm: (receipt: FinanceReceiptRecord, utr: string) => void;
}

export function VerifyTransactionModal({
  receipt,
  onClose,
  onConfirm,
}: VerifyTransactionModalProps) {
  const [bankUtr, setBankUtr] = useState("");

  if (!receipt) return null;

  return (
    <Modal
      isOpen={!!receipt}
      onClose={onClose}
      title="Verify Bank Transaction"
      subtitle={`Confirm UTR and ledger entry for ${receipt.shed} (${receipt.beneficiary})`}
      maxWidth="max-w-md"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium hover:bg-brand-cream"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(receipt, bankUtr || "UTR" + Math.floor(100000000 + Math.random() * 900000000));
              onClose();
            }}
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-leaf"
          >
            Confirm & Mark Verified
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-line bg-brand-cream/60 p-3.5">
          <p className="text-xs text-muted">Receipt Amount</p>
          <p className="text-2xl font-bold text-brand-leaf mt-0.5">{receipt.amount}</p>
          <p className="text-xs text-muted mt-1">{receipt.category} · {receipt.date}</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-charcoal">
            Bank Transaction UTR / Reference
          </label>
          <input
            type="text"
            placeholder="e.g. UTR889210932"
            value={bankUtr}
            onChange={(e) => setBankUtr(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          />
          <p className="mt-1 text-[11px] text-muted">
            Bank reference must match the bank deposit statement slip.
          </p>
        </div>
      </div>
    </Modal>
  );
}

