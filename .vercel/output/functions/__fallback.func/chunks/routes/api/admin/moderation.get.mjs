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

const moderation_get = defineEventHandler(async (event) => {
  const directory = getCfpDirectory(event);
  const items = await directory.listModeration();
  return { items };
});

export { moderation_get as default };
//# sourceMappingURL=moderation.get.mjs.map
