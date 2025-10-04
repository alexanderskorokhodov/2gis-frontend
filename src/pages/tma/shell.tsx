
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

declare global {
  interface Window { Telegram?: any }
}

export function TMAShell() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    try {
      tg?.expand()
      tg?.enableClosingConfirmation()
    } catch(e) {
      // noop in web
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  )
}
