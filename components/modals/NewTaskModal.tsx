"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { TaskRecord } from "@/types";
import { TASK_OWNERS } from "@/lib/mock-data/tasks";

export interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: TaskRecord) => void;
}

export function NewTaskModal({ isOpen, onClose, onCreate }: NewTaskModalProps) {
  const [title, setTitle] = useState("");
  const [shed, setShed] = useState("SH-000123");
  const [type, setType] = useState<"Task" | "Issue" | "Decision">("Task");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("High");
  const [owner, setOwner] = useState("Aftab Khan");
  const [due, setDue] = useState("28-Mar-2026");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: TaskRecord = {
      id: `TSK-2026-0${Math.floor(50 + Math.random() * 40)}`,
      title: title.trim(),
      shed: shed.trim() || "SH-000123",
      type,
      priority,
      owner,
      due,
      status: "Open",
    };

    onCreate(newTask);
    onClose();
    setTitle("");
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Action Item"
      subtitle="Log a field task, defect issue, or management decision"
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
            disabled={!title.trim()}
            onClick={handleSubmit}
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-leaf disabled:cursor-not-allowed disabled:opacity-50"
          >
            Log Item
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-brand-charcoal">
            Title / Description <span className="text-brand-red">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Inspect foundation drainage at site"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-brand-charcoal">
              Item Category
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "Task" | "Issue" | "Decision")}
              className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
            >
              <option value="Task">Task</option>
              <option value="Issue">Issue / Defect</option>
              <option value="Decision">Decision</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-brand-charcoal">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as "High" | "Medium" | "Low")}
              className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-brand-charcoal">
              Linked Shed ID
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
              Target Due Date
            </label>
            <input
              type="text"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              placeholder="e.g. 28-Mar-2026"
              className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-charcoal">
            Assigned Owner
          </label>
          <select
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green"
          >
            {TASK_OWNERS.filter((o) => o !== "All Owners").map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </form>
    </Modal>
  );
}

