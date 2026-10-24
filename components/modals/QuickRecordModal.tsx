"use client";

import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { ChevronRight, FileText, HardHat, House, Users } from "lucide-react";

export interface QuickRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickRecordModal({ isOpen, onClose }: QuickRecordModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Operational Record"
      subtitle="Select the type of record you wish to create in Project AJAH"
      maxWidth="max-w-md"
    >
      <div className="grid grid-cols-1 gap-2.5">
        <Link
          href="/sites"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl border border-line p-3 transition hover:border-brand-green hover:bg-success-bg/30"
        >
          <span className="grid size-10 place-items-center rounded-lg bg-success-bg text-brand-leaf">
            <House className="size-5" />
          </span>
          <div className="flex-1">
            <p className="font-bold text-sm text-brand-charcoal">New Shed Register Entry</p>
            <p className="text-xs text-muted">Assign Shed ID, village, and beneficiary</p>
          </div>
          <ChevronRight className="size-4 text-muted" />
        </Link>

        <Link
          href="/beneficiaries"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl border border-line p-3 transition hover:border-brand-green hover:bg-success-bg/30"
        >
          <span className="grid size-10 place-items-center rounded-lg bg-blue-50 text-blue-700">
            <Users className="size-5" />
          </span>
          <div className="flex-1">
            <p className="font-bold text-sm text-brand-charcoal">New Beneficiary Intake</p>
            <p className="text-xs text-muted">Record farmer details and consent call</p>
          </div>
          <ChevronRight className="size-4 text-muted" />
        </Link>

        <Link
          href="/work-orders"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl border border-line p-3 transition hover:border-brand-green hover:bg-success-bg/30"
        >
          <span className="grid size-10 place-items-center rounded-lg bg-amber-50 text-brand-gold">
            <HardHat className="size-5" />
          </span>
          <div className="flex-1">
            <p className="font-bold text-sm text-brand-charcoal">New Fabricator Work Order</p>
            <p className="text-xs text-muted">Issue WO under Model A or Model B</p>
          </div>
          <ChevronRight className="size-4 text-muted" />
        </Link>

        <Link
          href="/tasks"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl border border-line p-3 transition hover:border-brand-green hover:bg-success-bg/30"
        >
          <span className="grid size-10 place-items-center rounded-lg bg-red-50 text-brand-red">
            <FileText className="size-5" />
          </span>
          <div className="flex-1">
            <p className="font-bold text-sm text-brand-charcoal">New Task / Issue</p>
            <p className="text-xs text-muted">Log field issue, defect, or deadline</p>
          </div>
          <ChevronRight className="size-4 text-muted" />
        </Link>
      </div>
    </Modal>
  );
}

