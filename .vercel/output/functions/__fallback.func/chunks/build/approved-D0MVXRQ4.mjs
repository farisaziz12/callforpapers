import { _ as __nuxt_component_2 } from './Button-PXp5DTfw.mjs';
import { _ as __nuxt_component_2$1 } from './Skeleton-MJ1G7Jgf.mjs';
import { _ as __nuxt_component_3 } from './Alert-DCRR2uSh.mjs';
import { _ as __nuxt_component_1 } from './index-mbtfuGJE.mjs';
import { _ as __nuxt_component_5 } from './Badge-Cz78TU95.mjs';
import { _ as __nuxt_component_5$1 } from './Accordion-DvRUESv1.mjs';
import { _ as __nuxt_component_6 } from './Pagination-BlgSeZD2.mjs';
import { _ as __nuxt_component_6$1 } from './Modal-BShPxdh8.mjs';
import { a as __nuxt_component_8, _ as __nuxt_component_9 } from './FormGroup-gKLvpM0v.mjs';
import { _ as __nuxt_component_10 } from './Select-C28OlvYB.mjs';
import { _ as __nuxt_component_11 } from './Checkbox-Cs78g7r0.mjs';
import { _ as __nuxt_component_12 } from './Textarea-CMsw6kJP.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, isRef, useSSRContext } from 'vue';
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
import './keyboard-v1ubhqOk.mjs';
import './use-resolve-button-type-CxQX8-dP.mjs';
import './active-element-history-CTDrs9J_.mjs';
import './useFormGroup-DqE91r20.mjs';
import '@vueuse/core';
import 'vue-router';
import '@supabase/ssr';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vue/shared';

const pageSize = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "approved",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Approved CFPs - Admin",
      meta: [
        { name: "description", content: "Admin panel for managing approved CFPs." }
      ]
    });
    const currentPage = ref(1);
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/cfps", {
      query: {
        page: currentPage,
        pageSize
      },
      watch: [currentPage]
    }, "$Qxak_E1Gzb")), __temp = await __temp, __restore(), __temp);
    const refreshing = ref(false);
    const processingIds = ref(/* @__PURE__ */ new Set());
    const editModalOpen = ref(false);
    const editingItem = ref(null);
    const topicsString = ref("");
    const saving = ref(false);
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
    function openEditModal(item) {
      editingItem.value = JSON.parse(JSON.stringify(item));
      topicsString.value = item.topics.join(", ");
      editModalOpen.value = true;
    }
    async function saveEdit() {
      if (!editingItem.value) return;
      saving.value = true;
      processingIds.value.add(editingItem.value.id);
      try {
        editingItem.value.topics = topicsString.value.split(",").map((t) => t.trim()).filter(Boolean);
        await $fetch(`/api/admin/cfps/${editingItem.value.id}`, {
          method: "PATCH",
          body: editingItem.value
        });
        await refresh();
        editModalOpen.value = false;
        console.log("CFP updated successfully");
      } catch (error2) {
        console.error("Failed to update CFP:", error2.data?.error || error2.message);
      } finally {
        saving.value = false;
        processingIds.value.delete(editingItem.value.id);
      }
    }
    async function confirmDelete(id) {
      if (!confirm("Are you sure you want to delete this CFP? This action cannot be undone.")) {
        return;
      }
      await deleteItem(id);
    }
    async function deleteItem(id) {
      processingIds.value.add(id);
      try {
        await $fetch(`/api/admin/cfps/${id}`, {
          method: "DELETE"
        });
        await refresh();
        console.log("CFP deleted successfully");
      } catch (error2) {
        console.error("Failed to delete CFP:", error2.data?.error || error2.message);
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
      const _component_UPagination = __nuxt_component_6;
      const _component_UModal = __nuxt_component_6$1;
      const _component_UFormGroup = __nuxt_component_8;
      const _component_UInput = __nuxt_component_9;
      const _component_USelect = __nuxt_component_10;
      const _component_UCheckbox = __nuxt_component_11;
      const _component_UTextarea = __nuxt_component_12;
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
      _push(`</div><div class="flex items-center justify-between gap-3"><div class="flex-1 min-w-0"><h1 class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate"> Approved CFPs </h1><p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">${ssrInterpolate(unref(data)?.total || 0)} approved CFPs </p></div>`);
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
          title: "Failed to load CFPs",
          description: unref(error).message
        }, null, _parent));
        _push(`</div>`);
      } else if (!unref(data)?.items?.length) {
        _push(`<div class="text-center py-12 sm:py-16">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-inbox",
          class: "w-16 h-16 mx-auto mb-4 text-gray-400"
        }, null, _parent));
        _push(`<p class="text-lg font-medium text-gray-900 dark:text-white mb-2">No approved CFPs</p><p class="text-sm text-gray-600 dark:text-gray-400">Approved CFPs will appear here</p></div>`);
      } else {
        _push(`<div class="space-y-3 sm:space-y-4"><!--[-->`);
        ssrRenderList(unref(data).items, (item) => {
          _push(`<div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"><div class="p-4 space-y-3"><div><h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight mb-1">${ssrInterpolate(item.title)}</h2><p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(item.city)}, ${ssrInterpolate(item.country)}</p></div><div class="flex flex-wrap gap-1.5">`);
          _push(ssrRenderComponent(_component_UBadge, {
            size: "xs",
            variant: "soft"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(formatType(item.format))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(formatType(item.format)), 1)
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
                _push2(` Closes ${ssrInterpolate(formatShortDate(item.closesAt))}`);
              } else {
                return [
                  createTextVNode(" Closes " + toDisplayString(formatShortDate(item.closesAt)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if (item.perks.travel) {
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
          if (item.perks.hotel) {
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
          if (item.perks.honorarium) {
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
          ssrRenderList(item.topics.slice(0, 4), (topic) => {
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
          if (item.topics.length > 4) {
            _push(ssrRenderComponent(_component_UBadge, {
              size: "xs",
              variant: "outline",
              color: "gray"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` +${ssrInterpolate(item.topics.length - 4)}`);
                } else {
                  return [
                    createTextVNode(" +" + toDisplayString(item.topics.length - 4), 1)
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
                _push2(`<div class="px-1 pb-2 space-y-3 text-sm"${_scopeId}><div class="space-y-2"${_scopeId}><a${ssrRenderAttr("href", item.websiteUrl)} target="_blank" class="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-heroicons-globe-alt",
                  class: "w-4 h-4 flex-shrink-0"
                }, null, _parent2, _scopeId));
                _push2(`<span class="truncate"${_scopeId}>${ssrInterpolate(item.websiteUrl)}</span></a><a${ssrRenderAttr("href", item.cfpUrl)} target="_blank" class="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-heroicons-document-text",
                  class: "w-4 h-4 flex-shrink-0"
                }, null, _parent2, _scopeId));
                _push2(`<span class="truncate"${_scopeId}>${ssrInterpolate(item.cfpUrl)}</span></a></div><div class="grid grid-cols-2 gap-2 text-xs"${_scopeId}>`);
                if (item.timeline.opensAt) {
                  _push2(`<div${_scopeId}><span class="text-gray-500 dark:text-gray-500 block"${_scopeId}>Opens</span><span class="text-gray-900 dark:text-white font-medium"${_scopeId}>${ssrInterpolate(formatShortDate(item.timeline.opensAt))}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div${_scopeId}><span class="text-gray-500 dark:text-gray-500 block"${_scopeId}>Closes</span><span class="text-gray-900 dark:text-white font-medium"${_scopeId}>${ssrInterpolate(formatShortDate(item.timeline.closesAt))}</span></div></div>`);
                if (item.platform) {
                  _push2(`<div class="text-xs"${_scopeId}><span class="text-gray-500 dark:text-gray-500"${_scopeId}>Platform: </span><span class="text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(item.platform)}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (item.topics.length > 4) {
                  _push2(`<div class="text-xs"${_scopeId}><span class="text-gray-500 dark:text-gray-500 block mb-1"${_scopeId}>All Topics:</span><div class="flex flex-wrap gap-1"${_scopeId}><!--[-->`);
                  ssrRenderList(item.topics, (topic) => {
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
                if (item.notes) {
                  _push2(`<div class="text-xs"${_scopeId}><span class="text-gray-500 dark:text-gray-500 block mb-1"${_scopeId}>Notes:</span><p class="text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed"${_scopeId}>${ssrInterpolate(item.notes)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800"${_scopeId}><div${_scopeId}>Slug: ${ssrInterpolate(item.slug)}</div><div${_scopeId}>Last updated ${ssrInterpolate(formatDate(item.lastUpdatedAt))}</div></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "px-1 pb-2 space-y-3 text-sm" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("a", {
                        href: item.websiteUrl,
                        target: "_blank",
                        class: "flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"
                      }, [
                        createVNode(_component_Icon, {
                          name: "i-heroicons-globe-alt",
                          class: "w-4 h-4 flex-shrink-0"
                        }),
                        createVNode("span", { class: "truncate" }, toDisplayString(item.websiteUrl), 1)
                      ], 8, ["href"]),
                      createVNode("a", {
                        href: item.cfpUrl,
                        target: "_blank",
                        class: "flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"
                      }, [
                        createVNode(_component_Icon, {
                          name: "i-heroicons-document-text",
                          class: "w-4 h-4 flex-shrink-0"
                        }),
                        createVNode("span", { class: "truncate" }, toDisplayString(item.cfpUrl), 1)
                      ], 8, ["href"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-2 text-xs" }, [
                      item.timeline.opensAt ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("span", { class: "text-gray-500 dark:text-gray-500 block" }, "Opens"),
                        createVNode("span", { class: "text-gray-900 dark:text-white font-medium" }, toDisplayString(formatShortDate(item.timeline.opensAt)), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", null, [
                        createVNode("span", { class: "text-gray-500 dark:text-gray-500 block" }, "Closes"),
                        createVNode("span", { class: "text-gray-900 dark:text-white font-medium" }, toDisplayString(formatShortDate(item.timeline.closesAt)), 1)
                      ])
                    ]),
                    item.platform ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-xs"
                    }, [
                      createVNode("span", { class: "text-gray-500 dark:text-gray-500" }, "Platform: "),
                      createVNode("span", { class: "text-gray-900 dark:text-white" }, toDisplayString(item.platform), 1)
                    ])) : createCommentVNode("", true),
                    item.topics.length > 4 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-xs"
                    }, [
                      createVNode("span", { class: "text-gray-500 dark:text-gray-500 block mb-1" }, "All Topics:"),
                      createVNode("div", { class: "flex flex-wrap gap-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(item.topics, (topic) => {
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
                    item.notes ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "text-xs"
                    }, [
                      createVNode("span", { class: "text-gray-500 dark:text-gray-500 block mb-1" }, "Notes:"),
                      createVNode("p", { class: "text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed" }, toDisplayString(item.notes), 1)
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800" }, [
                      createVNode("div", null, "Slug: " + toDisplayString(item.slug), 1),
                      createVNode("div", null, "Last updated " + toDisplayString(formatDate(item.lastUpdatedAt)), 1)
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="flex gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">`);
          _push(ssrRenderComponent(_component_UButton, {
            variant: "outline",
            color: "blue",
            size: "sm",
            class: "flex-1",
            onClick: ($event) => openEditModal(item),
            loading: unref(processingIds).has(item.id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-heroicons-pencil",
                  class: "w-4 h-4 sm:mr-1.5"
                }, null, _parent2, _scopeId));
                _push2(`<span class="hidden sm:inline"${_scopeId}>Edit</span>`);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "i-heroicons-pencil",
                    class: "w-4 h-4 sm:mr-1.5"
                  }),
                  createVNode("span", { class: "hidden sm:inline" }, "Edit")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            variant: "outline",
            color: "red",
            size: "sm",
            class: "flex-1",
            onClick: ($event) => confirmDelete(item.id),
            loading: unref(processingIds).has(item.id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-heroicons-trash",
                  class: "w-4 h-4 sm:mr-1.5"
                }, null, _parent2, _scopeId));
                _push2(`<span class="hidden sm:inline"${_scopeId}>Delete</span>`);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "i-heroicons-trash",
                    class: "w-4 h-4 sm:mr-1.5"
                  }),
                  createVNode("span", { class: "hidden sm:inline" }, "Delete")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (unref(data) && unref(data).total > pageSize) {
        _push(`<div class="mt-6 flex justify-center">`);
        _push(ssrRenderComponent(_component_UPagination, {
          modelValue: unref(currentPage),
          "onUpdate:modelValue": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
          "page-count": pageSize,
          total: unref(data).total
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(editModalOpen),
        "onUpdate:modelValue": ($event) => isRef(editModalOpen) ? editModalOpen.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold mb-4"${_scopeId}>Edit CFP</h3>`);
            if (unref(editingItem)) {
              _push2(`<div class="space-y-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Title",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(editingItem).title,
                      "onUpdate:modelValue": ($event) => unref(editingItem).title = $event
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(editingItem).title,
                        "onUpdate:modelValue": ($event) => unref(editingItem).title = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="grid grid-cols-2 gap-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "City",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(editingItem).city,
                      "onUpdate:modelValue": ($event) => unref(editingItem).city = $event
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(editingItem).city,
                        "onUpdate:modelValue": ($event) => unref(editingItem).city = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Country",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(editingItem).country,
                      "onUpdate:modelValue": ($event) => unref(editingItem).country = $event
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(editingItem).country,
                        "onUpdate:modelValue": ($event) => unref(editingItem).country = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Format",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_USelect, {
                      modelValue: unref(editingItem).format,
                      "onUpdate:modelValue": ($event) => unref(editingItem).format = $event,
                      options: [
                        { label: "Conference", value: "conference" },
                        { label: "Workshop", value: "workshop" },
                        { label: "Meetup", value: "meetup" },
                        { label: "Online Event", value: "online" }
                      ]
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_USelect, {
                        modelValue: unref(editingItem).format,
                        "onUpdate:modelValue": ($event) => unref(editingItem).format = $event,
                        options: [
                          { label: "Conference", value: "conference" },
                          { label: "Workshop", value: "workshop" },
                          { label: "Meetup", value: "meetup" },
                          { label: "Online Event", value: "online" }
                        ]
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Website URL",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(editingItem).websiteUrl,
                      "onUpdate:modelValue": ($event) => unref(editingItem).websiteUrl = $event,
                      type: "url"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(editingItem).websiteUrl,
                        "onUpdate:modelValue": ($event) => unref(editingItem).websiteUrl = $event,
                        type: "url"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "CFP URL",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(editingItem).cfpUrl,
                      "onUpdate:modelValue": ($event) => unref(editingItem).cfpUrl = $event,
                      type: "url"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(editingItem).cfpUrl,
                        "onUpdate:modelValue": ($event) => unref(editingItem).cfpUrl = $event,
                        type: "url"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="grid grid-cols-2 gap-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UFormGroup, { label: "Opens At" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(editingItem).timeline.opensAt,
                      "onUpdate:modelValue": ($event) => unref(editingItem).timeline.opensAt = $event,
                      type: "datetime-local"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(editingItem).timeline.opensAt,
                        "onUpdate:modelValue": ($event) => unref(editingItem).timeline.opensAt = $event,
                        type: "datetime-local"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Closes At",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(editingItem).timeline.closesAt,
                      "onUpdate:modelValue": ($event) => unref(editingItem).timeline.closesAt = $event,
                      type: "datetime-local"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(editingItem).timeline.closesAt,
                        "onUpdate:modelValue": ($event) => unref(editingItem).timeline.closesAt = $event,
                        type: "datetime-local"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_UFormGroup, { label: "Platform" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(editingItem).platform,
                      "onUpdate:modelValue": ($event) => unref(editingItem).platform = $event
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(editingItem).platform,
                        "onUpdate:modelValue": ($event) => unref(editingItem).platform = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UFormGroup, {
                label: "Topics (comma separated)",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(topicsString),
                      "onUpdate:modelValue": ($event) => isRef(topicsString) ? topicsString.value = $event : null
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(topicsString),
                        "onUpdate:modelValue": ($event) => isRef(topicsString) ? topicsString.value = $event : null
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="space-y-2"${_scopeId}><label class="text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}>Perks</label><div class="space-y-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UCheckbox, {
                modelValue: unref(editingItem).perks.travel,
                "onUpdate:modelValue": ($event) => unref(editingItem).perks.travel = $event,
                label: "Travel"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UCheckbox, {
                modelValue: unref(editingItem).perks.hotel,
                "onUpdate:modelValue": ($event) => unref(editingItem).perks.hotel = $event,
                label: "Hotel"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UCheckbox, {
                modelValue: unref(editingItem).perks.honorarium,
                "onUpdate:modelValue": ($event) => unref(editingItem).perks.honorarium = $event,
                label: "Honorarium"
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
              _push2(ssrRenderComponent(_component_UFormGroup, { label: "Notes" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UTextarea, {
                      modelValue: unref(editingItem).notes,
                      "onUpdate:modelValue": ($event) => unref(editingItem).notes = $event,
                      rows: 4
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UTextarea, {
                        modelValue: unref(editingItem).notes,
                        "onUpdate:modelValue": ($event) => unref(editingItem).notes = $event,
                        rows: 4
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="flex justify-end gap-3 pt-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                variant: "ghost",
                onClick: ($event) => editModalOpen.value = false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Cancel `);
                  } else {
                    return [
                      createTextVNode(" Cancel ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                color: "primary",
                onClick: saveEdit,
                loading: unref(saving)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Save Changes `);
                  } else {
                    return [
                      createTextVNode(" Save Changes ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h3", { class: "text-lg font-semibold mb-4" }, "Edit CFP"),
                unref(editingItem) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-4"
                }, [
                  createVNode(_component_UFormGroup, {
                    label: "Title",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(editingItem).title,
                        "onUpdate:modelValue": ($event) => unref(editingItem).title = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode(_component_UFormGroup, {
                      label: "City",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(editingItem).city,
                          "onUpdate:modelValue": ($event) => unref(editingItem).city = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Country",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(editingItem).country,
                          "onUpdate:modelValue": ($event) => unref(editingItem).country = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_UFormGroup, {
                    label: "Format",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_USelect, {
                        modelValue: unref(editingItem).format,
                        "onUpdate:modelValue": ($event) => unref(editingItem).format = $event,
                        options: [
                          { label: "Conference", value: "conference" },
                          { label: "Workshop", value: "workshop" },
                          { label: "Meetup", value: "meetup" },
                          { label: "Online Event", value: "online" }
                        ]
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Website URL",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(editingItem).websiteUrl,
                        "onUpdate:modelValue": ($event) => unref(editingItem).websiteUrl = $event,
                        type: "url"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "CFP URL",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(editingItem).cfpUrl,
                        "onUpdate:modelValue": ($event) => unref(editingItem).cfpUrl = $event,
                        type: "url"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode(_component_UFormGroup, { label: "Opens At" }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(editingItem).timeline.opensAt,
                          "onUpdate:modelValue": ($event) => unref(editingItem).timeline.opensAt = $event,
                          type: "datetime-local"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Closes At",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(editingItem).timeline.closesAt,
                          "onUpdate:modelValue": ($event) => unref(editingItem).timeline.closesAt = $event,
                          type: "datetime-local"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_UFormGroup, { label: "Platform" }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(editingItem).platform,
                        "onUpdate:modelValue": ($event) => unref(editingItem).platform = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Topics (comma separated)",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(topicsString),
                        "onUpdate:modelValue": ($event) => isRef(topicsString) ? topicsString.value = $event : null
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode("label", { class: "text-sm font-medium text-gray-700 dark:text-gray-300" }, "Perks"),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UCheckbox, {
                        modelValue: unref(editingItem).perks.travel,
                        "onUpdate:modelValue": ($event) => unref(editingItem).perks.travel = $event,
                        label: "Travel"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UCheckbox, {
                        modelValue: unref(editingItem).perks.hotel,
                        "onUpdate:modelValue": ($event) => unref(editingItem).perks.hotel = $event,
                        label: "Hotel"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UCheckbox, {
                        modelValue: unref(editingItem).perks.honorarium,
                        "onUpdate:modelValue": ($event) => unref(editingItem).perks.honorarium = $event,
                        label: "Honorarium"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode(_component_UFormGroup, { label: "Notes" }, {
                    default: withCtx(() => [
                      createVNode(_component_UTextarea, {
                        modelValue: unref(editingItem).notes,
                        "onUpdate:modelValue": ($event) => unref(editingItem).notes = $event,
                        rows: 4
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex justify-end gap-3 pt-4" }, [
                    createVNode(_component_UButton, {
                      variant: "ghost",
                      onClick: ($event) => editModalOpen.value = false
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Cancel ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_UButton, {
                      color: "primary",
                      onClick: saveEdit,
                      loading: unref(saving)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Save Changes ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/approved.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=approved-D0MVXRQ4.mjs.map
