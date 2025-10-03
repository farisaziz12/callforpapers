import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
import { g as getAuth, a as getSavedSearches } from '../../../_/container.mjs';
import { v as validateBody, s as savedSearchSchema } from '../../../_/zod.mjs';
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
import 'zod';

const savedSearches_post = defineEventHandler(async (event) => {
  const auth = getAuth();
  const user = await auth.getCurrentUser(event);
  const payload = await validateBody(event, savedSearchSchema);
  const savedSearches = getSavedSearches(event);
  await savedSearches.create(user.id, payload);
  return { success: true };
});

export { savedSearches_post as default };
//# sourceMappingURL=saved-searches.post.mjs.map
