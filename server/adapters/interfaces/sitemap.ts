export interface ISitemap {
  routes(): Promise<string[]>
}