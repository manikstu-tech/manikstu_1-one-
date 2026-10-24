"use client";

import Image from "next/image";
import { useState } from "react";
import { Sprout } from "lucide-react";

interface SidebarHeroProps {
  initialMode?: "illustration" | "photo";
}

/**
 * SidebarHero component rendering the atmospheric rural infrastructure scene
 * with multi-stop seamless morphing into the dark forest green sidebar (#0C3B20).
 * Matches the reference mockup detailing (media_1792809320069_62e07511.png).
 */
export function SidebarHero({ initialMode = "illustration" }: SidebarHeroProps) {
  const [mode, setMode] = useState<"illustration" | "photo">(initialMode);

  return (
    <div className="relative shrink-0 overflow-hidden bg-brand-deep select-none">
      <div className="relative h-44 xl:h-52 2xl:h-60 w-full">
        {/* Background Image: High-res illustration (default) or real photo */}
        {mode === "illustration" ? (
          <Image
            src="/brand/sidebar-hero-2x.png"
            alt="Rural infrastructure and livestock illustration"
            fill
            sizes="240px"
            className="object-cover object-[center_30%]"
            priority
          />
        ) : (
          <Image
            src="/auth/shelter-scene.png"
            alt="Permanent rural goat shelter site"
            fill
            sizes="240px"
            className="object-cover object-[center_36%] scale-105"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 8%, rgba(0,0,0,0.85) 20%, black 32%, black 65%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0.3) 90%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 8%, rgba(0,0,0,0.85) 20%, black 32%, black 65%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0.3) 90%, transparent 100%)",
            }}
            priority
          />
        )}

        {/* Multi-stop atmospheric sky gradient (eases seamlessly from solid #0C3B20 right under Settings) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-16 xl:h-20"
          style={{
            background:
              "linear-gradient(to bottom, #0C3B20 0%, rgba(12, 59, 32, 0.96) 18%, rgba(12, 59, 32, 0.78) 38%, rgba(12, 59, 32, 0.38) 64%, rgba(12, 59, 32, 0.08) 84%, transparent 100%)",
          }}
        />

        {/* Multi-stop atmospheric foliage gradient (eases seamlessly into solid #0C3B20 behind slogan) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 xl:h-24"
          style={{
            background:
              "linear-gradient(to top, #0C3B20 0%, rgba(12, 59, 32, 0.98) 22%, rgba(12, 59, 32, 0.85) 45%, rgba(12, 59, 32, 0.46) 70%, rgba(12, 59, 32, 0.10) 88%, transparent 100%)",
          }}
        />

        {/* Lateral vignette ensuring seamless left & right sidebar edge integration */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 115% 90% at 50% 50%, transparent 48%, rgba(12, 59, 32, 0.45) 80%, #0C3B20 100%)",
          }}
        />

        {/* Clean Slogan & Leaf Icon matching reference styling */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-4 pb-4 pt-2">
          <div className="flex items-center gap-2.5">
            <Sprout
              className="size-5 shrink-0 text-white drop-shadow-xs"
              strokeWidth={1.75}
            />
            <div className="leading-tight text-white">
              <span className="block text-xs font-semibold tracking-tight">
                Better Infrastructure
              </span>
              <span className="block text-[11px] font-normal text-white/90">
                for Rural Communities
              </span>
            </div>
          </div>

          {/* Subtle toggle for inspecting both illustrated and photo versions */}
          <button
            type="button"
            onClick={() =>
              setMode((m) => (m === "illustration" ? "photo" : "illustration"))
            }
            title={
              mode === "illustration"
                ? "Switch to Real Shed Photo"
                : "Switch to Illustrated Scene"
            }
            aria-label="Toggle sidebar imagery"
            className="opacity-0 transition-opacity duration-200 hover:opacity-80 focus:opacity-100 group-hover:opacity-60 text-[9px] uppercase tracking-wider text-white/60 hover:text-white px-1.5 py-0.5 rounded bg-black/30 backdrop-blur-xs"
          >
            {mode === "illustration" ? "Photo" : "Art"}
          </button>
        </div>
      </div>
    </div>
  );
}
