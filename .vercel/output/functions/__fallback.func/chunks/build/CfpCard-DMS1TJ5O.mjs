import { _ as __nuxt_component_0 } from './nuxt-link-BIQ150Xm.mjs';
import { _ as __nuxt_component_4 } from './DeadlinePill-DWtuGKpl.mjs';
import { _ as __nuxt_component_1 } from './index-mbtfuGJE.mjs';
import { _ as __nuxt_component_5 } from './Badge-Cz78TU95.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CfpCard",
  __ssrInlineRender: true,
  props: {
    cfp: {}
  },
  setup(__props) {
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
        month: "short",
        day: "numeric"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_DeadlinePill = __nuxt_component_4;
      const _component_Icon = __nuxt_component_1;
      const _component_UBadge = __nuxt_component_5;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: `/cfp/${__props.cfp.slug}`,
        class: "group block h-full"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-full bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl hover:-translate-y-1"${_scopeId}><div class="flex justify-between items-start mb-3"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"${_scopeId}>${ssrInterpolate(__props.cfp.title)}</h3>`);
            _push2(ssrRenderComponent(_component_DeadlinePill, {
              deadline: __props.cfp.closesAt
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="space-y-2 mb-4"${_scopeId}><div class="flex items-center text-sm text-gray-600 dark:text-gray-300"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-map-pin",
              class: "w-4 h-4 mr-2 text-blue-500 dark:text-blue-400"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(__props.cfp.city)}, ${ssrInterpolate(__props.cfp.country)}</div><div class="flex items-center text-sm text-gray-600 dark:text-gray-300"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-cube",
              class: "w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(formatType(__props.cfp.format))}</div></div><div class="flex flex-wrap gap-2 mb-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.cfp.topics.slice(0, 3), (topic) => {
              _push2(ssrRenderComponent(_component_UBadge, {
                key: topic,
                variant: "soft",
                size: "sm",
                class: "transition-transform group-hover:scale-105"
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
            _push2(`<!--]-->`);
            if (__props.cfp.topics.length > 3) {
              _push2(ssrRenderComponent(_component_UBadge, {
                variant: "soft",
                size: "sm",
                color: "gray",
                class: "transition-transform group-hover:scale-105"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` +${ssrInterpolate(__props.cfp.topics.length - 3)}`);
                  } else {
                    return [
                      createTextVNode(" +" + toDisplayString(__props.cfp.topics.length - 3), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-wrap gap-2 mb-4"${_scopeId}>`);
            if (__props.cfp.perks.travel) {
              _push2(ssrRenderComponent(_component_UBadge, {
                variant: "outline",
                size: "sm",
                color: "green",
                class: "transition-all group-hover:scale-105"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "i-heroicons-paper-airplane",
                      class: "w-3 h-3 mr-1"
                    }, null, _parent3, _scopeId2));
                    _push3(` Travel `);
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        name: "i-heroicons-paper-airplane",
                        class: "w-3 h-3 mr-1"
                      }),
                      createTextVNode(" Travel ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.cfp.perks.hotel) {
              _push2(ssrRenderComponent(_component_UBadge, {
                variant: "outline",
                size: "sm",
                color: "blue",
                class: "transition-all group-hover:scale-105"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "i-heroicons-home",
                      class: "w-3 h-3 mr-1"
                    }, null, _parent3, _scopeId2));
                    _push3(` Hotel `);
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        name: "i-heroicons-home",
                        class: "w-3 h-3 mr-1"
                      }),
                      createTextVNode(" Hotel ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.cfp.perks.honorarium) {
              _push2(ssrRenderComponent(_component_UBadge, {
                variant: "outline",
                size: "sm",
                color: "purple",
                class: "transition-all group-hover:scale-105"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "i-heroicons-currency-dollar",
                      class: "w-3 h-3 mr-1"
                    }, null, _parent3, _scopeId2));
                    _push3(` Honorarium `);
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        name: "i-heroicons-currency-dollar",
                        class: "w-3 h-3 mr-1"
                      }),
                      createTextVNode(" Honorarium ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700"${_scopeId}><span class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}> Updated ${ssrInterpolate(formatDate(__props.cfp.lastUpdatedAt))}</span><div class="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all"${_scopeId}><span${_scopeId}>View Details</span>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-arrow-right",
              class: "w-4 h-4 transition-transform group-hover:translate-x-1"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "h-full bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl hover:-translate-y-1" }, [
                createVNode("div", { class: "flex justify-between items-start mb-3" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" }, toDisplayString(__props.cfp.title), 1),
                  createVNode(_component_DeadlinePill, {
                    deadline: __props.cfp.closesAt
                  }, null, 8, ["deadline"])
                ]),
                createVNode("div", { class: "space-y-2 mb-4" }, [
                  createVNode("div", { class: "flex items-center text-sm text-gray-600 dark:text-gray-300" }, [
                    createVNode(_component_Icon, {
                      name: "i-heroicons-map-pin",
                      class: "w-4 h-4 mr-2 text-blue-500 dark:text-blue-400"
                    }),
                    createTextVNode(" " + toDisplayString(__props.cfp.city) + ", " + toDisplayString(__props.cfp.country), 1)
                  ]),
                  createVNode("div", { class: "flex items-center text-sm text-gray-600 dark:text-gray-300" }, [
                    createVNode(_component_Icon, {
                      name: "i-heroicons-cube",
                      class: "w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400"
                    }),
                    createTextVNode(" " + toDisplayString(formatType(__props.cfp.format)), 1)
                  ])
                ]),
                createVNode("div", { class: "flex flex-wrap gap-2 mb-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.cfp.topics.slice(0, 3), (topic) => {
                    return openBlock(), createBlock(_component_UBadge, {
                      key: topic,
                      variant: "soft",
                      size: "sm",
                      class: "transition-transform group-hover:scale-105"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(topic), 1)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)),
                  __props.cfp.topics.length > 3 ? (openBlock(), createBlock(_component_UBadge, {
                    key: 0,
                    variant: "soft",
                    size: "sm",
                    color: "gray",
                    class: "transition-transform group-hover:scale-105"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" +" + toDisplayString(__props.cfp.topics.length - 3), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "flex flex-wrap gap-2 mb-4" }, [
                  __props.cfp.perks.travel ? (openBlock(), createBlock(_component_UBadge, {
                    key: 0,
                    variant: "outline",
                    size: "sm",
                    color: "green",
                    class: "transition-all group-hover:scale-105"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "i-heroicons-paper-airplane",
                        class: "w-3 h-3 mr-1"
                      }),
                      createTextVNode(" Travel ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  __props.cfp.perks.hotel ? (openBlock(), createBlock(_component_UBadge, {
                    key: 1,
                    variant: "outline",
                    size: "sm",
                    color: "blue",
                    class: "transition-all group-hover:scale-105"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "i-heroicons-home",
                        class: "w-3 h-3 mr-1"
                      }),
                      createTextVNode(" Hotel ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  __props.cfp.perks.honorarium ? (openBlock(), createBlock(_component_UBadge, {
                    key: 2,
                    variant: "outline",
                    size: "sm",
                    color: "purple",
                    class: "transition-all group-hover:scale-105"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "i-heroicons-currency-dollar",
                        class: "w-3 h-3 mr-1"
                      }),
                      createTextVNode(" Honorarium ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700" }, [
                  createVNode("span", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Updated " + toDisplayString(formatDate(__props.cfp.lastUpdatedAt)), 1),
                  createVNode("div", { class: "flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all" }, [
                    createVNode("span", null, "View Details"),
                    createVNode(_component_Icon, {
                      name: "i-heroicons-arrow-right",
                      class: "w-4 h-4 transition-transform group-hover:translate-x-1"
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CfpCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main, { __name: "CfpCard" });

export { __nuxt_component_3 as _ };
//# sourceMappingURL=CfpCard-DMS1TJ5O.mjs.map
