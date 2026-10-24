"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Check, Building2, MapPin } from "lucide-react";
import { PROJECTS } from "../../app/(workspace)/projects/projects-data";

export function ProjectSwitcher() {
  const [open, setOpen] = useState(false);
  const [currentCode, setCurrentCode] = useState("AJAH");
  const ref = useRef<HTMLDivElement>(null);

  const currentProject =
    PROJECTS.find((p) => p.code.toLowerCase() === currentCode.toLowerCase()) ||
    PROJECTS[0];

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Current project: ${currentProject.code}. Click to switch project`}
        className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-line bg-white px-3 text-sm transition hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
      >
        <Building2 className="size-4 text-brand-leaf" />
        <span className="text-muted">Project:</span>
        <span className="font-bold text-brand-charcoal">{currentProject.code}</span>
        <ChevronDown
          className={`size-4 text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select Project"
          className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-line bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="border-b border-line bg-brand-cream/60 px-4 py-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              Select Active Project
            </p>
          </div>
          <div className="max-h-72 divide-y divide-line/40 overflow-y-auto p-1">
            {PROJECTS.map((p) => {
              const isSelected = p.code === currentProject.code;
              return (
                <div
                  key={p.code}
                  className={`group flex items-center justify-between rounded-lg p-2.5 transition hover:bg-brand-cream/80 ${
                    isSelected ? "bg-success-bg/50" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentCode(p.code);
                      setOpen(false);
                    }}
                    className="flex flex-1 items-start gap-2.5 text-left focus-visible:outline-none"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-brand-charcoal">
                          {p.code}
                        </span>
                        <span className="rounded bg-brand-cream px-1.5 py-0.5 text-[10px] font-medium text-muted">
                          {p.status}
                        </span>
                      </div>
                      <p className="truncate text-xs font-medium text-brand-charcoal/80">
                        {p.name}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted">
                        <MapPin className="size-3" />
                        <span className="truncate">{p.district}</span>
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="mt-1 size-4 shrink-0 text-brand-leaf" />
                    )}
                  </button>
                  <Link
                    href={`/projects/${p.code}`}
                    onClick={() => setOpen(false)}
                    className="ml-2 rounded px-2 py-1 text-[11px] font-semibold text-brand-green hover:bg-brand-green hover:text-white"
                  >
                    Workspace
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="border-t border-line bg-brand-cream/30 p-2 text-center">
            <Link
              href="/projects"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold text-brand-leaf hover:underline"
            >
              View All Projects Portfolio →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

