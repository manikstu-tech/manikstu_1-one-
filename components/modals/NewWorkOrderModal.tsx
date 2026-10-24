"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { WorkOrderItemView } from "./WorkOrderDetailsModal";

export const FABRICATOR_OPTIONS = [
  "Sharma Agro Constructions",
  "Verma Infra",
  "Patel Structures",
  "R.K. Fabricators",
  "Chhattisgarh Rural Works",
  "Shree Ram Steels",
  "Apex Steel Fabricators",
];

export interface NewWorkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (wo: WorkOrderItemView) => void;
}

export function NewWorkOrderModal({
  isOpen,
  onClose,
  onCreate,
}: NewWorkOrderModalProps) {
  const [shed, setShed] = useState("SH-000125");
  const [beneficiary, setBeneficiary] = useState("");
  const [fabricator, setFabricator] = useState(FABRICATOR_OPTIONS[0]);
  const [model, setModel] = useState<"Model A" | "Model B">("Model A");
  const [value, setValue] = useState("310000");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!beneficiary.trim()) return;

    const numVal = Number(value) || 300000;
    const woCode = `WO-2026-0${Math.floor(150 + Math.random() * 40)}`;
    const valFormatted = `₹${numVal.toLocaleString("en-IN")}`;
    const advanceFormatted = `₹${Math.round(numVal * 0.3).toLocaleString("en-IN")}`;

    const newEntry: WorkOrderItemView = {
      wo: woCode,
      shed: shed.trim() || "SH-000125",
      beneficiary: beneficiary.trim(),
      fabricator,
      model,
      value: valFormatted,
      advance: advanceFormatted,
      status: "Pending Approval",
      tone: "amber",
      pct: 0,
    };

    onCreate(newEntry);
    onClose();
    setBeneficiary("");
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Work Order"
      subtitle="Allocate fabricator and specify supply terms for Project AJAH"
      maxWidth="max-w-lg"
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
            disabled={!beneficiary.trim()}
            onClick={handleSubmit}
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-leaf disabled:cursor-not-allowed disabled:opacity-50"
          >
            Issue Work Order
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-brand-charcoal">
              Target Shed ID
            </label>
            <input
              type="text"
              value={shed}
              onChange={(e) => setShed(e.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-brand-charcoal">
              Beneficiary Name <span className="text-brand-red">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Savitri Bai"
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-charcoal">
            Assigned Fabricator
          </label>
          <select
            value={fabricator}
            onChange={(e) => setFabricator(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
          >
            {FABRICATOR_OPTIONS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-brand-charcoal">
              Supply Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value as "Model A" | "Model B")}
              className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
            >
              <option value="Model A">Model A (Fabricator Supplies)</option>
              <option value="Model B">Model B (Manikstu Supplies)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-brand-charcoal">
              Contract Value (₹)
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}

