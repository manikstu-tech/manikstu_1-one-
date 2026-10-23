"use client";

import type { ElementType } from "react";
import { usePathname } from "next/navigation";
import {
  BadgeCheck,
  CalendarDays,
  ChartColumn,
  ClipboardList,
  FileText,
  House,
  IndianRupee,
  Layers,
  LayoutGrid,
  Package,
  Settings,
  UserRound,
  Users,
} from "lucide-react";

export type NavItem = {
  icon: ElementType;
  label: string;
  href: string;
  badge?: string;
};

export const NAV: NavItem[] = [
  { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
  { icon: Layers, label: "Projects", href: "/projects" },
  { icon: Users, label: "Beneficiaries", href: "/beneficiaries" },
  { icon: House, label: "Sites / Sheds", href: "/sites" },
  { icon: CalendarDays, label: "Work Orders", href: "/work-orders" },
  { icon: Package, label: "Materials", href: "/materials" },
  { icon: IndianRupee, label: "Finance", href: "/finance" },
  { icon: ClipboardList, label: "Tasks / Issues", href: "/tasks", badge: "12" },
  { icon: BadgeCheck, label: "AVP Inspections", href: "/inspections" },
  { icon: FileText, label: "Documents", href: "/documents" },
  { icon: ChartColumn, label: "Reports", href: "/reports" },
];

export const NAV_FOOT: NavItem[] = [
  { icon: UserRound, label: "Users & Roles", href: "/users" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

function Item({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active =
    pathname === item.href ||
    (item.href !== "/dashboard" && pathname.startsWith(item.href));

  return (
    <a
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition ${
        active
          ? "bg-brand-green text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      <item.icon className="size-[18px] shrink-0" strokeWidth={1.75} />
      {item.label}
      {item.badge && (
        <span className="ml-auto grid size-5 place-items-center rounded-full bg-brand-red text-[10px] font-bold text-white">
          {item.badge}
        </span>
      )}
    </a>
  );
}

export function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {NAV.map((item) => (
        <Item key={item.label} item={item} onNavigate={onNavigate} />
      ))}
      <div className="my-3 h-px bg-white/15" />
      {NAV_FOOT.map((item) => (
        <Item key={item.label} item={item} onNavigate={onNavigate} />
      ))}
    </>
  );
}
