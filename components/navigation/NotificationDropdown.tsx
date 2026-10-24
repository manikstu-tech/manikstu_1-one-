"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AtSign,
  BadgeCheck,
  Bell,
  CheckCheck,
  ChevronRight,
  FileText,
  MessageCircle,
  Package,
  TriangleAlert,
} from "lucide-react";
import type { ElementType } from "react";
import { useToast } from "@/components/ui";

export interface NotificationItem {
  id: string;
  icon: ElementType;
  tint: string;
  title: string;
  meta: string;
  sub?: string;
  time: string;
  unread: boolean;
  href?: string;
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    icon: Bell,
    tint: "bg-red-50 text-brand-red",
    title: "AVP inspection requires review",
    meta: "SH-000123 · Kumhari, Raipur",
    sub: "Submitted by Savitri Devi",
    time: "10 min ago",
    unread: true,
    href: "/inspections",
  },
  {
    id: "notif-2",
    icon: AtSign,
    tint: "bg-blue-50 text-blue-600",
    title: "You were mentioned in a comment",
    meta: "SH-000118 · Arang",
    sub: 'Ramesh Kumar: "Please check the roof photos"',
    time: "32 min ago",
    unread: true,
    href: "/tasks",
  },
  {
    id: "notif-3",
    icon: FileText,
    tint: "bg-success-bg text-brand-leaf",
    title: "New document uploaded",
    meta: "SH-000125 · Simga",
    sub: "3 photos uploaded · Roofing Stage",
    time: "1 hour ago",
    unread: true,
    href: "/documents",
  },
  {
    id: "notif-4",
    icon: BadgeCheck,
    tint: "bg-success-bg text-brand-leaf",
    title: "Inspection approved",
    meta: "SH-000107 · Kandagaon",
    sub: "Reviewed by Manoj Singh",
    time: "2 hours ago",
    unread: false,
    href: "/inspections",
  },
  {
    id: "notif-5",
    icon: Package,
    tint: "bg-amber-50 text-brand-gold",
    title: "Material receipt pending",
    meta: "SH-000132 · Abhanpur",
    sub: "Expected today",
    time: "3 hours ago",
    unread: false,
    href: "/materials",
  },
  {
    id: "notif-6",
    icon: MessageCircle,
    tint: "bg-success-bg text-brand-leaf",
    title: "WhatsApp message delivered",
    meta: "SH-000121 · Raipur",
    sub: "Vaccination Reminder · Lakhmi Bai",
    time: "4 hours ago",
    unread: false,
    href: "/notifications",
  },
  {
    id: "notif-7",
    icon: TriangleAlert,
    tint: "bg-red-50 text-brand-red",
    title: "Sync failed for 2 items",
    meta: "Check your internet connection",
    time: "5 hours ago",
    unread: false,
    href: "/notifications",
  },
  {
    id: "notif-8",
    icon: FileText,
    tint: "bg-amber-50 text-brand-gold",
    title: "KYC document requires attention",
    meta: "SH-000109 · Tilda",
    sub: "Aadhaar not clear",
    time: "6 hours ago",
    unread: false,
    href: "/documents",
  },
];

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [items, setItems] = useState<NotificationItem[]>(DEFAULT_NOTIFICATIONS);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const { showToast } = useToast();

  const unreadCount = items.filter((n) => n.unread).length;

  const filteredItems = items.filter((n) => {
    if (filter === "unread") return n.unread;
    return true;
  });

  // Smooth hover handlers with small delay to prevent accidental collapse
  function handleMouseEnter() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  }

  function handleMouseLeave() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 250);
  }

  // Click outside and escape key handling
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleMarkAllAsRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast("All notifications marked as read.", "success");
  }

  function handleItemClick(notif: NotificationItem) {
    setItems((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
    );
    setOpen(false);
    if (notif.href) {
      router.push(notif.href);
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Bell Button Trigger */}
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`View notifications (${unreadCount || 12} unread)`}
        onClick={() => setOpen((v) => !v)}
        className="relative grid size-9 place-items-center rounded-lg text-brand-charcoal/70 transition hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
      >
        <Bell className="size-5" strokeWidth={1.75} />
        <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-brand-red text-[9px] font-bold text-white shadow-xs">
          {unreadCount > 0 ? unreadCount : 12}
        </span>
      </button>

      {/* Hover / Click Popup Menu */}
      {open && (
        <div
          role="region"
          aria-label="Notifications Panel"
          className="absolute right-0 top-full z-50 mt-2 w-80 sm:w-96 overflow-hidden rounded-2xl border border-line bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line bg-brand-cream/40 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-brand-charcoal">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-brand-red/10 px-2 py-0.5 text-[10px] font-bold text-brand-red">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-1 text-[11px] font-semibold text-brand-green hover:underline"
              >
                <CheckCheck className="size-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* Quick Filter Bar */}
          <div className="flex gap-2 border-b border-line/60 px-4 py-2 text-xs">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-md px-2.5 py-1 font-semibold transition ${
                filter === "all"
                  ? "bg-brand-green text-white shadow-xs"
                  : "text-muted hover:bg-brand-cream"
              }`}
            >
              All ({items.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={`rounded-md px-2.5 py-1 font-semibold transition ${
                filter === "unread"
                  ? "bg-brand-green text-white shadow-xs"
                  : "text-muted hover:bg-brand-cream"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Notifications Scroll Area */}
          <div className="max-h-[380px] divide-y divide-line/60 overflow-y-auto no-scrollbar">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted">
                No {filter === "unread" ? "unread " : ""}notifications.
              </div>
            ) : (
              filteredItems.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleItemClick(n)}
                  className={`flex cursor-pointer items-start gap-3 p-3.5 transition hover:bg-brand-cream/50 ${
                    n.unread ? "bg-brand-cream/20" : ""
                  }`}
                >
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-lg ${n.tint} mt-0.5`}
                  >
                    <n.icon className="size-4" strokeWidth={1.75} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p
                        className={`truncate text-xs ${
                          n.unread
                            ? "font-bold text-brand-charcoal"
                            : "font-semibold text-brand-charcoal/85"
                        }`}
                      >
                        {n.title}
                      </p>
                      <span className="shrink-0 text-[10px] text-muted">
                        {n.time}
                      </span>
                    </div>

                    <p className="mt-0.5 truncate text-[11px] text-muted">
                      {n.meta}
                    </p>

                    {n.sub && (
                      <p className="mt-1 text-[11px] text-brand-charcoal/70">
                        {n.sub}
                      </p>
                    )}
                  </div>

                  {n.unread && (
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-green" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer View All Link */}
          <div className="border-t border-line bg-brand-cream/30 p-2.5 text-center">
            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline"
            >
              View all 12 notifications
              <ChevronRight className="size-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

