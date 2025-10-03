import type { H3Event } from 'h3'

export interface IAuth {
  getCurrentUser(event: H3Event): Promise<{ id: string; role: 'admin' | 'user' }>
}