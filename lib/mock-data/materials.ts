import type { DispatchRecord } from "@/types";

export const DISPATCH_STATUSES = [
  "All Statuses",
  "In Transit",
  "Dispatched",
  "Delivered",
  "Delayed",
];

export const WAREHOUSES = [
  "All Warehouses",
  "Raipur Central Depot",
  "Jagdalpur Hub",
  "Bilaspur Regional Yard",
  "Dhamtari Feeder Depot",
];

export const INITIAL_DISPATCHES: DispatchRecord[] = [
  {
    id: "DSP-2026-089",
    date: "20-Mar-2026",
    destination: "SH-000123 (Kundagaon)",
    beneficiary: "Savita Bai Sahu",
    warehouse: "Raipur Central Depot",
    truck: "CG 04 JB 8892",
    status: "In Transit",
    received: 42,
    dispatched: 56,
    tone: "blue",
  },
  {
    id: "DSP-2026-084",
    date: "18-Mar-2026",
    destination: "SH-000118 (Atari)",
    beneficiary: "Laxmi Soni",
    warehouse: "Jagdalpur Hub",
    truck: "CG 17 AB 4410",
    status: "Dispatched",
    received: 0,
    dispatched: 48,
    tone: "amber",
  },
  {
    id: "DSP-2026-079",
    date: "15-Mar-2026",
    destination: "SH-000110 (Dhamtari)",
    beneficiary: "Mangal Ram",
    warehouse: "Dhamtari Feeder Depot",
    truck: "CG 05 K 1209",
    status: "Delivered",
    received: 60,
    dispatched: 60,
    tone: "green",
  },
  {
    id: "DSP-2026-071",
    date: "12-Mar-2026",
    destination: "SH-000092 (Kumhari)",
    beneficiary: "Rekha Patel",
    warehouse: "Raipur Central Depot",
    truck: "CG 04 JB 6211",
    status: "Delivered",
    received: 72,
    dispatched: 72,
    tone: "green",
  },
  {
    id: "DSP-2026-068",
    date: "09-Mar-2026",
    destination: "SH-000076 (Arang)",
    beneficiary: "Suresh Verma",
    warehouse: "Bilaspur Regional Yard",
    truck: "CG 10 Z 9021",
    status: "Delayed",
    received: 12,
    dispatched: 50,
    tone: "red",
  },
];

