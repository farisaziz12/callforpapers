import { _ as __nuxt_component_4 } from './Card-CkQS4cv2.mjs';
import { _ as __nuxt_component_7 } from './Form-CjVJcDeG.mjs';
import { a as __nuxt_component_8, _ as __nuxt_component_9 } from './FormGroup-gKLvpM0v.mjs';
import { _ as __nuxt_component_3 } from './Alert-DCRR2uSh.mjs';
import { _ as __nuxt_component_2 } from './Button-PXp5DTfw.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, isRef, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead, n as navigateTo } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-4v4x5xwK.mjs';
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
import './Avatar-Dx_eT8Ed.mjs';
import './nuxt-link-BIQ150Xm.mjs';
import './index-mbtfuGJE.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import 'vue-router';
import '@supabase/ssr';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Admin Login - Call for Papers"
    });
    const supabase = useSupabaseClient();
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const error = ref("");
    async function handleLogin() {
      loading.value = true;
      error.value = "";
      try {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value
        });
        if (authError) throw authError;
        if (!data?.user?.id) {
          throw new Error("Authentication failed - no user data");
        }
        const { data: adminData, error: adminError } = await supabase.from("admin_users").select("id").eq("id", data.user.id).single();
        if (adminError || !adminData) {
          await supabase.auth.signOut();
          throw new Error("Not authorized as admin");
        }
        await navigateTo("/admin/moderation");
      } catch (err) {
        error.value = err.message || "Invalid credentials";
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_4;
      const _component_UForm = __nuxt_component_7;
      const _component_UFormGroup = __nuxt_component_8;
      const _component_UInput = __nuxt_component_9;
      const _component_UAlert = __nuxt_component_3;
      const _component_UButton = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-md w-full space-y-8"><div><h2 class="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white"> Admin Login </h2><p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400"> Sign in with your admin account </p></div>`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UForm, {
              state: {},
              onSubmit: handleLogin
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Email",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(email),
                          "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                          type: "email",
                          placeholder: "admin@example.com",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(email),
                            "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                            type: "email",
                            placeholder: "admin@example.com",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Password",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(password),
                          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                          type: "password",
                          placeholder: "Enter password",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(password),
                            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                            type: "password",
                            placeholder: "Enter password",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(error)) {
                    _push3(ssrRenderComponent(_component_UAlert, {
                      icon: "i-heroicons-exclamation-triangle",
                      color: "red",
                      variant: "soft",
                      description: unref(error)
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "submit",
                    loading: unref(loading),
                    class: "w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Sign In `);
                      } else {
                        return [
                          createTextVNode(" Sign In ")
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
                        label: "Email",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(email),
                            "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                            type: "email",
                            placeholder: "admin@example.com",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormGroup, {
                        label: "Password",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(password),
                            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                            type: "password",
                            placeholder: "Enter password",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      unref(error) ? (openBlock(), createBlock(_component_UAlert, {
                        key: 0,
                        icon: "i-heroicons-exclamation-triangle",
                        color: "red",
                        variant: "soft",
                        description: unref(error)
                      }, null, 8, ["description"])) : createCommentVNode("", true),
                      createVNode(_component_UButton, {
                        type: "submit",
                        loading: unref(loading),
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Sign In ")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UForm, {
                state: {},
                onSubmit: handleLogin
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode(_component_UFormGroup, {
                      label: "Email",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(email),
                          "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                          type: "email",
                          placeholder: "admin@example.com",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Password",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(password),
                          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                          type: "password",
                          placeholder: "Enter password",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    unref(error) ? (openBlock(), createBlock(_component_UAlert, {
                      key: 0,
                      icon: "i-heroicons-exclamation-triangle",
                      color: "red",
                      variant: "soft",
                      description: unref(error)
                    }, null, 8, ["description"])) : createCommentVNode("", true),
                    createVNode(_component_UButton, {
                      type: "submit",
                      loading: unref(loading),
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Sign In ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-D-wcOrMg.mjs.map
