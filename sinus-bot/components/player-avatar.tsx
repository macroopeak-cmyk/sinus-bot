"use client"

interface PlayerAvatarProps {
  username: string
  className?: string
}

export function PlayerAvatar({ username, className = "w-10 h-10" }: PlayerAvatarProps) {
  // Ссылка на 3D-рендер головы (бюста) под углом в стиле mctiers
  const headUrl = `https://visage.surgeplay.com/bust/80/${username}`

  return (
    <div className={`relative rounded-lg overflow-hidden bg-gradient-to-b from-amber-500/10 to-transparent border border-zinc-800/80 flex items-center justify-center flex-shrink-0 select-none shadow-inner ${className}`}>
      <img
        src={headUrl}
        alt={username}
        className="h-[120%] object-contain transform hover:scale-110 transition-transform duration-200 translate-y-1 drop-shadow"
        onError={(e) => {
          // Заглушка (Стив), если скин или игрок не найдены
          (e.target as HTMLImageElement).src = "https://visage.surgeplay.com/bust/80/MHF_Steve"
        }}
      />
    </div>
  )
}