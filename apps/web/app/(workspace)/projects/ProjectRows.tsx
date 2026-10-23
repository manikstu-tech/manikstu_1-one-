"use client";

import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, Chip, Progress } from "../_components";
import { PROJECTS } from "./projects-data";

export default function ProjectRows() {
  const router = useRouter();

  return (
    <tbody className="divide-y divide-line/60">
      {PROJECTS.map((r, i) => (
        <tr
          key={r.code}
          onClick={() => router.push(`/projects/${r.code}`)}
          className="cursor-pointer hover:bg-brand-cream/40"
        >
          <td className="py-3 pl-5 pr-3 text-muted">{i + 1}</td>
          <td className="py-3 pr-3">
            <p className="font-semibold text-brand-green">{r.name}</p>
            <p className="text-xs text-muted">{r.tagline}</p>
          </td>
          <td className="py-3 pr-3 font-medium">{r.code}</td>
          <td className="py-3 pr-3">
            <Chip tone={r.tone} dot>
              {r.status}
            </Chip>
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
          <td className="py-3 pr-3">
            <Progress pct={r.pct} />
          </td>
          <td className="py-3 pr-5 text-right">
            <button
              onClick={(e) => e.stopPropagation()}
              className="text-muted hover:text-brand-charcoal"
              aria-label="Row actions"
            >
              <MoreVertical className="size-4" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
