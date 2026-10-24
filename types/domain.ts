import type { ElementType } from "react";

export type Tone = "green" | "amber" | "red" | "gray" | "blue";

export interface ProjectRecord {
  code: string;
  name: string;
  status: "Active" | "Pending Review" | "Planning" | "Completed" | "On Hold";
  district: string;
  owner: string;
  phone: string;
  sheds: number;
  completed: number;
  targetBudget: string;
  spentBudget: string;
  start: string;
  end: string;
  tagline: string;
  supply: "A" | "B";
  supplyDesc: string;
  contribution: string;
}

export interface ShedRecord {
  shed: string;
  beneficiary: string;
  contact: string;
  village: string;
  district?: string;
  stage: string;
  delayReason: string;
  location: string;
  owner: string;
  progress: number;
  tone: Tone;
  depositStatus?: "Verified" | "Pending" | "Unverified";
  model?: "Model A" | "Model B";
  workOrderRef?: string;
}

export interface BeneficiaryRecord {
  name: string;
  father: string;
  village: string;
  contact: string;
  aadhaar: string;
  status: "Verified" | "Pending" | "Rejected";
  consent: "Signed" | "Pending" | "Refused";
  deposit: "₹1.25 Lakh (Verified)" | "₹1.25 Lakh (Unverified)" | "Pending" | "Not Required";
  tone: Tone;
  shedId?: string;
}

export interface WorkOrderRecord {
  id: string;
  shed: string;
  beneficiary: string;
  fabricator: string;
  model: "Model A" | "Model B";
  value: string;
  status: "In Progress" | "Issued" | "Approved" | "Completed" | "Draft";
  advance: string;
  date: string;
  tone: Tone;
}

export interface DispatchRecord {
  id: string;
  date: string;
  destination: string;
  beneficiary: string;
  warehouse: string;
  truck: string;
  status: "In Transit" | "Dispatched" | "Delivered" | "Delayed";
  received: number;
  dispatched: number;
  tone: Tone;
}

export interface InspectionRecord {
  id: string;
  shed: string;
  beneficiary: string;
  stage: string;
  inspector: string;
  submitted: string;
  status: "Pending Review" | "In Correction" | "Approved" | "Rejected";
  tone: Tone;
  defectsCount?: number;
  photoCount?: number;
}

export interface FinanceReceiptRecord {
  id: string;
  beneficiary: string;
  shed: string;
  amount: string;
  bankRef: string;
  date: string;
  category: "Beneficiary Deposit" | "CSR Grant" | "Govt Subsidy" | "Fabricator Advance" | "Materials Direct";
  verified: boolean;
}

export interface TaskRecord {
  id: string;
  title: string;
  shed: string;
  type: "Task" | "Issue" | "Decision";
  priority: "High" | "Medium" | "Low";
  owner: string;
  due: string;
  status: "Open" | "Done";
}

export interface DocumentRecord {
  id: string;
  name: string;
  category: "KYC & Identity" | "Consent Form" | "Bank Deposit Slip" | "Site Inspection Photo" | "Work Order Copy" | "Handover Certificate";
  shed: string;
  uploadedBy: string;
  date: string;
  size: string;
  status: "Approved" | "Pending" | "Needs Correction";
}

export interface PlatformUserRecord {
  name: string;
  role: string;
  email: string;
  phone: string;
  district: string;
  status: "Active" | "Inactive" | "Invited";
  lastActive: string;
  shedsManaged?: number;
}

export interface TabDefinition {
  label: string;
  count?: string | number;
  active?: boolean;
}

export interface ActivityFeedItem {
  icon: ElementType;
  tint: string;
  text: string;
  time: string;
}

