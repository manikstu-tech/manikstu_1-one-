"use client";

import { useState, useMemo } from "react";
import {
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
  EmptyState,
  FilterBar,
  FilterSelect,
  GhostButton,
  Modal,
  PageHeader,
  PaginationNote,
  PrimaryButton,
  SearchInput,
  Tabs,
  TableWrap,
  Th,
  useToast,
  type Tone,
} from "@/components/ui";
import { NewTaskModal } from "@/components/modals";
import type { TaskRecord } from "@/types";

const TYPE_META: Record<string, { tone: Tone; icon: typeof TriangleAlert }> = {
  Issue: { tone: "red", icon: TriangleAlert },
  Task: { tone: "green", icon: SquareCheckBig },
  Decision: { tone: "blue", icon: GitBranch },
};

export interface TaskItem {
  id?: string;
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
  myTask?: boolean;
}

const INITIAL_ROWS: TaskItem[] = [
  { id: "T-101", title: "Complete column alignment at site", context: "Savitri Bai Sahu · Kundagaon", shed: "SH-000123", type: "Issue", priority: "High", pTone: "red", owner: "Ramesh Kumar", due: "22-Mar-2026", age: "2d", status: "Open", sTone: "red", myTask: true },
  { id: "T-102", title: "Upload AVP inspection photos", context: "Kamla Dewangan · Arang", shed: "SH-000124", type: "Task", priority: "Medium", pTone: "amber", owner: "Aftab Khan", due: "21-Mar-2026", age: "1d", status: "In Progress", sTone: "amber", myTask: true },
  { id: "T-103", title: "Release advance payment to fabricator", context: "Ramesh Kumar · Site Supervisor", shed: "SH-000125", type: "Decision", priority: "High", pTone: "red", owner: "Aftab Khan", due: "20-Mar-2026", age: "3d", status: "Pending", sTone: "amber", myTask: true },
  { id: "T-104", title: "Material shortage - GI wire mesh", context: "Rekha Yadav · Abhanpur", shed: "SH-000118", type: "Issue", priority: "High", pTone: "red", owner: "Jitu Singh", due: "20-Mar-2026", age: "3d", status: "Open", sTone: "red" },
  { id: "T-105", title: "Update work order with revised qty", context: "Lata Verma · Tilda", shed: "SH-000117", type: "Task", priority: "Medium", pTone: "amber", owner: "Rajesh B", due: "22-Mar-2026", age: "2d", status: "In Progress", sTone: "amber" },
  { id: "T-106", title: "Site leveling pending", context: "Sunita Netam · Simga", shed: "SH-000113", type: "Issue", priority: "Medium", pTone: "amber", owner: "Yogesh N", due: "23-Mar-2026", age: "1d", status: "Open", sTone: "red" },
  { id: "T-107", title: "Collect beneficiary contribution receipt", context: "Mangi Bai · Mandir Hasaud", shed: "SH-000109", type: "Task", priority: "Low", pTone: "green", owner: "Asha S", due: "25-Mar-2026", age: "0d", status: "Not Started", sTone: "gray" },
  { id: "T-108", title: "Weld mesh gate correction", context: "Phoolmati · Kharora", shed: "SH-000105", type: "Issue", priority: "High", pTone: "red", owner: "Aftab Khan", due: "21-Mar-2026", age: "1d", status: "In Progress", sTone: "amber", myTask: true },
  { id: "T-109", title: "Submit quality check report", context: "Ramesh Kumar · Site Supervisor", shed: "SH-000101", type: "Task", priority: "Medium", pTone: "amber", owner: "Ramesh Kumar", due: "24-Mar-2026", age: "1d", status: "In Progress", sTone: "amber" },
  { id: "T-110", title: "Resolve drainage issue", context: "Kamla Dewangan · Arang", shed: "SH-000124", type: "Issue", priority: "High", pTone: "red", owner: "Yogesh N", due: "19-Mar-2026", age: "4d", status: "Open", sTone: "red" },
  { id: "T-111", title: "Get design approval for shed extension", context: "Sukmati Bai · Doma", shed: "SH-000098", type: "Decision", priority: "Medium", pTone: "amber", owner: "Aftab Khan", due: "26-Mar-2026", age: "0d", status: "Pending", sTone: "amber", myTask: true },
  { id: "T-112", title: "Transport delivery rescheduling", context: "Savitri Bai Sahu · Kundagaon", shed: "SH-000123", type: "Task", priority: "Low", pTone: "green", owner: "Jitu Singh", due: "27-Mar-2026", age: "0d", status: "Not Started", sTone: "gray" },
];

const TYPES = ["All Types", "Issue", "Task", "Decision"];
const PRIORITIES = ["All Priority", "High", "Medium", "Low"];
const OWNERS = ["All Owners", "Aftab Khan", "Ramesh Kumar", "Jitu Singh", "Rajesh B", "Yogesh N", "Asha S"];
const STATUSES = ["All Status", "Open", "In Progress", "Pending", "Not Started", "Completed"];

export default function TasksPage() {
  const { showToast } = useToast();
  const [rows, setRows] = useState<TaskItem[]>(INITIAL_ROWS);
  const [activeTab, setActiveTab] = useState("All Tasks");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [priorityFilter, setPriorityFilter] = useState("All Priority");
  const [ownerFilter, setOwnerFilter] = useState("All Owners");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchTab =
        activeTab === "All Tasks" ||
        (activeTab === "My Tasks" && r.myTask) ||
        (activeTab === "Overdue" && r.due.includes("19-Mar")) ||
        (activeTab === "Issues" && r.type === "Issue") ||
        (activeTab === "Decisions" && r.type === "Decision") ||
        (activeTab === "Completed" && r.status === "Completed");

      const matchSearch =
        search.trim() === "" ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.shed.toLowerCase().includes(search.toLowerCase()) ||
        r.owner.toLowerCase().includes(search.toLowerCase()) ||
        r.context.toLowerCase().includes(search.toLowerCase());

      const matchType = typeFilter === "All Types" || r.type === typeFilter;
      const matchPriority = priorityFilter === "All Priority" || r.priority === priorityFilter;
      const matchOwner = ownerFilter === "All Owners" || r.owner === ownerFilter;
      const matchStatus = statusFilter === "All Status" || r.status === statusFilter;

      return matchTab && matchSearch && matchType && matchPriority && matchOwner && matchStatus;
    });
  }, [rows, activeTab, search, typeFilter, priorityFilter, ownerFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginatedRows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function resetFilters() {
    setSearch("");
    setActiveTab("All Tasks");
    setTypeFilter("All Types");
    setPriorityFilter("All Priority");
    setOwnerFilter("All Owners");
    setStatusFilter("All Status");
    setCurrentPage(1);
    showToast("Filters reset to default view.", "info");
  }

  function handleCreateTask(taskRecord: TaskRecord) {
    const newTask: TaskItem = {
      id: `T-${rows.length + 101}`,
      title: taskRecord.title,
      context: `${taskRecord.owner} · ${taskRecord.shed}`,
      shed: taskRecord.shed,
      type: taskRecord.type,
      priority: taskRecord.priority,
      pTone: taskRecord.priority === "High" ? "red" : taskRecord.priority === "Medium" ? "amber" : "green",
      owner: taskRecord.owner,
      due: taskRecord.due,
      age: "0d",
      status: "Open",
      sTone: "red",
      myTask: taskRecord.owner === "Aftab Khan",
    };

    setRows((prev) => [newTask, ...prev]);
    showToast(`Task "${taskRecord.title}" created successfully!`, "success");
  }

  function handleToggleStatus(task: TaskItem) {
    const nextStatus = task.status === "Completed" ? "Open" : "Completed";
    const nextTone: Tone = nextStatus === "Completed" ? "green" : "red";

    setRows((prev) =>
      prev.map((r) =>
        r.id === task.id ? { ...r, status: nextStatus, sTone: nextTone } : r
      )
    );

    showToast(`Task ${task.id} marked as ${nextStatus}.`, "info");
    if (selectedTask?.id === task.id) {
      setSelectedTask((prev) => (prev ? { ...prev, status: nextStatus, sTone: nextTone } : null));
    }
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={["Tasks & Issues", "Operational Queue"]} />
      <PageHeader
        title="Tasks & Issues"
        subtitle="Operational tasks, reported defects and decisions for Project AJAH"
        actions={
          <>
            <GhostButton onClick={() => showToast(`Exported ${filtered.length} tasks.`, "success")}>
              <Download className="size-4" /> Export
            </GhostButton>
            <PrimaryButton onClick={() => setShowNewModal(true)}>
              <Plus className="size-4" /> Create Task / Issue
            </PrimaryButton>
          </>
        }
      />

      <Tabs
        tabs={[
          { label: "All Tasks", count: rows.length },
          { label: "My Tasks", count: rows.filter((r) => r.myTask).length },
          { label: "Overdue", count: rows.filter((r) => r.due.includes("19-Mar")).length },
          { label: "Issues", count: rows.filter((r) => r.type === "Issue").length },
          { label: "Decisions", count: rows.filter((r) => r.type === "Decision").length },
          { label: "Completed", count: rows.filter((r) => r.status === "Completed").length },
        ]}
        activeTab={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          setCurrentPage(1);
        }}
      />

      <FilterBar>
        <SearchInput
          placeholder="Search by title, Shed ID, owner or beneficiary..."
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label="Category"
          value={typeFilter}
          options={TYPES}
          onChange={(val) => {
            setTypeFilter(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label="Priority"
          value={priorityFilter}
          options={PRIORITIES}
          onChange={(val) => {
            setPriorityFilter(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label="Owner"
          value={ownerFilter}
          options={OWNERS}
          onChange={(val) => {
            setOwnerFilter(val);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          label="Status"
          value={statusFilter}
          options={STATUSES}
          onChange={(val) => {
            setStatusFilter(val);
            setCurrentPage(1);
          }}
        />
        {(search || typeFilter !== "All Types" || priorityFilter !== "All Priority" || ownerFilter !== "All Owners" || statusFilter !== "All Status") && (
          <GhostButton onClick={resetFilters} className="text-xs">
            Reset Filters
          </GhostButton>
        )}
      </FilterBar>

      <Card padded={false}>
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Displaying {filtered.length} of {rows.length} Action Items
          </p>
          <GhostButton onClick={() => showToast("Task view configured.", "info")} className="h-8 px-2 text-xs">
            <SlidersHorizontal className="size-3.5" /> Columns
          </GhostButton>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No action items found"
            description="No tasks or defects match your current search and filters."
            onReset={resetFilters}
          />
        ) : (
          <>
            <TableWrap>
              <table className="w-full min-w-[960px] text-[13px]">
                <thead>
                  <tr className="border-b border-line text-left text-xs font-semibold text-muted">
                    <th className="py-2.5 pl-5 pr-3">ID</th>
                    <Th>Title & Context</Th>
                    <Th>Shed ID</Th>
                    <Th>Type</Th>
                    <Th>Priority</Th>
                    <Th>Owner</Th>
                    <Th>Due Date</Th>
                    <Th>Age</Th>
                    <Th>Status</Th>
                    <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {paginatedRows.map((r) => {
                    const meta = TYPE_META[r.type];
                    const Icon = meta.icon;
                    return (
                      <tr
                        key={r.id}
                        onClick={() => setSelectedTask(r)}
                        className="cursor-pointer transition hover:bg-brand-cream/50"
                      >
                        <td className="py-3 pl-5 pr-3 font-semibold text-brand-green">{r.id}</td>
                        <td className="py-3 pr-3">
                          <p className="font-semibold text-brand-charcoal hover:underline">{r.title}</p>
                          <p className="text-xs text-muted">{r.context}</p>
                        </td>
                        <td className="py-3 pr-3 font-medium text-brand-green">{r.shed}</td>
                        <td className="py-3 pr-3">
                          <Chip tone={meta.tone} icon={Icon}>
                            {r.type}
                          </Chip>
                        </td>
                        <td className="py-3 pr-3">
                          <Chip tone={r.pTone}>{r.priority}</Chip>
                        </td>
                        <td className="py-3 pr-3">
                          <span className="flex items-center gap-2">
                            <Avatar name={r.owner} />
                            <span className="font-medium text-brand-charcoal">{r.owner}</span>
                          </span>
                        </td>
                        <td className="py-3 pr-3 whitespace-nowrap text-muted">{r.due}</td>
                        <td className="py-3 pr-3 text-muted">{r.age}</td>
                        <td className="py-3 pr-3">
                          <Chip tone={r.sTone} dot>
                            {r.status}
                          </Chip>
                        </td>
                        <td className="py-3 pr-5 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleStatus(r);
                            }}
                            className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                              r.status === "Completed"
                                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                : "bg-brand-green/10 text-brand-leaf hover:bg-brand-green hover:text-white"
                            }`}
                          >
                            {r.status === "Completed" ? "Reopen" : "Mark Done"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </TableWrap>

            <div className="border-t border-line px-5 py-3">
              <PaginationNote
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => setCurrentPage(p)}
              >
                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} entries
              </PaginationNote>
            </div>
          </>
        )}
      </Card>

      {/* Detail Modal */}
      {selectedTask && (
        <Modal
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          title={`Task Details — ${selectedTask.id}`}
          subtitle={`Operational item for ${selectedTask.shed}`}
          maxWidth="max-w-md"
          footer={
            <div className="flex w-full items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggleStatus(selectedTask)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold text-white shadow-xs transition ${
                  selectedTask.status === "Completed"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-brand-green hover:bg-brand-leaf"
                }`}
              >
                {selectedTask.status === "Completed" ? "Re-open Item" : "Mark as Resolved"}
              </button>
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="rounded-lg border border-line bg-white px-4 py-2 text-xs font-medium hover:bg-brand-cream"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-3">
            <div className="rounded-xl border border-line bg-brand-cream/60 p-3.5">
              <p className="text-xs text-muted">Title</p>
              <p className="text-sm font-bold text-brand-charcoal mt-0.5">{selectedTask.title}</p>
              <p className="text-xs text-muted mt-1">{selectedTask.context}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-line p-2.5">
                <p className="text-muted">Classification</p>
                <p className="font-semibold text-brand-charcoal mt-0.5">{selectedTask.type} ({selectedTask.priority} Priority)</p>
              </div>
              <div className="rounded-lg border border-line p-2.5">
                <p className="text-muted">Target Due Date</p>
                <p className="font-semibold text-brand-charcoal mt-0.5">{selectedTask.due}</p>
              </div>
            </div>

            <div className="rounded-lg border border-line p-2.5 text-xs">
              <p className="text-muted">Assigned Owner</p>
              <p className="font-semibold text-brand-charcoal mt-0.5">{selectedTask.owner}</p>
            </div>
          </div>
        </Modal>
      )}

      <NewTaskModal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
}
