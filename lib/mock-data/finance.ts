import type { FinanceReceiptRecord } from "@/types";

export const FINANCE_CATEGORIES = [
  "All Categories",
  "Beneficiary Deposit",
  "CSR Grant",
  "Govt Subsidy",
  "Fabricator Advance",
  "Materials Direct",
];

export const INITIAL_RECEIPTS: FinanceReceiptRecord[] = [
  {
    id: "REC-2026-041",
    beneficiary: "Savita Bai Sahu",
    shed: "SH-000123",
    amount: "₹ 1,25,000",
    bankRef: "UTR778291039",
    date: "20-Mar-2026",
    category: "Beneficiary Deposit",
    verified: true,
  },
  {
    id: "REC-2026-039",
    beneficiary: "Laxmi Soni",
    shed: "SH-000118",
    amount: "₹ 1,25,000",
    bankRef: "UTR663819201",
    date: "19-Mar-2026",
    category: "Beneficiary Deposit",
    verified: true,
  },
  {
    id: "REC-2026-035",
    beneficiary: "Mangal Ram",
    shed: "SH-000110",
    amount: "₹ 1,25,000",
    bankRef: "UTR551928374",
    date: "17-Mar-2026",
    category: "Beneficiary Deposit",
    verified: true,
  },
  {
    id: "REC-2026-029",
    beneficiary: "Suresh Verma",
    shed: "SH-000076",
    amount: "₹ 1,25,000",
    bankRef: "UTRPending",
    date: "14-Mar-2026",
    category: "Beneficiary Deposit",
    verified: false,
  },
  {
    id: "REC-2026-022",
    beneficiary: "Shree Ram Steels",
    shed: "SH-000123",
    amount: "₹ 55,500",
    bankRef: "UTR882910411",
    date: "10-Mar-2026",
    category: "Fabricator Advance",
    verified: true,
  },
];

