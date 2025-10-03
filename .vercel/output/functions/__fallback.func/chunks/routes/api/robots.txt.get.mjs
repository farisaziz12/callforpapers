import { d as defineEventHandler, u as useRuntimeConfig, s as setHeader } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';

const robots_txt_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${config.public.siteUrl}/api/feeds/sitemap.xml`;
  setHeader(event, "content-type", "text/plain");
  return robotsTxt;
});

export { robots_txt_get as default };
//# sourceMappingURL=robots.txt.get.mjs.map
