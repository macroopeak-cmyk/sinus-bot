export type Mode = string

export interface Player {
  id: number
  username: string
  region: "EU" | "NA"
  tiers: Record<string, string>
}

export interface RankedPlayer {
  id: number
  username: string
  region: "EU" | "NA"
  tiers: Record<string, string>
  points: number
  rank: number
}

export const INITIAL_PLAYERS: Player[] = [
  {
    id: 1,
    username: "ItzRealZevs",
    region: "EU",
    tiers: { 
      Sword: "HT1", 
      Vanilla: "HT1", 
      UHC: "HT1", 
      Axe: "HT1", 
      NethOP: "HT1", 
      Pot: "HT1", 
      SMP: "HT1", 
      NethPot: "HT1", 
      Mace: "HT1" 
    },
  },
  {
    id: 2,
    username: "x_q",
    region: "EU",
    tiers: { Sword: "HT3", Vanilla: "HT3", UHC: "HT4", SMP: "HT5" },
  },
  {
    id: 3,
    username: "Stqfe",
    region: "EU",
    tiers: { Sword: "HT3", Vanilla: "HT2", UHC: "HT4", SMP: "HT5" },
  },
  {
    id: 4,
    username: "vlad_pvp",
    region: "NA",
    tiers: { Sword: "HT2", Vanilla: "HT4", UHC: "HT4", SMP: "HT5" },
  },
  {
    id: 5,
    username: "Novawwww",
    region: "EU",
    tiers: { Sword: "HT3", Vanilla: "HT3", UHC: "HT1", Axe: "HT2", NethOP: "HT3", Pot: "HT1", SMP: "HT4", NethPot: "HT2", Mace: "HT3" },
  },
  {
    id: 6,
    username: "FrostByte",
    region: "NA",
    tiers: { Sword: "HT1", Vanilla: "HT3", UHC: "HT3", Axe: "HT1", NethOP: "HT4", Pot: "HT2", SMP: "HT3", NethPot: "HT3", Mace: "HT4" },
  },
  {
    id: 7,
    username: "ShadowMC",
    region: "EU",
    tiers: { Sword: "HT3", Vanilla: "HT3", UHC: "HT3", SMP: "HT5" },
  },
  {
    id: 8,
    username: "Nexos",
    region: "NA",
    tiers: { Sword: "HT4", Vanilla: "HT4", UHC: "HT2", Axe: "HT4", NethOP: "HT3", Pot: "HT4", SMP: "HT3", NethPot: "HT4", Mace: "HT2" },
  },
  {
    id: 9,
    username: "BlazeFire",
    region: "EU",
    tiers: { Sword: "HT2", Vanilla: "HT4", UHC: "HT4", Axe: "HT3", NethOP: "HT5", Pot: "HT3", SMP: "HT5", NethPot: "HT3", Mace: "HT5" },
  },
  {
    id: 10,
    username: "Zenith",
    region: "NA",
    tiers: { Sword: "HT5", Vanilla: "HT5", UHC: "HT3", Axe: "HT5", NethOP: "HT4", Pot: "HT5", SMP: "HT4", NethPot: "HT5", Mace: "HT4" },
  },
  {
    id: 42,
    username: "rdfe",
    region: "EU",
    tiers: { Vanilla: "HT5", SMP: "HT5", Sword: "HT4", UHC: "HT5" },
  },
  {
    id: 70,
    username: "Gk_0",
    region: "EU",
    tiers: { Mace: "HT5", Vanilla: "LT3" },
  },
  {
    id: 71,
    username: "Kylaz",
    region: "EU",
    tiers: { Sword: "HT1", NethPot: "HT2", Vanilla: "HT3" },
  },
  {
    id: 72,
    username: "Rivise",
    region: "EU",
    tiers: { Vanilla: "HT1", Pot: "HT3", Axe: "LT2", NethOP: "LT2", UHC: "LT2", Sword: "LT3" },
  },
  {
    id: 73,
    username: "Satosh1a",
    region: "EU",
    tiers: { Sword: "HT2" },
  },
  {
    id: 105,
    username: "MrD3f4ult",
    region: "EU",
    tiers: { NethPot: "LT2", Mace: "LT3", Sword: "HT4", Vanilla: "HT2", Pot: "HT5", Axe: "HT4" },
  },
  {
    id: 106,
    username: "WhiteGolem",
    region: "EU",
    tiers: { Vanilla: "HT3" },
  },
  {
    id: 107,
    username: "rxvxn0",
    region: "EU",
    tiers: { Vanilla: "LT2", Sword: "HT1", Axe: "HT3", NethOP: "HT4" },
  },
  {
    id: 108,
    username: "ReizoTarget",
    region: "EU",
    tiers: { Axe: "HT3", Sword: "LT3", Vanilla: "LT3", UHC: "HT4" },
  },
  {
    id: 74,
    username: "NumaniaVSBG",
    region: "EU",
    tiers: { SMP: "HT3", Sword: "HT3", Vanilla: "HT4" },
  },
  {
    id: 75,
    username: "Snoopyk0909",
    region: "EU",
    tiers: { HT4: "HT4", Sword: "HT4" },
  },
  {
    id: 76,
    username: "danik228335",
    region: "EU",
    tiers: { UHC: "LT2" },
  },
  {
    id: 77,
    username: "sadpigeone_",
    region: "EU",
    tiers: { Axe: "HT1", Sword: "HT5", SMP: "LT2", UHC: "LT2", Vanilla: "HT4", Pot: "LT3", NethPot: "LT4", Mace: "HT5" },
  },
  {
    id: 79,
    username: "targetpvpzab",
    region: "EU",
    tiers: { HT4: "HT4", Vanilla: "HT4" },
  },
  {
    id: 80,
    username: "ZaberyKaSebe",
    region: "EU",
    tiers: {
      Vanilla: "LT4",
      UHC: "LT3",
      Pot: "LT4",
      NethOP: "HT3",
      NethPot: "HT3",
      SMP: "LT2",
      Sword: "LT4",
      Axe: "HT3",
      Mace: "LT2",
      Cart: "LT3",
      Spear: "HT3",
    },
  },
  {
    id: 81,
    username: "artemka12125",
    region: "EU",
    tiers: { HT3: "HT3", Mace: "HT3" },
  },
  {
    id: 90,
    username: "PixelVortex",
    region: "EU",
    tiers: { Sword: "HT4", Vanilla: "HT4", UHC: "HT5" },
  },
  {
    id: 91,
    username: "SkyBreaker",
    region: "NA",
    tiers: { Axe: "HT4", SMP: "LT3", Pot: "HT5" },
  },
  {
    id: 92,
    username: "QuantumPvP",
    region: "EU",
    tiers: { Vanilla: "LT3", UHC: "LT4", Mace: "HT5" },
  },
  {
    id: 93,
    username: "ZenithLite",
    region: "NA",
    tiers: { Sword: "HT4", NethPot: "LT3" },
  },
  {
    id: 94,
    username: "AshRunner",
    region: "EU",
    tiers: { SMP: "HT4", Vanilla: "LT4", Pot: "HT5" },
  },
  {
    id: 95,
    username: "FrostStep",
    region: "NA",
    tiers: { UHC: "HT4", Axe: "LT4", Sword: "HT5" },
  },
  {
    id: 96,
    username: "ShadowDrift",
    region: "EU",
    tiers: { Vanilla: "HT4", Mace: "LT3", NethOP: "HT5" },
  },
  {
    id: 97,
    username: "EchoStrike",
    region: "NA",
    tiers: { Sword: "LT3", UHC: "LT3", Vanilla: "HT5" },
  },
  {
    id: 98,
    username: "NeonDash",
    region: "EU",
    tiers: { Pot: "HT4", SMP: "LT4", Axe: "HT5" },
  },
  {
    id: 99,
    username: "BlazeWalker",
    region: "NA",
    tiers: { Vanilla: "HT4", Sword: "LT4", NethPot: "HT5" },
  },
  {
    id: 100,
    username: "CometPvP",
    region: "EU",
    tiers: { UHC: "HT4", Mace: "LT4", SMP: "HT5" },
  },
  {
    id: 101,
    username: "VortexGuard",
    region: "NA",
    tiers: { Axe: "HT4", Vanilla: "LT3", Pot: "HT5" },
  },
  {
    id: 102,
    username: "TidalWave",
    region: "EU",
    tiers: { Sword: "LT3", UHC: "LT4", Vanilla: "HT5" },
  },
  {
    id: 103,
    username: "SolarKnight",
    region: "NA",
    tiers: { SMP: "HT4", NethOP: "LT4", Sword: "HT5" },
  },
  {
    id: 104,
    username: "RiftWalker",
    region: "EU",
    tiers: { Vanilla: "LT3", Axe: "LT3", Mace: "HT5" },
  },
  {
    id: 50,
    username: "SwiftStrike",
    region: "EU",
    tiers: { Sword: "HT2", Vanilla: "HT3", UHC: "HT4", SMP: "HT5" },
  },
  {
    id: 51,
    username: "PixelKnight",
    region: "NA",
    tiers: { Sword: "HT3", Vanilla: "HT2", Pot: "HT3", Axe: "HT5" },
  },
  {
    id: 52,
    username: "VoidWalker",
    region: "EU",
    tiers: { UHC: "HT2", NethOP: "HT3", SMP: "HT4", Vanilla: "HT5" },
  },
  {
    id: 53,
    username: "StormBringer",
    region: "NA",
    tiers: { Sword: "HT3", Pot: "HT2", Mace: "HT4", Axe: "HT4" },
  },
  {
    id: 54,
    username: "GhostRider",
    region: "EU",
    tiers: { Vanilla: "HT2", Sword: "HT3", NethPot: "HT3", SMP: "HT5" },
  },
  {
    id: 55,
    username: "LunarEclipse",
    region: "NA",
    tiers: { UHC: "HT3", Sword: "HT2", Axe: "HT3", Pot: "HT5" },
  },
  {
    id: 56,
    username: "ApexPredator",
    region: "EU",
    tiers: { Sword: "HT2", Vanilla: "HT4", NethOP: "HT3", Mace: "HT5" },
  },
  {
    id: 57,
    username: "Starlight",
    region: "NA",
    tiers: { Vanilla: "HT3", UHC: "HT2", SMP: "HT3", Axe: "HT5" },
  },
  {
    id: 58,
    username: "IronGuard",
    region: "EU",
    tiers: { Sword: "HT3", Axe: "HT2", Pot: "HT3", NethPot: "HT4" },
  },
  {
    id: 59,
    username: "SilentKill",
    region: "NA",
    tiers: { UHC: "HT3", Vanilla: "HT3", NethOP: "HT3", Sword: "HT4" },
  },
  {
    id: 60,
    username: "NeonBlade",
    region: "EU",
    tiers: { Sword: "HT2", SMP: "HT3", Axe: "HT3", Vanilla: "HT5" },
  },
  {
    id: 61,
    username: "EchoPvP",
    region: "NA",
    tiers: { Vanilla: "HT2", UHC: "HT3", Pot: "HT3", Mace: "HT5" },
  },
  {
    id: 62,
    username: "CrimsonWolf",
    region: "EU",
    tiers: { Sword: "HT3", NethOP: "HT2", SMP: "HT4", UHC: "HT5" },
  },
  {
    id: 63,
    username: "VortexMC",
    region: "NA",
    tiers: { Sword: "HT3", Vanilla: "HT3", Axe: "HT3", NethPot: "HT4" },
  },
  {
    id: 64,
    username: "SolarFlare",
    region: "EU",
    tiers: { UHC: "HT2", Sword: "HT3", Pot: "HT4", SMP: "HT5" },
  },
  {
    id: 65,
    username: "Titanium",
    region: "NA",
    tiers: { Vanilla: "HT3", Axe: "HT2", NethOP: "HT4", Mace: "HT4" },
  },
  {
    id: 66,
    username: "AquaMarine",
    region: "EU",
    tiers: { Sword: "HT3", UHC: "HT3", NethPot: "HT3", Vanilla: "HT4" },
  },
  {
    id: 67,
    username: "NightMare",
    region: "NA",
    tiers: { Sword: "HT2", Pot: "HT3", SMP: "HT3", Axe: "HT5" },
  },
  {
    id: 68,
    username: "Hyperion",
    region: "EU",
    tiers: { Vanilla: "HT2", NethOP: "HT3", UHC: "HT4", Mace: "HT5" },
  },
  {
    id: 69,
    username: "Blizzard",
    region: "NA",
    tiers: { Sword: "HT3", Axe: "HT3", NethPot: "HT3", SMP: "HT4" },
  },
  {
    id: 70,
    username: "MrBaron",
    region: "NA",
    tiers: { Sword: "HT5" },
  },
  {
    id: 71,
    username: "dulikemy",
    region: "NA",
    tiers: { Sword: "HT5", Mace: "LT4" },
  },
  // --- 20 новых игроков с 10-30 очками ---
  {
    id: 201,
    username: "KiteRunner",
    region: "EU",
    tiers: { Sword: "HT3", Vanilla: "LT3" },
  },
  {
    id: 202,
    username: "AuraMaster",
    region: "NA",
    tiers: { UHC: "LT2", SMP: "HT5" },
  },
  {
    id: 203,
    username: "Zetox",
    region: "EU",
    tiers: { Axe: "HT3", Pot: "LT3" },
  },
  {
    id: 204,
    username: "Colds",
    region: "NA",
    tiers: { NethPot: "HT3", Vanilla: "HT5" },
  },
  {
    id: 205,
    username: "StrixPvP",
    region: "EU",
    tiers: { Sword: "LT2", UHC: "HT5" },
  },
  {
    id: 206,
    username: "Glitcher",
    region: "NA",
    tiers: { Vanilla: "HT3", Mace: "LT4" },
  },
  {
    id: 207,
    username: "Prism",
    region: "EU",
    tiers: { NethOP: "HT3", SMP: "HT5" },
  },
  {
    id: 208,
    username: "Wavelet",
    region: "NA",
    tiers: { Sword: "HT3", Axe: "LT4" },
  },
  {
    id: 209,
    username: "Breeze",
    region: "EU",
    tiers: { Pot: "HT3", Vanilla: "HT5" },
  },
  {
    id: 210,
    username: "Crux",
    region: "NA",
    tiers: { UHC: "HT3", NethPot: "LT4" },
  },
  {
    id: 211,
    username: "Fable",
    region: "EU",
    tiers: { Sword: "LT2", SMP: "LT3" },
  },
  {
    id: 212,
    username: "Zenon",
    region: "NA",
    tiers: { Axe: "HT3", Vanilla: "LT4" },
  },
  {
    id: 213,
    username: "Hollow",
    region: "EU",
    tiers: { NethOP: "LT2", Sword: "HT5" },
  },
  {
    id: 214,
    username: "Valiant",
    region: "NA",
    tiers: { UHC: "HT3", Pot: "HT5" },
  },
  {
    id: 215,
    username: "Drift",
    region: "EU",
    tiers: { Vanilla: "HT3", SMP: "HT5" },
  },
  {
    id: 216,
    username: "Saber",
    region: "NA",
    tiers: { Sword: "HT3", Mace: "HT5" },
  },
  {
    id: 217,
    username: "Kryptic",
    region: "EU",
    tiers: { Axe: "LT2", NethPot: "HT5" },
  },
  {
    id: 218,
    username: "Flint",
    region: "NA",
    tiers: { Pot: "HT3", UHC: "LT4" },
  },
  {
    id: 219,
    username: "Rogue",
    region: "EU",
    tiers: { NethOP: "HT3", Vanilla: "HT5" },
  },
  {
    id: 220,
    username: "Ashen",
    region: "NA",
    tiers: { Sword: "LT2", Axe: "HT5" },
  },
]

export const TIER_POINTS: Record<string, number> = {
  "HT1": 60,
  "LT1": 45,
  "HT2": 30,
  "LT2": 20,
  "HT3": 10,
  "LT3": 6,
  "HT4": 4,
  "LT4": 3,
  "HT5": 2,
  "LT5": 1,
}

export function calculatePlayerPoints(tiers: Record<string, string>): number {
  let total = 0
  for (const tier of Object.values(tiers)) {
    if (TIER_POINTS[tier]) {
      total += TIER_POINTS[tier]
    }
  }
  return total
}

export function getPlayerTitle(points: number, tiers?: Record<string, string>): { title: string; color: string } {
  if (tiers && Object.keys(tiers).length > 0) {
    const allHT1 = Object.values(tiers).every((t) => t === "HT1")
    if (allHT1) {
      return { title: "The Strongest", color: "text-red-500 font-black animate-pulse" }
    }
  }

  if (points >= 400) return { title: "Combat Grandmaster", color: "text-amber-400" }
  if (points >= 250) return { title: "Combat Master", color: "text-amber-300" }
  if (points >= 100) return { title: "Combat Ace", color: "text-rose-400" }
  if (points >= 50) return { title: "Combat Specialist", color: "text-purple-400" }
  if (points >= 20) return { title: "Combat Cadet", color: "text-indigo-400" }
  if (points >= 10) return { title: "Combat Novice", color: "text-blue-400" }
  return { title: "Rookie", color: "text-zinc-400" }
}

export const playersData = INITIAL_PLAYERS