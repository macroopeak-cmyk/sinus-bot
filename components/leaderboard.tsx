"use client"

import { useState, useMemo, useEffect } from "react"
import * as RawTiersData from "@/lib/tiers-data"
import { ModeTabs } from "@/components/mode-tabs"
import { RankingTable } from "@/components/ranking-table"
import { calculatePlayerPoints, RankedPlayer } from "@/lib/tiers-data"

export function Leaderboard() {
  const [selectedMode, setSelectedMode] = useState("Overall")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const rankedPlayers = useMemo(() => {
    try {
      if (!RawTiersData) return []
      
      const mod = RawTiersData as any
      let rawArray = []
      
      if (Array.isArray(mod.playersData)) rawArray = mod.playersData
      else if (Array.isArray(mod.players)) rawArray = mod.players
      else if (Array.isArray(mod.INITIAL_PLAYERS)) rawArray = mod.INITIAL_PLAYERS
      else if (Array.isArray(mod.default)) rawArray = mod.default
      else if (Array.isArray(mod.data)) rawArray = mod.data
      else {
        const foundArray = Object.values(mod).find((val) => Array.isArray(val))
        if (Array.isArray(foundArray)) rawArray = foundArray
      }

      if (!rawArray.length) return []

      const sortedRaw = rawArray.map((player: any) => ({
        ...player,
        username: player.username || player.name || "Unknown",
        points: calculatePlayerPoints ? calculatePlayerPoints(player.tiers || {}) : 0,
      })).sort((a: any, b: any) => b.points - a.points)

      return sortedRaw.map((player: any, index: number) => ({
        ...player,
        rank: index + 1,
      })) as RankedPlayer[]
    } catch (e) {
      console.error("Error reading tiers-data:", e)
      return []
    }
  }, [])

  const filteredPlayers = useMemo(() => {
    if (!Array.isArray(rankedPlayers) || rankedPlayers.length === 0) return []

    const q = String(searchQuery || "").toLowerCase().trim()
    const m = String(selectedMode || "overall").toLowerCase().trim()

    return rankedPlayers.filter((player: any) => {
      if (!player || typeof player !== "object") return false

      const name = String(player.username || player.name || "").toLowerCase()
      const matchesSearch = q === "" || (name !== "" && name.indexOf(q) !== -1)

      if (!matchesSearch) return false

      if (m === "overall") return true

      const tiers = player.tiers || {}
      if (typeof tiers !== "object" || tiers === null) return false

      return Object.keys(tiers).some((key) => {
        const k = String(key || "").toLowerCase()
        return k === m && Boolean(tiers[key])
      })
    })
  }, [rankedPlayers, searchQuery, selectedMode])

  if (!isMounted) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12 text-center text-slate-500">
        Loading...
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search players..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
        />
        <svg
          className="absolute left-3.5 top-3 h-4 w-4 text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <ModeTabs selectedMode={selectedMode} onSelectMode={setSelectedMode} />

      <RankingTable
        players={filteredPlayers}
        selectedMode={selectedMode}
      />
    </div>
  )
}