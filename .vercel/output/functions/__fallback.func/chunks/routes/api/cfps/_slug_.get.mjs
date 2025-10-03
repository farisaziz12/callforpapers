import { d as defineEventHandler, g as getRouterParam } from '../../../nitro/nitro.mjs';
import { b as getCfpDirectory } from '../../../_/container.mjs';
import { c as createNotFoundResponse } from '../../../_/response.mjs';
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

const _slug__get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    return createNotFoundResponse("CFP slug is required");
  }
  const directory = getCfpDirectory(event);
  const cfp = await directory.getBySlug(slug);
  if (!cfp) {
    return createNotFoundResponse("CFP not found");
  }
  return cfp;
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
