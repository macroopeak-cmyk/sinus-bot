"use client"

import { useState } from "react"
import { Player, calculatePlayerPoints, getPlayerTitle, INITIAL_PLAYERS } from "@/lib/tiers-data"
import { X, ExternalLink, Award } from "lucide-react"

interface PlayerModalProps {
  player: Player | null
  isOpen?: boolean
  onClose: () => void
}

const MODE_ICONS: Record<string, string> = {
  Vanilla: "/vanilla.svg",
  UHC: "/uhc.svg",
  Pot: "/pot.svg",
  NethOP: "/nethop.svg",
  NethPot: "/nethop.svg",
  SMP: "/smp.svg",
  Sword: "/sword.svg",
  Axe: "/axe.svg",
  Mace: "/mace.svg",
}

export function PlayerModal({ player, isOpen = true, onClose }: PlayerModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'titles' | 'points'>('profile')

  if (!isOpen || !player) return null

  const points = calculatePlayerPoints(player.tiers)
  const titleInfo = getPlayerTitle(points)

  const sortedPlayers = [...INITIAL_PLAYERS].sort((a, b) => {
    return calculatePlayerPoints(b.tiers) - calculatePlayerPoints(a.tiers)
  })
  const playerRank = sortedPlayers.findIndex((p) => p.id === player.id) + 1

  // Ссылка на стабильный 3D-рендер скина под углом
  const skinUrl = `https://visage.surgeplay.com/bust/120/${player.username}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Стили для анимации переливающегося текста */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-shimmer-gradient {
          background-size: 200% auto;
          animation: gradientMove 3s linear infinite;
        }
      `}</style>

      {/* Плавное появление темного фона */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      />

      {/* Плавное появление карточки с легким приближением */}
      <div className="relative w-full max-w-lg bg-[#12141c] border border-zinc-800 rounded-2xl p-6 shadow-2xl text-white z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Навигация по вкладкам */}
        <div className="flex bg-[#1a1d28] p-1 rounded-xl mb-6 border border-zinc-800">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'profile' ? 'bg-[#272b3b] text-white shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Профиль
          </button>
          <button 
            onClick={() => setActiveTab('titles')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'titles' ? 'bg-[#272b3b] text-white shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Титулы
          </button>
          <button 
            onClick={() => setActiveTab('points')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'points' ? 'bg-[#272b3b] text-white shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Очки
          </button>
        </div>

        {/* ВКЛАДКА: ПРОФИЛЬ */}
        {activeTab === 'profile' && (
          <div>
            {/* Аватарка (3D Скин) */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-b from-amber-500/20 to-transparent border border-amber-500/30 shadow-inner mb-3 select-none overflow-hidden">
                <img
                  src={skinUrl}
                  alt={player.username}
                  className="h-28 object-contain drop-shadow-xl translate-y-1"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://visage.surgeplay.com/bust/120/MHF_Steve"
                  }}
                />
              </div>
              <h2 className="text-2xl font-bold text-amber-400">{player.username}</h2>
              
              <div className="flex items-center gap-1.5 mt-1">
                <Award className="w-4 h-4 text-amber-400" />
                {/* Переливающийся текст для титула */}
                <span className="text-sm font-bold bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-shimmer-gradient inline-block">
                  {titleInfo.title}
                </span>
              </div>

              <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-2">
                {player.region === "EU" ? "Europe" : "North America"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Место в таблице</div>
                <div className="text-2xl font-black text-amber-400">#{playerRank}</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Всего очков</div>
                <div className="text-2xl font-black text-white">{points}</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs text-zinc-400 uppercase tracking-wider mb-3 text-center">Уровни режимов игры</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
                {Object.entries(player.tiers).map(([mode, tier]) => {
                  const isHt = tier.startsWith("HT")
                  const iconPath = MODE_ICONS[mode]

                  return (
                    <div key={mode} className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {iconPath && <img src={iconPath} alt={mode} className="w-4 h-4 object-contain" />}
                        <span className="text-xs font-medium text-zinc-300">{mode}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold border ${
                        isHt 
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30" 
                          : "bg-purple-500/10 text-purple-400 border-purple-500/30"
                      }`}>
                        {tier}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <a
              href={`https://namemc.com/search?q=${player.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition flex items-center justify-center gap-2 text-sm font-semibold text-zinc-200"
            >
              <ExternalLink className="w-4 h-4" />
              Открыть на NameMC
            </a>
          </div>
        )}

        {/* ВКЛАДКА: ТИТУЛЫ */}
        {activeTab === 'titles' && (
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-4">Как получить титулы достижений</h3>
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-start gap-3">
                <div className="text-red-500 text-lg mt-0.5">🏆</div>
                <div>
                  <div className="font-bold text-sm bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-shimmer-gradient inline-block">
                    The Strongest
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">Достигнут HT1 тир во всех протестированных наборах.</div>
                </div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-start gap-3">
                <div className="text-yellow-500 text-lg mt-0.5">🏆</div>
                <div>
                  <div className="font-bold text-sm text-yellow-400">Combat Grandmaster</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Получено 400+ суммарных очков.</div>
                </div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-start gap-3">
                <div className="text-amber-400 text-lg mt-0.5">🏅</div>
                <div>
                  <div className="font-bold text-sm text-amber-400">Combat Master</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Получено 250+ суммарных очков.</div>
                </div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-start gap-3">
                <div className="text-rose-400 text-lg mt-0.5">🏅</div>
                <div>
                  <div className="font-bold text-sm text-rose-400">Combat Ace</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Получено 100+ суммарных очков.</div>
                </div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-start gap-3">
                <div className="text-purple-400 text-lg mt-0.5">🏅</div>
                <div>
                  <div className="font-bold text-sm text-purple-400">Combat Specialist</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Получено 50+ суммарных очков.</div>
                </div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-start gap-3">
                <div className="text-indigo-400 text-lg mt-0.5">🏅</div>
                <div>
                  <div className="font-bold text-sm text-indigo-400">Combat Cadet</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Получено 20+ суммарных очков.</div>
                </div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-start gap-3">
                <div className="text-blue-400 text-lg mt-0.5">🏅</div>
                <div>
                  <div className="font-bold text-sm text-blue-400">Combat Novice</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Получено 10+ суммарных очков.</div>
                </div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-start gap-3">
                <div className="text-zinc-400 text-lg mt-0.5">🏅</div>
                <div>
                  <div className="font-bold text-sm text-zinc-300">Rookie</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Начальный ранг для игроков с менее чем 10 очками.</div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ВКЛАДКА: ОЧКИ */}
        {activeTab === 'points' && (
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-2">Как рассчитываются очки рейтинга</h3>
            <p className="text-xs text-zinc-400 mb-4">Очки начисляются на основе уровня (тира), достигнутого в каждой категории наборов:</p>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                <span className="text-zinc-300">HT1:</span>
                <span className="font-bold text-amber-400">60 очков</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                <span className="text-zinc-300">LT1:</span>
                <span className="font-bold text-amber-400">45 очков</span>
              </div>

              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                <span className="text-zinc-300">HT2:</span>
                <span className="font-bold text-purple-400">30 очков</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                <span className="text-zinc-300">LT2:</span>
                <span className="font-bold text-purple-400">20 очков</span>
              </div>

              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                <span className="text-zinc-300">HT3:</span>
                <span className="font-bold text-blue-400">10 очков</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                <span className="text-zinc-300">LT3:</span>
                <span className="font-bold text-blue-400">6 очков</span>
              </div>

              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                <span className="text-zinc-300">HT4:</span>
                <span className="font-bold text-emerald-400">4 очка</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                <span className="text-zinc-300">LT4:</span>
                <span className="font-bold text-emerald-400">3 очка</span>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-zinc-300">HT5:</span>
                <span className="font-bold text-zinc-400">2 очка</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-zinc-300">LT5:</span>
                <span className="font-bold text-zinc-400">1 очко</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}