import type { IEmail } from '../interfaces/email'

export class MockEmail implements IEmail {
  async sendDigest(userId: string, savedSearchId: string): Promise<'ok'> {
    console.log(`Mock: Sending digest for saved search ${savedSearchId} to user ${userId}`)
    return 'ok'
  }
}