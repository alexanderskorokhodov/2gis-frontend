
import { api } from '@shared/api/client'
import type { Developer } from '@shared/types'

export async function fetchDeveloper(id: string): Promise<Developer> {
  return api.get(`developers/${id}`).json<Developer>()
}

export async function fetchPopular(): Promise<Developer[]> {
  return api.get('developers', { searchParams: { popular: '1' } }).json<Developer[]>()
}
