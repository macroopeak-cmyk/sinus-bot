"use client"

import React, { useState } from "react"
import { INITIAL_PLAYERS, Player } from "@/lib/tiers-data"
import { PlayerAvatar } from "./player-avatar"
import { PlayerModal } from "./player-modal"

const TIERS_ORDER = ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5"]

interface KitTierProps {
  selectedKit: string
}

export default function KitTier({ selectedKit }: KitTierProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  const getTierCategory = (tierStr: string) => {
    if (tierStr.includes("1")) return "Tier 1"
    if (tierStr.includes("2")) return "Tier 2"
    if (tierStr.includes("3")) return "Tier 3"
    if (tierStr.includes("4")) return "Tier 4"
    if (tierStr.includes("5")) return "Tier 5"
    return null
  }

  const columnsData: Record<string, { player: Player; tier: string }[]> = {
    "Tier 1": [],
    "Tier 2": [],
    "Tier 3": [],
    "Tier 4": [],
    "Tier 5": [],
  }

  INITIAL_PLAYERS.forEach((player) => {
    const playerTierForKit = player.tiers[selectedKit]
    if (playerTierForKit) {
      const category = getTierCategory(playerTierForKit)
      if (category && columnsData[category]) {
        columnsData[category].push({ player, tier: playerTierForKit })
      }
    }
  })

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {TIERS_ORDER.map((tierName) => {
          const playersInTier = columnsData[tierName] || []

          return (
            <div
              key={tierName}
              className="bg-[#12161f] border border-zinc-800/80 rounded-xl overflow-hidden flex flex-col shadow-md"
            >
              <div className="bg-[#181d28] py-3.5 px-4 border-b border-zinc-800 text-center font-bold tracking-wide text-amber-500/90 flex items-center justify-center gap-2">
                <span>🏆</span>
                <span>{tierName}</span>
              </div>

              <div className="p-3 flex flex-col gap-2.5 overflow-y-auto max-h-[600px]">
                {playersInTier.length > 0 ? (
                  playersInTier.map(({ player, tier }) => (
                    <div
                      key={player.id}
                      onClick={() => setSelectedPlayer(player)}
                      className="bg-[#1a202c] hover:bg-[#222836] transition-all duration-300 hover:scale-105 border border-zinc-800/60 rounded-lg p-2.5 flex items-center justify-between cursor-pointer group shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <PlayerAvatar username={player.username} />
                        <div>
                          <div className="font-semibold text-sm text-zinc-200 group-hover:text-white">
                            {player.username}
                          </div>
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                            {player.region} • <span className="text-purple-400 font-medium">{tier}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-zinc-600 text-sm italic">
                    Нет игроков
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </div>
  )
}