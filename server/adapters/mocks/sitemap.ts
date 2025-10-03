import type { ISitemap } from '../interfaces/sitemap'
import { getCfpDirectory } from '../container'

export class MockSitemap implements ISitemap {
  async routes(): Promise<string[]> {
    const directory = getCfpDirectory()
    const cfps = await directory.list({ pageSize: 1000 })

    const routes = [
      '/',
      '/search',
      '/submit',
      '/account/saved-searches'
    ]

    cfps.items.forEach(cfp => {
      routes.push(`/cfp/${cfp.slug}`)
    })

    return routes
  }
}