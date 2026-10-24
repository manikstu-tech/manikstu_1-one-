"use client";

import { Modal } from "@/components/ui/Modal";

export interface ExceptionItem {
  id: string;
  issue: string;
  amount: string;
  owner: string;
  status: string;
  age?: string;
  chip?: string;
  Icon?: React.ElementType;
  iconClass?: string;
}

export interface FinanceExceptionModalProps {
  exception: ExceptionItem | null;
  onClose: () => void;
  onResolve: (id: string) => void;
}

export function FinanceExceptionModal({
  exception,
  onClose,
  onResolve,
}: FinanceExceptionModalProps) {
  if (!exception) return null;

  return (
    <Modal
      isOpen={!!exception}
      onClose={onClose}
      title={`Review Exception: ${exception.id}`}
      subtitle="Resolve financial discrepancy or escalate to AVP Infrastructure"
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
              onResolve(exception.id);
              onClose();
            }}
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-leaf"
          >
            Approve & Resolve Exception
          </button>
        </>
      }
    >
      <div className="space-y-4 text-sm">
        <div className="rounded-xl bg-amber-50 p-4 text-amber-900 border border-amber-200">
          <p className="font-bold">{exception.issue}</p>
          <p className="text-xs mt-1">
            Amount involved: <span className="font-bold">{exception.amount}</span> · Assigned Owner: {exception.owner}
          </p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted">
            Audit Resolution Note
          </label>
          <textarea
            rows={3}
            defaultValue="Verified bank transaction confirmation. Ledger variance cleared against approved contingency buffer."
            className="mt-1 w-full rounded-lg border border-line p-2 text-xs outline-none focus:border-brand-green"
          />
        </div>
      </div>
    </Modal>
  );
}
