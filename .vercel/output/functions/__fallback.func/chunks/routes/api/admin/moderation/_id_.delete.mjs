import { d as defineEventHandler, g as getRouterParam } from '../../../../nitro/nitro.mjs';
import { b as getCfpDirectory } from '../../../../_/container.mjs';
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
    return createNotFoundResponse("Moderation item ID is required");
  }
  const directory = getCfpDirectory(event);
  try {
    await directory.rejectModeration(id);
    return { success: true, message: "CFP rejected" };
  } catch (error) {
    return createNotFoundResponse(error.message);
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
