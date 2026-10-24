import type { TaskRecord } from "@/types";

export const TASK_CATEGORIES = [
  "All Categories",
  "Task",
  "Issue",
  "Decision",
];

export const TASK_PRIORITIES = [
  "All Priorities",
  "High",
  "Medium",
  "Low",
];

export const TASK_OWNERS = [
  "All Owners",
  "Ramesh Kumar",
  "Manoj Singh",
  "Kunti Devi",
  "Aftab Khan",
  "Priya Verma",
];

export const INITIAL_TASKS: TaskRecord[] = [
  {
    id: "TSK-2026-049",
    title: "Verify foundation concrete curing before steel frame unloading",
    shed: "SH-000123",
    type: "Task",
    priority: "High",
    owner: "Ramesh Kumar",
    due: "24-Mar-2026",
    status: "Open",
  },
  {
    id: "TSK-2026-046",
    title: "Address alignment defect flagged on welded GI wire mesh panel",
    shed: "SH-000118",
    type: "Issue",
    priority: "High",
    owner: "Manoj Singh",
    due: "25-Mar-2026",
    status: "Open",
  },
  {
    id: "TSK-2026-042",
    title: "Review AVP structural completion certification for handover",
    shed: "SH-000092",
    type: "Decision",
    priority: "Medium",
    owner: "Aftab Khan",
    due: "26-Mar-2026",
    status: "Done",
  },
  {
    id: "TSK-2026-039",
    title: "Confirm second installment UTR with district cooperative bank",
    shed: "SH-000076",
    type: "Task",
    priority: "Medium",
    owner: "Kunti Devi",
    due: "27-Mar-2026",
    status: "Open",
  },
  {
    id: "TSK-2026-033",
    title: "Deliver localized Hindi beneficiary agreement copy",
    shed: "SH-000110",
    type: "Task",
    priority: "Low",
    owner: "Priya Verma",
    due: "28-Mar-2026",
    status: "Done",
  },
];

