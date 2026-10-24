import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CircleHelp } from "lucide-react";
import { MainNavList, FootNavList } from "./nav-data";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";
import { ProjectSwitcher } from "../../components/navigation/ProjectSwitcher";
import { CommandPalette } from "../../components/navigation/CommandPalette";
import { LanguageModal } from "../../components/navigation/LanguageModal";
import { NotificationDropdown } from "../../components/navigation/NotificationDropdown";
import { ToastProvider } from "../../components/ui/Toast";
import { WhatsAppIcon } from "../../components/icons/WhatsAppIcon";
import { SidebarHero } from "../../components/navigation/SidebarHero";

export default function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-brand-cream">
        {/* Skip to main content for keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-green focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>

        {/* Sidebar */}
        <aside
          aria-label="Primary Navigation"
          className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-brand-deep select-none lg:flex"
        >
          {/* Logo Brand Header */}
          <div className="flex shrink-0 items-center gap-2.5 px-4 pb-2.5 pt-4">
            <span className="rounded-lg bg-white px-1.5 py-1">
              <Image
                src="/brand/Logo.jpeg"
                alt="Manikstu"
                width={80}
                height={48}
                className="h-7 w-auto"
                priority
              />
            </span>
            <span className="text-xl font-bold tracking-tight text-white">
              Manikstu
            </span>
          </div>

          {/* Single unified scrollable content container */}
          <div className="flex flex-1 flex-col overflow-y-auto no-scrollbar scrollbar-none">
            {/* Primary workspace navigation list */}
            <nav className="space-y-0.5 px-3 py-1">
              <MainNavList />
            </nav>

            {/* Bottom section: Settings, Users & Roles, and atmospheric brand hero */}
            <div className="mt-auto shrink-0">
              <div className="mx-3 my-2 h-px bg-white/10" />
              <div className="space-y-0.5 px-3 pb-1">
                <FootNavList />
              </div>
              <SidebarHero />
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-[72px] items-center gap-2 border-b border-line bg-white px-4 sm:gap-3 xl:px-6 shadow-2xs">
            <MobileNav />

            {/* Interactive Project Switcher */}
            <ProjectSwitcher />

            {/* Interactive Command Palette Search */}
            <CommandPalette />

            <div className="ml-auto flex shrink-0 items-center gap-2 xl:gap-3">
              {/* Interactive Notification Hover / Click Dropdown */}
              <NotificationDropdown />
              <Link
                href="/notifications"
                aria-label="WhatsApp automated communications"
                className="hidden size-9 place-items-center rounded-full bg-[#25d366] text-white shadow-xs transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green sm:grid"
              >
                <WhatsAppIcon className="size-5" />
              </Link>
              <Link
                href="/help"
                aria-label="Help & Support guides"
                className="hidden size-9 place-items-center rounded-lg text-brand-charcoal/70 transition hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green md:grid"
              >
                <CircleHelp className="size-5" strokeWidth={1.75} />
              </Link>

              {/* Interactive Language Selector */}
              <LanguageModal />

              <UserMenu />
            </div>
          </header>

          <main id="main-content" className="flex-1 px-4 py-6 xl:px-8">
            {children}
          </main>

          <footer className="border-t border-line bg-white px-4 py-3 text-xs text-muted xl:px-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>
                © 2026 Manikstu Agro · Better Infrastructure for Rural Communities
              </span>
              <span className="text-[11px] text-muted/80">
                Project AJAH Operations · Permanent Shed ID System
              </span>
            </div>
          </footer>
        </div>
      </div>
    </ToastProvider>
  );
}
