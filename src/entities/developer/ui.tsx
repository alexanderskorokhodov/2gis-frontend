
import type { Developer } from '@shared/types'
import { Link } from 'react-router-dom'

export function DeveloperCard({ dev }: { dev: Developer }) {
  return (
    <Link to={`/developer/${dev.id}`} className="card p-4 flex items-center gap-4">
      {dev.logo && <img src={dev.logo} alt={dev.name} className="h-12 w-12 rounded-xl object-cover" />}
      <div className="flex-1">
        <div className="font-semibold">{dev.name}</div>
        <div className="text-sm opacity-70">
          {dev.reliabilityIndex != null ? `Индекс: ${dev.reliabilityIndex}` : '—'}
        </div>
      </div>
    </Link>
  )
}

export function DeveloperHeader({ dev }: { dev: Developer }) {
  return (
    <header className="flex items-center gap-4">
      {dev.logo && <img src={dev.logo} alt={dev.name} className="h-14 w-14 rounded-xl object-cover" />}
      <div>
        <h1 className="text-2xl font-semibold">{dev.name}</h1>
        {dev.reliabilityIndex != null && (
          <div className="text-sm opacity-70">Индекс надёжности: {dev.reliabilityIndex}</div>
        )}
      </div>
    </header>
  )
}
