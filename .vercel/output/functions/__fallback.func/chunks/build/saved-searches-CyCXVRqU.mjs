import { _ as __nuxt_component_2 } from './Button-PXp5DTfw.mjs';
import { _ as __nuxt_component_1 } from './index-mbtfuGJE.mjs';
import { _ as __nuxt_component_2$1 } from './Skeleton-MJ1G7Jgf.mjs';
import { _ as __nuxt_component_3 } from './Alert-DCRR2uSh.mjs';
import { _ as __nuxt_component_4 } from './Card-CkQS4cv2.mjs';
import { _ as __nuxt_component_5 } from './Badge-Cz78TU95.mjs';
import { _ as __nuxt_component_6 } from './Modal-BShPxdh8.mjs';
import { _ as __nuxt_component_7 } from './Form-CjVJcDeG.mjs';
import { a as __nuxt_component_8, _ as __nuxt_component_9 } from './FormGroup-gKLvpM0v.mjs';
import { _ as __nuxt_component_10 } from './Select-C28OlvYB.mjs';
import { defineComponent, withAsyncContext, ref, reactive, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, createBlock, createCommentVNode, openBlock, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { a as savedSearchSchema } from './zod-De9mlz-X.mjs';
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
import './Avatar-Dx_eT8Ed.mjs';
import './active-element-history-CTDrs9J_.mjs';
import './keyboard-v1ubhqOk.mjs';
import './useFormGroup-DqE91r20.mjs';
import 'zod';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "saved-searches",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Saved Searches - Call for Papers",
      meta: [
        { name: "description", content: "Manage your saved CFP searches and get notified about relevant opportunities." }
      ]
    });
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/account/saved-searches", "$8EOA7FjWO6")), __temp = await __temp, __restore(), __temp);
    const showCreateModal = ref(false);
    const creating = ref(false);
    const createForm = reactive({
      name: "",
      filters: {}
    });
    const countryOptions = [
      { label: "All Countries", value: "" },
      { label: "United States", value: "United States" },
      { label: "United Kingdom", value: "United Kingdom" },
      { label: "Germany", value: "Germany" },
      { label: "Netherlands", value: "Netherlands" },
      { label: "Canada", value: "Canada" }
    ];
    const topicOptions = [
      { label: "All Topics", value: "" },
      { label: "JavaScript", value: "JavaScript" },
      { label: "React", value: "React" },
      { label: "Vue.js", value: "Vue.js" },
      { label: "Python", value: "Python" },
      { label: "DevOps", value: "DevOps" }
    ];
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
      return [
        { label: "All Deadlines", value: "" },
        { label: "Closing this week", value: nextWeek.toISOString() },
        { label: "Closing this month", value: nextMonth.toISOString() }
      ];
    });
    function formatType(format) {
      const typeMap = {
        conference: "Conference",
        workshop: "Workshop",
        meetup: "Meetup",
        online: "Online Event"
      };
      return typeMap[format] || format;
    }
    function formatDeadline(deadline) {
      const date = new Date(deadline);
      const now = /* @__PURE__ */ new Date();
      const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24));
      if (diffDays <= 7) return "This week";
      if (diffDays <= 30) return "This month";
      return "This quarter";
    }
    function buildSearchUrl(filters) {
      const query = new URLSearchParams();
      if (filters.q) query.set("q", filters.q);
      if (filters.country) query.set("country", filters.country);
      if (filters.topic) query.set("topic", filters.topic);
      if (filters.format) query.set("format", filters.format);
      if (filters.closesBefore) query.set("closesBefore", filters.closesBefore);
      return `/search?${query.toString()}`;
    }
    async function handleCreate() {
      creating.value = true;
      try {
        await $fetch("/api/account/saved-searches", {
          method: "POST",
          body: createForm
        });
        showCreateModal.value = false;
        Object.assign(createForm, { name: "", filters: {} });
        await refresh();
      } catch (error2) {
        console.error("Failed to create saved search:", error2);
      } finally {
        creating.value = false;
      }
    }
    async function deleteSearch(id) {
      try {
        await $fetch(`/api/account/saved-searches/${id}`, {
          method: "DELETE"
        });
        await refresh();
      } catch (error2) {
        console.error("Failed to delete saved search:", error2);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = __nuxt_component_2;
      const _component_Icon = __nuxt_component_1;
      const _component_USkeleton = __nuxt_component_2$1;
      const _component_UAlert = __nuxt_component_3;
      const _component_UCard = __nuxt_component_4;
      const _component_UBadge = __nuxt_component_5;
      const _component_UModal = __nuxt_component_6;
      const _component_UForm = __nuxt_component_7;
      const _component_UFormGroup = __nuxt_component_8;
      const _component_UInput = __nuxt_component_9;
      const _component_USelect = __nuxt_component_10;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="flex justify-between items-center mb-8"><div><h1 class="text-3xl font-bold text-gray-900 dark:text-white"> Saved Searches </h1><p class="mt-2 text-gray-600 dark:text-gray-300"> Save your search criteria to quickly find relevant CFPs. </p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: ($event) => showCreateModal.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-plus",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` New Search `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" New Search ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(pending)) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(ssrRenderComponent(_component_USkeleton, {
            key: i,
            class: "h-24"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center py-12">`);
        _push(ssrRenderComponent(_component_UAlert, {
          icon: "i-heroicons-exclamation-triangle",
          color: "red",
          variant: "soft",
          title: "Failed to load saved searches",
          description: unref(error).message
        }, null, _parent));
        _push(`</div>`);
      } else if (!unref(data)?.length) {
        _push(`<div class="text-center py-12"><div class="text-gray-500 dark:text-gray-400">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-bookmark",
          class: "w-12 h-12 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-lg mb-2">No saved searches yet</p><p>Create your first saved search to get notified about relevant CFPs.</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          onClick: ($event) => showCreateModal.value = true,
          class: "mt-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Create Saved Search `);
            } else {
              return [
                createTextVNode(" Create Saved Search ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(data), (search) => {
          _push(ssrRenderComponent(_component_UCard, {
            key: search.id,
            class: "hover:shadow-md transition-shadow"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex justify-between items-start"${_scopeId}><div class="flex-1"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2"${_scopeId}>${ssrInterpolate(search.name)}</h3><div class="flex flex-wrap gap-2 mb-3"${_scopeId}>`);
                if (search.filters.q) {
                  _push2(ssrRenderComponent(_component_UBadge, { variant: "soft" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` Query: &quot;${ssrInterpolate(search.filters.q)}&quot; `);
                      } else {
                        return [
                          createTextVNode(' Query: "' + toDisplayString(search.filters.q) + '" ', 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (search.filters.country) {
                  _push2(ssrRenderComponent(_component_UBadge, { variant: "soft" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` Country: ${ssrInterpolate(search.filters.country)}`);
                      } else {
                        return [
                          createTextVNode(" Country: " + toDisplayString(search.filters.country), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (search.filters.topic) {
                  _push2(ssrRenderComponent(_component_UBadge, { variant: "soft" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` Topic: ${ssrInterpolate(search.filters.topic)}`);
                      } else {
                        return [
                          createTextVNode(" Topic: " + toDisplayString(search.filters.topic), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (search.filters.format) {
                  _push2(ssrRenderComponent(_component_UBadge, { variant: "soft" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` Format: ${ssrInterpolate(formatType(search.filters.format))}`);
                      } else {
                        return [
                          createTextVNode(" Format: " + toDisplayString(formatType(search.filters.format)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (search.filters.closesBefore) {
                  _push2(ssrRenderComponent(_component_UBadge, { variant: "soft" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` Deadline: ${ssrInterpolate(formatDeadline(search.filters.closesBefore))}`);
                      } else {
                        return [
                          createTextVNode(" Deadline: " + toDisplayString(formatDeadline(search.filters.closesBefore)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="flex space-x-3"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  to: buildSearchUrl(search.filters),
                  variant: "outline",
                  size: "sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_Icon, {
                        name: "i-heroicons-magnifying-glass",
                        class: "w-4 h-4 mr-1"
                      }, null, _parent3, _scopeId2));
                      _push3(` Run Search `);
                    } else {
                      return [
                        createVNode(_component_Icon, {
                          name: "i-heroicons-magnifying-glass",
                          class: "w-4 h-4 mr-1"
                        }),
                        createTextVNode(" Run Search ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "sm",
                  color: "red",
                  onClick: ($event) => deleteSearch(search.id)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_Icon, {
                        name: "i-heroicons-trash",
                        class: "w-4 h-4 mr-1"
                      }, null, _parent3, _scopeId2));
                      _push3(` Delete `);
                    } else {
                      return [
                        createVNode(_component_Icon, {
                          name: "i-heroicons-trash",
                          class: "w-4 h-4 mr-1"
                        }),
                        createTextVNode(" Delete ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex justify-between items-start" }, [
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2" }, toDisplayString(search.name), 1),
                      createVNode("div", { class: "flex flex-wrap gap-2 mb-3" }, [
                        search.filters.q ? (openBlock(), createBlock(_component_UBadge, {
                          key: 0,
                          variant: "soft"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(' Query: "' + toDisplayString(search.filters.q) + '" ', 1)
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true),
                        search.filters.country ? (openBlock(), createBlock(_component_UBadge, {
                          key: 1,
                          variant: "soft"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Country: " + toDisplayString(search.filters.country), 1)
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true),
                        search.filters.topic ? (openBlock(), createBlock(_component_UBadge, {
                          key: 2,
                          variant: "soft"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Topic: " + toDisplayString(search.filters.topic), 1)
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true),
                        search.filters.format ? (openBlock(), createBlock(_component_UBadge, {
                          key: 3,
                          variant: "soft"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Format: " + toDisplayString(formatType(search.filters.format)), 1)
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true),
                        search.filters.closesBefore ? (openBlock(), createBlock(_component_UBadge, {
                          key: 4,
                          variant: "soft"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Deadline: " + toDisplayString(formatDeadline(search.filters.closesBefore)), 1)
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex space-x-3" }, [
                        createVNode(_component_UButton, {
                          to: buildSearchUrl(search.filters),
                          variant: "outline",
                          size: "sm"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Icon, {
                              name: "i-heroicons-magnifying-glass",
                              class: "w-4 h-4 mr-1"
                            }),
                            createTextVNode(" Run Search ")
                          ]),
                          _: 1
                        }, 8, ["to"]),
                        createVNode(_component_UButton, {
                          variant: "ghost",
                          size: "sm",
                          color: "red",
                          onClick: ($event) => deleteSearch(search.id)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Icon, {
                              name: "i-heroicons-trash",
                              class: "w-4 h-4 mr-1"
                            }),
                            createTextVNode(" Delete ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showCreateModal),
        "onUpdate:modelValue": ($event) => isRef(showCreateModal) ? showCreateModal.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h2 class="text-xl font-semibold"${_scopeId2}>Create Saved Search</h2>`);
                } else {
                  return [
                    createVNode("h2", { class: "text-xl font-semibold" }, "Create Saved Search")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UForm, {
                    schema: unref(savedSearchSchema),
                    state: unref(createForm),
                    onSubmit: handleCreate
                  }, {
                    footer: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex justify-end space-x-3"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showCreateModal.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Cancel `);
                            } else {
                              return [
                                createTextVNode(" Cancel ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UButton, {
                          type: "submit",
                          loading: unref(creating)
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Save Search `);
                            } else {
                              return [
                                createTextVNode(" Save Search ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex justify-end space-x-3" }, [
                            createVNode(_component_UButton, {
                              type: "button",
                              variant: "outline",
                              onClick: ($event) => showCreateModal.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Cancel ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_component_UButton, {
                              type: "submit",
                              loading: unref(creating)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Save Search ")
                              ]),
                              _: 1
                            }, 8, ["loading"])
                          ])
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-4"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UFormGroup, {
                          label: "Search Name",
                          name: "name",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(createForm).name,
                                "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                                placeholder: "e.g. JavaScript Conferences"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(createForm).name,
                                  "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                                  placeholder: "e.g. JavaScript Conferences"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormGroup, {
                          label: "Search Query",
                          name: "filters.q"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(createForm).filters.q,
                                "onUpdate:modelValue": ($event) => unref(createForm).filters.q = $event,
                                placeholder: "Search keywords..."
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(createForm).filters.q,
                                  "onUpdate:modelValue": ($event) => unref(createForm).filters.q = $event,
                                  placeholder: "Search keywords..."
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UFormGroup, {
                          label: "Country",
                          name: "filters.country"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_USelect, {
                                modelValue: unref(createForm).filters.country,
                                "onUpdate:modelValue": ($event) => unref(createForm).filters.country = $event,
                                options: countryOptions,
                                placeholder: "All Countries"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_USelect, {
                                  modelValue: unref(createForm).filters.country,
                                  "onUpdate:modelValue": ($event) => unref(createForm).filters.country = $event,
                                  options: countryOptions,
                                  placeholder: "All Countries"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormGroup, {
                          label: "Topic",
                          name: "filters.topic"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_USelect, {
                                modelValue: unref(createForm).filters.topic,
                                "onUpdate:modelValue": ($event) => unref(createForm).filters.topic = $event,
                                options: topicOptions,
                                placeholder: "All Topics"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_USelect, {
                                  modelValue: unref(createForm).filters.topic,
                                  "onUpdate:modelValue": ($event) => unref(createForm).filters.topic = $event,
                                  options: topicOptions,
                                  placeholder: "All Topics"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormGroup, {
                          label: "Format",
                          name: "filters.format"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_USelect, {
                                modelValue: unref(createForm).filters.format,
                                "onUpdate:modelValue": ($event) => unref(createForm).filters.format = $event,
                                options: formatOptions,
                                placeholder: "All Formats"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_USelect, {
                                  modelValue: unref(createForm).filters.format,
                                  "onUpdate:modelValue": ($event) => unref(createForm).filters.format = $event,
                                  options: formatOptions,
                                  placeholder: "All Formats"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormGroup, {
                          label: "Deadline",
                          name: "filters.closesBefore"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_USelect, {
                                modelValue: unref(createForm).filters.closesBefore,
                                "onUpdate:modelValue": ($event) => unref(createForm).filters.closesBefore = $event,
                                options: unref(deadlineOptions),
                                placeholder: "All Deadlines"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_USelect, {
                                  modelValue: unref(createForm).filters.closesBefore,
                                  "onUpdate:modelValue": ($event) => unref(createForm).filters.closesBefore = $event,
                                  options: unref(deadlineOptions),
                                  placeholder: "All Deadlines"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode(_component_UFormGroup, {
                              label: "Search Name",
                              name: "name",
                              required: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UInput, {
                                  modelValue: unref(createForm).name,
                                  "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                                  placeholder: "e.g. JavaScript Conferences"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UFormGroup, {
                              label: "Search Query",
                              name: "filters.q"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UInput, {
                                  modelValue: unref(createForm).filters.q,
                                  "onUpdate:modelValue": ($event) => unref(createForm).filters.q = $event,
                                  placeholder: "Search keywords..."
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                              createVNode(_component_UFormGroup, {
                                label: "Country",
                                name: "filters.country"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_USelect, {
                                    modelValue: unref(createForm).filters.country,
                                    "onUpdate:modelValue": ($event) => unref(createForm).filters.country = $event,
                                    options: countryOptions,
                                    placeholder: "All Countries"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UFormGroup, {
                                label: "Topic",
                                name: "filters.topic"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_USelect, {
                                    modelValue: unref(createForm).filters.topic,
                                    "onUpdate:modelValue": ($event) => unref(createForm).filters.topic = $event,
                                    options: topicOptions,
                                    placeholder: "All Topics"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UFormGroup, {
                                label: "Format",
                                name: "filters.format"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_USelect, {
                                    modelValue: unref(createForm).filters.format,
                                    "onUpdate:modelValue": ($event) => unref(createForm).filters.format = $event,
                                    options: formatOptions,
                                    placeholder: "All Formats"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UFormGroup, {
                                label: "Deadline",
                                name: "filters.closesBefore"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_USelect, {
                                    modelValue: unref(createForm).filters.closesBefore,
                                    "onUpdate:modelValue": ($event) => unref(createForm).filters.closesBefore = $event,
                                    options: unref(deadlineOptions),
                                    placeholder: "All Deadlines"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UForm, {
                      schema: unref(savedSearchSchema),
                      state: unref(createForm),
                      onSubmit: handleCreate
                    }, {
                      footer: withCtx(() => [
                        createVNode("div", { class: "flex justify-end space-x-3" }, [
                          createVNode(_component_UButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showCreateModal.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UButton, {
                            type: "submit",
                            loading: unref(creating)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Save Search ")
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode(_component_UFormGroup, {
                            label: "Search Name",
                            name: "name",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(createForm).name,
                                "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                                placeholder: "e.g. JavaScript Conferences"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormGroup, {
                            label: "Search Query",
                            name: "filters.q"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(createForm).filters.q,
                                "onUpdate:modelValue": ($event) => unref(createForm).filters.q = $event,
                                placeholder: "Search keywords..."
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode(_component_UFormGroup, {
                              label: "Country",
                              name: "filters.country"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_USelect, {
                                  modelValue: unref(createForm).filters.country,
                                  "onUpdate:modelValue": ($event) => unref(createForm).filters.country = $event,
                                  options: countryOptions,
                                  placeholder: "All Countries"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UFormGroup, {
                              label: "Topic",
                              name: "filters.topic"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_USelect, {
                                  modelValue: unref(createForm).filters.topic,
                                  "onUpdate:modelValue": ($event) => unref(createForm).filters.topic = $event,
                                  options: topicOptions,
                                  placeholder: "All Topics"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UFormGroup, {
                              label: "Format",
                              name: "filters.format"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_USelect, {
                                  modelValue: unref(createForm).filters.format,
                                  "onUpdate:modelValue": ($event) => unref(createForm).filters.format = $event,
                                  options: formatOptions,
                                  placeholder: "All Formats"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UFormGroup, {
                              label: "Deadline",
                              name: "filters.closesBefore"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_USelect, {
                                  modelValue: unref(createForm).filters.closesBefore,
                                  "onUpdate:modelValue": ($event) => unref(createForm).filters.closesBefore = $event,
                                  options: unref(deadlineOptions),
                                  placeholder: "All Deadlines"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    }, 8, ["schema", "state"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, null, {
                header: withCtx(() => [
                  createVNode("h2", { class: "text-xl font-semibold" }, "Create Saved Search")
                ]),
                default: withCtx(() => [
                  createVNode(_component_UForm, {
                    schema: unref(savedSearchSchema),
                    state: unref(createForm),
                    onSubmit: handleCreate
                  }, {
                    footer: withCtx(() => [
                      createVNode("div", { class: "flex justify-end space-x-3" }, [
                        createVNode(_component_UButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showCreateModal.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancel ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UButton, {
                          type: "submit",
                          loading: unref(creating)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Save Search ")
                          ]),
                          _: 1
                        }, 8, ["loading"])
                      ])
                    ]),
                    default: withCtx(() => [
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode(_component_UFormGroup, {
                          label: "Search Name",
                          name: "name",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(createForm).name,
                              "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                              placeholder: "e.g. JavaScript Conferences"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UFormGroup, {
                          label: "Search Query",
                          name: "filters.q"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(createForm).filters.q,
                              "onUpdate:modelValue": ($event) => unref(createForm).filters.q = $event,
                              placeholder: "Search keywords..."
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode(_component_UFormGroup, {
                            label: "Country",
                            name: "filters.country"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_USelect, {
                                modelValue: unref(createForm).filters.country,
                                "onUpdate:modelValue": ($event) => unref(createForm).filters.country = $event,
                                options: countryOptions,
                                placeholder: "All Countries"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormGroup, {
                            label: "Topic",
                            name: "filters.topic"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_USelect, {
                                modelValue: unref(createForm).filters.topic,
                                "onUpdate:modelValue": ($event) => unref(createForm).filters.topic = $event,
                                options: topicOptions,
                                placeholder: "All Topics"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormGroup, {
                            label: "Format",
                            name: "filters.format"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_USelect, {
                                modelValue: unref(createForm).filters.format,
                                "onUpdate:modelValue": ($event) => unref(createForm).filters.format = $event,
                                options: formatOptions,
                                placeholder: "All Formats"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormGroup, {
                            label: "Deadline",
                            name: "filters.closesBefore"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_USelect, {
                                modelValue: unref(createForm).filters.closesBefore,
                                "onUpdate:modelValue": ($event) => unref(createForm).filters.closesBefore = $event,
                                options: unref(deadlineOptions),
                                placeholder: "All Deadlines"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["schema", "state"])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/saved-searches.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=saved-searches-CyCXVRqU.mjs.map
