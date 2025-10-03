import { _ as __nuxt_component_3 } from './Alert-DCRR2uSh.mjs';
import { _ as __nuxt_component_4 } from './Card-CkQS4cv2.mjs';
import { _ as __nuxt_component_7 } from './Form-CjVJcDeG.mjs';
import { a as __nuxt_component_8, _ as __nuxt_component_9 } from './FormGroup-gKLvpM0v.mjs';
import { T as TOPICS, _ as __nuxt_component_3$1 } from './constants-CWJzltru.mjs';
import { _ as __nuxt_component_10 } from './Select-C28OlvYB.mjs';
import { _ as __nuxt_component_5 } from './Badge-Cz78TU95.mjs';
import { _ as __nuxt_component_1 } from './index-mbtfuGJE.mjs';
import { _ as __nuxt_component_11 } from './Checkbox-Cs78g7r0.mjs';
import { _ as __nuxt_component_12 } from './Textarea-CMsw6kJP.mjs';
import { _ as __nuxt_component_2 } from './Button-PXp5DTfw.mjs';
import { defineComponent, reactive, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, isRef, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { s as submitFormSchema } from './zod-De9mlz-X.mjs';
import { Country } from 'country-state-city';
import { u as useHead } from './server.mjs';
import './Avatar-Dx_eT8Ed.mjs';
import 'tailwind-merge';
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
import '@tanstack/vue-virtual';
import './active-element-history-CTDrs9J_.mjs';
import './keyboard-v1ubhqOk.mjs';
import './use-resolve-button-type-CxQX8-dP.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import './nuxt-link-BIQ150Xm.mjs';
import 'zod';
import 'vue-router';
import '@supabase/ssr';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "submit",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Submit CFP - Call for Papers",
      meta: [
        { name: "description", content: "Submit a call for papers to help the speaking community discover new opportunities." }
      ]
    });
    const formatOptions = [
      { label: "Conference", value: "conference" },
      { label: "Workshop", value: "workshop" },
      { label: "Meetup", value: "meetup" },
      { label: "Online Event", value: "online" }
    ];
    const platformOptions = [
      "In-person",
      "Online",
      "Hybrid"
    ];
    const allCountries = Country.getAllCountries();
    const countryOptions = allCountries.map((country) => ({
      label: country.name,
      value: country.name,
      isoCode: country.isoCode
    }));
    new Map(
      allCountries.map((country) => [country.name, country.isoCode])
    );
    const formState = reactive({
      conference: {
        name: "",
        websiteUrl: "",
        city: "",
        country: "",
        platform: ""
      },
      cfp: {
        cfpUrl: "",
        topics: [],
        format: "",
        opensAt: "",
        closesAt: "",
        perks: {
          travel: false,
          hotel: false,
          honorarium: false
        },
        notes: ""
      }
    });
    const selectedTopic = ref("");
    const submitting = ref(false);
    const submitSuccess = ref(false);
    const submitError = ref("");
    const availableTopics = computed(() => {
      return TOPICS.filter((topic) => !formState.cfp.topics.includes(topic));
    });
    function onCountryChange(countryName) {
      formState.conference.city = "";
    }
    function addTopicFromSelect(topic) {
      if (topic && !formState.cfp.topics.includes(topic)) {
        formState.cfp.topics.push(topic);
        selectedTopic.value = "";
      }
    }
    function removeTopic(index) {
      formState.cfp.topics.splice(index, 1);
    }
    function resetForm() {
      Object.assign(formState, {
        conference: {
          name: "",
          websiteUrl: "",
          city: "",
          country: "",
          platform: ""
        },
        cfp: {
          cfpUrl: "",
          topics: [],
          format: "",
          opensAt: "",
          closesAt: "",
          perks: {
            travel: false,
            hotel: false,
            honorarium: false
          },
          notes: ""
        }
      });
      selectedTopic.value = "";
      submitSuccess.value = false;
      submitError.value = "";
    }
    async function handleSubmit() {
      submitting.value = true;
      submitSuccess.value = false;
      submitError.value = "";
      try {
        await $fetch("/api/submit", {
          method: "POST",
          body: formState
        });
        submitSuccess.value = true;
        resetForm();
      } catch (error) {
        submitError.value = error.data?.error || "An error occurred while submitting the CFP";
      } finally {
        submitting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UAlert = __nuxt_component_3;
      const _component_UCard = __nuxt_component_4;
      const _component_UForm = __nuxt_component_7;
      const _component_UFormGroup = __nuxt_component_8;
      const _component_UInput = __nuxt_component_9;
      const _component_USelectMenu = __nuxt_component_3$1;
      const _component_USelect = __nuxt_component_10;
      const _component_UBadge = __nuxt_component_5;
      const _component_Icon = __nuxt_component_1;
      const _component_UCheckbox = __nuxt_component_11;
      const _component_UTextarea = __nuxt_component_12;
      const _component_UButton = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="mb-8"><h1 class="text-3xl font-bold text-gray-900 dark:text-white"> Submit a CFP </h1><p class="mt-2 text-gray-600 dark:text-gray-300"> Help the community by submitting a call for papers that you&#39;ve found. All submissions go through a moderation process before being published. </p></div>`);
      if (unref(submitSuccess)) {
        _push(ssrRenderComponent(_component_UAlert, {
          icon: "i-heroicons-check-circle",
          color: "green",
          variant: "soft",
          title: "CFP Submitted Successfully!",
          description: "Your submission has been sent for moderation and will be reviewed shortly.",
          class: "mb-6"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(submitError)) {
        _push(ssrRenderComponent(_component_UAlert, {
          icon: "i-heroicons-exclamation-triangle",
          color: "red",
          variant: "soft",
          title: "Submission Failed",
          description: unref(submitError),
          class: "mb-6"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UForm, {
              schema: unref(submitFormSchema),
              state: unref(formState),
              onSubmit: handleSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-8"${_scopeId2}><div${_scopeId2}><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4"${_scopeId2}> Conference Information </h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Conference Name",
                    name: "conference.name",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(formState).conference.name,
                          "onUpdate:modelValue": ($event) => unref(formState).conference.name = $event,
                          placeholder: "e.g. React Conf 2025"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(formState).conference.name,
                            "onUpdate:modelValue": ($event) => unref(formState).conference.name = $event,
                            placeholder: "e.g. React Conf 2025"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Website URL",
                    name: "conference.websiteUrl",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(formState).conference.websiteUrl,
                          "onUpdate:modelValue": ($event) => unref(formState).conference.websiteUrl = $event,
                          placeholder: "https://reactconf.com",
                          type: "url"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(formState).conference.websiteUrl,
                            "onUpdate:modelValue": ($event) => unref(formState).conference.websiteUrl = $event,
                            placeholder: "https://reactconf.com",
                            type: "url"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Country",
                    name: "conference.country",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_USelectMenu, {
                          modelValue: unref(formState).conference.country,
                          "onUpdate:modelValue": [($event) => unref(formState).conference.country = $event, onCountryChange],
                          options: unref(countryOptions),
                          placeholder: "Select country",
                          searchable: "",
                          "searchable-placeholder": "Search countries...",
                          "option-attribute": "label",
                          "value-attribute": "value"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_USelectMenu, {
                            modelValue: unref(formState).conference.country,
                            "onUpdate:modelValue": [($event) => unref(formState).conference.country = $event, onCountryChange],
                            options: unref(countryOptions),
                            placeholder: "Select country",
                            searchable: "",
                            "searchable-placeholder": "Search countries...",
                            "option-attribute": "label",
                            "value-attribute": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "City",
                    name: "conference.city",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(formState).conference.city,
                          "onUpdate:modelValue": ($event) => unref(formState).conference.city = $event,
                          placeholder: "e.g. San Francisco"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(formState).conference.city,
                            "onUpdate:modelValue": ($event) => unref(formState).conference.city = $event,
                            placeholder: "e.g. San Francisco"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Platform (optional)",
                    name: "conference.platform",
                    class: "md:col-span-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_USelectMenu, {
                          modelValue: unref(formState).conference.platform,
                          "onUpdate:modelValue": ($event) => unref(formState).conference.platform = $event,
                          options: platformOptions,
                          placeholder: "Select platform",
                          searchable: "",
                          "searchable-placeholder": "Search platforms..."
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_USelectMenu, {
                            modelValue: unref(formState).conference.platform,
                            "onUpdate:modelValue": ($event) => unref(formState).conference.platform = $event,
                            options: platformOptions,
                            placeholder: "Select platform",
                            searchable: "",
                            "searchable-placeholder": "Search platforms..."
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div${_scopeId2}><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4"${_scopeId2}> Call for Papers Details </h2><div class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "CFP URL",
                    name: "cfp.cfpUrl",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(formState).cfp.cfpUrl,
                          "onUpdate:modelValue": ($event) => unref(formState).cfp.cfpUrl = $event,
                          placeholder: "https://reactconf.com/call-for-speakers",
                          type: "url"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(formState).cfp.cfpUrl,
                            "onUpdate:modelValue": ($event) => unref(formState).cfp.cfpUrl = $event,
                            placeholder: "https://reactconf.com/call-for-speakers",
                            type: "url"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Format",
                    name: "cfp.format",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_USelect, {
                          modelValue: unref(formState).cfp.format,
                          "onUpdate:modelValue": ($event) => unref(formState).cfp.format = $event,
                          options: formatOptions,
                          placeholder: "Select format"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_USelect, {
                            modelValue: unref(formState).cfp.format,
                            "onUpdate:modelValue": ($event) => unref(formState).cfp.format = $event,
                            options: formatOptions,
                            placeholder: "Select format"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Closing Date",
                    name: "cfp.closesAt",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(formState).cfp.closesAt,
                          "onUpdate:modelValue": ($event) => unref(formState).cfp.closesAt = $event,
                          type: "date",
                          min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(formState).cfp.closesAt,
                            "onUpdate:modelValue": ($event) => unref(formState).cfp.closesAt = $event,
                            type: "date",
                            min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "min"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Opening Date (optional)",
                    name: "cfp.opensAt"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(formState).cfp.opensAt,
                          "onUpdate:modelValue": ($event) => unref(formState).cfp.opensAt = $event,
                          type: "date"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(formState).cfp.opensAt,
                            "onUpdate:modelValue": ($event) => unref(formState).cfp.opensAt = $event,
                            type: "date"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Topics",
                    name: "cfp.topics",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}><div class="flex flex-wrap gap-2 mb-2"${_scopeId3}><!--[-->`);
                        ssrRenderList(unref(formState).cfp.topics, (topic, index) => {
                          _push4(ssrRenderComponent(_component_UBadge, {
                            key: index,
                            variant: "soft",
                            color: "primary",
                            onClick: ($event) => removeTopic(index),
                            class: "cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(topic)} × `);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(topic) + " × ", 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]--></div>`);
                        _push4(ssrRenderComponent(_component_USelectMenu, {
                          modelValue: unref(selectedTopic),
                          "onUpdate:modelValue": [($event) => isRef(selectedTopic) ? selectedTopic.value = $event : null, addTopicFromSelect],
                          options: unref(availableTopics),
                          placeholder: "Select topics from the list...",
                          searchable: "",
                          "searchable-placeholder": "Search topics...",
                          class: "w-full"
                        }, {
                          label: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="text-gray-500"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_Icon, {
                                name: "i-heroicons-tag",
                                class: "w-4 h-4 inline mr-1"
                              }, null, _parent5, _scopeId4));
                              _push5(` Select topics from the list... </span>`);
                            } else {
                              return [
                                createVNode("span", { class: "text-gray-500" }, [
                                  createVNode(_component_Icon, {
                                    name: "i-heroicons-tag",
                                    class: "w-4 h-4 inline mr-1"
                                  }),
                                  createTextVNode(" Select topics from the list... ")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId3}> Select one or more topics that are relevant to your CFP </p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex flex-wrap gap-2 mb-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(formState).cfp.topics, (topic, index) => {
                                return openBlock(), createBlock(_component_UBadge, {
                                  key: index,
                                  variant: "soft",
                                  color: "primary",
                                  onClick: ($event) => removeTopic(index),
                                  class: "cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(topic) + " × ", 1)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"]);
                              }), 128))
                            ]),
                            createVNode(_component_USelectMenu, {
                              modelValue: unref(selectedTopic),
                              "onUpdate:modelValue": [($event) => isRef(selectedTopic) ? selectedTopic.value = $event : null, addTopicFromSelect],
                              options: unref(availableTopics),
                              placeholder: "Select topics from the list...",
                              searchable: "",
                              "searchable-placeholder": "Search topics...",
                              class: "w-full"
                            }, {
                              label: withCtx(() => [
                                createVNode("span", { class: "text-gray-500" }, [
                                  createVNode(_component_Icon, {
                                    name: "i-heroicons-tag",
                                    class: "w-4 h-4 inline mr-1"
                                  }),
                                  createTextVNode(" Select topics from the list... ")
                                ])
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                            createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Select one or more topics that are relevant to your CFP ")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3"${_scopeId2}> Speaker Benefits </h3><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormGroup, { name: "cfp.perks.travel" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UCheckbox, {
                          modelValue: unref(formState).cfp.perks.travel,
                          "onUpdate:modelValue": ($event) => unref(formState).cfp.perks.travel = $event,
                          label: "Travel covered"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UCheckbox, {
                            modelValue: unref(formState).cfp.perks.travel,
                            "onUpdate:modelValue": ($event) => unref(formState).cfp.perks.travel = $event,
                            label: "Travel covered"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, { name: "cfp.perks.hotel" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UCheckbox, {
                          modelValue: unref(formState).cfp.perks.hotel,
                          "onUpdate:modelValue": ($event) => unref(formState).cfp.perks.hotel = $event,
                          label: "Hotel covered"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UCheckbox, {
                            modelValue: unref(formState).cfp.perks.hotel,
                            "onUpdate:modelValue": ($event) => unref(formState).cfp.perks.hotel = $event,
                            label: "Hotel covered"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, { name: "cfp.perks.honorarium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UCheckbox, {
                          modelValue: unref(formState).cfp.perks.honorarium,
                          "onUpdate:modelValue": ($event) => unref(formState).cfp.perks.honorarium = $event,
                          label: "Honorarium provided"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UCheckbox, {
                            modelValue: unref(formState).cfp.perks.honorarium,
                            "onUpdate:modelValue": ($event) => unref(formState).cfp.perks.honorarium = $event,
                            label: "Honorarium provided"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Additional Notes (optional)",
                    name: "cfp.notes"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UTextarea, {
                          modelValue: unref(formState).cfp.notes,
                          "onUpdate:modelValue": ($event) => unref(formState).cfp.notes = $event,
                          placeholder: "Any additional information about the CFP or conference...",
                          rows: 3
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UTextarea, {
                            modelValue: unref(formState).cfp.notes,
                            "onUpdate:modelValue": ($event) => unref(formState).cfp.notes = $event,
                            placeholder: "Any additional information about the CFP or conference...",
                            rows: 3
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="flex justify-end space-x-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "button",
                    variant: "outline",
                    onClick: resetForm
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Reset `);
                      } else {
                        return [
                          createTextVNode(" Reset ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "submit",
                    loading: unref(submitting)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Submit CFP `);
                      } else {
                        return [
                          createTextVNode(" Submit CFP ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-8" }, [
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-xl font-semibold text-gray-900 dark:text-white mb-4" }, " Conference Information "),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode(_component_UFormGroup, {
                            label: "Conference Name",
                            name: "conference.name",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(formState).conference.name,
                                "onUpdate:modelValue": ($event) => unref(formState).conference.name = $event,
                                placeholder: "e.g. React Conf 2025"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormGroup, {
                            label: "Website URL",
                            name: "conference.websiteUrl",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(formState).conference.websiteUrl,
                                "onUpdate:modelValue": ($event) => unref(formState).conference.websiteUrl = $event,
                                placeholder: "https://reactconf.com",
                                type: "url"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormGroup, {
                            label: "Country",
                            name: "conference.country",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_USelectMenu, {
                                modelValue: unref(formState).conference.country,
                                "onUpdate:modelValue": [($event) => unref(formState).conference.country = $event, onCountryChange],
                                options: unref(countryOptions),
                                placeholder: "Select country",
                                searchable: "",
                                "searchable-placeholder": "Search countries...",
                                "option-attribute": "label",
                                "value-attribute": "value"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormGroup, {
                            label: "City",
                            name: "conference.city",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(formState).conference.city,
                                "onUpdate:modelValue": ($event) => unref(formState).conference.city = $event,
                                placeholder: "e.g. San Francisco"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormGroup, {
                            label: "Platform (optional)",
                            name: "conference.platform",
                            class: "md:col-span-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_USelectMenu, {
                                modelValue: unref(formState).conference.platform,
                                "onUpdate:modelValue": ($event) => unref(formState).conference.platform = $event,
                                options: platformOptions,
                                placeholder: "Select platform",
                                searchable: "",
                                "searchable-placeholder": "Search platforms..."
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-xl font-semibold text-gray-900 dark:text-white mb-4" }, " Call for Papers Details "),
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode(_component_UFormGroup, {
                            label: "CFP URL",
                            name: "cfp.cfpUrl",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(formState).cfp.cfpUrl,
                                "onUpdate:modelValue": ($event) => unref(formState).cfp.cfpUrl = $event,
                                placeholder: "https://reactconf.com/call-for-speakers",
                                type: "url"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode(_component_UFormGroup, {
                              label: "Format",
                              name: "cfp.format",
                              required: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_USelect, {
                                  modelValue: unref(formState).cfp.format,
                                  "onUpdate:modelValue": ($event) => unref(formState).cfp.format = $event,
                                  options: formatOptions,
                                  placeholder: "Select format"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UFormGroup, {
                              label: "Closing Date",
                              name: "cfp.closesAt",
                              required: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UInput, {
                                  modelValue: unref(formState).cfp.closesAt,
                                  "onUpdate:modelValue": ($event) => unref(formState).cfp.closesAt = $event,
                                  type: "date",
                                  min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "min"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(_component_UFormGroup, {
                            label: "Opening Date (optional)",
                            name: "cfp.opensAt"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(formState).cfp.opensAt,
                                "onUpdate:modelValue": ($event) => unref(formState).cfp.opensAt = $event,
                                type: "date"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormGroup, {
                            label: "Topics",
                            name: "cfp.topics",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("div", { class: "flex flex-wrap gap-2 mb-2" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(formState).cfp.topics, (topic, index) => {
                                    return openBlock(), createBlock(_component_UBadge, {
                                      key: index,
                                      variant: "soft",
                                      color: "primary",
                                      onClick: ($event) => removeTopic(index),
                                      class: "cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(topic) + " × ", 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick"]);
                                  }), 128))
                                ]),
                                createVNode(_component_USelectMenu, {
                                  modelValue: unref(selectedTopic),
                                  "onUpdate:modelValue": [($event) => isRef(selectedTopic) ? selectedTopic.value = $event : null, addTopicFromSelect],
                                  options: unref(availableTopics),
                                  placeholder: "Select topics from the list...",
                                  searchable: "",
                                  "searchable-placeholder": "Search topics...",
                                  class: "w-full"
                                }, {
                                  label: withCtx(() => [
                                    createVNode("span", { class: "text-gray-500" }, [
                                      createVNode(_component_Icon, {
                                        name: "i-heroicons-tag",
                                        class: "w-4 h-4 inline mr-1"
                                      }),
                                      createTextVNode(" Select topics from the list... ")
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                                createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Select one or more topics that are relevant to your CFP ")
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-lg font-medium text-gray-900 dark:text-white mb-3" }, " Speaker Benefits "),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                              createVNode(_component_UFormGroup, { name: "cfp.perks.travel" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UCheckbox, {
                                    modelValue: unref(formState).cfp.perks.travel,
                                    "onUpdate:modelValue": ($event) => unref(formState).cfp.perks.travel = $event,
                                    label: "Travel covered"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UFormGroup, { name: "cfp.perks.hotel" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UCheckbox, {
                                    modelValue: unref(formState).cfp.perks.hotel,
                                    "onUpdate:modelValue": ($event) => unref(formState).cfp.perks.hotel = $event,
                                    label: "Hotel covered"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UFormGroup, { name: "cfp.perks.honorarium" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UCheckbox, {
                                    modelValue: unref(formState).cfp.perks.honorarium,
                                    "onUpdate:modelValue": ($event) => unref(formState).cfp.perks.honorarium = $event,
                                    label: "Honorarium provided"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode(_component_UFormGroup, {
                            label: "Additional Notes (optional)",
                            name: "cfp.notes"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UTextarea, {
                                modelValue: unref(formState).cfp.notes,
                                "onUpdate:modelValue": ($event) => unref(formState).cfp.notes = $event,
                                placeholder: "Any additional information about the CFP or conference...",
                                rows: 3
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end space-x-3" }, [
                        createVNode(_component_UButton, {
                          type: "button",
                          variant: "outline",
                          onClick: resetForm
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Reset ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UButton, {
                          type: "submit",
                          loading: unref(submitting)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Submit CFP ")
                          ]),
                          _: 1
                        }, 8, ["loading"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UForm, {
                schema: unref(submitFormSchema),
                state: unref(formState),
                onSubmit: handleSubmit
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-8" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-xl font-semibold text-gray-900 dark:text-white mb-4" }, " Conference Information "),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode(_component_UFormGroup, {
                          label: "Conference Name",
                          name: "conference.name",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(formState).conference.name,
                              "onUpdate:modelValue": ($event) => unref(formState).conference.name = $event,
                              placeholder: "e.g. React Conf 2025"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UFormGroup, {
                          label: "Website URL",
                          name: "conference.websiteUrl",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(formState).conference.websiteUrl,
                              "onUpdate:modelValue": ($event) => unref(formState).conference.websiteUrl = $event,
                              placeholder: "https://reactconf.com",
                              type: "url"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UFormGroup, {
                          label: "Country",
                          name: "conference.country",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_USelectMenu, {
                              modelValue: unref(formState).conference.country,
                              "onUpdate:modelValue": [($event) => unref(formState).conference.country = $event, onCountryChange],
                              options: unref(countryOptions),
                              placeholder: "Select country",
                              searchable: "",
                              "searchable-placeholder": "Search countries...",
                              "option-attribute": "label",
                              "value-attribute": "value"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UFormGroup, {
                          label: "City",
                          name: "conference.city",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(formState).conference.city,
                              "onUpdate:modelValue": ($event) => unref(formState).conference.city = $event,
                              placeholder: "e.g. San Francisco"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UFormGroup, {
                          label: "Platform (optional)",
                          name: "conference.platform",
                          class: "md:col-span-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_USelectMenu, {
                              modelValue: unref(formState).conference.platform,
                              "onUpdate:modelValue": ($event) => unref(formState).conference.platform = $event,
                              options: platformOptions,
                              placeholder: "Select platform",
                              searchable: "",
                              "searchable-placeholder": "Search platforms..."
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-xl font-semibold text-gray-900 dark:text-white mb-4" }, " Call for Papers Details "),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode(_component_UFormGroup, {
                          label: "CFP URL",
                          name: "cfp.cfpUrl",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(formState).cfp.cfpUrl,
                              "onUpdate:modelValue": ($event) => unref(formState).cfp.cfpUrl = $event,
                              placeholder: "https://reactconf.com/call-for-speakers",
                              type: "url"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode(_component_UFormGroup, {
                            label: "Format",
                            name: "cfp.format",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_USelect, {
                                modelValue: unref(formState).cfp.format,
                                "onUpdate:modelValue": ($event) => unref(formState).cfp.format = $event,
                                options: formatOptions,
                                placeholder: "Select format"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormGroup, {
                            label: "Closing Date",
                            name: "cfp.closesAt",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(formState).cfp.closesAt,
                                "onUpdate:modelValue": ($event) => unref(formState).cfp.closesAt = $event,
                                type: "date",
                                min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "min"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(_component_UFormGroup, {
                          label: "Opening Date (optional)",
                          name: "cfp.opensAt"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(formState).cfp.opensAt,
                              "onUpdate:modelValue": ($event) => unref(formState).cfp.opensAt = $event,
                              type: "date"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UFormGroup, {
                          label: "Topics",
                          name: "cfp.topics",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("div", { class: "flex flex-wrap gap-2 mb-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(formState).cfp.topics, (topic, index) => {
                                  return openBlock(), createBlock(_component_UBadge, {
                                    key: index,
                                    variant: "soft",
                                    color: "primary",
                                    onClick: ($event) => removeTopic(index),
                                    class: "cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(topic) + " × ", 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"]);
                                }), 128))
                              ]),
                              createVNode(_component_USelectMenu, {
                                modelValue: unref(selectedTopic),
                                "onUpdate:modelValue": [($event) => isRef(selectedTopic) ? selectedTopic.value = $event : null, addTopicFromSelect],
                                options: unref(availableTopics),
                                placeholder: "Select topics from the list...",
                                searchable: "",
                                "searchable-placeholder": "Search topics...",
                                class: "w-full"
                              }, {
                                label: withCtx(() => [
                                  createVNode("span", { class: "text-gray-500" }, [
                                    createVNode(_component_Icon, {
                                      name: "i-heroicons-tag",
                                      class: "w-4 h-4 inline mr-1"
                                    }),
                                    createTextVNode(" Select topics from the list... ")
                                  ])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                              createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Select one or more topics that are relevant to your CFP ")
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-medium text-gray-900 dark:text-white mb-3" }, " Speaker Benefits "),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                            createVNode(_component_UFormGroup, { name: "cfp.perks.travel" }, {
                              default: withCtx(() => [
                                createVNode(_component_UCheckbox, {
                                  modelValue: unref(formState).cfp.perks.travel,
                                  "onUpdate:modelValue": ($event) => unref(formState).cfp.perks.travel = $event,
                                  label: "Travel covered"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UFormGroup, { name: "cfp.perks.hotel" }, {
                              default: withCtx(() => [
                                createVNode(_component_UCheckbox, {
                                  modelValue: unref(formState).cfp.perks.hotel,
                                  "onUpdate:modelValue": ($event) => unref(formState).cfp.perks.hotel = $event,
                                  label: "Hotel covered"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UFormGroup, { name: "cfp.perks.honorarium" }, {
                              default: withCtx(() => [
                                createVNode(_component_UCheckbox, {
                                  modelValue: unref(formState).cfp.perks.honorarium,
                                  "onUpdate:modelValue": ($event) => unref(formState).cfp.perks.honorarium = $event,
                                  label: "Honorarium provided"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode(_component_UFormGroup, {
                          label: "Additional Notes (optional)",
                          name: "cfp.notes"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UTextarea, {
                              modelValue: unref(formState).cfp.notes,
                              "onUpdate:modelValue": ($event) => unref(formState).cfp.notes = $event,
                              placeholder: "Any additional information about the CFP or conference...",
                              rows: 3
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-3" }, [
                      createVNode(_component_UButton, {
                        type: "button",
                        variant: "outline",
                        onClick: resetForm
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Reset ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UButton, {
                        type: "submit",
                        loading: unref(submitting)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Submit CFP ")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["schema", "state"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/submit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=submit-B2NmZgn9.mjs.map
