"use client"

import { useState } from "react"
import { RankedPlayer, Mode, Player } from "@/lib/tiers-data"
import { PlayerModal } from "./player-modal"
import { Trophy } from "lucide-react"

interface RankingTableProps {
  players: RankedPlayer[]
  selectedMode: Mode | "overall" | string
}

export function RankingTable({ players, selectedMode }: RankingTableProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  // Храним состояние ошибок загрузки скинов для каждого игрока по его ID или нику
  const [skinErrors, setSkinErrors] = useState<Record<string, boolean>>({})

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: "bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500",
          text: "text-black",
          border: "border-amber-300/50",
          shadow: "shadow-amber-500/20",
        }
      case 2:
        return {
          bg: "bg-gradient-to-r from-slate-300 via-slate-400 to-zinc-400",
          text: "text-black",
          border: "border-slate-300/50",
          shadow: "shadow-slate-400/20",
        }
      case 3:
        return {
          bg: "bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900",
          text: "text-white",
          border: "border-amber-700/50",
          shadow: "shadow-amber-900/20",
        }
      default:
        return {
          bg: "bg-[#12161f]",
          text: "text-zinc-200",
          border: "border-zinc-800",
          shadow: "shadow-black/20",
        }
    }
  }

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Шапка табличных колонок (без Region) */}
      <div className="w-full hidden md:flex items-center justify-between px-6 py-1 text-xs font-bold tracking-wider text-zinc-500 uppercase select-none">
        <div className="flex items-center gap-4">
          <span className="min-w-[40px] text-left">#</span>
          <span className="ml-[64px]">Player</span>
        </div>
        <div>
          <span className="mr-8">Tiers</span>
        </div>
      </div>

      {players.map((player, index) => {
        const rank = index + 1
        const style = getRankBadgeStyle(rank)
        
        // Если произошла ошибка загрузки, подставляем дефолтного Стива
        const hasError = skinErrors[player.id]
        const skinUrl = hasError
          ? "https://visage.surgeplay.com/bust/70/MHF_Steve"
          : `https://visage.surgeplay.com/bust/70/${player.username}`

        return (
          <div
            key={player.id}
            onClick={() => setSelectedPlayer(player)}
            className={`relative rounded-xl border ${style.border} ${style.bg} shadow-md ${style.shadow} transition-all duration-200 hover:scale-[1.01] cursor-pointer flex items-center justify-between px-6 py-3`}
          >
            {/* Левая часть: Ранг, 3D Скин, Ник и Очки */}
            <div className="flex items-center gap-4 z-10">
              <span className={`text-2xl md:text-3xl font-black italic tracking-wider ${style.text} drop-shadow-sm min-w-[40px]`}>
                {rank}.
              </span>

              {/* 3D Бюст */}
              <div className="h-12 md:h-14 w-12 md:w-14 flex items-end justify-center flex-shrink-0 select-none overflow-hidden">
                <img
                  src={skinUrl}
                  alt={player.username}
                  className="h-full object-contain drop-shadow-lg transform hover:scale-110 transition-transform duration-200"
                  onError={() => {
                    setSkinErrors((prev) => ({ ...prev, [player.id]: true }))
                  }}
                />
              </div>

              <div className="flex flex-col ml-1">
                <div className="flex items-center gap-2">
                  <span className={`text-base md:text-lg font-extrabold ${style.text} tracking-wide`}>
                    {player.username}
                  </span>
                  {rank === 1 && <Trophy className="w-4 h-4 text-black fill-black" />}
                </div>
                <span className={`text-[11px] font-medium opacity-80 ${style.text}`}>
                  Очков: <strong className="font-bold">{player.points}</strong>
                </span>
              </div>
            </div>

            {/* Правая часть: Регион и ВСЕ тиры игрока без полосы прокрутки */}
            <div className="flex items-center gap-3 z-10">
              {/* Бейдж региона */}
              <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs font-black text-white tracking-wider shadow-sm">
                {player.region || "EU"}
              </div>

              {/* Блок со всеми тирами */}
              <div 
                className="hidden sm:flex items-center gap-1 bg-black/30 p-1.5 rounded-xl border border-white/10 max-w-[450px] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {player.tiers && Object.entries(player.tiers).map(([modeKey, tierData]) => (
                  <div key={modeKey} className="flex flex-col items-center px-1.5 py-0.5 bg-black/30 rounded-md min-w-[36px] shrink-0">
                    <span className="text-[10px] uppercase font-bold tracking-tight text-zinc-400">
                      {modeKey.slice(0, 3)}
                    </span>
                    <span className="text-xs font-black text-amber-300 drop-shadow">
                      {typeof tierData === 'string' ? tierData : (tierData as any)?.tier}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}

      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </div>
  )
}