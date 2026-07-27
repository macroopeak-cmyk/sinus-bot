"use client"

import { useState, useEffect, KeyboardEvent } from "react"
import { INITIAL_PLAYERS, calculatePlayerPoints, RankedPlayer, Player } from "@/lib/tiers-data"
import { RankingTable } from "@/components/ranking-table"
import KitTier from "@/components/kit-tier"
import { PlayerModal } from "@/components/player-modal"
import { MessageSquare, Info, Users, X, Trophy, Award, Copy, Check, Palette, ShieldCheck } from "lucide-react"

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<string>("overall")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [errorText, setErrorText] = useState<string>("")
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false)
  const [isTestersOpen, setIsTestersOpen] = useState<boolean>(false)
  const [infoTab, setInfoTab] = useState<"titles" | "points">("titles")
  const [copied, setCopied] = useState(false)
  
  // Управление темой
  const [theme, setTheme] = useState<"dark" | "midnight" | "sinus" | "light">("dark")
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  
  const serverIP = "SinusSMP.ru"

  // Актуальный список тестеров
  const testersList = [
    { name: "Rivise", role: "Тестер / Судья", discord: "macroopeak", color: "text-emerald-400" },
    { name: "sadpigeone_", role: "Тестер / Судья", discord: "vbna__4cb", color: "text-purple-400" },
    { name: "eraq016", role: "Тестер / Судья", discord: "eraq016", color: "text-blue-400" },
    { name: "MrD3f4ult", role: "Тестер / Судья", discord: "ivan_evtushin", color: "text-amber-400" },
    { name: "Kylaz", role: "Тестер / Судья", discord: "yu_miii_", color: "text-rose-400" },
    { name: "Satosh1a", role: "Тестер / Судья", discord: "satoshiia", color: "text-cyan-400" },
  ]

  useEffect(() => {
    const savedTheme = localStorage.getItem("combat_tiers_theme") as "dark" | "midnight" | "sinus" | "light"
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const changeTheme = (newTheme: "dark" | "midnight" | "sinus" | "light") => {
    setTheme(newTheme)
    localStorage.setItem("combat_tiers_theme", newTheme)
    setIsThemeOpen(false)
  }

  // Безопасное копирование IP
  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(serverIP).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }).catch(() => {
        fallbackCopyText(serverIP)
      })
    } else {
      fallbackCopyText(serverIP)
    }
  }

  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement("textarea")
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Не удалось скопировать', err)
    }
    document.body.removeChild(textArea)
  }

  const sortedRawPlayers = [...INITIAL_PLAYERS].map((player) => ({
    ...player,
    points: calculatePlayerPoints(player.tiers),
  })).sort((a, b) => b.points - a.points)

  const rankedPlayers: RankedPlayer[] = sortedRawPlayers.map((player, index) => ({
    ...player,
    rank: index + 1,
  }))

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const trimmedQuery = searchQuery.trim()
      
      const foundPlayer = rankedPlayers.find(
        (p) => p.username.toLowerCase() === trimmedQuery.toLowerCase()
      )

      if (foundPlayer) {
        setSelectedPlayer(foundPlayer)
        setErrorText("")
        setSearchQuery("")
      } else {
        setErrorText("Игрок не найден")
        setSelectedPlayer(null)
      }
    }
  }

  const modes = ["overall", "Vanilla", "UHC", "Pot", "NethOP", "NethPot", "SMP", "Sword", "Axe", "Mace", "Cart", "Spear"]

  // Стили для тем
  const themeStyles = {
    dark: {
      bg: "bg-[#0b0e14]",
      textColor: "text-white",
      cardBg: "bg-[#12161f]",
      border: "border-zinc-800",
      accentInput: "focus:border-purple-600",
    },
    midnight: {
      bg: "bg-[#000000]",
      textColor: "text-white",
      cardBg: "bg-[#0a0a0a]",
      border: "border-zinc-900",
      accentInput: "focus:border-zinc-500",
    },
    sinus: {
      bg: "bg-[#0a140f]",
      textColor: "text-white",
      cardBg: "bg-[#112219]",
      border: "border-emerald-900/50",
      accentInput: "focus:border-emerald-500",
    },
    light: {
      bg: "bg-[#f4f6f9]",
      textColor: "text-zinc-900",
      cardBg: "bg-white",
      border: "border-zinc-200",
      accentInput: "focus:border-blue-500",
    },
  }[theme]

  return (
    <main className={`min-h-screen ${themeStyles.bg} ${themeStyles.textColor} flex flex-col items-center py-6 px-4 relative transition-colors duration-300`}>
      {/* Шапка сайта */}
      <header className={`w-full max-w-5xl flex items-center justify-between mb-8 pb-4 border-b ${themeStyles.border}`}>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 text-sm ${themeStyles.cardBg} border ${themeStyles.border} px-3.5 py-2.5 rounded-xl shadow-inner h-fit transition-all duration-300 hover:scale-105 cursor-default`}>
            <Users className="w-4 h-4 text-amber-500" />
            <span>Игроков: <strong className={theme === "light" ? "text-zinc-900" : "text-white"}>{INITIAL_PLAYERS.length}</strong></span>
          </div>

          <div className={`flex items-center gap-3 ${theme === "light" ? "bg-white border-zinc-200 text-zinc-900" : "bg-[#111318] border-zinc-800 text-white"} px-4 py-2 rounded-xl border select-none shadow-inner transition-all duration-300 hover:scale-105`}>
            <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#346b3f] to-[#1e3c23] px-2.5 py-1 rounded-lg border border-[#4e995c]/30 shadow-inner">
              <span className="text-[9px] font-black tracking-wider uppercase text-emerald-300 leading-none">Sinus</span>
              <span className="text-xs font-black tracking-tight text-white uppercase leading-none mt-0.5">SMP</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">SERVER IP</span>
              <button
                onClick={handleCopy}
                className={`group flex items-center justify-between gap-3 ${theme === "light" ? "bg-zinc-100 hover:bg-zinc-200 border-zinc-300" : "bg-[#1a1d24] hover:bg-[#222630] border-white/5"} transition-all px-2.5 py-1 rounded-lg border mt-0.5 cursor-pointer active:scale-95`}
                title="Скопировать IP"
              >
                <span className={`text-xs font-semibold tracking-wide ${theme === "light" ? "text-zinc-800" : "text-zinc-200 group-hover:text-white"}`}>{serverIP}</span>
                <div className="text-zinc-400 group-hover:text-emerald-400 transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Кнопка выбора темы */}
          <div className="relative">
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className={`flex items-center gap-2 ${themeStyles.cardBg} hover:opacity-80 border ${themeStyles.border} px-3.5 py-2 rounded-xl text-sm transition-all duration-300 hover:scale-105 cursor-pointer`}
              title="Выбрать тему"
            >
              <Palette className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline capitalize">{theme}</span>
            </button>

            {isThemeOpen && (
              <div className={`absolute right-0 mt-2 w-40 ${themeStyles.cardBg} border ${themeStyles.border} rounded-xl shadow-xl overflow-hidden z-50 p-1 flex flex-col gap-1`}>
                <button
                  onClick={() => changeTheme("dark")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${theme === "dark" ? "bg-zinc-800 text-white" : "hover:bg-zinc-800/60 text-zinc-300"}`}
                >
                  Dark (Default)
                </button>
                <button
                  onClick={() => changeTheme("midnight")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${theme === "midnight" ? "bg-zinc-900 text-white" : "hover:bg-zinc-800/60 text-zinc-300"}`}
                >
                  Midnight (AMOLED)
                </button>
                <button
                  onClick={() => changeTheme("sinus")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${theme === "sinus" ? "bg-emerald-950 text-white" : "hover:bg-zinc-800/60 text-zinc-300"}`}
                >
                  Sinus Theme
                </button>
                <button
                  onClick={() => changeTheme("light")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${theme === "light" ? "bg-zinc-200 text-zinc-900" : "hover:bg-zinc-800/60 text-zinc-300"}`}
                >
                  Light Theme ☀️
                </button>
              </div>
            )}
          </div>

          {/* Кнопка Тестеры */}
          <button
            onClick={() => setIsTestersOpen(true)}
            className={`flex items-center gap-2 ${themeStyles.cardBg} hover:opacity-80 border ${themeStyles.border} px-4 py-2 rounded-xl text-sm transition-all duration-300 hover:scale-105 cursor-pointer`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Тестеры</span>
          </button>

          <button
            onClick={() => setIsInfoOpen(true)}
            className={`flex items-center gap-2 ${themeStyles.cardBg} hover:opacity-80 border ${themeStyles.border} px-4 py-2 rounded-xl text-sm transition-all duration-300 hover:scale-105 cursor-pointer`}
          >
            <Info className="w-4 h-4 text-cyan-400" />
            <span>Информация</span>
          </button>

          <a
            href="https://discord.gg/cqBVfKCWf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#5865F2]/20 hover:bg-[#5865F2]/30 border border-[#5865F2]/40 text-[#5865F2] hover:text-indigo-300 px-4 py-2 rounded-xl text-sm transition-all duration-300 hover:scale-105 font-medium shadow-lg shadow-[#5865F2]/10"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discord</span>
          </a>
        </div>
      </header>

      {/* Увеличенный в 2 раза графический логотип SinusTiers */}
      <div className="flex flex-col items-center justify-center my-6 text-center select-none">
        <div className="relative group">
          <img 
            src="/logo.png" 
            alt="SinusTiers" 
            className="h-56 md:h-72 w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        <p className="text-zinc-400 text-sm mt-4 font-medium tracking-wide drop-shadow-md">
          Official competitive rankings & player tiers
        </p>
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-2 mb-8">
        <input
          type="text"
          placeholder="Поиск игрока по нику (нажмите Enter для точного выбора)..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            if (errorText) setErrorText("")
          }}
          onKeyDown={handleKeyDown}
          className={`w-full ${themeStyles.cardBg} border ${themeStyles.border} rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none ${themeStyles.accentInput} transition-colors`}
        />

        {errorText && (
          <span className="text-xs text-red-400 font-medium px-1">
            {errorText}
          </span>
        )}

        <div className={`flex flex-wrap items-center justify-center gap-2 ${themeStyles.cardBg} p-2 rounded-xl border ${themeStyles.border} max-h-40 overflow-y-auto mt-2`}>
          {modes.map((mode) => {
            const isActive = selectedMode === mode
            return (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-105"
                    : "text-zinc-400 hover:opacity-100 hover:bg-zinc-800/20"
                }`}
              >
                {mode}
              </button>
            )
          })}
        </div>
      </div>

      <div className="w-full max-w-5xl">
        {selectedMode === "overall" ? (
          <RankingTable players={rankedPlayers} selectedMode={selectedMode} />
        ) : (
          <KitTier selectedKit={selectedMode} />
        )}
      </div>

      {/* Модальное окно игрока */}
      <PlayerModal
        player={selectedPlayer}
        isOpen={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />

      {/* Модальное окно: Тестеры */}
      {isTestersOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className={`${themeStyles.cardBg} border ${themeStyles.border} rounded-2xl w-full max-w-md p-6 relative shadow-2xl`}>
            <button
              onClick={() => setIsTestersOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:opacity-100 bg-zinc-900/80 p-1.5 rounded-lg border border-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold">Список тестеров и судей</h3>
            </div>
            <p className="text-xs text-zinc-400 mb-5">По вопросам прохождения проверок на тиры вы можете обращаться к следующим людям в Discord:</p>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {testersList.map((tester, idx) => (
                <div key={idx} className={`flex items-center justify-between p-3 rounded-xl border ${themeStyles.border} ${themeStyles.bg}`}>
                  <div>
                    <div className={`font-bold text-sm ${tester.color}`}>{tester.name}</div>
                    <div className="text-[11px] text-zinc-400">{tester.role}</div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-zinc-900/60 px-2.5 py-1.5 rounded-lg border border-zinc-800 text-xs text-indigo-300 font-mono">
                    <MessageSquare className="w-3 h-3 text-[#5865F2]" />
                    <span>{tester.discord}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно информации */}
      {isInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className={`${themeStyles.cardBg} border ${themeStyles.border} rounded-2xl w-full max-w-md p-6 relative shadow-2xl`}>
            <button
              onClick={() => setIsInfoOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:opacity-100 bg-zinc-900/80 p-1.5 rounded-lg border border-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className={`flex ${themeStyles.bg} p-1.5 rounded-xl border ${themeStyles.border} mb-6`}>
              <button
                onClick={() => setInfoTab("titles")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  infoTab === "titles" ? "bg-zinc-800 text-white shadow" : "text-zinc-400 hover:opacity-100"
                }`}
              >
                Титулы
              </button>
              <button
                onClick={() => setInfoTab("points")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  infoTab === "points" ? "bg-zinc-800 text-white shadow" : "text-zinc-400 hover:opacity-100"
                }`}
              >
                Очки
              </button>
            </div>

            {infoTab === "titles" ? (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                <h3 className="text-sm font-semibold mb-3">Как получить титулы достижений</h3>
                
                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-500 font-bold text-sm">The Strongest</h4>
                    <p className="text-zinc-400 text-xs">Достигнут тир HT1 на всех протестированных китах.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-400 font-bold text-sm">Combat Grandmaster</h4>
                    <p className="text-zinc-400 text-xs">Получено 400+ очков в сумме.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-300 font-bold text-sm">Combat Master</h4>
                    <p className="text-zinc-400 text-xs">Получено 250+ очков в сумме.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-rose-400 font-bold text-sm">Combat Ace</h4>
                    <p className="text-zinc-400 text-xs">Получено 100+ очков в сумме.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-purple-400 font-bold text-sm">Combat Specialist</h4>
                    <p className="text-zinc-400 text-xs">Получено 50+ очков в сумме.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-indigo-400 font-bold text-sm">Combat Cadet</h4>
                    <p className="text-zinc-400 text-xs">Получено 20+ очков в сумме.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-bold text-sm">Combat Novice</h4>
                    <p className="text-zinc-400 text-xs">Получено 10+ очков в сумме.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-zinc-400 font-bold text-sm">Rookie</h4>
                    <p className="text-zinc-400 text-xs">Начальный ранг для игроков с менее чем 10 очками.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 text-xs">
                <h3 className="text-sm font-semibold mb-2">Как рассчитываются очки рейтинга</h3>
                <p className="text-zinc-400">Очки начисляются в зависимости от тира, достигнутого в каждой категории китов:</p>
                <div className={`grid grid-cols-2 gap-2 ${themeStyles.bg} p-3 rounded-xl border ${themeStyles.border}`}>
                  <div>HT1: <strong className="text-amber-400">60 pts</strong></div>
                  <div>LT1: <strong className="text-amber-400">45 pts</strong></div>
                  <div>HT2: <strong className="text-purple-400">30 pts</strong></div>
                  <div>LT2: <strong className="text-purple-400">20 pts</strong></div>
                  <div>HT3: <strong className="text-blue-400">10 pts</strong></div>
                  <div>LT3: <strong className="text-blue-400">6 pts</strong></div>
                  <div>HT4: <strong className="text-emerald-400">4 pts</strong></div>
                  <div>LT4: <strong className="text-emerald-400">3 pts</strong></div>
                  <div>HT5: <strong className="text-zinc-400">2 pts</strong></div>
                  <div>LT5: <strong className="text-zinc-400">1 pt</strong></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}