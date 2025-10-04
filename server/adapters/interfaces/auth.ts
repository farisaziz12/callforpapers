import type { H3Event } from 'h3'

export interface IAuth {
  getCurrentUser(event: H3Event): Promise<{ sub: string; role: 'admin' | 'user' }>
}