import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
import { g as getAuth, a as getSavedSearches } from '../../../_/container.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';
import '@supabase/ssr';
import '@supabase/supabase-js';

const savedSearches_get = defineEventHandler(async (event) => {
  const auth = getAuth();
  const user = await auth.getCurrentUser(event);
  const savedSearches = getSavedSearches(event);
  const searches = await savedSearches.list(user.id);
  return searches;
});

export { savedSearches_get as default };
//# sourceMappingURL=saved-searches.get.mjs.map
