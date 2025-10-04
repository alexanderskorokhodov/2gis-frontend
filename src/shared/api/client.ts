
import ky from 'ky'
import { env } from '@shared/config/env'

export const api = ky.create({
  prefixUrl: env.API_URL,
  timeout: 8000,
  hooks: {
    beforeRequest: [
      req => {
        // place for auth header or tma signature
      }
    ]
  }
})
