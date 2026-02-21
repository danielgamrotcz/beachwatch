"use client";

import { Lang, LANGUAGES, setLanguage } from "@/lib/i18n";

interface LanguageToggleProps {
  lang: Lang;
  onChange: (lang: Lang) => void;
}

export function LanguageToggle({ lang, onChange }: LanguageToggleProps) {
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div className="relative">
      <select
        value={lang}
        onChange={(e) => {
          const next = e.target.value as Lang;
          setLanguage(next);
          onChange(next);
        }}
        className="appearance-none rounded-lg py-1 pl-2 pr-6 text-xs font-medium cursor-pointer"
        style={{
          color: "var(--color-text-secondary)",
          background: "transparent",
          border: "1px solid var(--color-border)",
        }}
        aria-label="Language"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.flag} {l.label}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px]"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        {current.flag}
      </span>
    </div>
  );
}
