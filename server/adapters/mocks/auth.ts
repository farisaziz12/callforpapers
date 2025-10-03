import type { IAuth } from '../interfaces/auth'
import type { H3Event } from 'h3'

export class MockAuth implements IAuth {
  async getCurrentUser(event: H3Event): Promise<{ id: string; role: 'admin' | 'user' }> {
    const config = useRuntimeConfig()
    const authHeader = getHeader(event, 'authorization')
    const token = authHeader?.replace('Bearer ', '') || getCookie(event, 'auth-token')

    if (token === config.adminAccessToken) {
      return { id: 'admin-user', role: 'admin' }
    }

    return { id: 'demo-user', role: 'user' }
  }
}