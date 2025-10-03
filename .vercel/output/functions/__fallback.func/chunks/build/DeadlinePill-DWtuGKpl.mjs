import { _ as __nuxt_component_5 } from './Badge-Cz78TU95.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeadlinePill",
  __ssrInlineRender: true,
  props: {
    deadline: {}
  },
  setup(__props) {
    const props = __props;
    const deadlineInfo = computed(() => {
      const now = /* @__PURE__ */ new Date();
      const deadline = new Date(props.deadline);
      const diffTime = deadline.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      if (diffDays < 0) {
        return {
          text: "Closed",
          color: "red",
          variant: "solid"
        };
      } else if (diffDays === 0) {
        return {
          text: "Closes today",
          color: "red",
          variant: "solid"
        };
      } else if (diffDays === 1) {
        return {
          text: "Closes tomorrow",
          color: "orange",
          variant: "solid"
        };
      } else if (diffDays <= 7) {
        return {
          text: `${diffDays} days left`,
          color: "orange",
          variant: "soft"
        };
      } else if (diffDays <= 14) {
        return {
          text: `${diffDays} days left`,
          color: "yellow",
          variant: "soft"
        };
      } else {
        return {
          text: `${diffDays} days left`,
          color: "green",
          variant: "soft"
        };
      }
    });
    const deadlineText = computed(() => deadlineInfo.value.text);
    const deadlineColor = computed(() => deadlineInfo.value.color);
    const deadlineVariant = computed(() => deadlineInfo.value.variant);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = __nuxt_component_5;
      _push(ssrRenderComponent(_component_UBadge, mergeProps({
        color: unref(deadlineColor),
        variant: unref(deadlineVariant),
        size: "sm"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(deadlineText))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(deadlineText)), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DeadlinePill.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main, { __name: "DeadlinePill" });

export { __nuxt_component_4 as _ };
//# sourceMappingURL=DeadlinePill-DWtuGKpl.mjs.map
