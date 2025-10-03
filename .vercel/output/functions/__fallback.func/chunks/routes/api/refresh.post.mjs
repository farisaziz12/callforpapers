import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { g as getAuth, b as getCfpDirectory } from '../../_/container.mjs';
import { a as createForbiddenResponse } from '../../_/response.mjs';
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

const refresh_post = defineEventHandler(async (event) => {
  const auth = getAuth();
  const user = await auth.getCurrentUser(event);
  if (user.role !== "admin") {
    return createForbiddenResponse("Admin access required");
  }
  const directory = getCfpDirectory(event);
  await directory.refresh();
  return {
    success: true,
    message: "Data refreshed successfully"
  };
});

export { refresh_post as default };
//# sourceMappingURL=refresh.post.mjs.map
