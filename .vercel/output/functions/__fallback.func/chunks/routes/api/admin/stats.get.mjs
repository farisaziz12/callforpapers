import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
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

const stats_get = defineEventHandler(async (event) => {
  const directory = getCfpDirectory(event);
  const stats = await directory.getStats();
  return stats;
});

export { stats_get as default };
//# sourceMappingURL=stats.get.mjs.map
