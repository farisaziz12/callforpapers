import { _ as __nuxt_component_2 } from './Skeleton-MJ1G7Jgf.mjs';
import { _ as __nuxt_component_3 } from './Alert-DCRR2uSh.mjs';
import { _ as __nuxt_component_2$1 } from './Button-PXp5DTfw.mjs';
import { _ as __nuxt_component_1 } from './index-mbtfuGJE.mjs';
import { _ as __nuxt_component_4 } from './DeadlinePill-DWtuGKpl.mjs';
import { _ as __nuxt_component_5 } from './Badge-Cz78TU95.mjs';
import { _ as __nuxt_component_4$1 } from './Card-CkQS4cv2.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { a as useRoute, u as useHead } from './server.mjs';
import { u as useFetch } from './fetch-XcMKITQQ.mjs';
import 'tailwind-merge';
import './Avatar-Dx_eT8Ed.mjs';
import './nuxt-link-BIQ150Xm.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = route.params.slug;
    const { data: cfp, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/cfps/${slug}`, "$37vN5JgHyZ")), __temp = await __temp, __restore(), __temp);
    useHead(() => ({
      title: cfp.value ? `${cfp.value.title} - Call for Papers` : "CFP Details",
      meta: [
        { name: "description", content: cfp.value ? `Submit a proposal for ${cfp.value.title} in ${cfp.value.city}, ${cfp.value.country}. Deadline: ${formatDate(cfp.value.closesAt)}` : "CFP details" }
      ]
    }));
    useHead(() => ({
      script: cfp.value ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          "name": cfp.value.title,
          "description": `Call for Papers: ${cfp.value.title}`,
          "location": {
            "@type": "Place",
            "name": `${cfp.value.city}, ${cfp.value.country}`,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": cfp.value.city,
              "addressCountry": cfp.value.country
            }
          },
          "organizer": {
            "@type": "Organization",
            "url": cfp.value.websiteUrl
          },
          "offers": {
            "@type": "Offer",
            "url": cfp.value.cfpUrl,
            "validThrough": cfp.value.closesAt
          },
          "eventAttendanceMode": cfp.value.format === "online" ? "https://schema.org/OnlineEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode"
        })
      }] : []
    }));
    function formatType(format) {
      const typeMap = {
        conference: "Conference",
        workshop: "Workshop",
        meetup: "Meetup",
        online: "Online Event"
      };
      return typeMap[format] || format;
    }
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USkeleton = __nuxt_component_2;
      const _component_UAlert = __nuxt_component_3;
      const _component_UButton = __nuxt_component_2$1;
      const _component_Icon = __nuxt_component_1;
      const _component_DeadlinePill = __nuxt_component_4;
      const _component_UBadge = __nuxt_component_5;
      const _component_UCard = __nuxt_component_4$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}>`);
      if (unref(pending)) {
        _push(`<div class="space-y-6">`);
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-8 w-3/4" }, null, _parent));
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-1/2" }, null, _parent));
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-64" }, null, _parent));
        _push(`</div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center py-12">`);
        _push(ssrRenderComponent(_component_UAlert, {
          icon: "i-heroicons-exclamation-triangle",
          color: "red",
          variant: "soft",
          title: "CFP not found",
          description: "The CFP you're looking for doesn't exist or has been removed."
        }, null, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          to: "/search",
          class: "mt-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Back to Search `);
            } else {
              return [
                createTextVNode(" Back to Search ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (unref(cfp)) {
        _push(`<div><div class="mb-8"><div class="flex justify-between items-start mb-4"><div class="flex-1"><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">${ssrInterpolate(unref(cfp).title)}</h1><div class="flex items-center text-gray-600 dark:text-gray-300 mb-4">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-map-pin",
          class: "w-5 h-5 mr-2"
        }, null, _parent));
        _push(` ${ssrInterpolate(unref(cfp).city)}, ${ssrInterpolate(unref(cfp).country)}</div></div>`);
        _push(ssrRenderComponent(_component_DeadlinePill, {
          deadline: unref(cfp).closesAt
        }, null, _parent));
        _push(`</div><div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
        ssrRenderList(unref(cfp).topics, (topic) => {
          _push(ssrRenderComponent(_component_UBadge, {
            key: topic,
            variant: "soft"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(topic)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(topic), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-6">`);
        _push(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h2 class="text-xl font-semibold"${_scopeId}>CFP Details</h2>`);
            } else {
              return [
                createVNode("h2", { class: "text-xl font-semibold" }, "CFP Details")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-4"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"${_scopeId}> Format </label><p class="text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatType(unref(cfp).format))}</p></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"${_scopeId}> Platform </label><p class="text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(cfp).platform || "Not specified")}</p></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"${_scopeId}> Timeline </label><div class="space-y-1"${_scopeId}>`);
              if (unref(cfp).timeline.opensAt) {
                _push2(`<p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Opens: ${ssrInterpolate(formatDate(unref(cfp).timeline.opensAt))}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Closes: ${ssrInterpolate(formatDate(unref(cfp).timeline.closesAt))}</p></div></div>`);
              if (unref(cfp).notes) {
                _push2(`<div class="space-y-2"${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}> Additional Notes </label><p class="text-gray-900 dark:text-white whitespace-pre-wrap"${_scopeId}>${ssrInterpolate(unref(cfp).notes)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" }, " Format "),
                      createVNode("p", { class: "text-gray-900 dark:text-white" }, toDisplayString(formatType(unref(cfp).format)), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" }, " Platform "),
                      createVNode("p", { class: "text-gray-900 dark:text-white" }, toDisplayString(unref(cfp).platform || "Not specified"), 1)
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" }, " Timeline "),
                    createVNode("div", { class: "space-y-1" }, [
                      unref(cfp).timeline.opensAt ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-gray-600 dark:text-gray-400"
                      }, " Opens: " + toDisplayString(formatDate(unref(cfp).timeline.opensAt)), 1)) : createCommentVNode("", true),
                      createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Closes: " + toDisplayString(formatDate(unref(cfp).timeline.closesAt)), 1)
                    ])
                  ]),
                  unref(cfp).notes ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-2"
                  }, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300" }, " Additional Notes "),
                    createVNode("p", { class: "text-gray-900 dark:text-white whitespace-pre-wrap" }, toDisplayString(unref(cfp).notes), 1)
                  ])) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h2 class="text-xl font-semibold"${_scopeId}>Speaker Benefits</h2>`);
            } else {
              return [
                createVNode("h2", { class: "text-xl font-semibold" }, "Speaker Benefits")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="grid grid-cols-1 sm:grid-cols-3 gap-4"${_scopeId}><div class="${ssrRenderClass([unref(cfp).perks.travel ? "bg-green-50 dark:bg-green-900/20" : "bg-gray-50 dark:bg-gray-800", "text-center p-4 rounded-lg"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-paper-airplane",
                class: [unref(cfp).perks.travel ? "text-green-600 dark:text-green-400" : "text-gray-400", "w-8 h-8 mx-auto mb-2"]
              }, null, _parent2, _scopeId));
              _push2(`<p class="${ssrRenderClass([unref(cfp).perks.travel ? "text-green-900 dark:text-green-100" : "text-gray-500", "font-medium"])}"${_scopeId}> Travel </p><p class="${ssrRenderClass([unref(cfp).perks.travel ? "text-green-700 dark:text-green-200" : "text-gray-400", "text-sm"])}"${_scopeId}>${ssrInterpolate(unref(cfp).perks.travel ? "Covered" : "Not covered")}</p></div><div class="${ssrRenderClass([unref(cfp).perks.hotel ? "bg-blue-50 dark:bg-blue-900/20" : "bg-gray-50 dark:bg-gray-800", "text-center p-4 rounded-lg"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-building-office",
                class: [unref(cfp).perks.hotel ? "text-blue-600 dark:text-blue-400" : "text-gray-400", "w-8 h-8 mx-auto mb-2"]
              }, null, _parent2, _scopeId));
              _push2(`<p class="${ssrRenderClass([unref(cfp).perks.hotel ? "text-blue-900 dark:text-blue-100" : "text-gray-500", "font-medium"])}"${_scopeId}> Hotel </p><p class="${ssrRenderClass([unref(cfp).perks.hotel ? "text-blue-700 dark:text-blue-200" : "text-gray-400", "text-sm"])}"${_scopeId}>${ssrInterpolate(unref(cfp).perks.hotel ? "Covered" : "Not covered")}</p></div><div class="${ssrRenderClass([unref(cfp).perks.honorarium ? "bg-purple-50 dark:bg-purple-900/20" : "bg-gray-50 dark:bg-gray-800", "text-center p-4 rounded-lg"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-currency-dollar",
                class: [unref(cfp).perks.honorarium ? "text-purple-600 dark:text-purple-400" : "text-gray-400", "w-8 h-8 mx-auto mb-2"]
              }, null, _parent2, _scopeId));
              _push2(`<p class="${ssrRenderClass([unref(cfp).perks.honorarium ? "text-purple-900 dark:text-purple-100" : "text-gray-500", "font-medium"])}"${_scopeId}> Honorarium </p><p class="${ssrRenderClass([unref(cfp).perks.honorarium ? "text-purple-700 dark:text-purple-200" : "text-gray-400", "text-sm"])}"${_scopeId}>${ssrInterpolate(unref(cfp).perks.honorarium ? "Provided" : "Not provided")}</p></div></div>`);
            } else {
              return [
                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4" }, [
                  createVNode("div", {
                    class: ["text-center p-4 rounded-lg", unref(cfp).perks.travel ? "bg-green-50 dark:bg-green-900/20" : "bg-gray-50 dark:bg-gray-800"]
                  }, [
                    createVNode(_component_Icon, {
                      name: "i-heroicons-paper-airplane",
                      class: [unref(cfp).perks.travel ? "text-green-600 dark:text-green-400" : "text-gray-400", "w-8 h-8 mx-auto mb-2"]
                    }, null, 8, ["class"]),
                    createVNode("p", {
                      class: ["font-medium", unref(cfp).perks.travel ? "text-green-900 dark:text-green-100" : "text-gray-500"]
                    }, " Travel ", 2),
                    createVNode("p", {
                      class: ["text-sm", unref(cfp).perks.travel ? "text-green-700 dark:text-green-200" : "text-gray-400"]
                    }, toDisplayString(unref(cfp).perks.travel ? "Covered" : "Not covered"), 3)
                  ], 2),
                  createVNode("div", {
                    class: ["text-center p-4 rounded-lg", unref(cfp).perks.hotel ? "bg-blue-50 dark:bg-blue-900/20" : "bg-gray-50 dark:bg-gray-800"]
                  }, [
                    createVNode(_component_Icon, {
                      name: "i-heroicons-building-office",
                      class: [unref(cfp).perks.hotel ? "text-blue-600 dark:text-blue-400" : "text-gray-400", "w-8 h-8 mx-auto mb-2"]
                    }, null, 8, ["class"]),
                    createVNode("p", {
                      class: ["font-medium", unref(cfp).perks.hotel ? "text-blue-900 dark:text-blue-100" : "text-gray-500"]
                    }, " Hotel ", 2),
                    createVNode("p", {
                      class: ["text-sm", unref(cfp).perks.hotel ? "text-blue-700 dark:text-blue-200" : "text-gray-400"]
                    }, toDisplayString(unref(cfp).perks.hotel ? "Covered" : "Not covered"), 3)
                  ], 2),
                  createVNode("div", {
                    class: ["text-center p-4 rounded-lg", unref(cfp).perks.honorarium ? "bg-purple-50 dark:bg-purple-900/20" : "bg-gray-50 dark:bg-gray-800"]
                  }, [
                    createVNode(_component_Icon, {
                      name: "i-heroicons-currency-dollar",
                      class: [unref(cfp).perks.honorarium ? "text-purple-600 dark:text-purple-400" : "text-gray-400", "w-8 h-8 mx-auto mb-2"]
                    }, null, 8, ["class"]),
                    createVNode("p", {
                      class: ["font-medium", unref(cfp).perks.honorarium ? "text-purple-900 dark:text-purple-100" : "text-gray-500"]
                    }, " Honorarium ", 2),
                    createVNode("p", {
                      class: ["text-sm", unref(cfp).perks.honorarium ? "text-purple-700 dark:text-purple-200" : "text-gray-400"]
                    }, toDisplayString(unref(cfp).perks.honorarium ? "Provided" : "Not provided"), 3)
                  ], 2)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="space-y-6">`);
        _push(ssrRenderComponent(_component_UCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                to: unref(cfp).cfpUrl,
                external: "",
                target: "_blank",
                size: "lg",
                class: "w-full justify-center"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Submit Proposal `);
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "i-heroicons-arrow-top-right-on-square",
                      class: "w-4 h-4 ml-2"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createTextVNode(" Submit Proposal "),
                      createVNode(_component_Icon, {
                        name: "i-heroicons-arrow-top-right-on-square",
                        class: "w-4 h-4 ml-2"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                to: unref(cfp).websiteUrl,
                external: "",
                target: "_blank",
                variant: "outline",
                size: "lg",
                class: "w-full justify-center"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Visit Website `);
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "i-heroicons-arrow-top-right-on-square",
                      class: "w-4 h-4 ml-2"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createTextVNode(" Visit Website "),
                      createVNode(_component_Icon, {
                        name: "i-heroicons-arrow-top-right-on-square",
                        class: "w-4 h-4 ml-2"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-4" }, [
                  createVNode(_component_UButton, {
                    to: unref(cfp).cfpUrl,
                    external: "",
                    target: "_blank",
                    size: "lg",
                    class: "w-full justify-center"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Submit Proposal "),
                      createVNode(_component_Icon, {
                        name: "i-heroicons-arrow-top-right-on-square",
                        class: "w-4 h-4 ml-2"
                      })
                    ]),
                    _: 1
                  }, 8, ["to"]),
                  createVNode(_component_UButton, {
                    to: unref(cfp).websiteUrl,
                    external: "",
                    target: "_blank",
                    variant: "outline",
                    size: "lg",
                    class: "w-full justify-center"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Visit Website "),
                      createVNode(_component_Icon, {
                        name: "i-heroicons-arrow-top-right-on-square",
                        class: "w-4 h-4 ml-2"
                      })
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="text-lg font-medium"${_scopeId}>Information</h3>`);
            } else {
              return [
                createVNode("h3", { class: "text-lg font-medium" }, "Information")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-3 text-sm"${_scopeId}><div${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Last updated:</span><p class="font-medium"${_scopeId}>${ssrInterpolate(formatDate(unref(cfp).lastUpdatedAt))}</p></div></div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-3 text-sm" }, [
                  createVNode("div", null, [
                    createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Last updated:"),
                    createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(unref(cfp).lastUpdatedAt)), 1)
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cfp/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CXV7pAY9.mjs.map
