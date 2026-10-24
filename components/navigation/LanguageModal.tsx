"use client";

import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { Modal } from "../ui/Modal";
import { useToast } from "../ui/Toast";

const LANGUAGES = [
  { code: "EN", name: "English", local: "English", region: "All Platforms" },
  { code: "HI", name: "Hindi", local: "हिन्दी", region: "Central & Northern India" },
  { code: "OD", name: "Odia", local: "ଓଡ଼ିଆ", region: "Odisha Operations" },
  { code: "CG", name: "Chhattisgarhi", local: "छत्तीसगढ़ी", region: "Chhattisgarh Field Units" },
];

export function LanguageModal() {
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const { showToast } = useToast();

  const current = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  function handleSelect(code: string, name: string) {
    setSelectedLang(code);
    setOpen(false);
    showToast(`Interface language updated to ${name}`, "success");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Select language. Current: ${current.name}`}
        className="hidden h-10 items-center gap-2 rounded-lg border border-line bg-white px-3 text-sm font-medium transition hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green lg:flex"
      >
        <Globe className="size-4 text-muted" />
        {current.name} ({current.code})
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Select Language / भाषा चुनें"
        subtitle="Choose your preferred interface language for field and office operations"
        maxWidth="max-w-md"
      >
        <div className="space-y-2">
          {LANGUAGES.map((l) => {
            const isSelected = l.code === selectedLang;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => handleSelect(l.code, l.name)}
                className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition ${
                  isSelected
                    ? "border-brand-green bg-success-bg/60"
                    : "border-line bg-white hover:border-brand-green/40 hover:bg-brand-cream/60"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-brand-charcoal">
                      {l.local}
                    </span>
                    <span className="text-xs text-muted">({l.name})</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">{l.region}</p>
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
    </>
  );
}

