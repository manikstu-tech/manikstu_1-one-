"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  ChartColumn,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Globe,
  House,
  Lock,
  Phone,
  ShieldCheck,
  Sprout,
  Users,
} from "lucide-react";

const FEATURES = [
  { icon: House, label: "End-to-end Tracking" },
  { icon: Users, label: "Multiple Projects" },
  { icon: ShieldCheck, label: "Clear Accountability" },
  { icon: ChartColumn, label: "Real-time Reporting" },
];

const FOOTER = [
  { icon: Sprout, a: "Better Infrastructure", b: "for Rural Communities" },
  { icon: Users, a: "Livestock Development", b: "for Brighter Livelihoods" },
  { icon: Sprout, a: "Sustainable Growth", b: "with Traceable Impact" },
];

const LINKS = ["Privacy Policy", "Terms of Use", "Support"];

export default function LoginPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);

  return (
    <main className="min-h-screen bg-brand-cream lg:grid lg:grid-cols-2">
      {/* Left brand panel */}
      <section className="relative flex flex-col overflow-hidden bg-brand-deep text-white">
        <div className="relative z-10 px-7 pt-8 sm:px-10 lg:px-12 lg:pt-10">
          <div className="flex items-center">
            <span className="rounded-xl bg-white px-3 py-1.5">
              <Image
                src="/brand/Logo.jpeg"
                alt="Manikstu"
                width={200}
                height={120}
                priority
                className="h-20 w-auto"
              />
            </span>
          </div>
          <p className="mt-6 text-2xl font-bold">Manikstu Agro</p>
          <p className="mt-1 text-lg text-white/80">Operations Platform</p>
          <div className="mt-4 h-[3px] w-12 bg-brand-gold" />
          <h1 className="mt-5 font-serif text-4xl leading-[1.15] sm:text-5xl">
            One permanent Shed ID.
            <br />
            One traceable history.
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-white/80">
            Manage beneficiary approvals, contributions, construction,
            materials, finance and verification — all in one place.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex flex-col items-start gap-2">
                <span className="grid size-11 place-items-center rounded-xl bg-white/10">
                  <f.icon className="size-5" strokeWidth={1.75} />
                </span>
                <span className="text-[13px] leading-snug text-white/85">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-8 h-60 sm:h-72 lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-auto lg:mt-0 lg:h-[46%]">
          <Image
            src="/auth/login-hero.png"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-deep via-brand-deep/25 to-transparent" />
        </div>

        <div className="relative z-10 mt-auto hidden border-t border-white/15 bg-brand-deep/70 backdrop-blur-sm lg:block">
          <div className="grid grid-cols-3 divide-x divide-white/15 px-12 py-5">
            {FOOTER.map((f, i) => (
              <div
                key={f.a}
                className={`flex items-center gap-3 ${
                  i === 0 ? "pr-4" : i === 2 ? "pl-4" : "px-4"
                }`}
              >
                <f.icon className="size-6 shrink-0" strokeWidth={1.5} />
                <p className="text-xs leading-5 text-white/85">
                  {f.a}
                  <br />
                  {f.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Right sign-in panel */}
      <section className="px-5 py-8 sm:px-10 lg:overflow-y-auto lg:px-14 lg:py-10">
        <div className="mx-auto w-full max-w-[560px]">
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium"
            >
              <Globe className="size-4" />
              English (EN)
              <ChevronDown className="size-4 text-muted" />
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-white p-6 shadow-[0_8px_30px_rgba(26,26,26,0.06)] sm:p-8">
            <h2 className="text-[32px] font-bold tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-1 text-[15px] text-muted">
              Sign in to your Manikstu Agro account
            </p>

            <form
              className="mt-7"
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/dashboard");
              }}
            >
              <label
                htmlFor="mobile"
                className="text-[13px] font-semibold"
              >
                Mobile Number
              </label>
              <div className="relative mt-2">
                <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted" />
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  required
                  placeholder="Enter your mobile number"
                  className="h-12 w-full rounded-lg border border-line bg-white pl-11 pr-4 text-sm outline-none placeholder:text-brand-charcoal/35 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                />
              </div>

              <label
                htmlFor="password"
                className="mt-5 block text-[13px] font-semibold"
              >
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted" />
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-lg border border-line bg-white pl-11 pr-11 text-sm outline-none placeholder:text-brand-charcoal/35 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                />
                <button
                  type="button"
                  aria-label={showPw ? "Hide password" : "Show password"}
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-brand-charcoal"
                >
                  {showPw ? (
                    <EyeOff className="size-[18px]" />
                  ) : (
                    <Eye className="size-[18px]" />
                  )}
                </button>
              </div>

              <div className="mt-2 text-right">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[13px] font-medium text-brand-leaf hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-green text-[15px] font-semibold text-white transition hover:bg-brand-leaf"
              >
                Sign In
                <ArrowRight className="size-[18px]" />
              </button>
            </form>

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-success-bg/70 p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand-leaf">
                <ShieldCheck className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold">
                  Secure Access
                </span>
                <span className="block text-[13px] text-muted">
                  Your data is safe and protected
                </span>
              </span>
              <ChevronRight className="ml-auto size-5 text-muted" />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs text-muted">
            <p className="flex gap-3">
              {LINKS.map((l, i) => (
                <span key={l} className="flex gap-3">
                  {i > 0 && <span>|</span>}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="hover:underline"
                  >
                    {l}
                  </a>
                </span>
              ))}
            </p>
            <p>© 2026 Manikstu Agro. All rights reserved.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
