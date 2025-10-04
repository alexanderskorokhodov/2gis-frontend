
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function SearchBar() {
  const [q, setQ] = useState('')
  const nav = useNavigate()

  return (
    <div className="card p-3 flex items-center gap-2">
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Введите название застройщика или ЖК"
        className="flex-1 bg-transparent outline-none px-2 py-2"
      />
      <button
        onClick={() => nav(`/search?q=${encodeURIComponent(q)}`)}
        className="px-4 py-2 rounded-xl bg-gray-900 text-white"
      >
        Поиск
      </button>
    </div>
  )
}
