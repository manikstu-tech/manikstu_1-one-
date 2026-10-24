"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { Tone } from "@/types";
import type { UserItemView } from "./UserDetailsModal";

export const ROLE_OPTIONS = [
  "Super Admin",
  "Project Manager",
  "Operations Manager",
  "Site Supervisor",
  "Field Executive",
  "Reviewer (AVP)",
  "Fabricator",
  "Finance Manager",
  "Viewer",
];

export interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (user: UserItemView) => void;
}

export function NewUserModal({
  isOpen,
  onClose,
  onCreate,
}: NewUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Field Executive");
  const [location, setLocation] = useState("Raipur");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const roleTone: Tone =
      role.includes("Admin") || role.includes("Manager")
        ? "green"
        : role.includes("Reviewer")
        ? "amber"
        : role.includes("Fabricator")
        ? "red"
        : "blue";

    const newEntry: UserItemView = {
      name: name.trim(),
      email: email.trim(),
      phone: "+91 98000 12345",
      role,
      roleTone,
      location,
      fabricator: role === "Fabricator" ? "Sharma Construction" : "—",
      login: "Never logged in",
    };

    onCreate(newEntry);
    onClose();
    setName("");
    setEmail("");
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite New User"
      subtitle="Grant role-based operational permissions for Project AJAH"
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
            disabled={!name.trim() || !email.trim()}
            onClick={handleSubmit}
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-leaf disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send Invitation
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-brand-charcoal">
            Full Name <span className="text-brand-red">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Geeta Verma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-charcoal">
            Corporate Email Address <span className="text-brand-red">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="geeta.verma@manikstu.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-brand-charcoal">
              Assigned Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-brand-charcoal">
              Base Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}

