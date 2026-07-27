"use client"

import { useState, KeyboardEvent } from "react"
import { INITIAL_PLAYERS, Player } from "@/lib/tiers-data"
import { PlayerModal } from "./player-modal" // Путь к вашей карточке игрока

export function PlayerSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [errorText, setErrorText] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmedQuery = searchQuery.trim().toLowerCase()
      
      // Ищем игрока строго по полному совпадению никнейма
      const foundPlayer = INITIAL_PLAYERS.find(
        (p) => p.username.toLowerCase() === trimmedQuery
      )

      if (foundPlayer) {
        setSelectedPlayer(foundPlayer)
        setErrorText("")
        setSearchQuery("") // Очищаем поле ввода при успехе
      } else {
        setErrorText("Игрок не найден")
        setSelectedPlayer(null)
      }
    }
  }

  return (
    <div className="relative flex flex-col items-center gap-1">
      <input
        type="text"
        placeholder="Введите полный ник и нажмите Enter..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value)
          if (errorText) setErrorText("")
        }}
        onKeyDown={handleKeyDown}
        className="px-4 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 outline-none focus:border-amber-500 w-80 shadow-lg transition text-sm"
      />

      {errorText && (
        <span className="text-xs text-red-400 font-medium px-1 animate-in fade-in duration-150">
          {errorText}
        </span>
      )}

      {/* Модальное окно (карточка игрока) */}
      <PlayerModal
        player={selectedPlayer}
        isOpen={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />
    </div>
  )
}