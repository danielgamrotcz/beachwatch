"use client";

import { Lang, t } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import { LiveDot } from "./LiveDot";

interface HeaderProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export function Header({ lang, onLangChange }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 border-b px-6 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]"
      style={{
        background: "color-mix(in srgb, var(--color-surface) 72%, transparent)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">🌊</span>
          <div>
            <h1
              className="text-base font-semibold"
              style={{ letterSpacing: "-0.02em", color: "var(--color-text)" }}
            >
              {t(lang, "header.title")}
            </h1>
            <div className="flex items-center gap-1.5">
              <LiveDot />
              <span
                className="text-xs"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {t(lang, "header.subtitle")}
              </span>
            </div>
          </div>
        </div>
        <LanguageToggle lang={lang} onChange={onLangChange} />
      </div>
    </header>
  );
}
