import { d as defineEventHandler, a as getQuery } from '../../nitro/nitro.mjs';
import { d as getSearch } from '../../_/container.mjs';
import { a as searchParamsSchema, b as validateQuery } from '../../_/zod.mjs';
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

const search_get = defineEventHandler(async (event) => {
  console.log(
    "search.get",
    {
      query: getQuery(event),
      params: searchParamsSchema.parse(getQuery(event))
    }
  );
  const params = validateQuery(event, searchParamsSchema);
  const search = getSearch();
  const result = await search.search(event, params);
  return {
    items: result.hits,
    total: result.total,
    page: params.page,
    pageSize: params.pageSize
  };
});

export { search_get as default };
//# sourceMappingURL=search.get.mjs.map
