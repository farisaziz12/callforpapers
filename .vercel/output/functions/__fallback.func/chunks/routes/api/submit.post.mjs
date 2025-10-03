import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { b as getCfpDirectory } from '../../_/container.mjs';
import { v as validateBody, c as submitFormSchema } from '../../_/zod.mjs';
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

const submit_post = defineEventHandler(async (event) => {
  const payload = await validateBody(event, submitFormSchema);
  const directory = getCfpDirectory(event);
  const result = await directory.createModeration(payload);
  return {
    success: true,
    id: result.id,
    message: "CFP submitted for moderation"
  };
});

export { submit_post as default };
//# sourceMappingURL=submit.post.mjs.map
