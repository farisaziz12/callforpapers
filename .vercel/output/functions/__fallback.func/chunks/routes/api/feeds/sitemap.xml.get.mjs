import { d as defineEventHandler, u as useRuntimeConfig, s as setHeader } from '../../../nitro/nitro.mjs';
import { c as getSitemap } from '../../../_/container.mjs';
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

const sitemap_xml_get = defineEventHandler(async (event) => {
  const sitemap = getSitemap();
  const routes = await sitemap.routes();
  const config = useRuntimeConfig();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url>
    <loc>${config.public.siteUrl}${route}</loc>
    <lastmod>${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>`;
  setHeader(event, "content-type", "application/xml");
  return xml;
});

export { sitemap_xml_get as default };
//# sourceMappingURL=sitemap.xml.get.mjs.map
