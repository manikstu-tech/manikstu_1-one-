"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { DispatchItemView } from "./DispatchDetailsModal";

export const WAREHOUSE_OPTIONS = [
  "Bhubaneswar Main",
  "Raipur Hub",
  "Dhamtari Store",
];

export interface NewDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (dispatch: DispatchItemView) => void;
}

export function NewDispatchModal({
  isOpen,
  onClose,
  onCreate,
}: NewDispatchModalProps) {
  const [wo, setWo] = useState("WO-2026-0147");
  const [shed, setShed] = useState("SH-000123");
  const [warehouse, setWarehouse] = useState("Raipur Hub");
  const [qty, setQty] = useState("50");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const qtyNum = Number(qty) || 50;
    const mdCode = `MD-2026-00${Math.floor(35 + Math.random() * 40)}`;

    const newEntry: DispatchItemView = {
      md: mdCode,
      wo: wo.trim() || "WO-2026-0147",
      shed: shed.trim() || "SH-000123",
      warehouse,
      items: 4,
      dispatched: qtyNum,
      received: 0,
      status: "In Transit",
      tone: "blue",
      date: "Today",
    };

    onCreate(newEntry);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Material Dispatch"
      subtitle="Dispatch construction materials from hub warehouse to site"
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
            onClick={handleSubmit}
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-leaf"
          >
            Issue Dispatch
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
              Linked Work Order
            </label>
            <input
              type="text"
              value={wo}
              onChange={(e) => setWo(e.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-charcoal">
            Source Warehouse
          </label>
          <select
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
          >
            {WAREHOUSE_OPTIONS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-charcoal">
            Dispatched Quantity (Units)
          </label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
          />
        </div>
      </form>
    </Modal>
  );
}

