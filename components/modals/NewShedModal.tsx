"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { ShedRecord } from "@/types";

export interface NewShedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (shed: ShedRecord) => void;
}

export function NewShedModal({ isOpen, onClose, onRegister }: NewShedModalProps) {
  const [beneficiary, setBeneficiary] = useState("");
  const [village, setVillage] = useState("");
  const [location, setLocation] = useState("Kundagaon, Bastar");
  const [owner, setOwner] = useState("Ramesh Kumar");
  const [model, setModel] = useState<"Model A" | "Model B">("Model B");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!beneficiary.trim() || !village.trim()) return;

    const newId = `SH-${String(Math.floor(100125 + Math.random() * 900)).padStart(6, "0")}`;
    const newEntry: ShedRecord = {
      shed: newId,
      beneficiary: beneficiary.trim(),
      contact: "98" + Math.floor(10000000 + Math.random() * 90000000),
      village: village.trim(),
      stage: "Site Prep",
      delayReason: "No Delay",
      location,
      owner,
      progress: 5,
      tone: "blue",
      depositStatus: "Verified",
      model,
    };

    onRegister(newEntry);
    onClose();
    setBeneficiary("");
    setVillage("");
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Register New Shed"
      subtitle="Allocate permanent Shed ID and link verified beneficiary"
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
            disabled={!beneficiary.trim() || !village.trim()}
            onClick={handleSubmit}
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-leaf disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm Registration
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-brand-charcoal">
            Beneficiary Name <span className="text-brand-red">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Gayatri Bai Yadav"
            value={beneficiary}
            onChange={(e) => setBeneficiary(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-charcoal">
            Village / Gram Panchayat <span className="text-brand-red">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Borpadar"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          />
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
              <option value="Model B">Model B (Manikstu Materials)</option>
              <option value="Model A">Model A (Fabricator Supplies)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-charcoal">
              Site Supervisor
            </label>
            <select
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
            >
              <option value="Ramesh Kumar">Ramesh Kumar</option>
              <option value="Manoj Singh">Manoj Singh</option>
              <option value="Kunti Devi">Kunti Devi</option>
              <option value="Aftab Khan">Aftab Khan</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-charcoal">
            District / Cluster
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
          >
            <option value="Kundagaon, Bastar">Kundagaon, Bastar</option>
            <option value="Atari, Dhamtari">Atari, Dhamtari</option>
            <option value="Kumhari, Durg">Kumhari, Durg</option>
            <option value="Arang, Raipur">Arang, Raipur</option>
          </select>
        </div>
      </form>
    </Modal>
  );
}

