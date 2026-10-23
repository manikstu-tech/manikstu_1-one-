import {
  CircleCheck,
  CircleMinus,
  CircleX,
  Download,
  MoreVertical,
  UserPlus,
} from "lucide-react";
import {
  Avatar,
  Breadcrumb,
  Card,
  Chip,
  FilterBar,
  FilterSelect,
  GhostButton,
  PageHeader,
  PrimaryButton,
  SearchInput,
  Tabs,
  TableWrap,
  Th,
  type Tone,
} from "../_components";

type Perm = "y" | "l" | "n";

const PERMS = ["View", "Create", "Edit", "Verify", "Approve", "Export"] as const;

const ROLES: { role: string; desc: string; perms: Perm[] }[] = [
  { role: "Super Admin", desc: "Full access to all modules", perms: ["y", "y", "y", "y", "y", "y"] },
  { role: "Project Manager", desc: "Project-level access", perms: ["y", "y", "y", "y", "y", "y"] },
  { role: "Operations Manager", desc: "Day-to-day operations", perms: ["y", "y", "y", "l", "y", "l"] },
  { role: "Field Executive", desc: "Site visits, data capture", perms: ["y", "l", "n", "n", "n", "n"] },
  { role: "Fabricator", desc: "Assigned sheds only", perms: ["l", "n", "n", "n", "n", "n"] },
  { role: "Finance Manager", desc: "Finance and payments", perms: ["y", "y", "n", "l", "n", "n"] },
  { role: "Reviewer (AVP)", desc: "Inspection review & approval", perms: ["y", "n", "n", "y", "y", "n"] },
  { role: "Viewer", desc: "Read-only access", perms: ["y", "n", "n", "n", "n", "n"] },
];

function PermIcon({ p }: { p: Perm }) {
  if (p === "y") return <CircleCheck className="mx-auto size-5 text-brand-green" />;
  if (p === "l") return <CircleMinus className="mx-auto size-5 text-brand-gold" />;
  return <CircleX className="mx-auto size-5 text-brand-red" />;
}

const USERS: {
  name: string;
  email: string;
  phone: string;
  role: string;
  roleTone: Tone;
  location: string;
  fabricator: string;
  login: string;
}[] = [
  { name: "Ramesh Kumar", email: "ramesh@manikstu.com", phone: "+91 98765 43210", role: "Project Manager", roleTone: "green", location: "Raipur", fabricator: "—", login: "20-Mar-2026, 10:15 AM" },
  { name: "Kunti Sahu", email: "kunti@manikstu.com", phone: "+91 87654 32109", role: "Site Supervisor", roleTone: "blue", location: "Arang", fabricator: "Sharma Construction", login: "19-Mar-2026, 06:42 PM" },
  { name: "Manoj Singh", email: "manoj@manikstu.com", phone: "+91 76543 21098", role: "AVP Reviewer", roleTone: "amber", location: "Raipur", fabricator: "—", login: "20-Mar-2026, 09:20 AM" },
  { name: "Hemant Kumar", email: "hemant@manikstu.com", phone: "+91 98760 11223", role: "Field Executive", roleTone: "amber", location: "Kundagaon", fabricator: "—", login: "19-Mar-2026, 04:11 PM" },
  { name: "Suresh Yadav", email: "suresh.fabricator@gmail.com", phone: "+91 99887 66554", role: "Fabricator", roleTone: "red", location: "Simga", fabricator: "Sharma Construction", login: "18-Mar-2026, 11:03 AM" },
];

export default function UsersPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={["Users & Roles"]} />
      <PageHeader
        title="Users & Roles"
        subtitle="Manage team members, roles and permissions for Project AJAH"
        actions={
          <PrimaryButton>
            <UserPlus className="size-4" /> Add User
          </PrimaryButton>
        }
      />

      <Tabs
        tabs={[
          { label: "Users", count: 32 },
          { label: "Roles & Permissions", active: true },
          { label: "Role Assignment" },
          { label: "Access Logs" },
        ]}
      />

      <Card title="Role Permission Matrix" action={<FilterSelect label="All Modules" />} padded={false}>
        <TableWrap>
          <table className="w-full min-w-[720px] text-[13px]">
            <thead>
              <tr className="border-y border-line text-xs text-muted">
                <th className="py-2.5 pl-5 pr-3 text-left font-medium">Role</th>
                {PERMS.map((p) => (
                  <th key={p} className="px-3 py-2.5 text-center font-medium">
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {ROLES.map((r) => (
                <tr key={r.role} className="hover:bg-brand-cream/40">
                  <td className="py-3 pl-5 pr-3">
                    <p className="font-semibold">{r.role}</p>
                    <p className="text-xs text-muted">{r.desc}</p>
                  </td>
                  {r.perms.map((p, i) => (
                    <td key={i} className="px-3 py-3 text-center">
                      <PermIcon p={p} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
        <div className="flex flex-wrap gap-5 border-t border-line px-5 py-3 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <CircleCheck className="size-4 text-brand-green" /> Allowed
          </span>
          <span className="flex items-center gap-1.5">
            <CircleMinus className="size-4 text-brand-gold" /> Limited (Own / Assigned only)
          </span>
          <span className="flex items-center gap-1.5">
            <CircleX className="size-4 text-brand-red" /> Not Allowed
          </span>
        </div>
      </Card>

      <Card title="User List (32)" action={<GhostButton><Download className="size-4" /> Export</GhostButton>} padded={false}>
        <div className="p-5 pt-0">
          <FilterBar>
            <SearchInput placeholder="Search by name, email, phone..." />
            <FilterSelect label="All Roles" />
            <FilterSelect label="All Status" />
            <FilterSelect label="All Locations" />
          </FilterBar>
        </div>
        <TableWrap>
          <table className="w-full min-w-[860px] text-[13px]">
            <thead>
              <tr className="border-y border-line text-left text-xs text-muted">
                <th className="py-2.5 pl-5 pr-3 font-medium">Name</th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Role</Th>
                <Th>Location</Th>
                <Th>Fabricator</Th>
                <Th>Status</Th>
                <Th>Last Login</Th>
                <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {USERS.map((u) => (
                <tr key={u.email} className="hover:bg-brand-cream/40">
                  <td className="py-3 pl-5 pr-3">
                    <span className="flex items-center gap-2.5">
                      <Avatar name={u.name} />
                      <span className="font-medium">{u.name}</span>
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-muted">{u.email}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">{u.phone}</td>
                  <td className="py-3 pr-3">
                    <Chip tone={u.roleTone}>{u.role}</Chip>
                  </td>
                  <td className="py-3 pr-3">{u.location}</td>
                  <td className="py-3 pr-3 text-muted">{u.fabricator}</td>
                  <td className="py-3 pr-3">
                    <Chip tone="green" dot>
                      Active
                    </Chip>
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap text-muted">{u.login}</td>
                  <td className="py-3 pr-5 text-right">
                    <button className="text-muted hover:text-brand-charcoal">
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Card>
    </div>
  );
}
