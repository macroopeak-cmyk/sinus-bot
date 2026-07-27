import React from "react"

export function TierBadge({ tier, size = "md" }: { tier?: any; size?: string }) {
  if (!tier || typeof tier !== "string") {
    return <span className="text-slate-600 font-mono">—</span>
  }

  const t = tier.toUpperCase().trim()
  let bgClass = "bg-slate-800 text-slate-300 border-slate-700"

  // Безопасная проверка с встроенной строкой
  if (t.includes("HT1") || t.includes("LT1")) {
    bgClass = "bg-amber-500/10 text-amber-400 border-amber-500/30"
  } else if (t.includes("HT2") || t.includes("LT2")) {
    bgClass = "bg-purple-500/10 text-purple-400 border-purple-500/30"
  } else if (t.includes("HT3") || t.includes("LT3")) {
    bgClass = "bg-blue-500/10 text-blue-400 border-blue-500/30"
  }

  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded border ${bgClass}`}>
      {t}
    </span>
  )
}