"import client"
import { useState } from "react"
import { X, Info } from "lucide-react"

export function InfoModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"titles" | "points">("titles")

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition-colors border border-zinc-700"
      >
        <Info className="w-4 h-4" />
        Information
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl relative">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div className="flex gap-2 bg-zinc-800 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("titles")}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    activeTab === "titles" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Titles
                </button>
                <button
                  onClick={() => setActiveTab("points")}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    activeTab === "points" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Points
                </button>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-800/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-sm text-zinc-300">
              {activeTab === "titles" ? (
                <>
                  <div className="space-y-1">
                    <p className="font-bold text-amber-400">Combat Grandmaster</p>
                    <p className="text-xs text-zinc-400">Obtained 400+ total points.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-amber-400">Combat Master</p>
                    <p className="text-xs text-zinc-400">Obtained 250+ total points.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-rose-500">Combat Ace</p>
                    <p className="text-xs text-zinc-400">Obtained 100+ total points.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-purple-400">Combat Specialist</p>
                    <p className="text-xs text-zinc-400">Obtained 50+ total points.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-purple-400">Combat Cadet</p>
                    <p className="text-xs text-zinc-400">Obtained 20+ total points.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-blue-400">Combat Novice</p>
                    <p className="text-xs text-zinc-400">Obtained 10+ total points.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-zinc-400">Rookie</p>
                    <p className="text-xs text-zinc-500">Starting rank for players with less than 10 points.</p>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-zinc-400">Points distribution per tier kit:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-zinc-800/50 p-2 rounded border border-zinc-700">
                      <span className="text-amber-400 font-bold">Tier 1:</span> HT: 60p | LT: 45p
                    </div>
                    <div className="bg-zinc-800/50 p-2 rounded border border-zinc-700">
                      <span className="text-zinc-300 font-bold">Tier 2:</span> HT: 30p | LT: 20p
                    </div>
                    <div className="bg-zinc-800/50 p-2 rounded border border-zinc-700">
                      <span className="text-amber-600 font-bold">Tier 3:</span> HT: 10p | LT: 6p
                    </div>
                    <div className="bg-zinc-800/50 p-2 rounded border border-zinc-700">
                      <span className="text-zinc-400 font-bold">Tier 4:</span> HT: 4p | LT: 3p
                    </div>
                    <div className="bg-zinc-800/50 p-2 rounded border border-zinc-700">
                      <span className="text-zinc-500 font-bold">Tier 5:</span> HT: 2p | LT: 1p
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}