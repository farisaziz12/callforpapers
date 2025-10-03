import { d as defineEventHandler, g as getRouterParam } from '../../../../nitro/nitro.mjs';
import { g as getAuth, a as getSavedSearches } from '../../../../_/container.mjs';
import { c as createNotFoundResponse } from '../../../../_/response.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    return createNotFoundResponse("Saved search ID is required");
  }
  const auth = getAuth();
  const user = await auth.getCurrentUser(event);
  const savedSearches = getSavedSearches(event);
  try {
    await savedSearches.delete(id, user.id);
    return { success: true, message: "Saved search deleted successfully" };
  } catch (error) {
    return createNotFoundResponse(error.message);
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
