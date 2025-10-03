import { _ as __nuxt_component_4 } from './Card-CkQS4cv2.mjs';
import { _ as __nuxt_component_1 } from './index-mbtfuGJE.mjs';
import { _ as __nuxt_component_5 } from './Badge-Cz78TU95.mjs';
import { C as COUNTRIES, T as TOPICS, _ as __nuxt_component_3 } from './constants-CWJzltru.mjs';
import { _ as __nuxt_component_11 } from './Checkbox-Cs78g7r0.mjs';
import { _ as __nuxt_component_2 } from './Button-PXp5DTfw.mjs';
import { u as useHead, b as useRouter, n as navigateTo } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createTextVNode, toDisplayString, isRef, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useUserPreferences } from './useUserPreferences-DVOD9Se1.mjs';
import 'tailwind-merge';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import './Avatar-Dx_eT8Ed.mjs';
import '@tanstack/vue-virtual';
import './active-element-history-CTDrs9J_.mjs';
import './keyboard-v1ubhqOk.mjs';
import './use-resolve-button-type-CxQX8-dP.mjs';
import '@vueuse/core';
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
import 'country-state-city';
import './nuxt-link-BIQ150Xm.mjs';
import 'vue-router';
import '@supabase/ssr';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "preferences",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "My Preferences - Call for Papers",
      meta: [
        { name: "description", content: "Customize your CFP browsing experience by setting your favorite countries, topics, and formats." }
      ]
    });
    const { preferences, setCountries, setTopics, setFormats, removeSavedSearch: removeSearch } = useUserPreferences();
    const router = useRouter();
    const selectedCountries = ref([]);
    const selectedTopics = ref([]);
    const selectedFormatsSet = ref(/* @__PURE__ */ new Set());
    const countryToAdd = ref("");
    const topicToAdd = ref("");
    const formatOptions = [
      { label: "Conference", value: "conference" },
      { label: "Workshop", value: "workshop" },
      { label: "Meetup", value: "meetup" },
      { label: "Online Event", value: "online" }
    ];
    const availableCountries = computed(() => {
      return COUNTRIES.filter((country) => !selectedCountries.value.includes(country));
    });
    const availableTopics = computed(() => {
      return TOPICS.filter((topic) => !selectedTopics.value.includes(topic));
    });
    function addCountry(country) {
      if (country && !selectedCountries.value.includes(country)) {
        selectedCountries.value.push(country);
        setCountries(selectedCountries.value);
        countryToAdd.value = "";
      }
    }
    function removeCountry(index) {
      selectedCountries.value.splice(index, 1);
      setCountries(selectedCountries.value);
    }
    function addTopic(topic) {
      if (topic && !selectedTopics.value.includes(topic)) {
        selectedTopics.value.push(topic);
        setTopics(selectedTopics.value);
        topicToAdd.value = "";
      }
    }
    function removeTopic(index) {
      selectedTopics.value.splice(index, 1);
      setTopics(selectedTopics.value);
    }
    function updateFormats() {
      setFormats(Array.from(selectedFormatsSet.value));
    }
    function removeSavedSearch(id) {
      removeSearch(id);
    }
    function navigateToSearch(search) {
      const query = {};
      if (search.filters.q) query.q = search.filters.q;
      if (search.filters.country) query.country = search.filters.country;
      if (search.filters.topic) query.topic = search.filters.topic;
      if (search.filters.format) query.format = search.filters.format;
      if (search.filters.closesBefore) query.closesBefore = search.filters.closesBefore;
      router.push({ path: "/search", query });
    }
    function clearAllPreferences() {
      selectedCountries.value = [];
      selectedTopics.value = [];
      selectedFormatsSet.value = /* @__PURE__ */ new Set();
      setCountries([]);
      setTopics([]);
      setFormats([]);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_4;
      const _component_Icon = __nuxt_component_1;
      const _component_UBadge = __nuxt_component_5;
      const _component_USelectMenu = __nuxt_component_3;
      const _component_UCheckbox = __nuxt_component_11;
      const _component_UButton = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="mb-8"><h1 class="text-3xl font-bold text-gray-900 dark:text-white"> My Preferences </h1><p class="mt-2 text-gray-600 dark:text-gray-300"> Customize your CFP browsing experience by setting your interests. These preferences will be saved locally in your browser. </p></div><div class="space-y-6">`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-map-pin",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<h2 class="text-xl font-semibold text-gray-900 dark:text-white"${_scopeId}> Favorite Countries </h2></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(_component_Icon, {
                  name: "i-heroicons-map-pin",
                  class: "w-5 h-5"
                }),
                createVNode("h2", { class: "text-xl font-semibold text-gray-900 dark:text-white" }, " Favorite Countries ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Select countries you&#39;re interested in attending conferences or events. </p><div class="flex flex-wrap gap-2 mb-4"${_scopeId}><!--[-->`);
            ssrRenderList(unref(selectedCountries), (country, index) => {
              _push2(ssrRenderComponent(_component_UBadge, {
                key: index,
                variant: "soft",
                color: "primary",
                size: "lg",
                onClick: ($event) => removeCountry(index),
                class: "cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(country)} × `);
                  } else {
                    return [
                      createTextVNode(toDisplayString(country) + " × ", 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            if (unref(selectedCountries).length === 0) {
              _push2(ssrRenderComponent(_component_UBadge, {
                variant: "soft",
                color: "gray"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` No countries selected `);
                  } else {
                    return [
                      createTextVNode(" No countries selected ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: unref(countryToAdd),
              "onUpdate:modelValue": [($event) => isRef(countryToAdd) ? countryToAdd.value = $event : null, addCountry],
              options: unref(availableCountries),
              placeholder: "Add a country...",
              searchable: "",
              "searchable-placeholder": "Search countries...",
              size: "lg"
            }, {
              label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-gray-500"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "i-heroicons-plus",
                    class: "w-4 h-4 inline mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Add a country </span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-gray-500" }, [
                      createVNode(_component_Icon, {
                        name: "i-heroicons-plus",
                        class: "w-4 h-4 inline mr-1"
                      }),
                      createTextVNode(" Add a country ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Select countries you're interested in attending conferences or events. "),
                createVNode("div", { class: "flex flex-wrap gap-2 mb-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedCountries), (country, index) => {
                    return openBlock(), createBlock(_component_UBadge, {
                      key: index,
                      variant: "soft",
                      color: "primary",
                      size: "lg",
                      onClick: ($event) => removeCountry(index),
                      class: "cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(country) + " × ", 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]);
                  }), 128)),
                  unref(selectedCountries).length === 0 ? (openBlock(), createBlock(_component_UBadge, {
                    key: 0,
                    variant: "soft",
                    color: "gray"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" No countries selected ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                createVNode(_component_USelectMenu, {
                  modelValue: unref(countryToAdd),
                  "onUpdate:modelValue": [($event) => isRef(countryToAdd) ? countryToAdd.value = $event : null, addCountry],
                  options: unref(availableCountries),
                  placeholder: "Add a country...",
                  searchable: "",
                  "searchable-placeholder": "Search countries...",
                  size: "lg"
                }, {
                  label: withCtx(() => [
                    createVNode("span", { class: "text-gray-500" }, [
                      createVNode(_component_Icon, {
                        name: "i-heroicons-plus",
                        class: "w-4 h-4 inline mr-1"
                      }),
                      createTextVNode(" Add a country ")
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "options"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-tag",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<h2 class="text-xl font-semibold text-gray-900 dark:text-white"${_scopeId}> Favorite Topics </h2></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(_component_Icon, {
                  name: "i-heroicons-tag",
                  class: "w-5 h-5"
                }),
                createVNode("h2", { class: "text-xl font-semibold text-gray-900 dark:text-white" }, " Favorite Topics ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Select topics you&#39;re interested in speaking about or learning more about. </p><div class="flex flex-wrap gap-2 mb-4"${_scopeId}><!--[-->`);
            ssrRenderList(unref(selectedTopics), (topic, index) => {
              _push2(ssrRenderComponent(_component_UBadge, {
                key: index,
                variant: "soft",
                color: "primary",
                size: "lg",
                onClick: ($event) => removeTopic(index),
                class: "cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(topic)} × `);
                  } else {
                    return [
                      createTextVNode(toDisplayString(topic) + " × ", 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            if (unref(selectedTopics).length === 0) {
              _push2(ssrRenderComponent(_component_UBadge, {
                variant: "soft",
                color: "gray"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` No topics selected `);
                  } else {
                    return [
                      createTextVNode(" No topics selected ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: unref(topicToAdd),
              "onUpdate:modelValue": [($event) => isRef(topicToAdd) ? topicToAdd.value = $event : null, addTopic],
              options: unref(availableTopics),
              placeholder: "Add a topic...",
              searchable: "",
              "searchable-placeholder": "Search topics...",
              size: "lg"
            }, {
              label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-gray-500"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "i-heroicons-plus",
                    class: "w-4 h-4 inline mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Add a topic </span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-gray-500" }, [
                      createVNode(_component_Icon, {
                        name: "i-heroicons-plus",
                        class: "w-4 h-4 inline mr-1"
                      }),
                      createTextVNode(" Add a topic ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Select topics you're interested in speaking about or learning more about. "),
                createVNode("div", { class: "flex flex-wrap gap-2 mb-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedTopics), (topic, index) => {
                    return openBlock(), createBlock(_component_UBadge, {
                      key: index,
                      variant: "soft",
                      color: "primary",
                      size: "lg",
                      onClick: ($event) => removeTopic(index),
                      class: "cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(topic) + " × ", 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]);
                  }), 128)),
                  unref(selectedTopics).length === 0 ? (openBlock(), createBlock(_component_UBadge, {
                    key: 0,
                    variant: "soft",
                    color: "gray"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" No topics selected ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                createVNode(_component_USelectMenu, {
                  modelValue: unref(topicToAdd),
                  "onUpdate:modelValue": [($event) => isRef(topicToAdd) ? topicToAdd.value = $event : null, addTopic],
                  options: unref(availableTopics),
                  placeholder: "Add a topic...",
                  searchable: "",
                  "searchable-placeholder": "Search topics...",
                  size: "lg"
                }, {
                  label: withCtx(() => [
                    createVNode("span", { class: "text-gray-500" }, [
                      createVNode(_component_Icon, {
                        name: "i-heroicons-plus",
                        class: "w-4 h-4 inline mr-1"
                      }),
                      createTextVNode(" Add a topic ")
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "options"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-presentation-chart-bar",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<h2 class="text-xl font-semibold text-gray-900 dark:text-white"${_scopeId}> Favorite Formats </h2></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(_component_Icon, {
                  name: "i-heroicons-presentation-chart-bar",
                  class: "w-5 h-5"
                }),
                createVNode("h2", { class: "text-xl font-semibold text-gray-900 dark:text-white" }, " Favorite Formats ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Select the event formats you prefer. </p><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(formatOptions, (format) => {
              _push2(ssrRenderComponent(_component_UCheckbox, {
                key: format.value,
                modelValue: unref(selectedFormatsSet),
                "onUpdate:modelValue": [($event) => isRef(selectedFormatsSet) ? selectedFormatsSet.value = $event : null, updateFormats],
                value: format.value,
                label: format.label
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Select the event formats you prefer. "),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(formatOptions, (format) => {
                    return createVNode(_component_UCheckbox, {
                      key: format.value,
                      modelValue: unref(selectedFormatsSet),
                      "onUpdate:modelValue": [($event) => isRef(selectedFormatsSet) ? selectedFormatsSet.value = $event : null, updateFormats],
                      value: format.value,
                      label: format.label
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"]);
                  }), 64))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-bookmark",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<h2 class="text-xl font-semibold text-gray-900 dark:text-white"${_scopeId}> Saved Searches </h2></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode(_component_Icon, {
                    name: "i-heroicons-bookmark",
                    class: "w-5 h-5"
                  }),
                  createVNode("h2", { class: "text-xl font-semibold text-gray-900 dark:text-white" }, " Saved Searches ")
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Your saved search filters will appear here. You can save searches from the search page. </p>`);
            if (unref(preferences).savedSearches.length === 0) {
              _push2(`<div class="text-center py-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-bookmark-slash",
                class: "w-12 h-12 mx-auto text-gray-400 mb-2"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-gray-500 dark:text-gray-400"${_scopeId}>No saved searches yet</p></div>`);
            } else {
              _push2(`<div class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(unref(preferences).savedSearches, (search) => {
                _push2(`<div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"${_scopeId}><div class="flex-1"${_scopeId}><h3 class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(search.name)}</h3><div class="flex flex-wrap gap-2 mt-2 text-xs"${_scopeId}>`);
                if (search.filters.q) {
                  _push2(ssrRenderComponent(_component_UBadge, {
                    variant: "soft",
                    size: "sm"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` &quot;${ssrInterpolate(search.filters.q)}&quot; `);
                      } else {
                        return [
                          createTextVNode(' "' + toDisplayString(search.filters.q) + '" ', 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (search.filters.country) {
                  _push2(ssrRenderComponent(_component_UBadge, {
                    variant: "soft",
                    size: "sm"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(search.filters.country)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(search.filters.country), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (search.filters.topic) {
                  _push2(ssrRenderComponent(_component_UBadge, {
                    variant: "soft",
                    size: "sm"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(search.filters.topic)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(search.filters.topic), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (search.filters.format) {
                  _push2(ssrRenderComponent(_component_UBadge, {
                    variant: "soft",
                    size: "sm"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(search.filters.format)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(search.filters.format), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="flex gap-2 ml-4"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "sm",
                  icon: "i-heroicons-arrow-right",
                  onClick: ($event) => navigateToSearch(search)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Go `);
                    } else {
                      return [
                        createTextVNode(" Go ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "sm",
                  color: "red",
                  icon: "i-heroicons-trash",
                  onClick: ($event) => removeSavedSearch(search.id)
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Your saved search filters will appear here. You can save searches from the search page. "),
                unref(preferences).savedSearches.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-center py-8"
                }, [
                  createVNode(_component_Icon, {
                    name: "i-heroicons-bookmark-slash",
                    class: "w-12 h-12 mx-auto text-gray-400 mb-2"
                  }),
                  createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "No saved searches yet")
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-3"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(preferences).savedSearches, (search) => {
                    return openBlock(), createBlock("div", {
                      key: search.id,
                      class: "flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("h3", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(search.name), 1),
                        createVNode("div", { class: "flex flex-wrap gap-2 mt-2 text-xs" }, [
                          search.filters.q ? (openBlock(), createBlock(_component_UBadge, {
                            key: 0,
                            variant: "soft",
                            size: "sm"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(' "' + toDisplayString(search.filters.q) + '" ', 1)
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true),
                          search.filters.country ? (openBlock(), createBlock(_component_UBadge, {
                            key: 1,
                            variant: "soft",
                            size: "sm"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(search.filters.country), 1)
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true),
                          search.filters.topic ? (openBlock(), createBlock(_component_UBadge, {
                            key: 2,
                            variant: "soft",
                            size: "sm"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(search.filters.topic), 1)
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true),
                          search.filters.format ? (openBlock(), createBlock(_component_UBadge, {
                            key: 3,
                            variant: "soft",
                            size: "sm"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(search.filters.format), 1)
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "flex gap-2 ml-4" }, [
                        createVNode(_component_UButton, {
                          variant: "ghost",
                          size: "sm",
                          icon: "i-heroicons-arrow-right",
                          onClick: ($event) => navigateToSearch(search)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Go ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UButton, {
                          variant: "ghost",
                          size: "sm",
                          color: "red",
                          icon: "i-heroicons-trash",
                          onClick: ($event) => removeSavedSearch(search.id)
                        }, null, 8, ["onClick"])
                      ])
                    ]);
                  }), 128))
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex justify-between items-center pt-4">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        color: "gray",
        onClick: clearAllPreferences
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Clear All Preferences `);
          } else {
            return [
              createTextVNode(" Clear All Preferences ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/search")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Go to Search `);
          } else {
            return [
              createTextVNode(" Go to Search ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/preferences.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=preferences-Cqv9wPdI.mjs.map
