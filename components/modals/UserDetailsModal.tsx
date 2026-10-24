"use client";

import { Modal } from "@/components/ui/Modal";
import { Avatar } from "@/components/ui/Avatar";
import { Chip } from "@/components/ui/Chip";
import type { Tone } from "@/types";

export interface UserItemView {
  name: string;
  email: string;
  phone: string;
  role: string;
  roleTone: Tone;
  location: string;
  fabricator: string;
  login: string;
}

export interface UserDetailsModalProps {
  user: UserItemView | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailsModal({
  user,
  isOpen,
  onClose,
}: UserDetailsModalProps) {
  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Team Member: ${user.name}`}
      subtitle={`Role: ${user.role} · Location: ${user.location}`}
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-sm">
        <div className="flex items-center gap-3 rounded-xl border border-line bg-brand-cream/50 p-4">
          <Avatar name={user.name} size={11} />
          <div>
            <p className="font-bold text-base text-brand-charcoal">{user.name}</p>
            <p className="text-xs text-muted">{user.email}</p>
            <div className="mt-1">
              <Chip tone={user.roleTone} dot>{user.role}</Chip>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs divide-y divide-line/60">
          <div className="flex justify-between py-2">
            <span className="text-muted">Direct Mobile</span>
            <span className="font-medium">{user.phone}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted">Primary Field Base</span>
            <span className="font-medium">{user.location}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted">Contractor Affiliation</span>
            <span className="font-medium">{user.fabricator}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted">Last System Login</span>
            <span className="font-medium">{user.login}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

