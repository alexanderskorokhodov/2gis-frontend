
import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { popularRequested } from '@entities/developer/model'
import { $popular } from '@entities/developer/model'
import { DeveloperCard } from '@entities/developer/ui'
import { SearchBar } from '@widgets/SearchBar'

export function LandingPage() {
  const popular = useUnit($popular)

  useEffect(() => { popularRequested() }, [])

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold">Проверьте репутацию застройщика за 2 минуты</h1>
        <SearchBar />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Популярные застройщики</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popular.map(dev => <DeveloperCard key={dev.id} dev={dev} />)}
        </div>
      </section>
    </div>
  )
}
