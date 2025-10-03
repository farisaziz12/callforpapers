import { _ as __nuxt_component_2 } from './Button-PXp5DTfw.mjs';
import { _ as __nuxt_component_2$1 } from './Skeleton-MJ1G7Jgf.mjs';
import { _ as __nuxt_component_3 } from './Alert-DCRR2uSh.mjs';
import { _ as __nuxt_component_1 } from './index-mbtfuGJE.mjs';
import { _ as __nuxt_component_5 } from './Badge-Cz78TU95.mjs';
import { _ as __nuxt_component_5$1 } from './Accordion-DvRUESv1.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useHead } from './server.mjs';
import { u as useFetch } from './fetch-XcMKITQQ.mjs';
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
import 'tailwind-merge';
import './Avatar-Dx_eT8Ed.mjs';
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
import './keyboard-v1ubhqOk.mjs';
import './use-resolve-button-type-CxQX8-dP.mjs';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "moderation",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "CFP Moderation - Admin",
      meta: [
        { name: "description", content: "Admin panel for moderating submitted CFPs before publication." }
      ]
    });
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/moderation", "$hs4-gPRr8q")), __temp = await __temp, __restore(), __temp);
    const refreshing = ref(false);
    const processingIds = ref(/* @__PURE__ */ new Set());
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
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    function formatShortDate(dateString) {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }
    async function refreshData() {
      refreshing.value = true;
      try {
        await refresh();
      } finally {
        refreshing.value = false;
      }
    }
    async function approveItem(id) {
      processingIds.value.add(id);
      try {
        await $fetch(`/api/admin/moderation/${id}`, {
          method: "POST"
        });
        await refresh();
        console.log("CFP approved successfully");
      } catch (error2) {
        console.error("Failed to approve CFP:", error2.data?.error || error2.message);
      } finally {
        processingIds.value.delete(id);
      }
    }
    async function rejectItem(id) {
      processingIds.value.add(id);
      try {
        await $fetch(`/api/admin/moderation/${id}`, {
          method: "DELETE"
        });
        await refresh();
        console.log("CFP rejected successfully");
      } catch (error2) {
        console.error("Failed to reject CFP:", error2.data?.error || error2.message);
      } finally {
        processingIds.value.delete(id);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = __nuxt_component_2;
      const _component_USkeleton = __nuxt_component_2$1;
      const _component_UAlert = __nuxt_component_3;
      const _component_Icon = __nuxt_component_1;
      const _component_UBadge = __nuxt_component_5;
      const _component_UAccordion = __nuxt_component_5$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-950" }, _attrs))}><div class="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"><div class="max-w-4xl mx-auto px-4 py-4"><div class="flex items-center gap-3 mb-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/admin",
        variant: "ghost",
        size: "xs",
        icon: "i-heroicons-arrow-left"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center justify-between gap-3"><div class="flex-1 min-w-0"><h1 class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate"> Moderation Queue </h1><p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">${ssrInterpolate(unref(data)?.items?.length || 0)} pending </p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: refreshData,
        variant: "ghost",
        size: "sm",
        loading: unref(refreshing),
        icon: "i-heroicons-arrow-path"
      }, null, _parent));
      _push(`</div></div></div><div class="max-w-4xl mx-auto px-4 py-4 sm:py-6">`);
      if (unref(pending)) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(ssrRenderComponent(_component_USkeleton, {
            key: i,
            class: "h-40 rounded-xl"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (unref(error)) {
        _push(`<div class="py-8">`);
        _push(ssrRenderComponent(_component_UAlert, {
          icon: "i-heroicons-exclamation-triangle",
          color: "red",
          variant: "soft",
          title: "Failed to load queue",
          description: unref(error).message
        }, null, _parent));
        _push(`</div>`);
      } else if (!unref(data)?.items?.length) {
        _push(`<div class="text-center py-12 sm:py-16">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-clipboard-document-check",
          class: "w-16 h-16 mx-auto mb-4 text-gray-400"
        }, null, _parent));
        _push(`<p class="text-lg font-medium text-gray-900 dark:text-white mb-2">All caught up!</p><p class="text-sm text-gray-600 dark:text-gray-400">No items need review</p></div>`);
      } else {
        _push(`<div class="space-y-3 sm:space-y-4"><!--[-->`);
        ssrRenderList(unref(data).items, (item) => {
          _push(`<div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"><div class="p-4 space-y-3"><div><h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight mb-1">${ssrInterpolate(item.payload.cfp.title)}</h2><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(item.payload.conference.name)}</p><p class="text-xs text-gray-500 dark:text-gray-500 mt-1">${ssrInterpolate(item.payload.conference.city)}, ${ssrInterpolate(item.payload.conference.country)}</p></div><div class="flex flex-wrap gap-1.5">`);
          _push(ssrRenderComponent(_component_UBadge, {
            size: "xs",
            variant: "soft"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(formatType(item.payload.cfp.format))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(formatType(item.payload.cfp.format)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(_component_UBadge, {
            size: "xs",
            variant: "soft",
            color: "orange"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Closes ${ssrInterpolate(formatShortDate(item.payload.cfp.closesAt))}`);
              } else {
                return [
                  createTextVNode(" Closes " + toDisplayString(formatShortDate(item.payload.cfp.closesAt)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if (item.payload.cfp.perks.travel) {
            _push(ssrRenderComponent(_component_UBadge, {
              size: "xs",
              variant: "soft",
              color: "green"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Travel `);
                } else {
                  return [
                    createTextVNode(" Travel ")
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (item.payload.cfp.perks.hotel) {
            _push(ssrRenderComponent(_component_UBadge, {
              size: "xs",
              variant: "soft",
              color: "blue"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Hotel `);
                } else {
                  return [
                    createTextVNode(" Hotel ")
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (item.payload.cfp.perks.honorarium) {
            _push(ssrRenderComponent(_component_UBadge, {
              size: "xs",
              variant: "soft",
              color: "purple"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Honorarium `);
                } else {
                  return [
                    createTextVNode(" Honorarium ")
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex flex-wrap gap-1"><!--[-->`);
          ssrRenderList(item.payload.cfp.topics.slice(0, 4), (topic) => {
            _push(ssrRenderComponent(_component_UBadge, {
              key: topic,
              size: "xs",
              variant: "outline"
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
          _push(`<!--]-->`);
          if (item.payload.cfp.topics.length > 4) {
            _push(ssrRenderComponent(_component_UBadge, {
              size: "xs",
              variant: "outline",
              color: "gray"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` +${ssrInterpolate(item.payload.cfp.topics.length - 4)}`);
                } else {
                  return [
                    createTextVNode(" +" + toDisplayString(item.payload.cfp.topics.length - 4), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          _push(ssrRenderComponent(_component_UAccordion, {
            items: [{
              label: "View details",
              slot: "details-" + item.id,
              defaultOpen: false
            }],
            size: "sm"
          }, {
            default: withCtx(({ item: accordionItem, open }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "xs",
                  class: "w-full justify-between text-gray-600 dark:text-gray-400"
                }, {
                  default: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="text-xs"${_scopeId2}>${ssrInterpolate(open ? "Hide details" : "View details")}</span>`);
                      _push3(ssrRenderComponent(_component_Icon, {
                        name: open ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
                        class: "w-4 h-4"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode("span", { class: "text-xs" }, toDisplayString(open ? "Hide details" : "View details"), 1),
                        createVNode(_component_Icon, {
                          name: open ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
                          class: "w-4 h-4"
                        }, null, 8, ["name"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UButton, {
                    variant: "ghost",
                    size: "xs",
                    class: "w-full justify-between text-gray-600 dark:text-gray-400"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-xs" }, toDisplayString(open ? "Hide details" : "View details"), 1),
                      createVNode(_component_Icon, {
                        name: open ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
                        class: "w-4 h-4"
                      }, null, 8, ["name"])
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            [`details-${item.id}`]: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="px-1 pb-2 space-y-3 text-sm"${_scopeId}><div class="space-y-2"${_scopeId}><a${ssrRenderAttr("href", item.payload.conference.websiteUrl)} target="_blank" class="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-heroicons-globe-alt",
                  class: "w-4 h-4 flex-shrink-0"
                }, null, _parent2, _scopeId));
                _push2(`<span class="truncate"${_scopeId}>${ssrInterpolate(item.payload.conference.websiteUrl)}</span></a><a${ssrRenderAttr("href", item.payload.cfp.cfpUrl)} target="_blank" class="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-heroicons-document-text",
                  class: "w-4 h-4 flex-shrink-0"
                }, null, _parent2, _scopeId));
                _push2(`<span class="truncate"${_scopeId}>${ssrInterpolate(item.payload.cfp.cfpUrl)}</span></a></div><div class="grid grid-cols-2 gap-2 text-xs"${_scopeId}>`);
                if (item.payload.cfp.opensAt) {
                  _push2(`<div${_scopeId}><span class="text-gray-500 dark:text-gray-500 block"${_scopeId}>Opens</span><span class="text-gray-900 dark:text-white font-medium"${_scopeId}>${ssrInterpolate(formatShortDate(item.payload.cfp.opensAt))}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div${_scopeId}><span class="text-gray-500 dark:text-gray-500 block"${_scopeId}>Closes</span><span class="text-gray-900 dark:text-white font-medium"${_scopeId}>${ssrInterpolate(formatShortDate(item.payload.cfp.closesAt))}</span></div></div>`);
                if (item.payload.conference.platform) {
                  _push2(`<div class="text-xs"${_scopeId}><span class="text-gray-500 dark:text-gray-500"${_scopeId}>Platform: </span><span class="text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(item.payload.conference.platform)}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (item.payload.cfp.topics.length > 4) {
                  _push2(`<div class="text-xs"${_scopeId}><span class="text-gray-500 dark:text-gray-500 block mb-1"${_scopeId}>All Topics:</span><div class="flex flex-wrap gap-1"${_scopeId}><!--[-->`);
                  ssrRenderList(item.payload.cfp.topics, (topic) => {
                    _push2(ssrRenderComponent(_component_UBadge, {
                      key: topic,
                      size: "xs",
                      variant: "outline"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`${ssrInterpolate(topic)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(topic), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  });
                  _push2(`<!--]--></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (item.payload.cfp.notes) {
                  _push2(`<div class="text-xs"${_scopeId}><span class="text-gray-500 dark:text-gray-500 block mb-1"${_scopeId}>Notes:</span><p class="text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed"${_scopeId}>${ssrInterpolate(item.payload.cfp.notes)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800"${_scopeId}> Submitted ${ssrInterpolate(formatDate(item.submittedAt))}</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "px-1 pb-2 space-y-3 text-sm" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("a", {
                        href: item.payload.conference.websiteUrl,
                        target: "_blank",
                        class: "flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"
                      }, [
                        createVNode(_component_Icon, {
                          name: "i-heroicons-globe-alt",
                          class: "w-4 h-4 flex-shrink-0"
                        }),
                        createVNode("span", { class: "truncate" }, toDisplayString(item.payload.conference.websiteUrl), 1)
                      ], 8, ["href"]),
                      createVNode("a", {
                        href: item.payload.cfp.cfpUrl,
                        target: "_blank",
                        class: "flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"
                      }, [
                        createVNode(_component_Icon, {
                          name: "i-heroicons-document-text",
                          class: "w-4 h-4 flex-shrink-0"
                        }),
                        createVNode("span", { class: "truncate" }, toDisplayString(item.payload.cfp.cfpUrl), 1)
                      ], 8, ["href"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-2 text-xs" }, [
                      item.payload.cfp.opensAt ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("span", { class: "text-gray-500 dark:text-gray-500 block" }, "Opens"),
                        createVNode("span", { class: "text-gray-900 dark:text-white font-medium" }, toDisplayString(formatShortDate(item.payload.cfp.opensAt)), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", null, [
                        createVNode("span", { class: "text-gray-500 dark:text-gray-500 block" }, "Closes"),
                        createVNode("span", { class: "text-gray-900 dark:text-white font-medium" }, toDisplayString(formatShortDate(item.payload.cfp.closesAt)), 1)
                      ])
                    ]),
                    item.payload.conference.platform ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-xs"
                    }, [
                      createVNode("span", { class: "text-gray-500 dark:text-gray-500" }, "Platform: "),
                      createVNode("span", { class: "text-gray-900 dark:text-white" }, toDisplayString(item.payload.conference.platform), 1)
                    ])) : createCommentVNode("", true),
                    item.payload.cfp.topics.length > 4 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-xs"
                    }, [
                      createVNode("span", { class: "text-gray-500 dark:text-gray-500 block mb-1" }, "All Topics:"),
                      createVNode("div", { class: "flex flex-wrap gap-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(item.payload.cfp.topics, (topic) => {
                          return openBlock(), createBlock(_component_UBadge, {
                            key: topic,
                            size: "xs",
                            variant: "outline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(topic), 1)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    item.payload.cfp.notes ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "text-xs"
                    }, [
                      createVNode("span", { class: "text-gray-500 dark:text-gray-500 block mb-1" }, "Notes:"),
                      createVNode("p", { class: "text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed" }, toDisplayString(item.payload.cfp.notes), 1)
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800" }, " Submitted " + toDisplayString(formatDate(item.submittedAt)), 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="flex gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">`);
          _push(ssrRenderComponent(_component_UButton, {
            variant: "outline",
            color: "red",
            size: "sm",
            class: "flex-1",
            onClick: ($event) => rejectItem(item.id),
            loading: unref(processingIds).has(item.id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-heroicons-x-mark",
                  class: "w-4 h-4 sm:mr-1.5"
                }, null, _parent2, _scopeId));
                _push2(`<span class="hidden sm:inline"${_scopeId}>Reject</span>`);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "i-heroicons-x-mark",
                    class: "w-4 h-4 sm:mr-1.5"
                  }),
                  createVNode("span", { class: "hidden sm:inline" }, "Reject")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            color: "green",
            size: "sm",
            class: "flex-1",
            onClick: ($event) => approveItem(item.id),
            loading: unref(processingIds).has(item.id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-heroicons-check",
                  class: "w-4 h-4 sm:mr-1.5"
                }, null, _parent2, _scopeId));
                _push2(`<span class="hidden sm:inline"${_scopeId}>Approve</span>`);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "i-heroicons-check",
                    class: "w-4 h-4 sm:mr-1.5"
                  }),
                  createVNode("span", { class: "hidden sm:inline" }, "Approve")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/moderation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=moderation-BLBDnnwG.mjs.map
