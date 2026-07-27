"use client"

import { RankedPlayer, Mode } from "@/lib/tiers-data"

interface RankCardProps {
  player: RankedPlayer
  rank: number
  selectedMode: Mode | "overall" | string
  onClick: () => void
}

export function RankCard({ player, rank, selectedMode, onClick }: RankCardProps) {
  // Функция для получения стилей тиров (как в модальном окне)
  const getTierBadgeStyle = (tier: string) => {
    const t = tier?.toUpperCase() || ""
    if (t.includes("HT1") || t === "LT1" || t === "T1") {
      return "bg-amber-500/20 text-amber-400 border-amber-500/40"
    }
    if (t.includes("HT2") || t === "LT2" || t === "T2") {
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/40"
    }
    if (t.includes("HT3") || t === "LT3" || t === "T3") {
      return "bg-purple-500/20 text-purple-400 border-purple-500/40"
    }
    return "bg-zinc-800 text-zinc-300 border-zinc-700"
  }

  // Цвета для 1, 2, 3 мест (как на вашем скриншоте с медалями)
  const getRankBadgeStyle = (r: number) => {
    if (r === 1) return "bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black shadow-lg shadow-amber-500/20"
    if (r === 2) return "bg-gradient-to-r from-slate-400 to-zinc-300 text-black font-black shadow-lg shadow-slate-400/20"
    if (r === 3) return "bg-gradient-to-r from-amber-700 to-amber-600 text-white font-black shadow-lg shadow-amber-700/20"
    return "text-zinc-400 font-bold bg-zinc-900/80 border border-zinc-800"
  }

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col md:flex-row items-center justify-between bg-[#12161f]/90 hover:bg-[#161b26] border border-zinc-800/80 hover:border-white/40 rounded-2xl p-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-white/5 cursor-pointer gap-4"
    >
      {/* Левая часть: Ранг, Аватар, Имя */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-lg ${getRankBadgeStyle(rank)}`}>
          #{rank}
        </div>

        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0">
          <img
            src={`https://minotar.net/avatar/${player.username}/100.png`}
            alt={player.username}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div>
          <h3 className="text-white font-bold text-base group-hover:text-amber-400 transition-colors">
            {player.username}
          </h3>
          <span className="text-xs text-zinc-400 uppercase tracking-wider">{player.region}</span>
        </div>
      </div>

      {/* Правая часть: Плашки режимов и тиров с цветами */}
      <div className="flex flex-wrap items-center gap-2 max-w-2xl justify-end">
        {player.tiers &&
          Object.entries(player.tiers).map(([modeName, tierValue]) => {
            if (!tierValue) return null
            return (
              <div
                key={modeName}
                className="flex items-center bg-[#181d28] border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs gap-2"
              >
                <span className="text-zinc-300 font-medium">{modeName}</span>
                <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${getTierBadgeStyle(String(tierValue))}`}>
                  {String(tierValue)}
                </span>
              </div>
            )
          })}
      </div>
    </div>
  )
}