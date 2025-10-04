
import { Outlet, Link, NavLink } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold">Realty Summary</Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/search" className={({isActive}) => isActive ? 'font-semibold' : ''}>Поиск</NavLink>
            <NavLink to="/compare" className={({isActive}) => isActive ? 'font-semibold' : ''}>Сравнить</NavLink>
            <a href="https://t.me/" target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100">TMA</a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
