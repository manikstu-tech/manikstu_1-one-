import type { WorkOrderRecord } from "@/types";

export const WO_STATUSES = [
  "All Statuses",
  "In Progress",
  "Issued",
  "Approved",
  "Completed",
  "Draft",
];

export const FABRICATORS = [
  "All Fabricators",
  "Shree Ram Steels",
  "Chhattisgarh Prefab Works",
  "Kalinga Agrotech Fab",
  "Bastariya Rural Infra",
  "Apex Steel Fabricators",
];

export const MODELS = [
  "All Models",
  "Model A",
  "Model B",
];

export const INITIAL_WORK_ORDERS: WorkOrderRecord[] = [
  {
    id: "WO-2026-0147",
    shed: "SH-000123",
    beneficiary: "Savita Bai Sahu",
    fabricator: "Shree Ram Steels",
    model: "Model B",
    value: "₹ 1,85,000",
    status: "In Progress",
    advance: "30% Released",
    date: "14-Feb-2026",
    tone: "green",
  },
  {
    id: "WO-2026-0142",
    shed: "SH-000118",
    beneficiary: "Laxmi Soni",
    fabricator: "Chhattisgarh Prefab Works",
    model: "Model A",
    value: "₹ 2,40,000",
    status: "Issued",
    advance: "Pending Verification",
    date: "18-Feb-2026",
    tone: "amber",
  },
  {
    id: "WO-2026-0138",
    shed: "SH-000110",
    beneficiary: "Mangal Ram",
    fabricator: "Bastariya Rural Infra",
    model: "Model B",
    value: "₹ 1,85,000",
    status: "Approved",
    advance: "50% Released",
    date: "22-Feb-2026",
    tone: "green",
  },
  {
    id: "WO-2026-0129",
    shed: "SH-000092",
    beneficiary: "Rekha Patel",
    fabricator: "Shree Ram Steels",
    model: "Model A",
    value: "₹ 2,40,000",
    status: "Completed",
    advance: "100% Settled",
    date: "05-Jan-2026",
    tone: "green",
  },
  {
    id: "WO-2026-0115",
    shed: "SH-000076",
    beneficiary: "Suresh Verma",
    fabricator: "Kalinga Agrotech Fab",
    model: "Model B",
    value: "₹ 1,85,000",
    status: "Draft",
    advance: "Awaiting Contribution",
    date: "28-Feb-2026",
    tone: "gray",
  },
];

