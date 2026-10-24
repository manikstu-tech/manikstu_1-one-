"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import type { ElementType } from "react";
import { Avatar, Card, Chip, EmptyState, Progress, type Tone } from "../_components";
import { PROJECTS, type ProjectRow } from "./projects-data";

const STATUS_META: Record<string, { tone: Tone; icon: ElementType }> = {
  Active: { tone: "green", icon: Play },
  Planning: { tone: "amber", icon: Clock },
  "On Hold": { tone: "red", icon: Pause },
};

const THUMB = "/auth/shelter-scene.png";

export default function ProjectsBrowser() {
  const router = useRouter();
  const [view, setView] = useState<"table" | "cards">("table");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [districtFilter, setDistrictFilter] = useState("All Districts");
  const [managerFilter, setManagerFilter] = useState("All Managers");

  const filtered = useMemo(() => {
    return PROJECTS.filter((p: ProjectRow) => {
      const matchSearch =
        search.trim() === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.code.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline.toLowerCase().includes(search.toLowerCase()) ||
        p.district.toLowerCase().includes(search.toLowerCase()) ||
        p.owner.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All Status" || p.status === statusFilter;

      const matchDistrict =
        districtFilter === "All Districts" ||
        p.district.toLowerCase().includes(districtFilter.toLowerCase());

      const matchManager =
        managerFilter === "All Managers" || p.owner === managerFilter;

      return matchSearch && matchStatus && matchDistrict && matchManager;
    });
  }, [search, statusFilter, districtFilter, managerFilter]);

  function handleReset() {
    setSearch("");
    setStatusFilter("All Status");
    setDistrictFilter("All Districts");
    setManagerFilter("All Managers");
  }

  return (
    <div className="space-y-5">
      {/* Filter bar */}
      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-line bg-white p-3 shadow-xs">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by project name, code, district, manager..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-line bg-white pl-10 pr-4 text-sm outline-none placeholder:text-muted/70 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          />
        </div>

        <label className="block">
          <span className="mb-1 block text-[11px] font-medium text-muted">Status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-lg border border-line bg-white px-3 text-[13px] font-medium text-brand-charcoal outline-none focus:border-brand-green"
          >
            {["All Status", "Active", "Planning", "On Hold"].map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-[11px] font-medium text-muted">District</span>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="h-10 rounded-lg border border-line bg-white px-3 text-[13px] font-medium text-brand-charcoal outline-none focus:border-brand-green"
          >
            {["All Districts", "Raipur", "Dhamtari", "Jashpur", "Narayanpur", "Rayagada"].map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-[11px] font-medium text-muted">Manager</span>
          <select
            value={managerFilter}
            onChange={(e) => setManagerFilter(e.target.value)}
            className="h-10 rounded-lg border border-line bg-white px-3 text-[13px] font-medium text-brand-charcoal outline-none focus:border-brand-green"
          >
            {["All Managers", "Ramesh Kumar", "Priya Verma", "Aftab Khan", "Manoj Singh", "Kunti Devi"].map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={handleReset}
          className="flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-sm font-medium text-brand-charcoal/80 transition hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
        >
          <RotateCcw className="size-4" /> Reset Filters
        </button>

        <div className="ml-auto flex items-center gap-1 rounded-lg bg-brand-cream p-1">
          <button
            type="button"
            onClick={() => setView("table")}
            className={`flex h-8 items-center gap-1.5 rounded-md px-3 text-[13px] font-semibold transition ${
              view === "table" ? "bg-brand-green text-white shadow-xs" : "text-muted hover:text-brand-charcoal"
            }`}
          >
            <Table className="size-4" /> Table
          </button>
          <button
            type="button"
            onClick={() => setView("cards")}
            className={`flex h-8 items-center gap-1.5 rounded-md px-3 text-[13px] font-semibold transition ${
              view === "cards" ? "bg-brand-green text-white shadow-xs" : "text-muted hover:text-brand-charcoal"
            }`}
          >
            <LayoutGrid className="size-4" /> Cards
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            title="No matching projects"
            description="No projects match your current search and filter settings. Try relaxing your filters or search terms."
            onReset={handleReset}
          />
        </Card>
      ) : view === "table" ? (
        <Card padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-[13px]">
              <thead>
                <tr className="border-b border-line text-left text-xs font-semibold text-muted">
                  <th className="py-2.5 pl-5 pr-3">#</th>
                  <th className="py-2.5 pr-3">Project</th>
                  <th className="py-2.5 pr-3">Code</th>
                  <th className="py-2.5 pr-3">Status</th>
                  <th className="py-2.5 pr-3">District / Location</th>
                  <th className="py-2.5 pr-3">Start Date</th>
                  <th className="py-2.5 pr-3">End Date</th>
                  <th className="py-2.5 pr-3">Owner / Manager</th>
                  <th className="py-2.5 pr-3">Total Sheds</th>
                  <th className="py-2.5 pr-3">Progress</th>
                  <th className="py-2.5 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {filtered.map((r, i) => {
                  const sm = STATUS_META[r.status] || STATUS_META.Active;
                  return (
                    <tr
                      key={r.code}
                      onClick={() => router.push(`/projects/${r.code}`)}
                      className="cursor-pointer transition hover:bg-brand-cream/50"
                    >
                      <td className="py-3 pl-5 pr-3 text-muted">{i + 1}</td>
                      <td className="py-3 pr-3">
                        <span className="flex items-center gap-2.5">
                          <Image
                            src={THUMB}
                            alt=""
                            width={40}
                            height={40}
                            className="size-10 shrink-0 rounded-lg object-cover"
                          />
                          <span>
                            <span className="block font-semibold text-brand-green hover:underline">
                              {r.name}
                            </span>
                            <span className="block text-xs text-muted">
                              {r.tagline}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td className="py-3 pr-3 font-bold text-brand-charcoal">{r.code}</td>
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
                      <td className="py-3 pr-3 font-semibold text-brand-charcoal">{r.sheds}</td>
                      <td className="py-3 pr-3"><Progress pct={r.pct} /></td>
                      <td className="py-3 pr-5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/projects/${r.code}`);
                          }}
                          className="rounded p-1 text-muted hover:bg-brand-cream hover:text-brand-charcoal"
                          aria-label={`Open project workspace for ${r.name}`}
                        >
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
            <span>
              Showing {filtered.length} of {PROJECTS.length} projects
            </span>
          </div>
        </Card>
      ) : (
        /* Cards view */
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((r) => {
            const sm = STATUS_META[r.status] || STATUS_META.Active;
            return (
              <button
                key={r.code}
                type="button"
                onClick={() => router.push(`/projects/${r.code}`)}
                className="group overflow-hidden rounded-xl border border-line bg-white text-left shadow-xs transition hover:border-brand-green/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                <div className="relative h-32 w-full">
                  <Image
                    src={THUMB}
                    alt=""
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-102"
                  />
                  <span className="absolute left-3 top-3">
                    <Chip tone={sm.tone} icon={sm.icon}>{r.status}</Chip>
                  </span>
                  <span className="absolute right-3 top-3 rounded-md bg-white/95 px-2 py-0.5 text-xs font-bold shadow-xs">
                    {r.code}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-bold text-brand-charcoal group-hover:text-brand-green">
                    {r.name}
                  </p>
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
