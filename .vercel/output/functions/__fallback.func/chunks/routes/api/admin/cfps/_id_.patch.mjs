import { d as defineEventHandler, g as getRouterParam, r as readBody } from '../../../../nitro/nitro.mjs';
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

const _id__patch = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    return createNotFoundResponse("CFP ID is required");
  }
  const body = await readBody(event);
  const directory = getCfpDirectory(event);
  try {
    await directory.updateCfp(id, body);
    return { success: true, message: "CFP updated successfully" };
  } catch (error) {
    return createNotFoundResponse(error.message);
  }
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
