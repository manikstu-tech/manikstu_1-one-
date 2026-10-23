"use client";

import {
  Clock,
  LayoutGrid,
  MoreVertical,
  Pause,
  Play,
  RotateCcw,
  Search,
  Table,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ElementType } from "react";
import { Avatar, Card, Chip, Progress, type Tone } from "../_components";
import { PROJECTS } from "./projects-data";

const STATUS_META: Record<string, { tone: Tone; icon: ElementType }> = {
  Active: { tone: "green", icon: Play },
  Planning: { tone: "amber", icon: Clock },
  "On Hold": { tone: "red", icon: Pause },
};

const THUMB = "/auth/shelter-scene.png";

function LabeledSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-muted">{label}</span>
      <select
        defaultValue={options[0]}
        className="h-10 rounded-lg border border-line bg-white px-3 text-[13px] font-medium text-brand-charcoal/80 outline-none focus:border-brand-green"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export default function ProjectsBrowser() {
  const router = useRouter();
  const [view, setView] = useState<"table" | "cards">("table");

  return (
    <div className="space-y-5">
      {/* Filter bar */}
      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-line bg-white p-3 shadow-sm">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by project name, code, district..."
            className="h-10 w-full rounded-lg border border-line bg-white pl-10 pr-4 text-sm outline-none placeholder:text-muted/80 focus:border-brand-green"
          />
        </div>
        <LabeledSelect label="Status" options={["All Status", "Active", "Planning", "On Hold"]} />
        <LabeledSelect label="District" options={["All Districts", "Raipur", "Dhamtari", "Jashpur", "Narayanpur", "Rayagada"]} />
        <LabeledSelect label="Manager" options={["All Managers", "Ramesh Kumar", "Priya Verma", "Aftab Khan", "Manoj Singh", "Kunti Devi"]} />
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-sm font-medium text-brand-charcoal/80 hover:bg-brand-cream"
        >
          <RotateCcw className="size-4" /> Reset Filters
        </button>

        <div className="ml-auto flex items-center gap-1 rounded-lg bg-brand-cream p-1">
          <button
            type="button"
            onClick={() => setView("table")}
            className={`flex h-8 items-center gap-1.5 rounded-md px-3 text-[13px] font-semibold transition ${
              view === "table" ? "bg-brand-green text-white shadow-sm" : "text-muted hover:text-brand-charcoal"
            }`}
          >
            <Table className="size-4" /> Table
          </button>
          <button
            type="button"
            onClick={() => setView("cards")}
            className={`flex h-8 items-center gap-1.5 rounded-md px-3 text-[13px] font-semibold transition ${
              view === "cards" ? "bg-brand-green text-white shadow-sm" : "text-muted hover:text-brand-charcoal"
            }`}
          >
            <LayoutGrid className="size-4" /> Cards
          </button>
        </div>
      </div>

      {/* Table view */}
      {view === "table" ? (
        <Card padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-[13px]">
              <thead>
                <tr className="border-b border-line text-left text-xs text-muted">
                  <th className="py-2.5 pl-5 pr-3 font-medium">#</th>
                  <th className="py-2.5 pr-3 font-medium">Project</th>
                  <th className="py-2.5 pr-3 font-medium">Code</th>
                  <th className="py-2.5 pr-3 font-medium">Status</th>
                  <th className="py-2.5 pr-3 font-medium">District / Location</th>
                  <th className="py-2.5 pr-3 font-medium">Start Date</th>
                  <th className="py-2.5 pr-3 font-medium">End Date</th>
                  <th className="py-2.5 pr-3 font-medium">Owner / Manager</th>
                  <th className="py-2.5 pr-3 font-medium">Total Sheds</th>
                  <th className="py-2.5 pr-3 font-medium">Progress</th>
                  <th className="py-2.5 pr-5 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {PROJECTS.map((r, i) => {
                  const sm = STATUS_META[r.status];
                  return (
                    <tr
                      key={r.code}
                      onClick={() => router.push(`/projects/${r.code}`)}
                      className="cursor-pointer hover:bg-brand-cream/40"
                    >
                      <td className="py-3 pl-5 pr-3 text-muted">{i + 1}</td>
                      <td className="py-3 pr-3">
                        <span className="flex items-center gap-2.5">
                          <Image src={THUMB} alt="" width={40} height={40} className="size-10 shrink-0 rounded-lg object-cover" />
                          <span>
                            <span className="block font-semibold text-brand-green">{r.name}</span>
                            <span className="block text-xs text-muted">{r.tagline}</span>
                          </span>
                        </span>
                      </td>
                      <td className="py-3 pr-3 font-medium">{r.code}</td>
                      <td className="py-3 pr-3">
                        <Chip tone={sm.tone} icon={sm.icon}>{r.status}</Chip>
                      </td>
                      <td className="py-3 pr-3">{r.district}</td>
                      <td className="py-3 pr-3 whitespace-nowrap">{r.start}</td>
                      <td className="py-3 pr-3 whitespace-nowrap">{r.end}</td>
                      <td className="py-3 pr-3">
                        <span className="flex items-center gap-2.5">
                          <Avatar name={r.owner} />
                          <span>
                            <span className="block font-medium">{r.owner}</span>
                            <span className="block text-xs text-muted">{r.role}</span>
                          </span>
                        </span>
                      </td>
                      <td className="py-3 pr-3">{r.sheds}</td>
                      <td className="py-3 pr-3"><Progress pct={r.pct} /></td>
                      <td className="py-3 pr-5 text-right">
                        <button onClick={(e) => e.stopPropagation()} className="text-muted hover:text-brand-charcoal" aria-label="Row actions">
                          <MoreVertical className="size-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-[13px] text-muted">
            <span>Showing 1 to 5 of 5 projects</span>
            <div className="flex items-center gap-1">
              <button className="grid size-8 place-items-center rounded-lg border border-line text-muted">‹</button>
              <button className="grid size-8 place-items-center rounded-lg bg-brand-green text-sm font-semibold text-white">1</button>
              <button className="grid size-8 place-items-center rounded-lg border border-line text-muted">›</button>
            </div>
          </div>
        </Card>
      ) : (
        /* Cards view */
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((r) => {
            const sm = STATUS_META[r.status];
            return (
              <button
                key={r.code}
                type="button"
                onClick={() => router.push(`/projects/${r.code}`)}
                className="group overflow-hidden rounded-xl border border-line bg-white text-left shadow-sm transition hover:border-brand-green/40 hover:shadow-md"
              >
                <div className="relative h-32 w-full">
                  <Image src={THUMB} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                  <span className="absolute left-3 top-3">
                    <Chip tone={sm.tone} icon={sm.icon}>{r.status}</Chip>
                  </span>
                  <span className="absolute right-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-xs font-bold">{r.code}</span>
                </div>
                <div className="p-4">
                  <p className="font-bold text-brand-charcoal">{r.name}</p>
                  <p className="text-xs text-muted">{r.tagline}</p>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted">Location</p>
                      <p className="font-medium">{r.district}</p>
                    </div>
                    <div>
                      <p className="text-muted">Total Sheds</p>
                      <p className="font-medium">{r.sheds}</p>
                    </div>
                    <div>
                      <p className="text-muted">Start</p>
                      <p className="font-medium">{r.start}</p>
                    </div>
                    <div>
                      <p className="text-muted">End</p>
                      <p className="font-medium">{r.end}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2.5 border-t border-line pt-3">
                    <Avatar name={r.owner} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{r.owner}</span>
                      <span className="block text-xs text-muted">{r.role}</span>
                    </span>
                  </div>
                  <div className="mt-3">
                    <Progress pct={r.pct} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
