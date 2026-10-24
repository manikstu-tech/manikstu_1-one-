"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

export interface NewBeneficiaryData {
  name: string;
  village: string;
  ref: string;
  consent: boolean;
}

export interface NewBeneficiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: NewBeneficiaryData) => void;
}

export function NewBeneficiaryModal({
  isOpen,
  onClose,
  onCreate,
}: NewBeneficiaryModalProps) {
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [ref, setRef] = useState("");
  const [consent, setConsent] = useState(true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !village.trim()) return;

    onCreate({
      name: name.trim(),
      village: village.trim(),
      ref: ref.trim(),
      consent,
    });

    onClose();
    setName("");
    setVillage("");
    setRef("");
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Beneficiary Intake"
      subtitle="Record farmer details from government approved list for Project AJAH"
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
            disabled={!name.trim() || !village.trim()}
            onClick={handleSubmit}
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-leaf disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create Beneficiary
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-brand-charcoal">
            Farmer / Beneficiary Full Name <span className="text-brand-red">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Shakuntala Devi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-charcoal">
            Village & District <span className="text-brand-red">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Bhatapara, Raipur"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-charcoal">
            Source Reference Number (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. APICOL-2026-0312"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-line bg-brand-cream/30 p-3">
          <div>
            <p className="text-xs font-bold text-brand-charcoal">Consent Received</p>
            <p className="text-[11px] text-muted">Phone consent verified with farmer</p>
          </div>
          <button
            type="button"
            onClick={() => setConsent((v) => !v)}
            className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${
              consent ? "justify-end bg-brand-green" : "justify-start bg-gray-300"
            }`}
          >
            <span className="size-5 rounded-full bg-white shadow-xs" />
          </button>
        </div>
      </form>
    </Modal>
  );
}

