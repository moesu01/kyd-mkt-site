interface VersionToggleProps {
  version: 1 | 2
  onVersionChange: (version: 1 | 2) => void
}

export function VersionToggle({ version, onVersionChange }: VersionToggleProps) {
  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-[9999] flex items-center gap-1 rounded-full border border-border-strong bg-surface/95 p-1.5 shadow-[0_8px_32px_oklch(0_0_0/0.6)] backdrop-blur-xl max-[900px]:left-4 max-[900px]:right-4 min-[901px]:bottom-7 min-[901px]:left-1/2 min-[901px]:right-auto min-[901px]:-translate-x-1/2"
      role="group"
      aria-label="Prototype version"
    >
      <span className="hidden px-3 text-[11px] font-medium uppercase tracking-[0.15em] text-fg-ghost min-[901px]:inline">
        Prototype
      </span>
      <button
        type="button"
        onClick={() => onVersionChange(1)}
        aria-pressed={version === 1}
        className={`min-h-10 rounded-full px-3.5 py-2 text-xs font-medium transition-[background-color,color] min-[901px]:px-[22px] min-[901px]:py-[9px] min-[901px]:text-[13px] active:scale-[0.96] ${
          version === 1
            ? "bg-accent text-accent-fg"
            : "text-fg-subtle hover:text-fg-muted"
        }`}
      >
        V1 — Split Hero
      </button>
      <button
        type="button"
        onClick={() => onVersionChange(2)}
        aria-pressed={version === 2}
        className={`min-h-10 rounded-full px-3.5 py-2 text-xs font-medium transition-[background-color,color] min-[901px]:px-[22px] min-[901px]:py-[9px] min-[901px]:text-[13px] active:scale-[0.96] ${
          version === 2
            ? "bg-accent text-accent-fg"
            : "text-fg-subtle hover:text-fg-muted"
        }`}
      >
        V2 — Type Hero
      </button>
    </div>
  )
}
