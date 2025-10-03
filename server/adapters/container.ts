import type { ICfpDirectory } from './interfaces/cfp-directory'
import type { ISavedSearches } from './interfaces/saved-searches'
import type { ISearch } from './interfaces/search'
import type { IEmail } from './interfaces/email'
import type { IAuth } from './interfaces/auth'
import type { ISitemap } from './interfaces/sitemap'
import type { H3Event } from 'h3'

import { MockSearch } from './mocks/search'
import { MockEmail } from './mocks/email'
import { MockAuth } from './mocks/auth'
import { MockSitemap } from './mocks/sitemap'

// Supabase adapters
import { SupabaseCfpDirectory } from './supabase/cfp-directory'
import { SupabaseSavedSearches } from './supabase/saved-searches'

export function getCfpDirectory(event: H3Event): ICfpDirectory {
  return new SupabaseCfpDirectory(event)
}

export function getSavedSearches(event: H3Event): ISavedSearches {
  return new SupabaseSavedSearches(event)
}

let search: ISearch
let email: IEmail
let auth: IAuth
let sitemap: ISitemap

export function getSearch(): ISearch {
  if (!search) {
    search = new MockSearch()
  }
  return search
}

export function getEmail(): IEmail {
  if (!email) {
    email = new MockEmail()
  }
  return email
}

export function getAuth(): IAuth {
  if (!auth) {
    auth = new MockAuth()
  }
  return auth
}

export function getSitemap(): ISitemap {
  if (!sitemap) {
    sitemap = new MockSitemap()
  }
  return sitemap
}