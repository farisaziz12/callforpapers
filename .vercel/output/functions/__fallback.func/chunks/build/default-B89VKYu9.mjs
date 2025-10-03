import { _ as __nuxt_component_0 } from './nuxt-link-BIQ150Xm.mjs';
import { _ as __nuxt_component_1 } from './index-mbtfuGJE.mjs';
import { _ as __nuxt_component_2 } from './Button-PXp5DTfw.mjs';
import { ref, watch, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { a as useRoute, j as useState } from './server.mjs';
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

const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useColorMode();
    const showMobileMenu = ref(false);
    const route = useRoute();
    watch(route, () => {
      showMobileMenu.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      const _component_UButton = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900" }, _attrs))}><header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700 transition-all duration-300"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-megaphone",
              class: "w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"
            }, null, _parent2, _scopeId));
            _push2(`<span class="hidden sm:inline"${_scopeId}>Call for Papers</span><span class="sm:hidden"${_scopeId}>CFP</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "i-heroicons-megaphone",
                class: "w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"
              }),
              createVNode("span", { class: "hidden sm:inline" }, "Call for Papers"),
              createVNode("span", { class: "sm:hidden" }, "CFP")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="hidden md:flex space-x-1">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/search",
        class: "px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium",
        "active-class": "!bg-blue-50 dark:!bg-blue-900/20 !text-blue-600 dark:!text-blue-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Search CFPs `);
          } else {
            return [
              createTextVNode(" Search CFPs ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/submit",
        class: "px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium",
        "active-class": "!bg-blue-50 dark:!bg-blue-900/20 !text-blue-600 dark:!text-blue-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Submit CFP `);
          } else {
            return [
              createTextVNode(" Submit CFP ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/account/saved-searches",
        class: "px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium",
        "active-class": "!bg-blue-50 dark:!bg-blue-900/20 !text-blue-600 dark:!text-blue-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Saved Searches `);
          } else {
            return [
              createTextVNode(" Saved Searches ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="flex items-center space-x-2"><button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"${ssrRenderAttr("aria-label", _ctx.$colorMode.value === "dark" ? "Switch to light mode" : "Switch to dark mode")}>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: _ctx.$colorMode.value === "dark" ? "i-heroicons-sun" : "i-heroicons-moon",
        class: "w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        size: "sm",
        class: "md:hidden",
        onClick: ($event) => showMobileMenu.value = !unref(showMobileMenu)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-bars-3",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, {
                name: "i-heroicons-bars-3",
                class: "w-5 h-5"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(showMobileMenu)) {
        _push(`<div class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"><nav class="space-y-1">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/search",
          class: "block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium",
          "active-class": "!bg-blue-50 dark:!bg-blue-900/20 !text-blue-600 dark:!text-blue-400",
          onClick: ($event) => showMobileMenu.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Search CFPs `);
            } else {
              return [
                createTextVNode(" Search CFPs ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/submit",
          class: "block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium",
          "active-class": "!bg-blue-50 dark:!bg-blue-900/20 !text-blue-600 dark:!text-blue-400",
          onClick: ($event) => showMobileMenu.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Submit CFP `);
            } else {
              return [
                createTextVNode(" Submit CFP ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/account/saved-searches",
          class: "block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium",
          "active-class": "!bg-blue-50 dark:!bg-blue-900/20 !text-blue-600 dark:!text-blue-400",
          onClick: ($event) => showMobileMenu.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Saved Searches `);
            } else {
              return [
                createTextVNode(" Saved Searches ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</nav></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header><main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="text-center text-gray-600 dark:text-gray-400"><p class="mb-4"> Call for Papers - Discover speaking opportunities worldwide </p><div class="flex justify-center space-x-6 text-sm"><a href="/api/feeds/sitemap.xml" class="hover:text-blue-600 dark:hover:text-blue-400"> Sitemap </a><a href="/api/robots.txt" class="hover:text-blue-600 dark:hover:text-blue-400"> Robots.txt </a></div></div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-B89VKYu9.mjs.map
