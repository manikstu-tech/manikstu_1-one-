"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  House,
  Users,
  Layers,
  FileText,
  Package,
  IndianRupee,
  ClipboardList,
  BadgeCheck,
  Settings,
  CircleHelp,
  ArrowRight,
  UserRound,
  Bell,
  HardHat,
  X,
} from "lucide-react";
import type { ElementType } from "react";

interface SearchItem {
  id: string;
  category: "Navigation" | "Sheds" | "Beneficiaries" | "Work Orders";
  title: string;
  subtitle: string;
  href: string;
  icon: ElementType;
}

const ITEMS: SearchItem[] = [
  // Navigation
  { id: "nav-dash", category: "Navigation", title: "Dashboard", subtitle: "Operational overview & KPIs", href: "/dashboard", icon: House },
  { id: "nav-proj", category: "Navigation", title: "Projects Portfolio", subtitle: "Manage all 5 projects", href: "/projects", icon: Layers },
  { id: "nav-bene", category: "Navigation", title: "Beneficiaries", subtitle: "Approval, verification & consent", href: "/beneficiaries", icon: Users },
  { id: "nav-shed", category: "Navigation", title: "Sites / Shed Register", subtitle: "142 active sheds & stages", href: "/sites", icon: House },
  { id: "nav-wo", category: "Navigation", title: "Work Orders", subtitle: "Fabricator allocations & models", href: "/work-orders", icon: HardHat },
  { id: "nav-mat", category: "Navigation", title: "Materials & Dispatch", subtitle: "Warehouse dispatch & receipt", href: "/materials", icon: Package },
  { id: "nav-fin", category: "Navigation", title: "Finance Ledgers", subtitle: "Receipts, expenses & reconciliation", href: "/finance", icon: IndianRupee },
  { id: "nav-insp", category: "Navigation", title: "AVP Inspections", subtitle: "Field evidence approval queue", href: "/inspections", icon: BadgeCheck },
  { id: "nav-task", category: "Navigation", title: "Tasks & Issues", subtitle: "48 action items & overdue tracking", href: "/tasks", icon: ClipboardList },
  { id: "nav-doc", category: "Navigation", title: "Documents & Evidence", subtitle: "Site photos & compliance", href: "/documents", icon: FileText },
  { id: "nav-users", category: "Navigation", title: "Users & Roles", subtitle: "Permissions matrix & team", href: "/users", icon: UserRound },
  { id: "nav-set", category: "Navigation", title: "Settings", subtitle: "Project configs & themes", href: "/settings", icon: Settings },
  { id: "nav-notif", category: "Navigation", title: "Notifications & WhatsApp", subtitle: "Automated alerts & SMS", href: "/notifications", icon: Bell },
  { id: "nav-help", category: "Navigation", title: "Help & Support", subtitle: "Guides, FAQs & contact", href: "/help", icon: CircleHelp },

  // Sheds
  { id: "shed-123", category: "Sheds", title: "SH-000123 · Savitri Bai Sahu", subtitle: "Stage: In Progress (80%) · Kundagaon, Raipur", href: "/sites", icon: House },
  { id: "shed-118", category: "Sheds", title: "SH-000118 · Laxmi Soni", subtitle: "Stage: Materials (60%) · Atari, Dhamtari", href: "/sites", icon: House },
  { id: "shed-110", category: "Sheds", title: "SH-000110 · Mangal Ram", subtitle: "Stage: Site Review (40%) · Dhamtari", href: "/sites", icon: House },
  { id: "shed-092", category: "Sheds", title: "SH-000092 · Rekha Patel", subtitle: "Stage: Work Order (10%) · Kumhari, Raipur", href: "/sites", icon: House },
  { id: "shed-076", category: "Sheds", title: "SH-000076 · Suresh Verma", subtitle: "Stage: Contribution (0%) · Arang, Raipur", href: "/sites", icon: House },
  { id: "shed-064", category: "Sheds", title: "SH-000064 · Kamla Devi", subtitle: "Stage: Completed (100%) · Tilda, Raipur", href: "/sites", icon: House },
  { id: "shed-051", category: "Sheds", title: "SH-000051 · Ramesh Nishad", subtitle: "Stage: Verification (20%) · Mandir Hasaud", href: "/sites", icon: House },

  // Beneficiaries
  { id: "bene-savitri", category: "Beneficiaries", title: "Savitri Bai Sahu", subtitle: "Kundagaon · SH-000123 · Verified · ₹1,25,000", href: "/beneficiaries", icon: Users },
  { id: "bene-laxmi", category: "Beneficiaries", title: "Laxmi Soni", subtitle: "Atari · SH-000118 · Verified · ₹1,25,000 Pending", href: "/beneficiaries", icon: Users },
  { id: "bene-mangal", category: "Beneficiaries", title: "Mangal Ram", subtitle: "Dhamtari · SH-000110 · Pending Verification", href: "/beneficiaries", icon: Users },
  { id: "bene-rekha", category: "Beneficiaries", title: "Rekha Patel", subtitle: "Kumhari · SH-000092 · Consent Pending", href: "/beneficiaries", icon: Users },

  // Work Orders
  { id: "wo-147", category: "Work Orders", title: "WO-2026-0147 · Sharma Agro", subtitle: "SH-000123 · Model A · ₹3,10,000 · In Progress", href: "/work-orders", icon: HardHat },
  { id: "wo-146", category: "Work Orders", title: "WO-2026-0146 · Verma Infra", subtitle: "SH-000118 · Model B · ₹2,95,000 · Awaiting Start", href: "/work-orders", icon: HardHat },
  { id: "wo-145", category: "Work Orders", title: "WO-2026-0145 · Patel Structures", subtitle: "SH-000110 · Model A · ₹3,05,000 · Pending", href: "/work-orders", icon: HardHat },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setQuery("");
        setSelectedIndex(0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const filtered = query.trim()
    ? ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : ITEMS.slice(0, 8); // top suggestions

  function handleSelect(item: SearchItem) {
    setOpen(false);
    router.push(item.href);
  }

  // Handle keyboard navigation inside the list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev - 1 < 0 ? filtered.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  return (
    <>
      {/* Search trigger bar in header */}
      <div className="relative mx-auto hidden w-full max-w-2xl md:block">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-10 w-full items-center justify-between rounded-lg border border-line bg-white pl-3.5 pr-3 text-left text-sm text-muted/90 transition hover:border-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
        >
          <span className="flex items-center gap-2.5">
            <Search className="size-4 text-muted" />
            <span className="truncate">
              Search by Shed ID, beneficiary, village, work order...
            </span>
          </span>
          <kbd className="rounded-md bg-brand-cream px-2 py-0.5 text-[11px] font-semibold text-muted">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Modal Dialog */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24"
          role="dialog"
          aria-modal="true"
          aria-label="Global Search Command Palette"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            {/* Search Input Box */}
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <Search className="size-5 shrink-0 text-brand-green" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a shed ID, farmer name, village, or module..."
                className="w-full text-base outline-none placeholder:text-muted/70 text-brand-charcoal"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded p-1 text-muted hover:text-brand-charcoal"
                >
                  <X className="size-4" />
                </button>
              )}
              <kbd className="hidden rounded bg-brand-cream px-2 py-0.5 text-xs font-semibold text-muted sm:inline-block">
                ESC to close
              </kbd>
            </div>

            {/* Results list */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-sm font-semibold text-brand-charcoal">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Try searching for &quot;SH-000123&quot;, &quot;Savitri&quot;, or &quot;Finance&quot;
                  </p>
                </div>
              ) : (
                <ul className="space-y-1">
                  {filtered.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                            isSelected
                              ? "bg-brand-green text-white"
                              : "hover:bg-brand-cream text-brand-charcoal"
                          }`}
                        >
                          <span
                            className={`grid size-9 shrink-0 place-items-center rounded-lg ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-brand-cream text-brand-leaf"
                            }`}
                          >
                            <Icon className="size-4.5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm truncate">
                                {item.title}
                              </span>
                              <span
                                className={`rounded px-1.5 py-0.2 text-[10px] font-medium uppercase ${
                                  isSelected
                                    ? "bg-white/20 text-white"
                                    : "bg-gray-100 text-muted"
                                }`}
                              >
                                {item.category}
                              </span>
                            </div>
                            <p
                              className={`truncate text-xs ${
                                isSelected ? "text-white/80" : "text-muted"
                              }`}
                            >
                              {item.subtitle}
                            </p>
                          </div>
                          <ArrowRight
                            className={`size-4 shrink-0 transition-transform ${
                              isSelected
                                ? "translate-x-1 text-white"
                                : "text-muted"
                            }`}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer tips */}
            <div className="flex items-center justify-between border-t border-line bg-brand-cream/40 px-4 py-2.5 text-[11px] text-muted">
              <span>Navigate with ↑ ↓ and Enter</span>
              <span>142 Sheds · 5 Projects · Real-time indexing</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
