import type { PlatformUserRecord } from "@/types";

export const USER_ROLES = [
  "All Roles",
  "Operations Manager",
  "Field Supervisor",
  "AVP Infrastructure Approver",
  "Finance Officer",
  "Fabricator Representative",
];

export const INITIAL_USERS: PlatformUserRecord[] = [
  {
    name: "Aftab Khan",
    role: "Operations Manager",
    email: "aftab.khan@manikstu.com",
    phone: "+91 98765 43210",
    district: "Raipur, Chhattisgarh",
    status: "Active",
    lastActive: "Active Now",
    shedsManaged: 142,
  },
  {
    name: "Ramesh Kumar",
    role: "Field Supervisor",
    email: "ramesh.kumar@manikstu.com",
    phone: "+91 87654 32109",
    district: "Bastar & Kundagaon",
    status: "Active",
    lastActive: "12m ago",
    shedsManaged: 48,
  },
  {
    name: "Manoj Singh",
    role: "Field Supervisor",
    email: "manoj.singh@manikstu.com",
    phone: "+91 76543 21098",
    district: "Dhamtari & Kanker",
    status: "Active",
    lastActive: "1h ago",
    shedsManaged: 52,
  },
  {
    name: "Shri Ram",
    role: "AVP Infrastructure Approver",
    email: "shri.ram@manikstu.com",
    phone: "+91 91234 56789",
    district: "State Headquarters",
    status: "Active",
    lastActive: "25m ago",
    shedsManaged: 372,
  },
  {
    name: "Kunti Devi",
    role: "Field Coordinator",
    email: "kunti.devi@manikstu.com",
    phone: "+91 94321 09876",
    district: "Durg & Patan",
    status: "Active",
    lastActive: "3h ago",
    shedsManaged: 34,
  },
  {
    name: "Sunil Sahu",
    role: "Fabricator Representative",
    email: "sunil@shreeramsteels.com",
    phone: "+91 90123 45678",
    district: "Raipur Fabrication Unit",
    status: "Invited",
    lastActive: "Invited 2d ago",
    shedsManaged: 18,
  },
];

