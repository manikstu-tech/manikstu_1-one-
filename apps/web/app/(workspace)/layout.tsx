import Image from "next/image";
import type { ReactNode } from "react";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  MessageCircle,
  Search,
  Sprout,
} from "lucide-react";
import { NavList } from "./nav-data";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";

export default function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-brand-cream">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-brand-deep lg:flex">
        <div className="flex items-center gap-2.5 px-4 pb-4 pt-5">
          <span className="rounded-lg bg-white px-1.5 py-1">
            <Image
              src="/brand/Logo.jpeg"
              alt="Manikstu"
              width={80}
              height={48}
              className="h-8 w-auto"
            />
          </span>
          <span className="text-xl font-bold text-white">Manikstu</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          <NavList />
        </nav>

        <div className="relative h-36 shrink-0">
          <Image
            src="/auth/shelter-scene.png"
            alt=""
            fill
            sizes="240px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/60 via-transparent to-brand-deep/60" />
        </div>
        <p className="flex shrink-0 items-start gap-2 bg-brand-deep px-5 py-4 text-xs leading-5 text-white/85">
          <Sprout className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
          Better Infrastructure
          <br />
          for Rural Communities
        </p>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-[72px] items-center gap-2 border-b border-line bg-white px-4 sm:gap-3 xl:px-6">
          <MobileNav />

          <button
            type="button"
            className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-line px-3 text-sm"
          >
            Project: <span className="font-bold">AJAH</span>
            <ChevronDown className="size-4 text-muted" />
          </button>

          <div className="relative mx-auto hidden w-full max-w-2xl md:block">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search by Shed ID, beneficiary, village, work order, fabricator..."
              className="h-10 w-full rounded-lg border border-line bg-white pl-10 pr-16 text-sm outline-none placeholder:text-muted/90 focus:border-brand-green"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-brand-cream px-2 py-0.5 text-[11px] text-muted">
              Ctrl + K
            </kbd>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 xl:gap-3">
            <button
              type="button"
              className="relative grid size-9 place-items-center rounded-lg text-brand-charcoal/70 hover:bg-brand-cream"
            >
              <Bell className="size-5" strokeWidth={1.75} />
              <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-brand-red text-[9px] font-bold text-white">
                12
              </span>
            </button>
            <button
              type="button"
              className="hidden size-9 place-items-center rounded-full bg-[#25d366] text-white sm:grid"
            >
              <MessageCircle className="size-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              className="hidden size-9 place-items-center rounded-lg text-brand-charcoal/70 hover:bg-brand-cream md:grid"
            >
              <CircleHelp className="size-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              className="hidden h-10 items-center gap-2 rounded-lg border border-line px-3 text-sm font-medium lg:flex"
            >
              English (EN)
              <ChevronDown className="size-4 text-muted" />
            </button>
            <UserMenu />
          </div>
        </header>

        <main className="flex-1 px-4 py-6 xl:px-8">{children}</main>

        <footer className="border-t border-line bg-white px-4 py-3 text-xs text-muted xl:px-8">
          © 2026 Manikstu Agro · Better Infrastructure for Rural Communities
        </footer>
      </div>
    </div>
  );
}
