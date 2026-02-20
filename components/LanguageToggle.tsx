"use client";

import { Lang, setLanguage } from "@/lib/i18n";

interface LanguageToggleProps {
  lang: Lang;
  onChange: (lang: Lang) => void;
}

export function LanguageToggle({ lang, onChange }: LanguageToggleProps) {
  function toggle() {
    const next = lang === "cs" ? "en" : "cs";
    setLanguage(next);
    onChange(next);
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium transition-colors hover:bg-[var(--color-accent-light)]"
      style={{ color: "var(--color-text-secondary)" }}
      aria-label="Switch language"
    >
      <span className={lang === "cs" ? "opacity-100" : "opacity-40"}>CZ</span>
      <span style={{ color: "var(--color-text-tertiary)" }}>/</span>
      <span className={lang === "en" ? "opacity-100" : "opacity-40"}>EN</span>
    </button>
  );
}
