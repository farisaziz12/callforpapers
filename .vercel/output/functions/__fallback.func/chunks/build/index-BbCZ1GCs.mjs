import { _ as __nuxt_component_0 } from './nuxt-link-BIQ150Xm.mjs';
import { _ as __nuxt_component_1 } from './index-mbtfuGJE.mjs';
import { defineComponent, withAsyncContext, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useHead } from './server.mjs';
import { u as useFetch } from './fetch-XcMKITQQ.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import 'vue-router';
import '@supabase/ssr';
import '@vueuse/core';
import 'tailwind-merge';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Admin Dashboard - Call for Papers",
      meta: [
        { name: "description", content: "Admin dashboard for managing CFPs and moderation." }
      ]
    });
    const { data: stats, pending: pendingStats } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/stats", "$VDG7u31OJo")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-950" }, _attrs))}><div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"><div class="max-w-6xl mx-auto px-4 py-6 sm:py-8"><h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"> Admin Dashboard </h1><p class="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400"> Manage CFPs, moderation queue, and site settings </p></div></div><div class="max-w-6xl mx-auto px-4 py-6 sm:py-8"><div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/moderation",
        class: "block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start gap-4"${_scopeId}><div class="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-clipboard-document-check",
              class: "w-6 h-6 text-orange-600 dark:text-orange-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1"${_scopeId}> Moderation Queue </h2><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Review and approve submitted CFPs </p></div>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-chevron-right",
              class: "w-5 h-5 text-gray-400 flex-shrink-0 mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start gap-4" }, [
                createVNode("div", { class: "flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center" }, [
                  createVNode(_component_Icon, {
                    name: "i-heroicons-clipboard-document-check",
                    class: "w-6 h-6 text-orange-600 dark:text-orange-400"
                  })
                ]),
                createVNode("div", { class: "flex-1 min-w-0" }, [
                  createVNode("h2", { class: "text-lg font-semibold text-gray-900 dark:text-white mb-1" }, " Moderation Queue "),
                  createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Review and approve submitted CFPs ")
                ]),
                createVNode(_component_Icon, {
                  name: "i-heroicons-chevron-right",
                  class: "w-5 h-5 text-gray-400 flex-shrink-0 mt-1"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/approved",
        class: "block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start gap-4"${_scopeId}><div class="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-document-check",
              class: "w-6 h-6 text-green-600 dark:text-green-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1"${_scopeId}> Approved CFPs </h2><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> View, edit, and delete approved CFPs </p></div>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-chevron-right",
              class: "w-5 h-5 text-gray-400 flex-shrink-0 mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start gap-4" }, [
                createVNode("div", { class: "flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center" }, [
                  createVNode(_component_Icon, {
                    name: "i-heroicons-document-check",
                    class: "w-6 h-6 text-green-600 dark:text-green-400"
                  })
                ]),
                createVNode("div", { class: "flex-1 min-w-0" }, [
                  createVNode("h2", { class: "text-lg font-semibold text-gray-900 dark:text-white mb-1" }, " Approved CFPs "),
                  createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, " View, edit, and delete approved CFPs ")
                ]),
                createVNode(_component_Icon, {
                  name: "i-heroicons-chevron-right",
                  class: "w-5 h-5 text-gray-400 flex-shrink-0 mt-1"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 opacity-60"><div class="flex items-start gap-4"><div class="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-cog-6-tooth",
        class: "w-6 h-6 text-gray-600 dark:text-gray-400"
      }, null, _parent));
      _push(`</div><div class="flex-1 min-w-0"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1"> Site Settings </h2><p class="text-sm text-gray-600 dark:text-gray-400"> Coming soon </p></div></div></div><div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 opacity-60"><div class="flex items-start gap-4"><div class="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-chart-bar",
        class: "w-6 h-6 text-gray-600 dark:text-gray-400"
      }, null, _parent));
      _push(`</div><div class="flex-1 min-w-0"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1"> Analytics </h2><p class="text-sm text-gray-600 dark:text-gray-400"> Coming soon </p></div></div></div></div><div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"><div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4"><div class="text-sm text-gray-600 dark:text-gray-400">Pending Review</div><div class="text-2xl font-bold text-gray-900 dark:text-white mt-1">${ssrInterpolate(unref(pendingStats) ? unref(stats)?.pendingCount || 0 : "-")}</div></div><div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4"><div class="text-sm text-gray-600 dark:text-gray-400">Total Approved</div><div class="text-2xl font-bold text-gray-900 dark:text-white mt-1">${ssrInterpolate(unref(pendingStats) ? unref(stats)?.totalApproved || 0 : "-")}</div></div><div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4"><div class="text-sm text-gray-600 dark:text-gray-400">This Week</div><div class="text-2xl font-bold text-gray-900 dark:text-white mt-1">${ssrInterpolate(unref(pendingStats) ? unref(stats)?.thisWeek || 0 : "-")}</div></div><div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4"><div class="text-sm text-gray-600 dark:text-gray-400">This Month</div><div class="text-2xl font-bold text-gray-900 dark:text-white mt-1">${ssrInterpolate(unref(pendingStats) ? unref(stats)?.thisMonth || 0 : "-")}</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BbCZ1GCs.mjs.map
