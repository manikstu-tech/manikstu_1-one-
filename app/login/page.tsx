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
  Check,
  KeyRound,
  Sparkles,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";

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

const LANGUAGES = [
  { code: "EN", name: "English", local: "English", region: "All Platforms" },
  { code: "HI", name: "Hindi", local: "हिन्दी", region: "Central & Northern India" },
  { code: "OD", name: "Odia", local: "ଓଡ଼ିଆ", region: "Odisha Operations" },
  { code: "CG", name: "Chhattisgarhi", local: "छत्तीसगढ़ी", region: "Chhattisgarh Field Units" },
];

export default function LoginPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Modals
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotMobile, setForgotMobile] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [legalModalTitle, setLegalModalTitle] = useState<string | null>(null);

  const selectedLanguage = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  function handleDemoLogin() {
    setMobile("9876543210");
    setPassword("Manikstu@2026");
    setErrorMsg("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const cleanedMobile = mobile.replace(/\D/g, "");
    if (cleanedMobile.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!password) {
      setErrorMsg("Please enter your password.");
      return;
    }

    setIsLoading(true);
    // Smooth transition into dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  }

  function handleForgotSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (forgotMobile.length >= 10) {
      setForgotSubmitted(true);
    }
  }

  return (
    <main className="min-h-screen bg-brand-cream lg:grid lg:grid-cols-2">
      {/* Left brand panel */}
      <section className="relative flex flex-col overflow-hidden bg-brand-deep text-white">
        <div className="relative z-10 px-7 pt-8 sm:px-10 lg:px-12 lg:pt-10">
          <div className="flex items-center">
            <span className="rounded-xl bg-white px-3 py-1.5 shadow-sm">
              <Image
                src="/brand/Logo.jpeg"
                alt="Manikstu Agro"
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
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-green/30 bg-success-bg/60 px-3 py-1.5 text-xs font-semibold text-brand-leaf hover:bg-success-bg transition"
              title="Click to auto-fill manager credentials"
            >
              <Sparkles className="size-3.5" />
              Demo Autofill
            </button>

            <button
              type="button"
              onClick={() => setLangModalOpen(true)}
              aria-label={`Select language: currently ${selectedLanguage.name}`}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium transition hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              <Globe className="size-4 text-brand-green" />
              {selectedLanguage.name} ({selectedLanguage.code})
              <ChevronDown className="size-4 text-muted" />
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-white p-6 shadow-[0_8px_30px_rgba(26,26,26,0.06)] sm:p-8">
            <h2 className="text-[32px] font-bold tracking-tight text-brand-charcoal">
              Welcome Back
            </h2>
            <p className="mt-1 text-[15px] text-muted">
              Sign in to your Manikstu Agro operational account
            </p>

            {errorMsg && (
              <div
                role="alert"
                className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-brand-red"
              >
                {errorMsg}
              </div>
            )}

            <form className="mt-6" onSubmit={handleSubmit}>
              <label
                htmlFor="mobile"
                className="text-[13px] font-semibold text-brand-charcoal"
              >
                Mobile Number
              </label>
              <div className="relative mt-2">
                <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted" />
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  placeholder="Enter 10-digit mobile number"
                  className="h-12 w-full rounded-lg border border-line bg-white pl-11 pr-4 text-sm outline-none placeholder:text-brand-charcoal/35 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                />
              </div>

              <label
                htmlFor="password"
                className="mt-5 block text-[13px] font-semibold text-brand-charcoal"
              >
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted" />
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-lg border border-line bg-white pl-11 pr-11 text-sm outline-none placeholder:text-brand-charcoal/35 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                />
                <button
                  type="button"
                  aria-label={showPw ? "Hide password" : "Show password"}
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-brand-charcoal"
                >
                  {showPw ? (
                    <EyeOff className="size-[18px]" />
                  ) : (
                    <Eye className="size-[18px]" />
                  )}
                </button>
              </div>

              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={() => {
                    setForgotSubmitted(false);
                    setForgotMobile(mobile);
                    setForgotModalOpen(true);
                  }}
                  className="text-[13px] font-medium text-brand-leaf hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-green text-[15px] font-semibold text-white transition hover:bg-brand-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green disabled:opacity-70"
              >
                {isLoading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="size-[18px]" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-success-bg/70 p-4 border border-line/60">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand-leaf shadow-sm">
                <ShieldCheck className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-brand-charcoal">
                  End-to-End Encrypted & Audited
                </span>
                <span className="block text-[13px] text-muted">
                  Permanent Shed ID audit trails comply with government norms
                </span>
              </span>
              <ChevronRight className="ml-auto size-5 text-muted" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
            <p className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLegalModalTitle("Privacy Policy")}
                className="hover:underline text-muted hover:text-brand-charcoal"
              >
                Privacy Policy
              </button>
              <span>|</span>
              <button
                type="button"
                onClick={() => setLegalModalTitle("Terms of Use")}
                className="hover:underline text-muted hover:text-brand-charcoal"
              >
                Terms of Use
              </button>
              <span>|</span>
              <button
                type="button"
                onClick={() => setLegalModalTitle("Operations Support")}
                className="hover:underline text-muted hover:text-brand-charcoal"
              >
                Support
              </button>
            </p>
            <p>© 2026 Manikstu Agro. All rights reserved.</p>
          </div>
        </div>
      </section>

      {/* Language Selector Modal */}
      <Modal
        isOpen={langModalOpen}
        onClose={() => setLangModalOpen(false)}
        title="Select Interface Language"
        subtitle="Choose your preferred language for field and desk operations"
        size="sm"
      >
        <div className="space-y-2">
          {LANGUAGES.map((l) => {
            const isSelected = l.code === currentLang;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setCurrentLang(l.code);
                  setLangModalOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition ${
                  isSelected
                    ? "border-brand-green bg-success-bg/60"
                    : "border-line bg-white hover:border-brand-green/40 hover:bg-brand-cream/60"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-brand-charcoal">
                    {l.name} <span className="font-normal text-muted">({l.local})</span>
                  </p>
                  <p className="text-xs text-muted">{l.region}</p>
                </div>
                {isSelected && (
                  <span className="grid size-6 place-items-center rounded-full bg-brand-green text-white">
                    <Check className="size-3.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="Reset Password"
        subtitle="We will verify your registered staff account via OTP"
        size="sm"
      >
        {forgotSubmitted ? (
          <div className="space-y-4 py-2 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-success-bg text-brand-leaf">
              <KeyRound className="size-6" />
            </span>
            <div>
              <p className="text-sm font-semibold text-brand-charcoal">
                OTP Sent to {forgotMobile}
              </p>
              <p className="mt-1 text-xs text-muted">
                Please enter the 6-digit security code sent to your WhatsApp or SMS to set a new password.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setForgotModalOpen(false)}
              className="w-full h-10 rounded-lg bg-brand-green text-xs font-semibold text-white hover:bg-brand-leaf"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-charcoal">
                Registered Mobile Number
              </label>
              <input
                type="tel"
                required
                value={forgotMobile}
                onChange={(e) => setForgotMobile(e.target.value)}
                placeholder="Enter your 10-digit mobile number"
                className="mt-1 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-line">
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="h-9 rounded-lg border border-line bg-white px-3.5 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-9 rounded-lg bg-brand-green px-4 text-xs font-semibold text-white hover:bg-brand-leaf"
              >
                Send Recovery OTP
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Legal & Support Modal */}
      {legalModalTitle && (
        <Modal
          isOpen={!!legalModalTitle}
          onClose={() => setLegalModalTitle(null)}
          title={legalModalTitle}
          subtitle="Manikstu Agro Operations Platform Governance"
          size="md"
        >
          <div className="space-y-3 text-xs leading-relaxed text-brand-charcoal">
            {legalModalTitle === "Privacy Policy" && (
              <>
                <p>
                  <strong>Data Protection & Sovereign Integrity:</strong> All beneficiary Aadhaar records, bank passbook copies, land possession certificates (LPC), and geotagged construction site photographs collected within this platform are processed solely for the execution and auditing of approved rural livelihood and infrastructure projects.
                </p>
                <p>
                  <strong>Access Controls:</strong> Field coordinators, fabricators, and finance officers access records strictly through role-based access control (RBAC). Data is stored encrypted in compliance with Indian IT Act provisions.
                </p>
              </>
            )}
            {legalModalTitle === "Terms of Use" && (
              <>
                <p>
                  <strong>Authorized Personnel Only:</strong> Access to this system is restricted to verified Manikstu Agro personnel, authorized state/district project officials, and accredited fabrication contractors.
                </p>
                <p>
                  <strong>Inspection Accountability:</strong> Falsification of geotagged inspection evidence, stage signoffs, or material receipt confirmations constitutes grounds for immediate termination of contracts and blacklisting.
                </p>
              </>
            )}
            {legalModalTitle === "Operations Support" && (
              <>
                <p>
                  <strong>Helpline:</strong> +91 771 400 1234 (Monday through Saturday, 9:00 AM – 6:00 PM IST).
                </p>
                <p>
                  <strong>WhatsApp Field Escort:</strong> +91 90000 12345 (Include permanent Shed ID in all ticket inquiries).
                </p>
                <p>
                  <strong>Email:</strong> support@manikstu.com
                </p>
              </>
            )}
            <div className="flex justify-end pt-3 border-t border-line">
              <button
                type="button"
                onClick={() => setLegalModalTitle(null)}
                className="h-9 rounded-lg bg-brand-charcoal px-4 text-xs font-semibold text-white hover:bg-black"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
