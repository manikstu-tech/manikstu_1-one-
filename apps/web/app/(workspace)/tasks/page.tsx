import {
  CircleCheck,
  Download,
  GitBranch,
  Plus,
  SlidersHorizontal,
  SquareCheckBig,
  TriangleAlert,
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
  PaginationNote,
  PrimaryButton,
  SearchInput,
  Tabs,
  TableWrap,
  Th,
  type Tone,
} from "../_components";

const TYPE_META: Record<string, { tone: Tone; icon: typeof TriangleAlert }> = {
  Issue: { tone: "red", icon: TriangleAlert },
  Task: { tone: "green", icon: SquareCheckBig },
  Decision: { tone: "blue", icon: GitBranch },
};

const ROWS: {
  title: string;
  context: string;
  shed: string;
  type: keyof typeof TYPE_META;
  priority: string;
  pTone: Tone;
  owner: string;
  due: string;
  age: string;
  status: string;
  sTone: Tone;
}[] = [
  { title: "Complete column alignment at site", context: "Savitri Bai Sahu · Kundagaon", shed: "SH-000123", type: "Issue", priority: "High", pTone: "red", owner: "Ramesh Kumar", due: "22-Mar-2026", age: "2d", status: "Open", sTone: "red" },
  { title: "Upload AVP inspection photos", context: "Kamla Dewangan · Arang", shed: "SH-000124", type: "Task", priority: "Medium", pTone: "amber", owner: "Rajesh B", due: "21-Mar-2026", age: "1d", status: "In Progress", sTone: "amber" },
  { title: "Release advance payment to fabricator", context: "Ramesh Kumar · Site Supervisor", shed: "—", type: "Decision", priority: "High", pTone: "red", owner: "Aftab Khan", due: "20-Mar-2026", age: "3d", status: "Pending", sTone: "amber" },
  { title: "Material shortage - GI wire mesh", context: "Rekha Yadav · Abhanpur", shed: "SH-000118", type: "Issue", priority: "High", pTone: "red", owner: "Jitu Singh", due: "20-Mar-2026", age: "3d", status: "Open", sTone: "red" },
  { title: "Update work order with revised qty", context: "Lata Verma · Tilda", shed: "SH-000117", type: "Task", priority: "Medium", pTone: "amber", owner: "Rajesh B", due: "22-Mar-2026", age: "2d", status: "In Progress", sTone: "amber" },
  { title: "Site leveling pending", context: "Sunita Netam · Simga", shed: "SH-000113", type: "Issue", priority: "Medium", pTone: "amber", owner: "Yogesh N", due: "23-Mar-2026", age: "1d", status: "Open", sTone: "red" },
  { title: "Collect beneficiary contribution receipt", context: "Mangi Bai · Mandir Hasaud", shed: "SH-000109", type: "Task", priority: "Low", pTone: "green", owner: "Asha S", due: "25-Mar-2026", age: "0d", status: "Not Started", sTone: "gray" },
  { title: "Weld mesh gate correction", context: "Phoolmati · Kharora", shed: "SH-000105", type: "Issue", priority: "High", pTone: "red", owner: "Rajesh B", due: "21-Mar-2026", age: "1d", status: "In Progress", sTone: "amber" },
  { title: "Submit quality check report", context: "Ramesh Kumar · Site Supervisor", shed: "SH-000101", type: "Task", priority: "Medium", pTone: "amber", owner: "Ramesh Kumar", due: "24-Mar-2026", age: "1d", status: "In Progress", sTone: "amber" },
  { title: "Resolve drainage issue", context: "Kamla Dewangan · Arang", shed: "SH-000124", type: "Issue", priority: "High", pTone: "red", owner: "Yogesh N", due: "19-Mar-2026", age: "4d", status: "Open", sTone: "red" },
  { title: "Get design approval for shed extension", context: "Sukmati Bai · Doma", shed: "SH-000098", type: "Decision", priority: "Medium", pTone: "amber", owner: "Aftab Khan", due: "26-Mar-2026", age: "0d", status: "Pending", sTone: "amber" },
  { title: "Transport delivery rescheduling", context: "Savitri Bai Sahu · Kundagaon", shed: "SH-000123", type: "Task", priority: "Low", pTone: "green", owner: "Jitu Singh", due: "27-Mar-2026", age: "0d", status: "Not Started", sTone: "gray" },
];

export default function TasksPage() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={["Tasks & Issues"]} />
      <PageHeader
        title="Tasks & Issues"
        subtitle="Track and resolve project tasks, issues and decisions across AJAH"
        actions={
          <>
            <PrimaryButton>
              <Plus className="size-4" /> Create Task
            </PrimaryButton>
            <GhostButton>
              <SlidersHorizontal className="size-4" /> Filters
            </GhostButton>
            <GhostButton>
              <Download className="size-4" /> Export
            </GhostButton>
          </>
        }
      />

      <Tabs
        tabs={[
          { label: "All Tasks", count: 32, active: true },
          { label: "My Tasks", count: 8 },
          { label: "Overdue", count: 7 },
          { label: "Issues", count: 6 },
          { label: "Decisions", count: 4 },
          { label: "Completed" },
        ]}
      />

      <FilterBar>
        <SearchInput placeholder="Search by title, shed ID, beneficiary, village..." />
        <FilterSelect label="All Types" />
        <FilterSelect label="All Priority" />
        <FilterSelect label="All Owners" />
        <FilterSelect label="All Status" />
      </FilterBar>

      <Card padded={false}>
        <TableWrap>
          <table className="w-full min-w-[920px] text-[13px]">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="py-2.5 pl-5 pr-3 font-medium">#</th>
                <Th>Title</Th>
                <Th>Shed ID</Th>
                <Th>Type</Th>
                <Th>Priority</Th>
                <Th>Owner</Th>
                <Th>Due Date</Th>
                <Th>Age</Th>
                <th className="py-2.5 pr-5 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {ROWS.map((r, i) => {
                const tm = TYPE_META[r.type];
                return (
                  <tr key={i} className="hover:bg-brand-cream/40">
                    <td className="py-3 pl-5 pr-3 text-muted">{i + 1}</td>
                    <td className="py-3 pr-3">
                      <p className="font-medium">{r.title}</p>
                      <p className="text-xs text-muted">{r.context}</p>
                    </td>
                    <td className="py-3 pr-3 font-semibold text-brand-green">{r.shed}</td>
                    <td className="py-3 pr-3">
                      <Chip tone={tm.tone} icon={tm.icon}>
                        {r.type}
                      </Chip>
                    </td>
                    <td className="py-3 pr-3">
                      <Chip tone={r.pTone} dot>
                        {r.priority}
                      </Chip>
                    </td>
                    <td className="py-3 pr-3">
                      <span className="flex items-center gap-2">
                        <Avatar name={r.owner} size={7} />
                        <span className="whitespace-nowrap">{r.owner}</span>
                      </span>
                    </td>
                    <td className="py-3 pr-3 whitespace-nowrap">{r.due}</td>
                    <td className="py-3 pr-3 text-brand-red">{r.age}</td>
                    <td className="py-3 pr-5">
                      <Chip tone={r.sTone} icon={r.status === "Open" ? TriangleAlert : r.status.includes("Progress") ? undefined : r.status === "Not Started" ? undefined : CircleCheck}>
                        {r.status}
                      </Chip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrap>
        <div className="px-5 pb-4">
          <PaginationNote>Showing 1 to 12 of 32 tasks (illustrative data)</PaginationNote>
        </div>
      </Card>
    </div>
  );
}
