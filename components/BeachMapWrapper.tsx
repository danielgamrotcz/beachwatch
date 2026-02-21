import dynamic from "next/dynamic";
import type { BeachState } from "@/lib/types";
import type { Lang } from "@/lib/i18n";

const BeachMap = dynamic(() => import("./BeachMap").then((m) => ({ default: m.BeachMap })), {
  ssr: false,
  loading: () => (
    <div
      className="h-[240px] md:h-[280px] w-full rounded-2xl animate-pulse"
      style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
    />
  ),
});

interface BeachMapWrapperProps {
  states: BeachState[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  lang: Lang;
}

export function BeachMapWrapper(props: BeachMapWrapperProps) {
  return <BeachMap {...props} />;
}
