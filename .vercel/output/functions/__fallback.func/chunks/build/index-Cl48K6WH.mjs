import { _ as __nuxt_component_1 } from './index-mbtfuGJE.mjs';
import { _ as __nuxt_component_2 } from './Button-PXp5DTfw.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BIQ150Xm.mjs';
import { _ as __nuxt_component_2$1 } from './Skeleton-MJ1G7Jgf.mjs';
import { _ as __nuxt_component_3 } from './Alert-DCRR2uSh.mjs';
import { _ as __nuxt_component_3$1 } from './CfpCard-DMS1TJ5O.mjs';
import { defineComponent, withAsyncContext, withCtx, createVNode, createTextVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useHead } from './server.mjs';
import { u as useFetch } from './fetch-XcMKITQQ.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
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
import 'tailwind-merge';
import './Avatar-Dx_eT8Ed.mjs';
import './DeadlinePill-DWtuGKpl.mjs';
import './Badge-Cz78TU95.mjs';
import 'vue-router';
import '@supabase/ssr';
import '@vueuse/core';
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
      title: "Call for Papers - Find Your Next Speaking Opportunity",
      meta: [
        { name: "description", content: "Discover conferences, workshops, and meetups worldwide that are actively seeking speakers. Never miss a call for papers again." }
      ]
    });
    const quickFilters = [
      { label: "JavaScript", value: "JavaScript", param: "topic", icon: "i-logos-javascript" },
      { label: "Python", value: "Python", param: "topic", icon: "i-logos-python" },
      { label: "Online", value: "online", param: "format", icon: "i-heroicons-computer-desktop" },
      { label: "Travel Covered", value: "travel", param: "perks", icon: "i-heroicons-paper-airplane" }
    ];
    const nextWeek = /* @__PURE__ */ new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const { data: closingSoon, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/search", {
      query: {
        closesBefore: nextWeek.toISOString(),
        pageSize: 6
      },
      transform: (data) => data.items || []
    }, "$QD8d9NkvSp")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_UButton = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_USkeleton = __nuxt_component_2$1;
      const _component_UAlert = __nuxt_component_3;
      const _component_CfpCard = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950"><div class="absolute inset-0 overflow-hidden pointer-events-none"><div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div><div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse" style="${ssrRenderStyle({ "animation-delay": "1s" })}"></div></div><div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32"><div class="text-center"><div class="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full mb-6 border border-gray-200/50 dark:border-gray-700/50 animate-fade-in">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-sparkles",
        class: "w-4 h-4 text-blue-600 dark:text-blue-400"
      }, null, _parent));
      _push(`<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Your Gateway to Speaking Opportunities</span></div><h1 class="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl lg:text-8xl animate-slide-up"> Share Your Voice <br><span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"> With the World </span></h1><p class="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.1s" })}"> A curated platform connecting speakers with conferences, workshops, and meetups worldwide. <strong>Never miss another call for papers.</strong> Whether you&#39;re a seasoned speaker or just starting out, find your perfect opportunity. </p><div class="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-check-circle",
        class: "w-5 h-5 text-green-500"
      }, null, _parent));
      _push(`<span>24+ Active CFPs</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-check-circle",
        class: "w-5 h-5 text-green-500"
      }, null, _parent));
      _push(`<span>Global Coverage</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-check-circle",
        class: "w-5 h-5 text-green-500"
      }, null, _parent));
      _push(`<span>Real-time Updates</span></div></div><div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.3s" })}">`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/search",
        size: "xl",
        class: "w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-magnifying-glass",
              class: "w-5 h-5 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Explore Opportunities `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "i-heroicons-magnifying-glass",
                class: "w-5 h-5 mr-2"
              }),
              createTextVNode(" Explore Opportunities ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        to: "/submit",
        variant: "outline",
        size: "xl",
        class: "w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 backdrop-blur-sm hover:scale-105 transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-plus-circle",
              class: "w-5 h-5 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Submit a CFP `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "i-heroicons-plus-circle",
                class: "w-5 h-5 mr-2"
              }),
              createTextVNode(" Submit a CFP ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="mt-8 text-sm text-gray-500 dark:text-gray-400 animate-fade-in" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}"> Trusted by speakers from companies like Google, Microsoft, Amazon, and more </p></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-900"><div class="text-center mb-12"><h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2><p class="text-lg text-gray-600 dark:text-gray-300">Find and submit to speaking opportunities in three simple steps</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div class="text-center group hover:scale-105 transition-transform duration-300"><div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4 group-hover:rotate-12 transition-transform">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-magnifying-glass",
        class: "w-8 h-8"
      }, null, _parent));
      _push(`</div><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">1. Search &amp; Filter</h3><p class="text-gray-600 dark:text-gray-400">Browse through curated CFPs filtered by topic, location, format, and perks.</p></div><div class="text-center group hover:scale-105 transition-transform duration-300"><div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4 group-hover:rotate-12 transition-transform">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-bookmark",
        class: "w-8 h-8"
      }, null, _parent));
      _push(`</div><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">2. Save Favorites</h3><p class="text-gray-600 dark:text-gray-400">Save searches and bookmark opportunities that match your expertise and interests.</p></div><div class="text-center group hover:scale-105 transition-transform duration-300"><div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4 group-hover:rotate-12 transition-transform">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-paper-airplane",
        class: "w-8 h-8"
      }, null, _parent));
      _push(`</div><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">3. Submit &amp; Speak</h3><p class="text-gray-600 dark:text-gray-400">Submit your proposals before the deadline and share your knowledge with the world.</p></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-gray-800/50"><div class="text-center mb-12"><h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Browse by Category</h2><p class="text-lg text-gray-600 dark:text-gray-300">Quick filters to help you find relevant opportunities</p></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"><!--[-->`);
      ssrRenderList(quickFilters, (filter) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: filter.value,
          to: `/search?${filter.param}=${filter.value}`,
          class: "group relative overflow-hidden bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex flex-col items-center justify-center text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: filter.icon,
                class: "w-10 h-10 mb-3 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-base font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(filter.label)}</span></div><div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-col items-center justify-center text-center" }, [
                  createVNode(_component_Icon, {
                    name: filter.icon,
                    class: "w-10 h-10 mb-3 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform"
                  }, null, 8, ["name"]),
                  createVNode("span", { class: "text-base font-medium text-gray-900 dark:text-white" }, toDisplayString(filter.label), 1)
                ]),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div><div class="flex justify-between items-center mb-8"><div><h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Closing Soon ⏰</h2><p class="text-gray-600 dark:text-gray-400">Don&#39;t miss these opportunities - deadlines approaching!</p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/search?closesBefore=7d",
        variant: "solid",
        size: "lg",
        class: "hidden sm:flex"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View All `);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-arrow-right",
              class: "w-4 h-4 ml-2"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" View All "),
              createVNode(_component_Icon, {
                name: "i-heroicons-arrow-right",
                class: "w-4 h-4 ml-2"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(pending)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(6, (i) => {
          _push(ssrRenderComponent(_component_USkeleton, {
            key: i,
            class: "h-64"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center py-12">`);
        _push(ssrRenderComponent(_component_UAlert, {
          icon: "i-heroicons-exclamation-triangle",
          color: "red",
          variant: "soft",
          title: "Failed to load CFPs",
          description: unref(error).message
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(closingSoon).length === 0) {
        _push(`<div class="text-center py-12"><div class="text-gray-500 dark:text-gray-400">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-magnifying-glass",
          class: "w-12 h-12 mx-auto mb-4"
        }, null, _parent));
        _push(`<p>No CFPs closing soon found.</p></div></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(unref(closingSoon), (cfp) => {
          _push(ssrRenderComponent(_component_CfpCard, {
            key: cfp.id,
            cfp
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Cl48K6WH.mjs.map
