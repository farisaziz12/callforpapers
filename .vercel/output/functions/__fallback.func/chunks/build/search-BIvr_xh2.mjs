import { _ as __nuxt_component_9, a as __nuxt_component_8 } from './FormGroup-gKLvpM0v.mjs';
import { _ as __nuxt_component_3$2, C as COUNTRIES, T as TOPICS } from './constants-CWJzltru.mjs';
import { _ as __nuxt_component_1 } from './index-mbtfuGJE.mjs';
import { _ as __nuxt_component_10 } from './Select-C28OlvYB.mjs';
import { _ as __nuxt_component_5 } from './Badge-Cz78TU95.mjs';
import { _ as __nuxt_component_2 } from './Button-PXp5DTfw.mjs';
import { _ as __nuxt_component_6$1 } from './Modal-BShPxdh8.mjs';
import { _ as __nuxt_component_4 } from './Card-CkQS4cv2.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, unref, isRef, mergeProps, withCtx, createBlock, openBlock, createVNode, createTextVNode, toDisplayString, withKeys, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { useDebounceFn } from '@vueuse/core';
import { u as useUserPreferences } from './useUserPreferences-DVOD9Se1.mjs';
import { _ as __nuxt_component_3 } from './Alert-DCRR2uSh.mjs';
import { _ as __nuxt_component_3$1 } from './CfpCard-DMS1TJ5O.mjs';
import { _ as __nuxt_component_6 } from './Pagination-BlgSeZD2.mjs';
import { u as useHead, a as useRoute, b as useRouter } from './server.mjs';
import { u as useFetch } from './fetch-XcMKITQQ.mjs';
import 'tailwind-merge';
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
import './useFormGroup-DqE91r20.mjs';
import './Avatar-Dx_eT8Ed.mjs';
import '@tanstack/vue-virtual';
import './active-element-history-CTDrs9J_.mjs';
import './keyboard-v1ubhqOk.mjs';
import './use-resolve-button-type-CxQX8-dP.mjs';
import 'country-state-city';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import './nuxt-link-BIQ150Xm.mjs';
import './DeadlinePill-DWtuGKpl.mjs';
import 'vue-router';
import '@supabase/ssr';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vue/shared';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FilterBar",
  __ssrInlineRender: true,
  props: {
    filters: {}
  },
  emits: ["update:filters"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localFilters = ref({ ...props.filters });
    const countryOptions = COUNTRIES;
    const topicOptions = TOPICS;
    const formatOptions = [
      { label: "All Formats", value: "" },
      { label: "Conference", value: "conference" },
      { label: "Workshop", value: "workshop" },
      { label: "Meetup", value: "meetup" },
      { label: "Online Event", value: "online" }
    ];
    const deadlineOptions = computed(() => {
      const now = /* @__PURE__ */ new Date();
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1e3);
      const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1e3);
      const nextQuarter = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1e3);
      return [
        { label: "All Deadlines", value: "" },
        { label: "Closing this week", value: nextWeek.toISOString() },
        { label: "Closing this month", value: nextMonth.toISOString() },
        { label: "Closing this quarter", value: nextQuarter.toISOString() }
      ];
    });
    const { preferences, addSavedSearch } = useUserPreferences();
    const showSaveSearchModal = ref(false);
    const saveSearchName = ref("");
    const showSaveSearch = ref(false);
    const savedSearches = computed(() => preferences.value.savedSearches);
    const hasActiveFilters = computed(() => {
      return !!(localFilters.value.q || localFilters.value.country || localFilters.value.topic || localFilters.value.format || localFilters.value.closesBefore);
    });
    function updateFilters() {
      emit("update:filters", { ...localFilters.value });
    }
    const debouncedUpdate = useDebounceFn(updateFilters, 300);
    function clearFilter(key) {
      localFilters.value[key] = void 0;
      updateFilters();
    }
    function clearAllFilters() {
      localFilters.value = {};
      updateFilters();
    }
    function saveCurrentSearch() {
      if (saveSearchName.value.trim()) {
        addSavedSearch(saveSearchName.value, { ...localFilters.value });
        saveSearchName.value = "";
        showSaveSearchModal.value = false;
      }
    }
    function applySavedSearch(search) {
      localFilters.value = { ...search.filters };
      updateFilters();
    }
    watch(() => props.filters, (newFilters) => {
      localFilters.value = { ...newFilters };
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = __nuxt_component_9;
      const _component_USelectMenu = __nuxt_component_3$2;
      const _component_Icon = __nuxt_component_1;
      const _component_USelect = __nuxt_component_10;
      const _component_UBadge = __nuxt_component_5;
      const _component_UButton = __nuxt_component_2;
      const _component_UModal = __nuxt_component_6$1;
      const _component_UCard = __nuxt_component_4;
      const _component_UFormGroup = __nuxt_component_8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"><div class="xl:col-span-2">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(localFilters).q,
        "onUpdate:modelValue": ($event) => unref(localFilters).q = $event,
        placeholder: "Search CFPs...",
        icon: "i-heroicons-magnifying-glass",
        size: "lg",
        onInput: unref(debouncedUpdate),
        class: "shadow-sm"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(localFilters).country,
        "onUpdate:modelValue": [($event) => unref(localFilters).country = $event, updateFilters],
        options: unref(countryOptions),
        placeholder: "All Countries",
        searchable: "",
        "searchable-placeholder": "Search countries...",
        size: "lg",
        class: "shadow-sm"
      }, {
        label: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(localFilters).country) {
              _push2(`<span${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-map-pin",
                class: "w-4 h-4 inline mr-1"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(unref(localFilters).country)}</span>`);
            } else {
              _push2(`<span class="text-gray-500"${_scopeId}>All Countries</span>`);
            }
          } else {
            return [
              unref(localFilters).country ? (openBlock(), createBlock("span", { key: 0 }, [
                createVNode(_component_Icon, {
                  name: "i-heroicons-map-pin",
                  class: "w-4 h-4 inline mr-1"
                }),
                createTextVNode(" " + toDisplayString(unref(localFilters).country), 1)
              ])) : (openBlock(), createBlock("span", {
                key: 1,
                class: "text-gray-500"
              }, "All Countries"))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(localFilters).topic,
        "onUpdate:modelValue": [($event) => unref(localFilters).topic = $event, updateFilters],
        options: unref(topicOptions),
        placeholder: "All Topics",
        searchable: "",
        "searchable-placeholder": "Search topics...",
        size: "lg",
        class: "shadow-sm"
      }, {
        label: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(localFilters).topic) {
              _push2(`<span${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-tag",
                class: "w-4 h-4 inline mr-1"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(unref(localFilters).topic)}</span>`);
            } else {
              _push2(`<span class="text-gray-500"${_scopeId}>All Topics</span>`);
            }
          } else {
            return [
              unref(localFilters).topic ? (openBlock(), createBlock("span", { key: 0 }, [
                createVNode(_component_Icon, {
                  name: "i-heroicons-tag",
                  class: "w-4 h-4 inline mr-1"
                }),
                createTextVNode(" " + toDisplayString(unref(localFilters).topic), 1)
              ])) : (openBlock(), createBlock("span", {
                key: 1,
                class: "text-gray-500"
              }, "All Topics"))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: unref(localFilters).format,
        "onUpdate:modelValue": ($event) => unref(localFilters).format = $event,
        options: formatOptions,
        placeholder: "All Formats",
        size: "lg",
        onChange: updateFilters,
        class: "shadow-sm"
      }, null, _parent));
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: unref(localFilters).closesBefore,
        "onUpdate:modelValue": ($event) => unref(localFilters).closesBefore = $event,
        options: unref(deadlineOptions),
        placeholder: "All Deadlines",
        size: "lg",
        onChange: updateFilters,
        class: "shadow-sm"
      }, null, _parent));
      _push(`</div>`);
      if (unref(hasActiveFilters) || unref(showSaveSearch)) {
        _push(`<div class="mt-4 flex flex-wrap gap-3 items-center">`);
        if (unref(hasActiveFilters)) {
          _push(`<div class="flex flex-wrap gap-2 items-center"><span class="text-sm font-medium text-gray-600 dark:text-gray-300">Active filters:</span>`);
          if (unref(localFilters).q) {
            _push(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              size: "md",
              onClick: ($event) => clearFilter("q"),
              class: "cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` &quot;${ssrInterpolate(unref(localFilters).q)}&quot; × `);
                } else {
                  return [
                    createTextVNode(' "' + toDisplayString(unref(localFilters).q) + '" × ', 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (unref(localFilters).country) {
            _push(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              size: "md",
              onClick: ($event) => clearFilter("country"),
              class: "cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(unref(localFilters).country)} × `);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(localFilters).country) + " × ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (unref(localFilters).topic) {
            _push(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              size: "md",
              onClick: ($event) => clearFilter("topic"),
              class: "cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(unref(localFilters).topic)} × `);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(localFilters).topic) + " × ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (unref(localFilters).format) {
            _push(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              size: "md",
              onClick: ($event) => clearFilter("format"),
              class: "cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(formatOptions.find((f) => f.value === unref(localFilters).format)?.label)} × `);
                } else {
                  return [
                    createTextVNode(toDisplayString(formatOptions.find((f) => f.value === unref(localFilters).format)?.label) + " × ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (unref(localFilters).closesBefore) {
            _push(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              size: "md",
              onClick: ($event) => clearFilter("closesBefore"),
              class: "cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(unref(deadlineOptions).find((d) => d.value === unref(localFilters).closesBefore)?.label)} × `);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(deadlineOptions).find((d) => d.value === unref(localFilters).closesBefore)?.label) + " × ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            size: "sm",
            onClick: clearAllFilters,
            icon: "i-heroicons-x-mark"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Clear all `);
              } else {
                return [
                  createTextVNode(" Clear all ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(hasActiveFilters)) {
          _push(`<div class="ml-auto flex gap-2">`);
          _push(ssrRenderComponent(_component_UButton, {
            variant: "outline",
            size: "sm",
            icon: "i-heroicons-bookmark",
            onClick: ($event) => showSaveSearchModal.value = true
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Save Search `);
              } else {
                return [
                  createTextVNode(" Save Search ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(savedSearches).length > 0) {
        _push(`<div class="mt-4"><div class="flex items-center gap-2 mb-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-bookmark",
          class: "w-4 h-4 text-gray-500"
        }, null, _parent));
        _push(`<span class="text-sm font-medium text-gray-600 dark:text-gray-300">Saved searches:</span></div><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(unref(savedSearches), (search) => {
          _push(ssrRenderComponent(_component_UButton, {
            key: search.id,
            variant: "soft",
            size: "sm",
            onClick: ($event) => applySavedSearch(search)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(search.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(search.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showSaveSearchModal),
        "onUpdate:modelValue": ($event) => isRef(showSaveSearchModal) ? showSaveSearchModal.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="text-lg font-semibold"${_scopeId2}>Save Current Search</h3>`);
                } else {
                  return [
                    createVNode("h3", { class: "text-lg font-semibold" }, "Save Current Search")
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    variant: "ghost",
                    onClick: ($event) => showSaveSearchModal.value = false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Cancel `);
                      } else {
                        return [
                          createTextVNode(" Cancel ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "primary",
                    onClick: saveCurrentSearch,
                    disabled: !unref(saveSearchName).trim()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Save `);
                      } else {
                        return [
                          createTextVNode(" Save ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-end gap-2" }, [
                      createVNode(_component_UButton, {
                        variant: "ghost",
                        onClick: ($event) => showSaveSearchModal.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Cancel ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_UButton, {
                        color: "primary",
                        onClick: saveCurrentSearch,
                        disabled: !unref(saveSearchName).trim()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Save ")
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Search Name",
                    name: "searchName"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(saveSearchName),
                          "onUpdate:modelValue": ($event) => isRef(saveSearchName) ? saveSearchName.value = $event : null,
                          placeholder: "e.g. React conferences in Europe",
                          onKeydown: saveCurrentSearch
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(saveSearchName),
                            "onUpdate:modelValue": ($event) => isRef(saveSearchName) ? saveSearchName.value = $event : null,
                            placeholder: "e.g. React conferences in Europe",
                            onKeydown: withKeys(saveCurrentSearch, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode(_component_UFormGroup, {
                        label: "Search Name",
                        name: "searchName"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(saveSearchName),
                            "onUpdate:modelValue": ($event) => isRef(saveSearchName) ? saveSearchName.value = $event : null,
                            placeholder: "e.g. React conferences in Europe",
                            onKeydown: withKeys(saveCurrentSearch, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, null, {
                header: withCtx(() => [
                  createVNode("h3", { class: "text-lg font-semibold" }, "Save Current Search")
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex justify-end gap-2" }, [
                    createVNode(_component_UButton, {
                      variant: "ghost",
                      onClick: ($event) => showSaveSearchModal.value = false
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Cancel ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_UButton, {
                      color: "primary",
                      onClick: saveCurrentSearch,
                      disabled: !unref(saveSearchName).trim()
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Save ")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode(_component_UFormGroup, {
                      label: "Search Name",
                      name: "searchName"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(saveSearchName),
                          "onUpdate:modelValue": ($event) => isRef(saveSearchName) ? saveSearchName.value = $event : null,
                          placeholder: "e.g. React conferences in Europe",
                          onKeydown: withKeys(saveCurrentSearch, ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FilterBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "FilterBar" });
const pageSize = 12;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Search CFPs - Call for Papers",
      meta: [
        { name: "description", content: "Search and filter through conferences, workshops, and meetups looking for speakers." }
      ]
    });
    const route = useRoute();
    const router = useRouter();
    const currentPage = ref(1);
    const filters = ref({
      q: route.query.q || "",
      country: route.query.country || "",
      topic: route.query.topic || "",
      format: route.query.format || "",
      closesBefore: route.query.closesBefore || "",
      page: parseInt(route.query.page || "1"),
      pageSize
    });
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/search", {
      query: computed(() => ({
        ...filters.value,
        page: currentPage.value
      })),
      server: true
    }, "$c02gJMxSum")), __temp = await __temp, __restore(), __temp);
    const totalPages = computed(() => Math.ceil((data.value?.total || 0) / pageSize));
    function handleFiltersUpdate(newFilters) {
      filters.value = { ...newFilters, page: 1, pageSize };
      currentPage.value = 1;
      const query = {};
      if (newFilters.q) query.q = newFilters.q;
      if (newFilters.country) query.country = newFilters.country;
      if (newFilters.topic) query.topic = newFilters.topic;
      if (newFilters.format) query.format = newFilters.format;
      if (newFilters.closesBefore) query.closesBefore = newFilters.closesBefore;
      router.push({ query });
    }
    watch(currentPage, (newPage) => {
      const query = { ...route.query, page: newPage.toString() };
      if (newPage === 1) delete query.page;
      router.push({ query });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FilterBar = __nuxt_component_0;
      const _component_UAlert = __nuxt_component_3;
      const _component_Icon = __nuxt_component_1;
      const _component_CfpCard = __nuxt_component_3$1;
      const _component_UPagination = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_FilterBar, {
        filters: unref(filters),
        "onUpdate:filters": handleFiltersUpdate
      }, null, _parent));
      _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="flex justify-between items-center mb-6"><h1 class="text-2xl font-bold text-gray-900 dark:text-white"> Search CFPs </h1><div class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(unref(pending) ? "Loading..." : `${unref(data)?.total || 0} results found`)}</div></div>`);
      if (unref(pending)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(12, (i) => {
          _push(`<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"><div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 w-full"></div><div class="p-6 space-y-4"><div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div><div class="space-y-2"><div class="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div><div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div></div><div class="flex gap-2"><div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div><div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div></div><div class="pt-4 border-t border-gray-200 dark:border-gray-700"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div></div></div></div>`);
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
      } else if (!unref(data)?.items?.length) {
        _push(`<div class="text-center py-12"><div class="text-gray-500 dark:text-gray-400">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-magnifying-glass",
          class: "w-12 h-12 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-lg mb-2">No CFPs found</p><p>Try adjusting your search filters or check back later for new opportunities.</p></div></div>`);
      } else {
        _push(`<div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"><!--[-->`);
        ssrRenderList(unref(data).items, (cfp) => {
          _push(ssrRenderComponent(_component_CfpCard, {
            key: cfp.id,
            cfp
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
        if (unref(totalPages) > 1) {
          _push(`<div class="flex justify-center">`);
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
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=search-BIvr_xh2.mjs.map
