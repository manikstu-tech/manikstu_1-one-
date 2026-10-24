import type { BeneficiaryRecord } from "@/types";

export const BENEFICIARY_STATUSES = [
  "All Statuses",
  "Verified",
  "Pending",
  "Rejected",
];

export const BENEFICIARY_VILLAGES = [
  "All Villages",
  "Kundagaon",
  "Atari",
  "Dhamtari",
  "Kumhari",
  "Arang",
  "Abhanpur",
];

export const CONSENT_OPTIONS = [
  "All Consents",
  "Signed",
  "Pending",
  "Refused",
];

export const INITIAL_BENEFICIARIES: BeneficiaryRecord[] = [
  {
    name: "Savita Bai Sahu",
    father: "Rameshwar Sahu",
    village: "Kundagaon",
    contact: "98765 43210",
    aadhaar: "XXXX-XXXX-4321",
    status: "Verified",
    consent: "Signed",
    deposit: "₹1.25 Lakh (Verified)",
    tone: "green",
    shedId: "SH-000123",
  },
  {
    name: "Laxmi Soni",
    father: "Dinesh Soni",
    village: "Atari",
    contact: "87654 32109",
    aadhaar: "XXXX-XXXX-8765",
    status: "Verified",
    consent: "Signed",
    deposit: "₹1.25 Lakh (Verified)",
    tone: "green",
    shedId: "SH-000118",
  },
  {
    name: "Mangal Ram",
    father: "Budhram Netam",
    village: "Dhamtari",
    contact: "76543 21098",
    aadhaar: "XXXX-XXXX-1234",
    status: "Verified",
    consent: "Signed",
    deposit: "₹1.25 Lakh (Verified)",
    tone: "green",
    shedId: "SH-000110",
  },
  {
    name: "Rekha Patel",
    father: "Manohar Patel",
    village: "Kumhari",
    contact: "65432 10987",
    aadhaar: "XXXX-XXXX-9876",
    status: "Pending",
    consent: "Pending",
    deposit: "Pending",
    tone: "amber",
  },
  {
    name: "Suresh Verma",
    father: "Gopal Verma",
    village: "Arang",
    contact: "94321 09876",
    aadhaar: "XXXX-XXXX-6543",
    status: "Verified",
    consent: "Signed",
    deposit: "Pending",
    tone: "amber",
    shedId: "SH-000076",
  },
  {
    name: "Dhaniram Netam",
    father: "Sukhuram Netam",
    village: "Abhanpur",
    contact: "91234 56780",
    aadhaar: "XXXX-XXXX-3456",
    status: "Rejected",
    consent: "Refused",
    deposit: "Not Required",
    tone: "red",
  },
];

