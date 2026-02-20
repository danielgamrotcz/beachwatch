"use client";

import { BeachState } from "@/lib/types";
import { t, useLang } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { BeachDetail } from "@/components/BeachDetail";
import Link from "next/link";

interface BeachDetailPageProps {
  state: BeachState;
}

export function BeachDetailPage({ state }: BeachDetailPageProps) {
  const [lang, setLang] = useLang();

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <Header lang={lang} onLangChange={setLang} />
      <main className="mx-auto max-w-xl px-6 py-6">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-sm transition-colors"
          style={{ color: "var(--color-accent)" }}
        >
          <span>\u2190</span>
          <span>{t(lang, "section.beaches")}</span>
        </Link>
        <BeachDetail
          state={state}
          lang={lang}
          onClose={() => window.history.back()}
        />
      </main>
    </div>
  );
}
