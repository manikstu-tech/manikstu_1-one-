"use client";

import type { ElementType } from "react";
import Link from "next/link";
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

export function NavItemLink({
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
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`group flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[13px] font-medium transition ${
        active
          ? "bg-brand-green text-white shadow-xs font-semibold"
          : "text-white/75 hover:bg-white/10 hover:text-white"
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50`}
    >
      <item.icon
        className={`size-[17px] shrink-0 transition-transform duration-150 group-hover:scale-105 ${
          active ? "text-white" : "text-white/80"
        }`}
        strokeWidth={active ? 2 : 1.75}
      />
      <span className="truncate">{item.label}</span>
      {item.badge && (
        <span className="ml-auto grid min-w-5 h-5 place-items-center rounded-full bg-brand-red px-1.5 text-[10px] font-bold text-white shadow-xs">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export function MainNavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {NAV.map((item) => (
        <NavItemLink key={item.label} item={item} onNavigate={onNavigate} />
      ))}
    </>
  );
}

export function FootNavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {NAV_FOOT.map((item) => (
        <NavItemLink key={item.label} item={item} onNavigate={onNavigate} />
      ))}
    </>
  );
}

export function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <MainNavList onNavigate={onNavigate} />
      <div className="my-2 h-px bg-white/10" />
      <FootNavList onNavigate={onNavigate} />
    </>
  );
}
