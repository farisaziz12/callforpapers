import { d as defineEventHandler, a as getQuery } from '../../../nitro/nitro.mjs';
import { b as getCfpDirectory } from '../../../_/container.mjs';
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

const cfps_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 20;
  const directory = getCfpDirectory(event);
  const result = await directory.list({ page, pageSize });
  return result;
});

export { cfps_get as default };
//# sourceMappingURL=cfps.get.mjs.map
