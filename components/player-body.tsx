"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

// mc-heads.net renders a full 3D body model directly from a username.
// Falls back to the classic Steve body if the skin can't be resolved.
export function PlayerBody({
  username,
  height = 72,
  className,
}: {
  username: string
  height?: number
  className?: string
}) {
  const [errored, setErrored] = useState(false)

  const src = `https://mc-heads.net/body/${encodeURIComponent(username)}/${Math.round(
    height * 2,
  )}`
  const fallback = `https://mc-heads.net/body/MHF_Steve/${Math.round(height * 2)}`

  return (
    <img
      src={errored ? fallback : src}
      alt={`${username} Minecraft body render`}
      loading="lazy"
      onError={() => setErrored(true)}
      className={cn("select-none object-contain", className)}
      style={{ height, width: "auto", imageRendering: "pixelated" }}
      crossOrigin="anonymous"
    />
  )
}
