export interface IEmail {
  sendDigest(userId: string, savedSearchId: string): Promise<'ok'>
}