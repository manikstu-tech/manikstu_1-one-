"use client";

import { useState, useMemo } from "react";
import {
  CircleCheck,
  CircleMinus,
  CircleX,
  MoreVertical,
  UserPlus,
} from "lucide-react";
import {
  Avatar,
  Breadcrumb,
  Card,
  Chip,
  EmptyState,
  FilterBar,
  FilterSelect,
  PageHeader,
  PrimaryButton,
  SearchInput,
  Tabs,
  TableWrap,
  Th,
} from "@/components/ui";
import { useToast } from "../_components";
import {
  UserDetailsModal,
  NewUserModal,
  type UserItemView,
} from "@/components/modals";

type Perm = "y" | "l" | "n";

const PERMS = ["View", "Create", "Edit", "Verify", "Approve", "Export"] as const;

const ROLES: { role: string; desc: string; perms: Perm[] }[] = [
  { role: "Super Admin", desc: "Full access to all modules and system settings", perms: ["y", "y", "y", "y", "y", "y"] },
  { role: "Project Manager", desc: "Project portfolio management and assignment tracking", perms: ["y", "y", "y", "y", "y", "y"] },
  { role: "Operations Manager", desc: "Day-to-day site operations, work orders and dispatch", perms: ["y", "y", "y", "l", "y", "l"] },
  { role: "Field Executive", desc: "Site visits, beneficiary intake, evidence capture", perms: ["y", "l", "n", "n", "n", "n"] },
  { role: "Fabricator", desc: "Assigned sheds only; defect correction & evidence submit", perms: ["l", "n", "n", "n", "n", "n"] },
  { role: "Finance Manager", desc: "Bank verification, expenses, disbursements & ledgers", perms: ["y", "y", "n", "l", "n", "n"] },
  { role: "Reviewer (AVP)", desc: "Inspection review, milestone approval and handover sign-off", perms: ["y", "n", "n", "y", "y", "n"] },
  { role: "Viewer", desc: "Read-only access for state and institutional auditors", perms: ["y", "n", "n", "n", "n", "n"] },
];

function PermIcon({ p }: { p: Perm }) {
  if (p === "y") return <CircleCheck className="mx-auto size-5 text-brand-green" />;
  if (p === "l") return <CircleMinus className="mx-auto size-5 text-brand-gold" />;
  return <CircleX className="mx-auto size-5 text-brand-red" />;
}

const INITIAL_USERS: UserItemView[] = [
  { name: "Ramesh Kumar", email: "ramesh@manikstu.com", phone: "+91 98765 43210", role: "Project Manager", roleTone: "green", location: "Raipur", fabricator: "—", login: "20-Mar-2026, 10:15 AM" },
  { name: "Kunti Sahu", email: "kunti@manikstu.com", phone: "+91 87654 32109", role: "Site Supervisor", roleTone: "blue", location: "Arang", fabricator: "Sharma Construction", login: "19-Mar-2026, 06:42 PM" },
  { name: "Manoj Singh", email: "manoj@manikstu.com", phone: "+91 76543 21098", role: "Reviewer (AVP)", roleTone: "amber", location: "Raipur", fabricator: "—", login: "20-Mar-2026, 09:20 AM" },
  { name: "Hemant Kumar", email: "hemant@manikstu.com", phone: "+91 98760 11223", role: "Field Executive", roleTone: "amber", location: "Kundagaon", fabricator: "—", login: "19-Mar-2026, 04:11 PM" },
  { name: "Suresh Yadav", email: "suresh.fabricator@gmail.com", phone: "+91 99887 66554", role: "Fabricator", roleTone: "red", location: "Simga", fabricator: "Sharma Construction", login: "18-Mar-2026, 11:03 AM" },
  { name: "Aftab Khan", email: "aftab.khan@manikstu.com", phone: "+91 99887 66554", role: "Operations Manager", roleTone: "green", location: "Raipur", fabricator: "—", login: "24-Oct-2026, 06:15 AM" },
];

const LOGS = [
  { user: "Aftab Khan", action: "Approved work order WO-2026-0147", ip: "103.21.24.11", time: "10 mins ago" },
  { user: "Ramesh Kumar", action: "Uploaded photo evidence for SH-000123", ip: "103.21.24.18", time: "2 hours ago" },
  { user: "Manoj Singh", action: "AVP Inspection marked Approved for SH-000113", ip: "115.110.42.9", time: "4 hours ago" },
  { user: "Kunti Sahu", action: "Material receipt confirmed for SH-000118", ip: "103.21.24.18", time: "1 day ago" },
];

export default function UsersPage() {
  const { showToast } = useToast();
  const [users, setUsers] = useState<UserItemView[]>(INITIAL_USERS);
  const [activeTab, setActiveTab] = useState("Users");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  // Selected user and modal state
  const [selectedUser, setSelectedUser] = useState<UserItemView | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        search.trim() === "" ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase()) ||
        u.location.toLowerCase().includes(search.toLowerCase());

      const matchRole = roleFilter === "All Roles" || u.role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  function handleAddUser(newEntry: UserItemView) {
    setUsers((prev) => [newEntry, ...prev]);
    showToast(`User ${newEntry.name} added and invited via email.`, "success");
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={["Users & Roles"]} />
      <PageHeader
        title="Users & Roles"
        subtitle="Manage team members, roles, permissions matrix, and secure audit access logs"
        actions={
          <PrimaryButton onClick={() => setShowAddModal(true)}>
            <UserPlus className="size-4" /> Add User
          </PrimaryButton>
        }
      />

      <Tabs
        activeTab={activeTab}
        onChange={(tab) => setActiveTab(tab)}
        tabs={[
          { label: "Users", count: users.length },
          { label: "Roles & Permissions", count: ROLES.length },
          { label: "Access Logs", count: LOGS.length },
        ]}
      />

      {activeTab === "Users" && (
        <div className="space-y-4">
          <FilterBar>
            <SearchInput
              placeholder="Search by name, email, role, location..."
              value={search}
              onChange={(val) => setSearch(val)}
            />
            <FilterSelect
              label={roleFilter}
              value={roleFilter}
              options={["All Roles", "Super Admin", "Project Manager", "Operations Manager", "Site Supervisor", "Field Executive", "Reviewer (AVP)", "Fabricator"]}
              onChange={(val) => setRoleFilter(val)}
            />
          </FilterBar>

          <Card padded={false}>
            {filteredUsers.length === 0 ? (
              <EmptyState
                title="No users match your criteria"
                onReset={() => {
                  setSearch("");
                  setRoleFilter("All Roles");
                }}
              />
            ) : (
              <TableWrap>
                <table className="w-full min-w-[800px] text-[13px]">
                  <thead>
                    <tr className="border-b border-line text-left text-xs font-semibold text-muted">
                      <th className="py-2.5 pl-5 pr-3">User Name</th>
                      <Th>Role</Th>
                      <Th>Location</Th>
                      <Th>Associated Fabricator</Th>
                      <Th>Last Active</Th>
                      <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/60">
                    {filteredUsers.map((u) => (
                      <tr
                        key={u.email}
                        onClick={() => setSelectedUser(u)}
                        className="cursor-pointer transition hover:bg-brand-cream/50"
                      >
                        <td className="py-3 pl-5 pr-3">
                          <span className="flex items-center gap-2.5">
                            <Avatar name={u.name} />
                            <span>
                              <span className="block font-semibold text-brand-charcoal hover:text-brand-green">
                                {u.name}
                              </span>
                              <span className="block text-xs text-muted font-normal">{u.email}</span>
                            </span>
                          </span>
                        </td>
                        <td className="py-3 pr-3">
                          <Chip tone={u.roleTone} dot>{u.role}</Chip>
                        </td>
                        <td className="py-3 pr-3 text-muted">{u.location}</td>
                        <td className="py-3 pr-3 text-xs">{u.fabricator}</td>
                        <td className="py-3 pr-3 text-xs text-muted">{u.login}</td>
                        <td className="py-3 pr-5 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUser(u);
                            }}
                            aria-label={`View user ${u.name}`}
                            className="rounded p-1 text-muted hover:bg-brand-cream hover:text-brand-charcoal"
                          >
                            <MoreVertical className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrap>
            )}
          </Card>
        </div>
      )}

      {activeTab === "Roles & Permissions" && (
        <Card title="Role Permission Matrix" action={<Chip tone="green">8 System Roles</Chip>} padded={false}>
          <TableWrap>
            <table className="w-full min-w-[720px] text-[13px]">
              <thead>
                <tr className="border-y border-line text-xs font-semibold text-muted">
                  <th className="py-2.5 pl-5 pr-3 text-left">Role & Description</th>
                  {PERMS.map((p) => (
                    <th key={p} className="px-3 py-2.5 text-center font-semibold">
                      {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROLES.map((r) => (
                  <tr key={r.role} className="hover:bg-brand-cream/40">
                    <td className="py-3.5 pl-5 pr-3">
                      <span className="block font-bold text-brand-charcoal">{r.role}</span>
                      <span className="block text-xs text-muted">{r.desc}</span>
                    </td>
                    {r.perms.map((p, i) => (
                      <td key={i} className="px-3 py-3.5 text-center">
                        <PermIcon p={p} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
          <div className="flex items-center justify-end gap-6 border-t border-line bg-brand-cream/40 px-5 py-3 text-xs text-muted font-medium">
            <span className="flex items-center gap-1.5"><CircleCheck className="size-4 text-brand-green" /> Full Access</span>
            <span className="flex items-center gap-1.5"><CircleMinus className="size-4 text-brand-gold" /> Limited / Assigned</span>
            <span className="flex items-center gap-1.5"><CircleX className="size-4 text-brand-red" /> No Access</span>
          </div>
        </Card>
      )}

      {activeTab === "Access Logs" && (
        <Card title="Security & Access Audit Trail" padded={false}>
          <TableWrap>
            <table className="w-full min-w-[640px] text-[13px]">
              <thead>
                <tr className="border-b border-line text-left text-xs font-semibold text-muted">
                  <th className="py-2.5 pl-5 pr-3">User</th>
                  <Th>Action Description</Th>
                  <Th>IP Address</Th>
                  <th className="py-2.5 pr-5 text-right font-medium">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {LOGS.map((log, idx) => (
                  <tr key={idx} className="hover:bg-brand-cream/40">
                    <td className="py-3 pl-5 pr-3 font-semibold text-brand-charcoal">{log.user}</td>
                    <td className="py-3 pr-3 text-xs text-brand-charcoal/90">{log.action}</td>
                    <td className="py-3 pr-3 font-mono text-xs text-muted">{log.ip}</td>
                    <td className="py-3 pr-5 text-right text-xs text-muted">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Card>
      )}

      <UserDetailsModal
        user={selectedUser}
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
      />

      <NewUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreate={handleAddUser}
      />
    </div>
  );
}
